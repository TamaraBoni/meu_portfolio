import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CheckPointDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da URL
  const [checkPoint, setCheckPoint] = useState(null);

  const fetchCheckPoint = async (id) => {
    const response = await fetch(`/api/checkpoints?id=${id}`);
    const data = await response.json();
    setCheckPoint(data);
  };

  useEffect(() => {
    if (id) {
      fetchCheckPoint(id);
    }
  }, [id]);

  if (!checkPoint) {
    return <div>Carregando...</div>; // Estado de carregamento
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{checkPoint.titulo}</h1>
      <p>Nota: {checkPoint.nota}</p>
      <p>Feedback: {checkPoint.feedback}</p>
    </div>
  );
};

export default CheckPointDetail;
