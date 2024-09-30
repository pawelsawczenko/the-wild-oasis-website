import { Suspense } from "react";
import CabinDescription from "../../_components/CabinDescription";
import Reservation from "../../_components/Reservation";
import Spinner from "../../_components/Spinner";
import { getCabin, getCabins } from "../../_lib/data-service";

interface CabinPageProps {
  params: { cabinId: string };
}

export async function generateMetadata({ params }: CabinPageProps) {
  const cabin = await getCabin(Number(params.cabinId));

  if (cabin?.name) return { title: `Cabin ${cabin.name}` };

  return { title: `Cabin name not found` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const cabinIds = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return cabinIds;
}

export default async function Page({ params }: CabinPageProps) {
  const cabin = await getCabin(Number(params.cabinId));

  if (!cabin) throw new Error("This cabin could not be found.");

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDescription cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
