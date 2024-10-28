export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-pink-300 text-gray-800 p-4">
      <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-semibold text-white mb-2">Avaliações</h1>

        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl text-red-500">Checkpoints</h3>
          <p className="text-gray-700">Avaliações intermediárias para acompanhamento do progresso.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl text-red-500">Challenger Sprints</h3>
          <p className="text-gray-700">Avaliações em formato de desafios, com foco em resolução de problemas com entregas programadas.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl text-red-500">Global Solutions</h3>
          <p className="text-gray-700">Projetos ou avaliações integradoras, que envolvem a aplicação global dos conhecimentos adquiridos.</p>
        </div>
      </div>
    </div>
  );
}
