import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoints } from "@/types/types";

export async function GET(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const data: TipoCheckpoints[] = JSON.parse(file);
  const checkpoint = data.find((c) => c.rm === params.rm);

  return NextResponse.json(checkpoint);
}

export async function PUT(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const { nome, nota, materia, checkpoint } = await request.json();

  const indice = checkpoints.findIndex((c) => c.rm === params.rm);

  if (indice !== -1) {
    const checkpointAtualizado = { rm: params.rm, nome, nota, materia, checkpoint } as TipoCheckpoints;

    checkpoints.splice(indice, 1, checkpointAtualizado);

    const fileUpdate = JSON.stringify(checkpoints);
    await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", fileUpdate);

    return NextResponse.json({ msg: "Checkpoint atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Checkpoint não encontrado." }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { rm: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const indice = checkpoints.findIndex((c) => c.rm === params.rm);

  if (indice !== -1) {
    checkpoints.splice(indice, 1);

    const fileUpdate = JSON.stringify(checkpoints);
    await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", fileUpdate);

    return NextResponse.json({ msg: "Checkpoint excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Checkpoint não encontrado." }, { status: 404 });
  }
}
