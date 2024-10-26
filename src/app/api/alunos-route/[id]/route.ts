import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoAlunos } from "@/types/types"; // Certifique-se de que o caminho está correto

// Função para obter um aluno específico por RM
export async function GET(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const data: TipoAlunos[] = JSON.parse(file);
  const aluno = data.find((c) => c.rm === Number(params.rm)); // Converte para Number para comparação

  return NextResponse.json(aluno);
}

// Função para atualizar um aluno
export async function PUT(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const alunos: TipoAlunos[] = JSON.parse(file);

  // Extraindo as propriedades da requisição
  const { nome, idade, curso } = await request.json();
  const indice = alunos.findIndex((c) => c.rm === Number(params.rm)); // Converte para Number para comparação

  if (indice !== -1) {
    // Criando o aluno atualizado com todas as propriedades necessárias
    const alunoAtualizado: TipoAlunos = {
      rm: Number(params.rm), // Garantindo que o RM seja um número
      nome,
      idade,
      curso,
    };

    alunos.splice(indice, 1, alunoAtualizado); // Substitui o aluno no índice encontrado

    const fileUpdate = JSON.stringify(alunos, null, 2); // Formatação opcional para legibilidade
    await fs.writeFile(process.cwd() + "/src/data/alunos.json", fileUpdate);

    return NextResponse.json({ msg: "Aluno atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Aluno não encontrado." }, { status: 404 });
  }
}

// Função para excluir um aluno
export async function DELETE(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const alunos: TipoAlunos[] = JSON.parse(file);

  const indice = alunos.findIndex((c) => c.rm === Number(params.rm)); // Converte para Number para comparação

  if (indice !== -1) {
    alunos.splice(indice, 1); // Remove o aluno encontrado

    const fileUpdate = JSON.stringify(alunos, null, 2); // Formatação opcional para legibilidade
    await fs.writeFile(process.cwd() + "/src/data/alunos.json", fileUpdate);

    return NextResponse.json({ msg: "Aluno excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Aluno não encontrado." }, { status: 404 });
  }
}
