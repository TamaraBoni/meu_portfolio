import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Meu Portfólio Acadêmico</h1>
      <div className="mt-4">
        <h2 className="text-xl">Avaliações</h2>
        <ul>
          <li>
            <Link href="/checkpoints" className="text-blue-500">
              CheckPoints
            </Link>
          </li>
          <li>
            <Link href="/globalsolution" className="text-blue-500">
              GlobalSolution
            </Link>
          </li>
          <li>
            <Link href="/challengersprints" className="text-blue-500">
              Challenger Sprints
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
