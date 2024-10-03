"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
