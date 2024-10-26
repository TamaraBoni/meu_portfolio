import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoAlunos } from "@/types/types";

// Função para obter todos os alunos
export async function GET() {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const data: TipoAlunos[] = JSON.parse(file);
  return NextResponse.json(data);
}

// Função para obter um aluno específico por RM
// export async function GET(request: Request, { params }: { params: { rm: string } }) {
//   const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
//   const data: TipoAlunos[] = JSON.parse(file);
//   const aluno = data.find((c) => c.rm === Number(params.rm));

//   return NextResponse.json(aluno);
// }

// Função para atualizar um aluno
export async function PUT(request: Request, { params }: { params: { rm: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const alunos: TipoAlunos[] = JSON.parse(file);
  const { nome, idade, curso } = await request.json();
  const indice = alunos.findIndex((c) => c.rm === Number(params.rm));

  if (indice !== -1) {
    const alunoAtualizado: TipoAlunos = {
      rm: Number(params.rm),
      nome,
      idade,
      curso,
    };

    alunos.splice(indice, 1, alunoAtualizado);
    const fileUpdate = JSON.stringify(alunos, null, 2);
    await fs.writeFile(process.cwd() + "/src/data/alunos.json", fileUpdate);

    return NextResponse.json({ msg: "Aluno atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Aluno não encontrado." }, { status: 404 });
  }
}

// Função para excluir um aluno
export async function DELETE(request: Request, { params }: { params: { rm: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const alunos: TipoAlunos[] = JSON.parse(file);
  const indice = alunos.findIndex((c) => c.rm === Number(params.rm));

  if (indice !== -1) {
    alunos.splice(indice, 1);
    const fileUpdate = JSON.stringify(alunos, null, 2);
    await fs.writeFile(process.cwd() + "/src/data/alunos.json", fileUpdate);

    return NextResponse.json({ msg: "Aluno excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Aluno não encontrado." }, { status: 404 });
  }
}
