"use client";

import { upadteProfile } from "../_lib/actions";
import { Guest } from "../_lib/definitions";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({
  guest,
  children,
}: {
  guest: Guest;
  children: React.ReactNode;
}) {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      action={upadteProfile}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="fullName"
          // at this point the user is already signed in and can't acccess the page without it
          defaultValue={fullName as string}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="email"
          // at this point the user is already signed in and can't acccess the page without it
          defaultValue={email as string}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag ?? ""}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={nationalID ?? ""}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingText={`Updating...`}>Update profile</SubmitButton>
      </div>
    </form>
  );
}
