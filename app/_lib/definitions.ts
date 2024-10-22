import { Tables } from "./database.types";

export type Cabin = Tables<"cabins">;

export type Guest = Tables<"guests">;

export type Booking = Tables<"bookings">;

export type Settings = Tables<"settings">;

export type Reservation = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
  cabins: {
    name: string | null;
    image: string | null;
  } | null;
};
