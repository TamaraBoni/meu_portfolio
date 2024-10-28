"use client";
import { TipoGlobalSolution } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarGlobalSolution({ params }: { params: { id: number } }) {
  // 'id' será usado para a edição
  const navigate = useRouter();
  const [solution, setSolution] = useState<TipoGlobalSolution>({
    id: 0, // Inicializa o id
    rm: 0, // Inicializa o rm
    nome: "",
    nota: 0,
    materia: "",
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${params.id}`); // Use o id para buscar a Global Solution
      if (!response.ok) {
        console.error("Erro ao buscar Global Solution");
        return;
      }
      const dados: TipoGlobalSolution = await response.json();
      setSolution(dados); // O objeto inclui rm, id, nome, nota e materia
    };
    chamadaDaApi();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSolution({ ...solution, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${solution.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solution), // Envia o objeto completo com id e rm
      });
      console.log("Resposta da API: ", response);

      if (response.ok) {
        alert("Global Solution alterado com sucesso");
        navigate.push("/globalsolution");
      } else {
        const errorData = await response.json(); // Obter dados de erro
        console.error("Erro ao alterar: ", errorData); // Log para ver o erro
        alert("Erro ao alterar: " + errorData.msg || "Erro desconhecido.");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
      alert("Erro ao realizar a alteração.");
    }
  };

  return (
    <div>
      <h1>Editar Global Solution</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nome</label>
          <input type="text" name="nome" value={solution.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>Nota</label>
          <input type="number" name="nota" value={solution.nota} onChange={handleChange} required min={0} max={100} />
        </div>
        <div>
          <label>Matéria</label>
          <input type="text" name="materia" value={solution.materia} onChange={handleChange} required />
        </div>
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}
