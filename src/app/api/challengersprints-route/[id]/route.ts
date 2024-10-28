import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallengersSprints } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const data: TipoChallengersSprints[] = JSON.parse(file);
  const sprint = data.find((c) => c.id === Number(params.id));

  if (sprint) {
    return NextResponse.json(sprint);
  } else {
    return NextResponse.json({ msg: "Sprint não encontrado." }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const sprints: TipoChallengersSprints[] = JSON.parse(file);

  const { rm, nome, nota, materia, sprint } = await request.json();
  const indice = sprints.findIndex((c) => c.id === Number(params.id));

  if (indice !== -1) {
    const sprintAtualizado: TipoChallengersSprints = {
      id: sprints[indice].id,
      rm,
      nome,
      nota,
      materia,
      sprint,
    };
    sprints[indice] = sprintAtualizado;

    const fileUpdate = JSON.stringify(sprints, null, 2);
    await fs.writeFile(process.cwd() + "/src/data/challengersprints.json", fileUpdate);

    return NextResponse.json({ msg: "Sprint atualizado com sucesso." });
  } else {
    return NextResponse.json({ msg: "Sprint não encontrado." }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const sprints: TipoChallengersSprints[] = JSON.parse(file);

  const indice = sprints.findIndex((c) => c.id === Number(params.id));

  if (indice !== -1) {
    sprints.splice(indice, 1);

    const fileUpdate = JSON.stringify(sprints, null, 2); // Formata o JSON
    await fs.writeFile(process.cwd() + "/src/data/challengersprints.json", fileUpdate);

    return NextResponse.json({ msg: "Sprint excluído com sucesso." });
  } else {
    return NextResponse.json({ msg: "Sprint não encontrado." }, { status: 404 });
  }
}
