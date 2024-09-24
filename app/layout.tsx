import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

export const metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
