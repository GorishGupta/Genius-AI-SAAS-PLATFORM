export const generateImage = async (prompt: string) => {
    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Image generation failed");
    }
  
    const data = await response.json();
    return data.artifacts?.[0]?.base64;
  };