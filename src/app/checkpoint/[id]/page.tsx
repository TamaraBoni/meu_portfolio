"use client";
import { TipoCheckpoints } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarCheckpoint({ params }: { params: { rm: number } }) {
  const navigate = useRouter();

  const [checkpoint, setCheckpoint] = useState<TipoCheckpoints>({
    rm: 0,
    nome: "",
    nota: 0,
    materia: "",
    checkpoint: "",
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/checkpoint-route/${params.rm}`);
      const dados = await response.json();
      setCheckpoint(dados);
    };
    chamadaDaApi();
  }, [params.rm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckpoint({ ...checkpoint, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/checkpoint-route/${params.rm}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkpoint),
      });

      if (response.ok) {
        alert("Checkpoint alterado com sucesso");
        // Reset no state
        setCheckpoint({
          rm: 0,
          nome: "",
          nota: 0,
          materia: "",
          checkpoint: "",
        });
        // Redirecionar para /checkpoints
        navigate.push("/checkpoint");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
    }
  };

  return (
    <div>
      <h1>Editar Checkpoint</h1>

      <div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Nome</label>
            <input type="text" id="idNome" name="nome" value={checkpoint.nome} onChange={handleChange} placeholder="Nome do aluno" required />
          </div>
          <div>
            <label>Nota</label>
            <input
              type="number"
              id="idNota"
              name="nota"
              value={checkpoint.nota}
              onChange={handleChange}
              placeholder="Nota"
              required
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Matéria</label>
            <input type="text" id="idMateria" name="materia" value={checkpoint.materia} onChange={handleChange} placeholder="Matéria" required />
          </div>
          <div>
            <label>Checkpoint</label>
            <input
              type="text"
              id="idCheckpoint"
              name="checkpoint"
              value={checkpoint.checkpoint}
              onChange={handleChange}
              placeholder="Nome do checkpoint"
              required
            />
          </div>
          <div>
            <button type="submit">Alterar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
