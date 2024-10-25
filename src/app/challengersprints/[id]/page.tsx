"use client";
import { TipoChallengersSprints } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarChallengerSprint({ params }: { params: { rm: number } }) {
  const navigate = useRouter();

  const [challengerSprint, setChallengerSprint] = useState<TipoChallengersSprints>({
    rm: 0,
    nome: "",
    nota: 0,
    materia: "",
    sprint: 0,
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${params.rm}`);
      const dados = await response.json();
      setChallengerSprint(dados);
    };
    chamadaDaApi();
  }, [params.rm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallengerSprint({ ...challengerSprint, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/challengersprints-route/${params.rm}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challengerSprint),
      });

      if (response.ok) {
        alert("Challenger Sprint alterado com sucesso");
        // Reset no state
        setChallengerSprint({
          rm: 0,
          nome: "",
          nota: 0,
          materia: "",
          sprint: 0,
        });
        // Redirecionar para /challengersprints
        navigate.push("/challengersprints");
      }
    } catch (error) {
      console.error("Falha ao realizar a alteração: ", error);
    }
  };

  return (
    <div>
      <h1>Editar Challenger Sprint</h1>

      <div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Nome</label>
            <input type="text" id="idNome" name="nome" value={challengerSprint.nome} onChange={handleChange} placeholder="Nome do aluno" required />
          </div>
          <div>
            <label>Nota</label>
            <input
              type="number"
              id="idNota"
              name="nota"
              value={challengerSprint.nota}
              onChange={handleChange}
              placeholder="Nota"
              required
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Matéria</label>
            <input
              type="text"
              id="idMateria"
              name="materia"
              value={challengerSprint.materia}
              onChange={handleChange}
              placeholder="Matéria"
              required
            />
          </div>
          <div>
            <label>Sprint</label>
            <input
              type="number"
              id="idSprint"
              name="sprint"
              value={challengerSprint.sprint}
              onChange={handleChange}
              placeholder="Número da Sprint"
              required
              min={1}
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
