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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Challenger Sprint excluído com sucesso!");
        setLista((prevLista) => prevLista.filter((challenger) => challenger.id !== id));
      }
    } catch (error) {
      console.error("Falha na exclusão do challenger sprint: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-pink-300 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Challenger Sprints</h2>
      <Link href="/challengersprints/cad-challengersprints" className="text-white bg-red-500 p-2 rounded hover:bg-red-600 mb-4">
        Adicionar Challenger Sprint
      </Link>
      <table className="w-full border-collapse shadow-md mt-4">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border p-4">RM</th>
            <th className="border p-4">NOME</th>
            <th className="border p-4">NOTA</th>
            <th className="border p-4">MATÉRIA</th>
            <th className="border p-4">SPRINT</th>
            <th className="border p-4">EDITAR | EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((challenger) => (
            <tr key={challenger.rm} className="bg-white hover:bg-gray-100">
              <td className="border p-4">{challenger.rm}</td>
              <td className="border p-4">{challenger.nome}</td>
              <td className="border p-4">{challenger.nota}</td>
              <td className="border p-4">{challenger.materia}</td>
              <td className="border p-4">{challenger.sprint}</td>
              <td className="border p-4">
                <Link href={`/challengersprints/${challenger.id}`} className="text-blue-600 hover:underline">
                  Editar
                </Link>{" "}
                |
                <Link href="#" onClick={() => handleDelete(challenger.id)} className="text-red-600 hover:underline">
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="text-center p-4">
              Quantidade de challengers sprints: {lista.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
