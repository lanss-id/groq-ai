import Grog from "groq-sdk";

const GROG_API = import.meta.env.VITE_GROG_API;

const grog = new Grog({
  apiKey: GROG_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAi = async (content) => {
  const reply = await grog.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-70b-8192",
  });
  return reply.choices[0].message.content;
};
