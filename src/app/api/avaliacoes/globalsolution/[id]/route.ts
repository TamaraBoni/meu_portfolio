import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobalSolution } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const data: TipoGlobalSolution[] = JSON.parse(file);

  const globalSolutions = data.filter((item) => item.rm === Number(params.id));

  if (!globalSolutions.length) {
    return NextResponse.json({ message: "Nenhuma solução global encontrada." }, { status: 404 });
  }

  return NextResponse.json(globalSolutions);
}
