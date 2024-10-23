import { NextApiRequest, NextApiResponse } from 'next';

let challengerSprints = [
  { id: 1, titulo: 'Desafio 1', nota: 8.5, descricao: 'Descrição do desafio 1.' },
  { id: 2, titulo: 'Desafio 2', nota: 9.5, descricao: 'Descrição do desafio 2.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const challengerSprint = challengerSprints.find((cs) => cs.id === parseInt(id as string));
      if (challengerSprint) {
        return res.status(200).json(challengerSprint);
      }
      return res.status(404).json({ message: 'Challenger Sprint not found' });
    }
    return res.status(200).json(challengerSprints);
  } else if (req.method === 'POST') {
    const { titulo, nota, descricao } = req.body;
    const newChallengerSprint = {
      id: challengerSprints.length + 1,
      titulo,
      nota,
      descricao,
    };
    challengerSprints.push(newChallengerSprint);
    res.status(201).json(newChallengerSprint);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
