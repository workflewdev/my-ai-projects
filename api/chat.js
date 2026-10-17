const { OpenAI } = require('openai');

module.exports = async function handler(req, res) {
  try {
    // Spostato DENTRO la funzione. Se c'è un errore con la chiave, lo vedremo!
    const openai = new OpenAI({
      baseURL: process.env.AI_BASE_URL,
      apiKey: process.env.AI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'Sei un assistente AI esperto.' },
        { role: 'user', content: 'Dimmi in 3 punti perché usare le variabili di ambiente è una buona prassi.' }
      ],
    });

    // Invia la risposta corretta
    res.status(200).send(response.choices[0].message.content);
    
  } catch (error) {
    // Se c'è un errore, ORA lo stampa sulla pagina web invece di bloccarsi in silenzio
    res.status(500).send("Errore catturato dallo script: " + error.message);
  }
};