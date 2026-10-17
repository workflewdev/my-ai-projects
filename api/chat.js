const { OpenAI } = require('openai');

module.exports = async function handler(req, res) {
  try {
    const openai = new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1', 
      apiKey: process.env.AI_API_KEY,            
    });

    const response = await openai.chat.completions.create({
      model: 'llama-3.1-8b-instant', // Il modello esatto e attivo preso dalla tua lista
      messages: [
        { role: 'system', content: 'Sei un assistente AI esperto.' },
        { role: 'user', content: 'Dimmi in 3 punti perché usare le variabili di ambiente è una buona prassi.' }
      ],
    });

    res.status(200).send(response.choices[0].message.content);
    
  } catch (error) {
    res.status(500).send("Errore catturato dallo script: " + error.message);
  }
};