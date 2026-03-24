import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await getDb();
  const votes = await db
    .collection("votes")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(votes);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });

  const { content } = await request.json();

  if (!content)
    return NextResponse.json({ error: "Aucun vote" }, { status: 400 });

  const db = await getDb();
  const vote = {
    content: content,
    createdAt: new Date(),
    userId: session.user.id,
    userName: session.user.name,
  };
  await db.collection("votes").insertOne(vote);
  return NextResponse.json(vote, { status: 201 });
}
