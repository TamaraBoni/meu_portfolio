"use client";
import { TipoAlunos } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Alunos() {
  const [lista, setLista] = useState<TipoAlunos[]>([]);
  const [imageSources, setImageSources] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const chamadaDaApi = async () => {
      try {
        const response = await fetch("/api/alunos-route");
        if (!response.ok) {
          throw new Error("Erro ao buscar alunos");
        }
        const dados = await response.json();
        setLista(dados);

        const initialImageSources: { [key: number]: string } = {};
        dados.forEach((aluno: TipoAlunos) => {
          initialImageSources[aluno.rm] = `/images/${aluno.rm}.png`;
        });
        setImageSources(initialImageSources);
      } catch (error) {
        console.error("Falha na chamada da API: ", error);
      }
    };

    chamadaDaApi();
  }, []);

  const handleImageError = (rm: number) => {
    setImageSources((prev) => ({
      ...prev,
      [rm]: `/images/${rm}.jpg`,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-pink-300 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Lista de Alunos</h2>
      <Link href="/alunos/cad-alunos" className="text-white bg-red-500 p-2 rounded hover:bg-red-600 mb-4">
        Adicionar Aluno
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lista.map((aluno) => (
          <div
            key={aluno.rm}
            className="flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <div className="relative w-40 h-40 mb-3">
              {imageSources[aluno.rm] ? (
                <Image
                  src={imageSources[aluno.rm]}
                  alt={aluno.nome}
                  width={160}
                  height={160}
                  className="rounded-full object-cover"
                  onError={() => handleImageError(aluno.rm)}
                />
              ) : (
                <span>Imagem não disponível</span>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold">{aluno.nome}</p>
              <p className="text-gray-600">Idade: {aluno.idade}</p>
              <p className="text-gray-600">Curso: {aluno.curso}</p>
              <Link href={`/alunos/${aluno.rm}`} className="text-blue-500 hover:underline mt-2 block">
                Ver mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
