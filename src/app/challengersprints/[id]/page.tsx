import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ChallengerSprintDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da URL
  const [challengerSprint, setChallengerSprint] = useState(null);

  const fetchChallengerSprint = async (id) => {
    const response = await fetch(`/api/challengersprints?id=${id}`);
    const data = await response.json();
    setChallengerSprint(data);
  };

  useEffect(() => {
    if (id) {
      fetchChallengerSprint(id);
    }
  }, [id]);

  if (!challengerSprint) {
    return <div>Carregando...</div>; // Estado de carregamento
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{challengerSprint.titulo}</h1>
      <p>Nota: {challengerSprint.nota}</p>
      <p>Descrição: {challengerSprint.descricao}</p>
    </div>
  );
};

export default ChallengerSprintDetail;
