"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TipoAlunos, TipoCheckpoints, TipoChallengersSprints, TipoGlobalSolution } from "@/types/types";
import React from "react";

const AlunoDetalhes = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const [aluno, setAluno] = useState<TipoAlunos | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagePath, setImagePath] = useState(`/images/${id}.png`);
  const [imageError, setImageError] = useState(false);
  const [checkpoints, setCheckpoints] = useState<TipoCheckpoints[]>([]);
  const [challengersSprints, setChallengersSprints] = useState<TipoChallengersSprints[]>([]);
  const [globalSolutions, setGlobalSolutions] = useState<TipoGlobalSolution[]>([]);

  useEffect(() => {
    const fetchAluno = async () => {
      const response = await fetch(`/api/alunos-route/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAluno(data);
        setImagePath(`/images/${data.rm}.png`);
      } else {
        console.error("Erro na API:", response.statusText);
      }
      setLoading(false);
    };

    const fetchAvaliacoes = async () => {
      try {
        const [checkpointsRes, challengersSprintsRes, globalSolutionsRes] = await Promise.all([
          fetch(`/api/avaliacoes/checkpoints/${id}`),
          fetch(`/api/avaliacoes/challengersprints/${id}`),
          fetch(`/api/avaliacoes/globalsolution/${id}`),
        ]);

        if (checkpointsRes.ok) setCheckpoints(await checkpointsRes.json());
        else console.error("Erro ao buscar checkpoints:", checkpointsRes.statusText);

        if (challengersSprintsRes.ok) setChallengersSprints(await challengersSprintsRes.json());
        else console.error("Erro ao buscar challengers sprints:", challengersSprintsRes.statusText);

        if (globalSolutionsRes.ok) setGlobalSolutions(await globalSolutionsRes.json());
        else console.error("Erro ao buscar global solutions:", globalSolutionsRes.statusText);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchAluno();
    fetchAvaliacoes();
  }, [id]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImagePath(`/images/${aluno?.rm}.jpg`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!aluno) return <div>Aluno não encontrado.</div>;

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-red-500 to-pink-300 min-h-screen">
      <div className="flex items-center mb-8">
        <Image src={imagePath} alt={aluno.nome} width={150} height={150} onError={handleImageError} className="rounded-full" />
        <div className="ml-4 text-center">
          <h1 className="text-2xl font-bold">{aluno.nome}</h1>
          <p>Idade: {aluno.idade}</p>
          <p>Curso: {aluno.curso}</p>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="flex flex-col w-1/3">
          <h2 className="text-lg font-semibold">Checkpoints</h2>
          {checkpoints.length > 0 ? (
            checkpoints.map((checkpoint) => (
              <div key={`${checkpoint.checkpoint}-${checkpoint.materia}`} className="bg-white p-4 rounded shadow mb-2">
                <p>Matéria: {checkpoint.materia}</p>
                <p>Nota: {checkpoint.nota}</p>
              </div>
            ))
          ) : (
            <p>Nenhum checkpoint encontrado.</p>
          )}
        </div>

        <div className="flex flex-col w-1/3">
          <h2 className="text-lg font-semibold">Challenger Sprints</h2>
          {challengersSprints.length > 0 ? (
            challengersSprints.map((sprint) => (
              <div key={`${sprint.sprint}-${sprint.materia}`} className="bg-white p-4 rounded shadow mb-2">
                <p>Matéria: {sprint.materia}</p>
                <p>Nota: {sprint.nota}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma sprint encontrada.</p>
          )}
        </div>

        <div className="flex flex-col w-1/3">
          <h2 className="text-lg font-semibold">Global Solutions</h2>
          {globalSolutions.length > 0 ? (
            globalSolutions.map((gs, index) => (
              <div key={`${gs.materia}-${index}`} className="bg-white p-4 rounded shadow mb-2">
                <p>Matéria: {gs.materia}</p>
                <p>Nota: {gs.nota}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma solução global encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlunoDetalhes;
