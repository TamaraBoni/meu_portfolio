"use client";
import { TipoCheckpoints } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Checkpoints() {
  const [lista, setLista] = useState<TipoCheckpoints[]>([]);

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch("http://localhost:3000/api/checkpoint-route");
      const dados = await response.json();
      setLista(dados);
    };

    chamadaDaApi();
  }, []);

  const handleDelete = async (rm: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/checkpoint-route/${rm}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Checkpoint excluído com sucesso!");
        setLista((prevLista) => prevLista.filter((checkpoint) => checkpoint.rm !== rm));
      }
    } catch (error) {
      console.error("Falha na exclusão do checkpoint: ", error);
    }
  };

  return (
    <div className="content-wrap">
      <h2>Checkpoints</h2>
      <table className="tabelaCheckpoint">
        <thead>
          <tr>
            <th>RM</th>
            <th>NOME</th>
            <th>NOTA</th>
            <th>MATERIA</th>
            <th>CHECKPOINT</th>
            <th>EDITAR | EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((checkpoint) => (
            <tr key={checkpoint.rm}>
              <td>{checkpoint.rm}</td>
              <td>{checkpoint.nome}</td>
              <td>{checkpoint.nota}</td>
              <td>{checkpoint.materia}</td>
              <td>{checkpoint.checkpoint}</td>
              <td>
                <Link href={`/checkpoints/${checkpoint.rm}`}>Editar</Link> |
                <Link href="#" onClick={() => handleDelete(checkpoint.rm)}>
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Quantidade de checkpoints: {lista.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
