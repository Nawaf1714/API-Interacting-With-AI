const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;
    const apiKey = ''; // Replace with your OpenAI API key
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 150
    };

    try {
        const response = await axios.post(endpoint, data, { headers });
        res.json({ response: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error fetching response from ChatGPT-4:', error.message);
        res.status(500).json({ error: 'Sorry, an error occurred while fetching the response.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
