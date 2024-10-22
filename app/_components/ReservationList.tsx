"use client";

import { useOptimistic } from "react";
import { Reservation } from "../_lib/definitions";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

interface ReservationListProps {
  bookings: Reservation[];
}

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId: number) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => {
        if (booking != null)
          return (
            <ReservationCard
              onDelete={handleDelete}
              booking={booking}
              key={booking.id}
            />
          );
      })}
    </ul>
  );
}
