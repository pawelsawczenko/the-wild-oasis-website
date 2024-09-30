import { Tables } from "./database.types";

export type Cabin = Tables<"cabins">;

export type Guest = Tables<"guests">;

export type Booking = Tables<"bookings">;

export type Settings = Tables<"settings">;
