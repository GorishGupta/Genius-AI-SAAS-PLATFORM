import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Mock webhook handler for demo purposes
  return new NextResponse(null, { status: 200 });
}
