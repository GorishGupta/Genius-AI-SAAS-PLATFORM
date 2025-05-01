'use client';
import { useState } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImage('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Text to Image with Stability AI</h1>
      <input
        type="text"
        placeholder="Enter your image prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {image && (
        <img
          src={`data:image/png;base64,${image}`}
          alt="Generated"
          className="mt-6 rounded shadow-lg"
        />
      )}
    </div>
  );
}