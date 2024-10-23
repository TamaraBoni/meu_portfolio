import { NextApiRequest, NextApiResponse } from 'next';

let checkPoints = [
  { id: 1, titulo: 'CheckPoint 1', nota: 8.5, feedback: 'Bom trabalho!' },
  { id: 2, titulo: 'CheckPoint 2', nota: 7.0, feedback: 'Pode melhorar.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const checkPoint = checkPoints.find((cp) => cp.id === parseInt(id as string));
      if (checkPoint) {
        return res.status(200).json(checkPoint);
      }
      return res.status(404).json({ message: 'CheckPoint not found' });
    }
    return res.status(200).json(checkPoints);
  } else if (req.method === 'POST') {
    const { titulo, nota, feedback } = req.body;
    const newCheckPoint = {
      id: checkPoints.length + 1,
      titulo,
      nota,
      feedback,
    };
    checkPoints.push(newCheckPoint);
    res.status(201).json(newCheckPoint);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
