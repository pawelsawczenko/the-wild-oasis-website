import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-col items-center gap-2 z-10 md:flex-row md:gap-4"
    >
      <Image
        src="/logo.png"
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
      />
      {/* <Image
        src={logo}
        quality={50}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      /> */}
      <span className="hidden text-base font-semibold text-primary-100 md:text-xl md:inline-block">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
