import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Skip auth check for now
    const userId = "demo-user";

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined");
      return NextResponse.json(
        {
          message: "API configuration error. Please check server logs.",
        },
        { status: 500 },
      );
    }

    // Get the last user message
    const userMessage = messages[messages.length - 1]?.content;

    if (!userMessage) {
      return new NextResponse("User message is required", { status: 400 });
    }

    try {
      // For text-only input, use the gemini-1.5-flash model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ message: text }, { status: 200 });
    } catch (geminiError) {
      console.error("[GEMINI_API_ERROR]:", geminiError);

      // Fallback to mock response if Gemini API fails
      return NextResponse.json(
        {
          message:
            "I'm sorry, I encountered an issue processing your request. Please try again later.",
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error("[CONVERSATION_ERROR]:", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
