"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TipoAlunos, TipoCheckpoints, TipoChallengersSprints, TipoGlobalSolution } from "@/types/types";

const AlunoPage = ({ params }: { params: { id: string } }) => {
  const [aluno, setAluno] = useState<TipoAlunos | null>(null);
  const [checkpoints, setCheckpoints] = useState<TipoCheckpoints[]>([]);
  const [challengersSprints, setChallengersSprints] = useState<TipoChallengersSprints[]>([]);
  const [globalSolution, setGlobalSolution] = useState<TipoGlobalSolution[]>([]);

  useEffect(() => {
    const fetchAluno = async () => {
      const alunoResponse = await fetch(`/src/data/alunos.json`);
      const alunoData: TipoAlunos[] = await alunoResponse.json();
      const alunoEncontrado = alunoData.find((a) => a.rm === Number(params.id));
      setAluno(alunoEncontrado || null);
    };

    const fetchData = async <T extends { rm: number }>(url: string, setData: React.Dispatch<React.SetStateAction<T[]>>) => {
      const response = await fetch(url);
      const data: T[] = await response.json();
      const filteredData = data.filter((item) => item.rm === Number(params.id));
      setData(filteredData);
    };

    fetchAluno();
    fetchData<TipoCheckpoints>("/src/data/checkpoints.json", setCheckpoints);
    fetchData<TipoChallengersSprints>("/src/data/challengerssprints.json", setChallengersSprints);
    fetchData<TipoGlobalSolution>("/src/data/globalsolution.json", setGlobalSolution);
  }, [params.id]);

  if (!aluno) return <p>Aluno não encontrado</p>;

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <Image
          src={`/images/alunos/${aluno.rm}.jpg`}
          alt={`Foto de ${aluno.nome}`}
          width={192}
          height={192}
          className="object-cover rounded-full mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">{aluno.nome}</h1>
        <p className="text-gray-600">{aluno.curso}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Checkpoints</h2>
        <ul className="list-disc ml-6">
          {checkpoints.length ? (
            checkpoints.map((checkpoint) => (
              <li key={checkpoint.rm}>
                {checkpoint.materia}: Nota {checkpoint.nota}
              </li>
            ))
          ) : (
            <p>Nenhum checkpoint encontrado.</p>
          )}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Challenger Sprints</h2>
        <ul className="list-disc ml-6">
          {challengersSprints.length ? (
            challengersSprints.map((sprint) => (
              <li key={sprint.rm}>
                {sprint.materia}: Nota {sprint.nota} - Sprint {sprint.sprint}
              </li>
            ))
          ) : (
            <p>Nenhum challenger sprint encontrado.</p>
          )}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Global Solution</h2>
        <ul className="list-disc ml-6">
          {globalSolution.length ? (
            globalSolution.map((gs) => (
              <li key={gs.rm}>
                {gs.materia}: Nota {gs.nota}
              </li>
            ))
          ) : (
            <p>Nenhuma avaliação global solution encontrada.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default AlunoPage; // Assegure-se de que há uma exportação padrão
