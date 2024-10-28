import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoints } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const data: TipoCheckpoints[] = JSON.parse(file);
  const checkpoint = data.find((c) => c.id === Number(params.id));

  if (checkpoint) {
    return NextResponse.json(checkpoint);
  } else {
    return NextResponse.json({ msg: "Checkpoint não encontrado." }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const { nome, nota, materia, checkpoint } = await request.json();
  const index = checkpoints.findIndex((c) => c.id === Number(params.id));

  if (index !== -1) {
    const updatedCheckpoint = { id: checkpoints[index].id, rm: checkpoints[index].rm, nome, nota, materia, checkpoint };
    checkpoints.splice(index, 1, updatedCheckpoint);

    await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", JSON.stringify(checkpoints, null, 2));
    return NextResponse.json({ msg: "Checkpoint atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Checkpoint não encontrado." }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const index = checkpoints.findIndex((c) => c.id === Number(params.id));

  if (index !== -1) {
    checkpoints.splice(index, 1);
    await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", JSON.stringify(checkpoints, null, 2));
    return NextResponse.json({ msg: "Checkpoint excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Checkpoint não encontrado." }, { status: 404 });
  }
}
