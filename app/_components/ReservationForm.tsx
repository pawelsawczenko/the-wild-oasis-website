"use client";

import { User } from "next-auth";
import { Cabin } from "../_lib/definitions";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export type BookingData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

interface ReservationFormProps {
  cabin: Cabin;
  user: User;
}

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights =
    startDate !== undefined && endDate !== undefined
      ? differenceInDays(endDate, startDate)
      : 0;

  const cabinPrice = numNights * (Number(regularPrice) - Number(discount));

  if (maxCapacity === null)
    throw new Error("something went wrong with the cabin data");

  const bookingData: BookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          {user?.image && user?.name ? (
            <>
              <img
                // Important to display google profile images
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
                src={user.image}
                alt={user.name}
              />
              <p>{user.name}</p>
            </>
          ) : null}
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservation(formData, bookingData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          {/* <p>
            {String(range?.from)} to {String(range?.to)}
          </p> */}
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base py-4">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingText="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
