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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Global Solution excluído com sucesso!");
        setLista((prevLista) => prevLista.filter((solution) => solution.id !== id));
      }
    } catch (error) {
      console.error("Falha na exclusão da Global Solution: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-pink-300 p-4">
      <h2 className="text-xl font-semibold text-center text-gray-800">Global Solutions</h2>
      <Link href="/globalsolution/cad-globalsolution" className="text-white bg-red-500 p-2 rounded hover:bg-red-600 mb-4">
        Adicionar Global Solution
      </Link>
      <table className="mt-4 w-full bg-white rounded shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">RM</th>
            <th className="p-2">NOME</th>
            <th className="p-2">NOTA</th>
            <th className="p-2">MATERIA</th>
            <th className="p-2">EDITAR | EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((solution) => (
            <tr key={solution.rm}>
              <td className="border p-2">{solution.rm}</td>
              <td className="border p-2">{solution.nome}</td>
              <td className="border p-2">{solution.nota}</td>
              <td className="border p-2">{solution.materia}</td>
              <td className="border p-2">
                <Link href={`/globalsolution/${solution.id}`} className="text-blue-500 hover:underline">
                  Editar
                </Link>{" "}
                |
                <Link href="#" onClick={() => handleDelete(solution.id)} className="text-red-500 hover:underline">
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="text-center p-2">
              Quantidade de Global Solutions: {lista.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
