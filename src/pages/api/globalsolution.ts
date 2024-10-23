import { NextApiRequest, NextApiResponse } from 'next';

let globalSolutions = [
  { id: 1, titulo: 'Projeto Global 1', nota: 9.0, descricao: 'Descrição do projeto 1.' },
  { id: 2, titulo: 'Projeto Global 2', nota: 8.0, descricao: 'Descrição do projeto 2.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const globalSolution = globalSolutions.find((sol) => sol.id === parseInt(id as string));
      if (globalSolution) {
        return res.status(200).json(globalSolution);
      }
      return res.status(404).json({ message: 'Global Solution not found' });
    }
    return res.status(200).json(globalSolutions);
  } else if (req.method === 'POST') {
    const { titulo, nota, descricao } = req.body;
    const newGlobalSolution = {
      id: globalSolutions.length + 1,
      titulo,
      nota,
      descricao,
    };
    globalSolutions.push(newGlobalSolution);
    res.status(201).json(newGlobalSolution);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
