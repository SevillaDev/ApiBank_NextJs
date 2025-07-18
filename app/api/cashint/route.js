import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const { account_number, amount } = await req.json();

    if (!account_number || typeof amount !== "number") {
      return NextResponse.json(
        { error: "account_number y amount (float) son requeridos" },
        { status: 400 }
      );
    }

    const account = await prisma.account.findUnique({
      where: { account_number },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Cuenta no encontrada" },
        { status: 404 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "El deposito debe ser mayor a 0" },
        { status: 400 }
      );
    }

    const updatedAccount = await prisma.account.update({
      where: { account_number },
      data: {
        amount: account.amount + amount,
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error("❌ Error al procesar deposito:", error);
    return NextResponse.json(
      { error: "Error interno", detail: String(error) },
      { status: 500 }
    );
  }
}
