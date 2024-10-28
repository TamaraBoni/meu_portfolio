"use client";
import { TipoChallengersSprints } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarChallengerSprint({ params }: { params: { id: number } }) {
  const navigate = useRouter();

  const [challengerSprint, setChallengerSprint] = useState<TipoChallengersSprints>({
    id: 0,
    rm: 0,
    nome: "",
    nota: 0,
    materia: "",
    sprint: 0,
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${params.id}`);
      if (!response.ok) {
        console.error("Erro ao buscar Challenger Sprint");
        return;
      }
      const dados: TipoChallengersSprints = await response.json();
      setChallengerSprint(dados);
    };
    chamadaDaApi();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallengerSprint({ ...challengerSprint, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${challengerSprint.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challengerSprint),
      });

      if (response.ok) {
        alert("Challenger Sprint alterado com sucesso");
        navigate.push("/challengersprints");
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
      <h1>Editar Challenger Sprint</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nome</label>
          <input type="text" name="nome" value={challengerSprint.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>Nota</label>
          <input type="number" name="nota" value={challengerSprint.nota} onChange={handleChange} required min={0} max={100} />
        </div>
        <div>
          <label>Matéria</label>
          <input type="text" name="materia" value={challengerSprint.materia} onChange={handleChange} required />
        </div>
        <div>
          <label>Sprint</label>
          <input type="number" name="sprint" value={challengerSprint.sprint} onChange={handleChange} required min={1} />
        </div>
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}
