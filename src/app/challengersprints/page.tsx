"use client";
import { TipoChallengersSprints } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ChallengersSprints() {
  const [lista, setLista] = useState<TipoChallengersSprints[]>([]);

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch("http://localhost:3000/api/challengersprints-route");
      const dados = await response.json();
      setLista(dados);
    };

    chamadaDaApi();
  }, []);

  const handleDelete = async (rm: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${rm}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Challenger Sprint excluído com sucesso!");
        setLista((prevLista) => prevLista.filter((challenger) => challenger.rm !== rm));
      }
    } catch (error) {
      console.error("Falha na exclusão do challenger sprint: ", error);
    }
  };

  return (
    <div className="content-wrap">
      <h2>Challenger Sprints</h2>
      <table className="tabelaChallengerSprints">
        <thead>
          <tr>
            <th>RM</th>
            <th>NOME</th>
            <th>NOTA</th>
            <th>MATERIA</th>
            <th>SPRINT</th>
            <th>EDITAR | EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((challenger) => (
            <tr key={challenger.rm}>
              <td>{challenger.rm}</td>
              <td>{challenger.nome}</td>
              <td>{challenger.nota}</td>
              <td>{challenger.materia}</td>
              <td>{challenger.sprint}</td>
              <td>
                <Link href={`/challengersprints/${challenger.rm}`}>Editar</Link> |
                <Link href="#" onClick={() => handleDelete(challenger.rm)}>
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Quantidade de challengers sprints: {lista.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
