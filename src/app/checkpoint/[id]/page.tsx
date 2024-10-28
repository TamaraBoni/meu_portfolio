"use client";
import { TipoCheckpoints } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarCheckpoint({ params }: { params: { id: number } }) {
  const navigate = useRouter();
  const [checkpoint, setCheckpoint] = useState<TipoCheckpoints>({
    id: 0, // Inicializa o id
    rm: 0,
    nome: "",
    nota: 0,
    materia: "",
    checkpoint: 0,
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/checkpoint-route/${params.id}`);
      if (!response.ok) {
        console.error("Erro ao buscar Checkpoint");
        return;
      }
      const dados: TipoCheckpoints = await response.json();
      setCheckpoint(dados);
    };
    chamadaDaApi();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckpoint({ ...checkpoint, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/checkpoint-route/${checkpoint.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkpoint),
      });

      if (response.ok) {
        alert("Checkpoint alterado com sucesso");
        navigate.push("/checkpoint");
      } else {
        const errorData = await response.json();
        console.error("Erro ao alterar: ", errorData);
        alert("Erro ao alterar: " + errorData.msg || "Erro desconhecido.");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
      alert("Erro ao realizar a alteração.");
    }
  };

  return (
    <div>
      <h1>Editar Checkpoint</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nome</label>
          <input type="text" name="nome" value={checkpoint.nome} onChange={handleChange} placeholder="Nome do aluno" required />
        </div>
        <div>
          <label>Nota</label>
          <input type="number" name="nota" value={checkpoint.nota} onChange={handleChange} placeholder="Nota" required min={0} max={10} />
        </div>
        <div>
          <label>Matéria</label>
          <input type="text" name="materia" value={checkpoint.materia} onChange={handleChange} placeholder="Matéria" required />
        </div>
        <div>
          <label>Checkpoint</label>
          <input type="text" name="checkpoint" value={checkpoint.checkpoint} onChange={handleChange} placeholder="Nome do checkpoint" required />
        </div>
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}
