import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallengersSprints } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const data: TipoChallengersSprints[] = JSON.parse(file);

  const sprints = data.filter((item) => item.rm === Number(params.id));

  if (!sprints.length) {
    return NextResponse.json({ message: "Nenhuma sprint encontrada." }, { status: 404 });
  }

  return NextResponse.json(sprints);
}
