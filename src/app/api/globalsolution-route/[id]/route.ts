import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobalSolution } from "@/types/types";

export async function GET(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const data: TipoGlobalSolution[] = JSON.parse(file);
  const solution = data.find((g) => g.rm === params.rm);

  return NextResponse.json(solution);
}

export async function PUT(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const solutions: TipoGlobalSolution[] = JSON.parse(file);

  const { nome, nota, materia } = await request.json();
  const index = solutions.findIndex((g) => g.rm === params.rm);

  if (index !== -1) {
    const updatedSolution = { rm: params.rm, nome, nota, materia };
    solutions.splice(index, 1, updatedSolution);

    await fs.writeFile(process.cwd() + "/src/data/globalsolution.json", JSON.stringify(solutions));
    return NextResponse.json({ msg: "Global Solution atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Global Solution não encontrado." }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const solutions: TipoGlobalSolution[] = JSON.parse(file);

  const index = solutions.findIndex((g) => g.rm === params.rm);

  if (index !== -1) {
    solutions.splice(index, 1);
    await fs.writeFile(process.cwd() + "/src/data/globalsolution.json", JSON.stringify(solutions));
    return NextResponse.json({ msg: "Global Solution excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Global Solution não encontrado." }, { status: 404 });
  }
}
