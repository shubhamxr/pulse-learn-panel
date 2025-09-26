export async function fetchTasksFromGemini() {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Generate 5 personalized study or health tasks for a student with title, type, duration, priority.",
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // Gemini response text parse karo
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    // Assume Gemini se JSON format mangwa rahe ho
    return JSON.parse(text);
  } catch {
    console.error("Gemini returned invalid JSON", text);
    return [];
  }
}
