"use client";
import { TipoGlobalSolution } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GlobalSolutions() {
  const [lista, setLista] = useState<TipoGlobalSolution[]>([]);

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch("http://localhost:3000/api/globalsolution-route");
      const dados = await response.json();
      setLista(dados);
    };

    chamadaDaApi();
  }, []);

  const handleDelete = async (rm: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${rm}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Global Solution excluído com sucesso!");
        setLista((prevLista) => prevLista.filter((solution) => solution.rm !== rm));
      }
    } catch (error) {
      console.error("Falha na exclusão da Global Solution: ", error);
    }
  };

  return (
    <div className="content-wrap">
      <h2>Global Solutions</h2>
      <table className="tabelaSolution">
        <thead>
          <tr>
            <th>RM</th>
            <th>NOME</th>
            <th>NOTA</th>
            <th>MATERIA</th>
            <th>EDITAR | EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((solution) => (
            <tr key={solution.rm}>
              <td>{solution.rm}</td>
              <td>{solution.nome}</td>
              <td>{solution.nota}</td>
              <td>{solution.materia}</td>
              <td>
                <Link href={`/globalsolution/${solution.rm}`}>Editar</Link> |
                <Link href="#" onClick={() => handleDelete(solution.rm)}>
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>Quantidade de Global Solutions: {lista.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
