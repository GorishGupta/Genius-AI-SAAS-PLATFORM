import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // Skip auth check for now
    const userId = "demo-user";

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required.", { status: 400 });
    }

    // Get the last message from the user
    const lastMessage = messages[messages.length - 1];

    // If API key is not set, return a fallback response
    if (!process.env.GOOGLE_API_KEY) {
      const fallbackResponse = `\`\`\`jsx
// Simple toggle button using React hooks
import { useState } from 'react';

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);
  
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  
  return (
    <button 
      onClick={handleToggle}
      style={{
        backgroundColor: isToggled ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      {isToggled ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;
\`\`\``;

      return NextResponse.json(
        { role: "assistant", content: fallbackResponse },
        { status: 200 },
      );
    }

    try {
      // Use Gemini model for code generation
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare the prompt for code generation
      const prompt = `Generate code for: ${lastMessage.content}\n\nProvide only the code with proper comments. Return the code in a markdown code block with the appropriate language tag.`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json(
        { role: "assistant", content: text },
        { status: 200 },
      );
    } catch (aiError) {
      console.error("[GEMINI_API_ERROR]: ", aiError);

      // Fallback response in case of API error
      const fallbackResponse = `\`\`\`jsx
// Simple toggle button using React hooks
import { useState } from 'react';

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);
  
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  
  return (
    <button 
      onClick={handleToggle}
      style={{
        backgroundColor: isToggled ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      {isToggled ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;
\`\`\``;

      return NextResponse.json(
        { role: "assistant", content: fallbackResponse },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error("[CODE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
