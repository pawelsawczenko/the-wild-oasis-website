import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Weclome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and darks forests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>copyright</footer>
      </body>
    </html>
  );
}
