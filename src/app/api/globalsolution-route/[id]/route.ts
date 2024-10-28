import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobalSolution } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const data: TipoGlobalSolution[] = JSON.parse(file);
  const solution = data.find((g) => g.id === Number(params.id)); // Atualizado para usar 'id'

  if (solution) {
    return NextResponse.json(solution);
  } else {
    return NextResponse.json({ msg: "Global Solution não encontrado." }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const solutions: TipoGlobalSolution[] = JSON.parse(file);

  const { nome, nota, materia } = await request.json();
  const index = solutions.findIndex((g) => g.id === Number(params.id)); // Use 'id' para encontrar o índice

  if (index !== -1) {
    const updatedSolution = { id: solutions[index].id, rm: solutions[index].rm, nome, nota, materia }; // Mantém o id e rm
    solutions.splice(index, 1, updatedSolution);

    await fs.writeFile(process.cwd() + "/src/data/globalsolution.json", JSON.stringify(solutions));
    return NextResponse.json({ msg: "Global Solution atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Global Solution não encontrado." }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const solutions: TipoGlobalSolution[] = JSON.parse(file);

  const index = solutions.findIndex((g) => g.id === Number(params.id)); // Atualizado para usar 'id'

  if (index !== -1) {
    solutions.splice(index, 1);
    await fs.writeFile(process.cwd() + "/src/data/globalsolution.json", JSON.stringify(solutions, null, 2));
    return NextResponse.json({ msg: "Global Solution excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Global Solution não encontrado." }, { status: 404 });
  }
}
