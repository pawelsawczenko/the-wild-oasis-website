import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

import Image from "next/image";
import Link from "next/link";
import { Reservation } from "../_lib/definitions";

interface BookingProps {
  booking: Reservation;
  onDelete: (bookingId: number) => void;
}

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function ReservationCard({ booking, onDelete }: BookingProps) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins,
  } = booking;

  // cause supabase types
  if (guestId === null)
    throw new Error("Something went wrong with booking data");
  if (startDate === null)
    throw new Error("Something went wrong with booking data");
  if (endDate === null)
    throw new Error("Something went wrong with booking data");
  if (numNights === null)
    throw new Error("Something went wrong with booking data");
  if (totalPrice === null)
    throw new Error("Something went wrong with booking data");
  if (numGuests === null)
    throw new Error("Something went wrong with booking data");
  if (created_at === null)
    throw new Error("Something went wrong with booking data");
  if (cabins === null)
    throw new Error("Something went wrong with booking data");

  const { name, image } = cabins;

  // cause supabase types
  if (name === null) throw new Error("Something went wrong with booking data");
  if (image === null) throw new Error("Something went wrong with booking data");

  return (
    <div className="flex flex-col border border-primary-800 md:flex-row">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-row w-[100%] border-t pt-2 pb-2 border-primary-800 md:border-l md:border-t-0 md:pt-0 md:pb-0 md:w-[100px] md:flex-col">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 md:border-b"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />{" "}
          </>
        ) : null}
      </div>
    </div>
  );
}
