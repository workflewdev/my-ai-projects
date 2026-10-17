const { OpenAI } = require('openai');

module.exports = async function handler(req, res) {
  try {
    const openai = new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1', // Inserito direttamente, non è un dato sensibile
      apiKey: process.env.AI_API_KEY,            // Solo la chiave rimane protetta in Vercel
    });

    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'Sei un assistente AI esperto.' },
        { role: 'user', content: 'Dimmi in 3 punti perché usare le variabili di ambiente è una buona prassi.' }
      ],
    });

    // Invia la risposta finale
    res.status(200).send(response.choices[0].message.content);
    
  } catch (error) {
    res.status(500).send("Errore catturato dallo script: " + error.message);
  }
};