import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallengersSprints } from "@/types/types";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const data: TipoChallengersSprints[] = JSON.parse(file);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const file = await fs.readFile(process.cwd() + "/src/data/challengersprints.json", "utf-8");
  const challengers: TipoChallengersSprints[] = JSON.parse(file);

  const novoChallenger: TipoChallengersSprints = await request.json();
  const novoRm = challengers[challengers.length - 1]?.rm + 1 || 1;
  novoChallenger.rm = novoRm;

  challengers.push(novoChallenger);

  const fileUpdate = JSON.stringify(challengers);
  await fs.writeFile(process.cwd() + "/src/data/challengersprints.json", fileUpdate);

  return NextResponse.json(novoChallenger, { status: 201 });
}
