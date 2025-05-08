import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    // Mock response for demo purposes
    return new NextResponse(JSON.stringify({ url: settingsUrl }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("[STRIPE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
