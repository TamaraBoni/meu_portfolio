import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoints } from "@/types/types";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const data = JSON.parse(file);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const checkpoint: TipoCheckpoints = await request.json();
  const novoId = checkpoints[checkpoints.length - 1]?.rm + 1 || 1;
  checkpoint.rm = novoId;

  checkpoints.push(checkpoint);

  const fileUpdate = JSON.stringify(checkpoints);
  await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", fileUpdate);

  return NextResponse.json(checkpoint, { status: 201 });
}
