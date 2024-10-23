import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GlobalSolutionDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da URL
  const [globalSolution, setGlobalSolution] = useState(null);

  const fetchGlobalSolution = async (id) => {
    const response = await fetch(`/api/globalsolution?id=${id}`);
    const data = await response.json();
    setGlobalSolution(data);
  };

  useEffect(() => {
    if (id) {
      fetchGlobalSolution(id);
    }
  }, [id]);

  if (!globalSolution) {
    return <div>Carregando...</div>; // Estado de carregamento
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{globalSolution.titulo}</h1>
      <p>Nota: {globalSolution.nota}</p>
      <p>Descrição: {globalSolution.descricao}</p>
    </div>
  );
};

export default GlobalSolutionDetail;
