import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { Cabin } from "../_lib/definitions";

interface CabinListProps {
  filter: string;
}
export default async function CabinList({ filter }: CabinListProps) {
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  const displayCabins: Cabin[] =
    filter === "all"
      ? cabins
      : filter === "small"
      ? cabins.filter((cabin) => cabin.maxCapacity && cabin.maxCapacity <= 3)
      : filter === "medium"
      ? cabins.filter(
          (cabin) =>
            cabin.maxCapacity &&
            cabin.maxCapacity >= 4 &&
            cabin.maxCapacity <= 7
        )
      : filter === "large"
      ? cabins.filter((cabin) => cabin.maxCapacity && cabin.maxCapacity >= 8)
      : [];
  // if (filter === "all") displayCabins = cabins;
  // if (filter === "small")
  //   displayCabins = cabins.filter(
  //     (cabin) => cabin.maxCapacity && cabin.maxCapacity <= 3
  //   );
  // if (filter === "medium")
  //   displayCabins = cabins.filter(
  //     (cabin) =>
  //       cabin.maxCapacity && cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
  //   );
  // if (filter === "large")
  //   displayCabins = cabins.filter(
  //     (cabin) => cabin.maxCapacity && cabin.maxCapacity >= 12
  //   );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
