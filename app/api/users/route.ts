// app/api/users/route.ts
import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try{
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
  }catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios", detail: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try{
  const data = await req.json();
  const user = await prisma.user.create({ data });
  return NextResponse.json(user, { status: 201 });
    }catch (error) {
      return NextResponse.json(
        { error: "Error al crear usuario", detail: error },
        { status: 500 }
      );
    }
}


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar usuario", detail: error },
      { status: 500 }
    );
  }
}