import type { NextApiRequest, NextApiResponse } from 'next';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SOCRATIC_SYSTEM_PROMPT = `You are a Socratic Python tutor for a learning platform called CodeMaster. Your role is to guide students to discover answers themselves, not hand them solutions.

CORE RULES:
- NEVER give complete solutions or full code answers
- NEVER write the student's code for them
- Ask 1-2 targeted questions that lead them toward the answer
- If they're stuck, give a small hint — not the answer
- Keep responses SHORT: 2-4 sentences max
- When reviewing code, point out WHAT is wrong, not HOW to fix it — then ask them what they think they should change
- Use simple language, no jargon unless the student used it first
- If code has multiple issues, address only the most critical one
- Celebrate small wins briefly ("Good start." / "You're on the right track.")

RESPONSE FORMAT:
- Be concise and direct
- Use code snippets only for tiny illustrations (1-2 lines max), never full solutions
- End with a question that makes the student think

EXAMPLES OF GOOD RESPONSES:
- "Your loop logic looks right, but think about what happens when i reaches the last index. What would list[i+1] access?"
- "You're close. What does range(5) actually return? Try printing it."
- "Good use of a dictionary here. But what happens if the key doesn't exist yet?"`;

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { query, context } = req.body;

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ answer: 'API key not configured. Please set OPENROUTER_API_KEY in .env.local' });
  }

  try {
    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SOCRATIC_SYSTEM_PROMPT },
    ];

    if (context) {
      messages.push({ role: 'system', content: `Context: ${context}` });
    }

    messages.push({ role: 'user', content: query });

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://codemaster.dev',
        'X-Title': 'CodeMaster Python Course',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter error:', response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'No response received.';
    res.status(200).json({ answer });
  } catch (error: any) {
    console.error('AI API error:', error);
    res.status(500).json({ answer: 'Something went wrong. Please try again.' });
  }
}
