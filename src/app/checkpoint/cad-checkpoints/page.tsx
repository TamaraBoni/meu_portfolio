"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarCheckpoint() {
  const [rm, setRm] = useState<number>(0);
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState(0);
  const [materia, setMateria] = useState("");
  const [checkpoint, setCheckpoint] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoCheckpoint = {
      rm,
      nome,
      nota,
      materia,
      checkpoint,
    };

    try {
      const response = await fetch("http://localhost:3000/api/checkpoint-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCheckpoint),
      });

      if (response.ok) {
        alert("Checkpoint adicionado com sucesso!");
        router.push("/checkpoint");
      } else {
        const errorData = await response.json();
        alert(`Falha ao adicionar o Checkpoint: ${errorData.msg}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao adicionar o Checkpoint. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-pink-300 p-4">
      <h2 className="text-xl font-semibold text-center text-gray-800">Adicionar Checkpoint</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">RM:</label>
          <input type="number" value={rm} onChange={(e) => setRm(Number(e.target.value))} required className="border rounded p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="border rounded p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nota:</label>
          <input type="number" value={nota} onChange={(e) => setNota(Number(e.target.value))} required className="border rounded p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Matéria:</label>
          <input type="text" value={materia} onChange={(e) => setMateria(e.target.value)} required className="border rounded p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Checkpoint:</label>
          <input type="text" value={checkpoint} onChange={(e) => setCheckpoint(e.target.value)} required className="border rounded p-2 w-full" />
        </div>
        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Adicionar Checkpoint
        </button>
      </form>
    </div>
  );
}
