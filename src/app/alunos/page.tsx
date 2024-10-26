"use client";
import { TipoAlunos } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Alunos() {
  const [lista, setLista] = useState<TipoAlunos[]>([]);
  const [imageSources, setImageSources] = useState<{ [key: number]: string }>({}); // Estado para armazenar as fontes das imagens

  useEffect(() => {
    const chamadaDaApi = async () => {
      try {
        const response = await fetch("/api/alunos-route");
        if (!response.ok) {
          throw new Error("Erro ao buscar alunos");
        }
        const dados = await response.json();
        setLista(dados);

        // Inicializa as fontes das imagens para cada aluno
        const initialImageSources: { [key: number]: string } = {};
        dados.forEach((aluno: TipoAlunos) => {
          initialImageSources[aluno.rm] = `/images/${aluno.rm}.png`; // Começa com a imagem PNG
        });
        setImageSources(initialImageSources);
      } catch (error) {
        console.error("Falha na chamada da API: ", error);
      }
    };

    chamadaDaApi();
  }, []);

  const handleImageError = (rm: number) => {
    // Tenta mudar para a imagem JPG caso a PNG não carregue
    setImageSources((prev) => ({
      ...prev,
      [rm]: `/images/${rm}.jpg`, // Troca a fonte para JPG
    }));
  };

  return (
    <div className="content-wrap">
      <h2>Lista de Alunos</h2>
      <table className="tabelaAlunos">
        <thead>
          <tr>
            <th>RM</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Curso</th>
            <th>Imagem</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((aluno) => (
            <tr key={aluno.rm}>
              <td>{aluno.rm}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.idade}</td>
              <td>{aluno.curso}</td>
              <td>
                {imageSources[aluno.rm] ? (
                  <Image
                    src={imageSources[aluno.rm]}
                    alt={aluno.nome}
                    width={50}
                    height={50}
                    onError={() => handleImageError(aluno.rm)} // Chama a função de erro
                  />
                ) : (
                  <span>Imagem não disponível</span> // Mensagem caso a imagem não esteja disponível
                )}
              </td>
              <td>
                <Link href={`/alunos/${aluno.rm}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
