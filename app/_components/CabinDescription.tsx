import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import { Cabin } from "../_lib/definitions";

interface CabinProps {
  cabin: Cabin;
}

export default function CabinDescription({ cabin }: CabinProps) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid grid-rows-2 gap-20 border border-primary-800 py-3 px-5 mb-24 md:py-3 md:px-10 md:mb-24 md:grid-cols-[3fr_4fr] md:grid-rows-none">
      <div className="relative md:scale-[1.15] md:-translate-x-3">
        {image && (
          <Image
            src={image}
            className="object-cover"
            fill
            alt={`Cabin ${name}`}
          />
        )}
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-5xl mb-5 bg-primary-950 md:p-6 md:pb-1 md:w-[150%] md:translate-x-[-254px] md:text-7xl">
          Cabin {name}
        </h3>

        <p className="text-base text-primary-300 mb-10 md:text-lg">
          {description && <TextExpander>{description}</TextExpander>}
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
