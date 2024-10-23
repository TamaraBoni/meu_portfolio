import { useState } from 'react';

const FormularioAvaliacao = () => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaAvaliacao = { titulo, nota: parseFloat(nota) };
    
    await fetch('/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaAvaliacao),
    });

    // Resetar campos
    setTitulo('');
    setNota('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="number"
        placeholder="Nota"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Adicionar Avaliação
      </button>
    </form>
  );
};

export default FormularioAvaliacao;
