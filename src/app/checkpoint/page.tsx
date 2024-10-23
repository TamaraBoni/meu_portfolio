import { useEffect, useState } from 'react';
import FormularioAvaliacao from '@/components/FormularioAvaliacao';

const CheckPoints = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  const fetchAvaliacoes = async () => {
    const response = await fetch('/api/avaliacoes');
    const data = await response.json();
    setAvaliacoes(data);
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">CheckPoints</h1>
      <FormularioAvaliacao />
      <ul>
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.id}>
            {avaliacao.titulo} - Nota: {avaliacao.nota}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckPoints;
