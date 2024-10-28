import Link from "next/link";

export default function Menu() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-pink-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/challengersprints" className="hover:text-pink-300 transition-colors">
            Challengersprints
          </Link>
        </li>
        <li>
          <Link href="/checkpoint" className="hover:text-pink-300 transition-colors">
            Checkpoint
          </Link>
        </li>
        <li>
          <Link href="/globalsolution" className="hover:text-pink-300 transition-colors">
            Global Solution
          </Link>
        </li>
        <li>
          <Link href="/alunos" className="hover:text-pink-300 transition-colors">
            Alunos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
