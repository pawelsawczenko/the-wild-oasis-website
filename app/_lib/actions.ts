"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";
import { BookingData } from "../_components/ReservationForm";

export async function upadteProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  if (nationalID === null) throw new Error("You must provide national ID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(String(nationalID)))
    throw new Error("Please provide a valid national ID");

  const rawNationality = formData.get("nationality");
  if (rawNationality === null) throw new Error("You must provide nationality");
  const [nationality, countryFlag] = String(rawNationality).split("%");

  const updateData = {
    nationalID: String(nationalID),
    nationality,
    countryFlag,
  };

  const { error } = await updateGuest(session.user.guestId, updateData);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createReservation(
  formData: FormData,
  bookingData: BookingData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const rawNumGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  if (rawNumGuests === null)
    throw new Error(
      "Something went wrong with num of guests. Please try again"
    );
  if (observations === null)
    throw new Error("Something went wrong with observations. Please try again");
  if (bookingData.startDate === undefined)
    throw new Error("Something went wrong with start date. Please try again");
  if (bookingData.endDate === undefined)
    throw new Error("Something went wrong with end date. Please try again");

  const newBooking = {
    ...bookingData,
    startDate: bookingData.startDate.toISOString(),
    endDate: bookingData.endDate.toISOString(),
    guestId: session.user.guestId,
    numGuests: Number(rawNumGuests),
    observations: String(observations).slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await createBooking(newBooking);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function upadteReservation(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  const rawBookingId = formData.get("bookingId");

  if (rawBookingId === null)
    throw new Error("No booking id was found. Please try again");

  const bookingId = Number(rawBookingId);

  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("You are not allowed to update this booking");
  }

  const rawNumGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  if (rawNumGuests === null)
    throw new Error(
      "Something went wrong with num of guests. Please try again"
    );
  if (observations === null)
    throw new Error("Something went wrong with observations. Please try again");

  const updateData = {
    numGuests: Number(rawNumGuests),
    observations: String(observations).slice(0, 1000),
  };

  const { error } = await updateBooking(bookingId, updateData);

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/{${bookingId}}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { error } = await deleteBooking(bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
