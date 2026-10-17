import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey: process.env.AI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'Sei un assistente AI esperto.' },
        { role: 'user', content: 'Dimmi in 3 punti perché usare le variabili di ambiente è una buona prassi.' }
      ],
    });

    // Invia la risposta dell'AI direttamente sulla pagina web
    res.status(200).send(response.choices[0].message.content);
    
  } catch (error) {
    res.status(500).send("Errore durante la chiamata: " + error.message);
  }
}