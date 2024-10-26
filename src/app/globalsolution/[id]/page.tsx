"use client";
import { TipoGlobalSolution } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarGlobalSolution({ params }: { params: { rm: number } }) {
  const navigate = useRouter();
  const [solution, setSolution] = useState<TipoGlobalSolution>({
    rm: 0,
    nome: "",
    nota: 0,
    materia: "",
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${params.rm}`);
      const dados = await response.json();
      setSolution(dados);
    };
    chamadaDaApi();
  }, [params.rm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSolution({ ...solution, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/globalsolution-route/${params.rm}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solution),
      });

      if (response.ok) {
        alert("Global Solution alterado com sucesso");
        navigate.push("/globalsolution");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
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
