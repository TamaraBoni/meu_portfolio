import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoints } from "@/types/types";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const data: TipoCheckpoints[] = JSON.parse(file);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const file = await fs.readFile(process.cwd() + "/src/data/checkpoints.json", "utf-8");
  const checkpoints: TipoCheckpoints[] = JSON.parse(file);

  const newCheckpoint: TipoCheckpoints = await request.json();

  const novoId = checkpoints.length > 0 ? Math.max(...checkpoints.map((checkpoint) => checkpoint.id)) + 1 : 1;
  newCheckpoint.id = novoId;

  checkpoints.push(newCheckpoint);

  const fileUpdate = JSON.stringify(checkpoints, null, 2);
  await fs.writeFile(process.cwd() + "/src/data/checkpoints.json", fileUpdate);

  return NextResponse.json(newCheckpoint, { status: 201 });
}
