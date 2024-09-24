import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link href="/about">about</Link>
      </li>
      <li>
        <Link href="/account">your account</Link>
      </li>
    </ul>
  );
}
