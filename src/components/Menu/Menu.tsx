import Link from "next/link";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Challengersprints">Challengersprints</Link>
        </li>
        <li>
          <Link href="/checkpoint">checkpoint</Link>
        </li>
        <li>
          <Link href="globalsolution>">globalsolution</Link>
        </li>
      </ul>
    </nav>
  );
}
