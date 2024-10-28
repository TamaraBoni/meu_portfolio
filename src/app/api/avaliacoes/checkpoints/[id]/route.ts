import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoints } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const data: TipoCheckpoints[] = JSON.parse(file);

  const checkpoints = data.filter((item) => item.rm === Number(params.id));

  if (!checkpoints.length) {
    return NextResponse.json({ message: "Nenhum checkpoint encontrado." }, { status: 404 });
  }

  return NextResponse.json(checkpoints);
}
