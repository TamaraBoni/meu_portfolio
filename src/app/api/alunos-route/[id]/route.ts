// src/app/api/alunos-route/[id]/route.ts

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoAlunos } from "@/types/types"; // Assegure-se de que isso está correto

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/alunos.json", "utf-8");
  const data: TipoAlunos[] = JSON.parse(file);

  // Converta o id recebido para número e procure o aluno correspondente
  const aluno = data.find((c) => c.rm === Number(params.id));

  if (!aluno) {
    return NextResponse.json({ message: "Aluno não encontrado." }, { status: 404 });
  }

  return NextResponse.json(aluno);
}
