"use client";
import { TipoAlunos } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AlunoDetalhe() {
  const [aluno, setAluno] = useState<TipoAlunos | null>(null);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [curso, setCurso] = useState("");
  const router = useRouter();
  const { rm } = router.query;

  useEffect(() => {
    const fetchAluno = async () => {
      if (rm) {
        const response = await fetch(`http://localhost:3000/api/alunos-route/${rm}`);
        const data: TipoAlunos = await response.json();
        setAluno(data);
        setNome(data.nome);
        setIdade(data.idade);
        setCurso(data.curso);
      }
    };

    fetchAluno();
  }, [rm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aluno) {
      await fetch(`http://localhost:3000/api/alunos-route/${rm}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, idade, curso }),
      });
      router.push("/alunos"); // Redireciona de volta para a lista
    }
  };

  if (!aluno) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Idade:</label>
          <input type="number" value={idade} onChange={(e) => setIdade(Number(e.target.value))} required />
        </div>
        <div>
          <label>Curso:</label>
          <input type="text" value={curso} onChange={(e) => setCurso(e.target.value)} required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
