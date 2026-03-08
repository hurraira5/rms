import { db } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Database se Received orders fetch karein
    const orders = await db.order.findMany({
      where: {
        status: "Received", //
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}