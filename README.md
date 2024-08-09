# API-Interacting-With-AI
 This code is written in JavaScript using the Node.js and Express.js framework to create a simple web server. The goal of this code is to create an API that can receive requests from a user interface (or any other client) and send these requests to OpenAI's ChatGPT-4 AI model for a response.

### Code explanation in detail:

1. **Import required libraries:**
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
```

- `express`: A framework for creating a web server in Node.js.
- `bodyParser`: A library for parsing the body content of HTTP requests and converting them into JavaScript objects. It is used to parse JSON data.
- `axios`: A library for making HTTP requests to external services, here it is used to send the request to the OpenAI API.
- `cors`: A library for setting up Cross-Origin Resource Sharing, allowing the web interface to send requests to this server from different domains.
- `path`: A library built into Node.js to handle file and directory paths.

2. **Configure the Express app and web server:**
```javascript
const app = express();
const PORT = 3001;
```

- `app`: Create the Express app.
- `PORT`: Specifies the port number the server will run on (in this case 3001).

3. **Configure Middleware:**
```javascript
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests
```

- `bodyParser.json()`: Use bodyParser to parse requests containing JSON.
- `cors()`: Enable CORS to allow cross-domain requests.

4. **Serving Static Files:**
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

- The server is set up to serve static files (such as HTML, CSS, JavaScript) from the `public` folder.

5. **POST path for handling chat requests:**
```javascript
app.post('/api/chat', async (req, res) => {
const prompt = req.body.prompt;
const apiKey = ''; // Replace with your OpenAI API key
const endpoint = 'https://api.openai.com/v1/chat/completions';
const headers = {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apiKey}`
};
```

- This path is executed when sending a POST request to `/api/chat`.
- `req.body.prompt`: Gets the user input text from the request body.
- `apiKey`: The secret key to access the OpenAI API (must be replaced with your actual private key

- `endpoint`: The API link for the ChatGPT-4 model.

- `headers`: Configure the request headers, including the JSON content and the authorization key to access OpenAI.

6. **Configure the required data and send the request to OpenAI:**
```javascript
const data = {
model: 'gpt-4',
messages: [
{ role: 'system', content: 'You are a helpful assistant.' },
{ role: 'user', content: prompt }
],
max_tokens: 150
};
```

- `model`: Specifies the model used, which is `gpt-4`.

- `messages`: Send messages to the model. The first message identifies the model as a helpful assistant, and the second contains the input sent by the user.

- `max_tokens`: The maximum number of words the model can generate in a response.

7. **Processing the response and sending it to the client:**
```javascript
try {
const response = await axios.post(endpoint, data, { headers });
res.json({ response: response.data.choices[0].message.content.trim() });
} catch (error) {
console.error('Error fetching response from ChatGPT-4:', error.message);
res.status(500).json({ error: 'Sorry, an error occurred while fetching the response.' });
}
});
```

- `try-catch`: Attempt to send the request and process the response.
- If the request succeeds, the response from ChatGPT-4 is sent to the client as JSON.
- If the request fails (such as a network error or API failure), the error is logged in the console and an error message is sent to the client.

8. **Running the Server:**
```javascript
app.listen(PORT, () => {
console.log(`Server is running on [http://localhost:${PORT}`)]http://localhost:${PORT}`);
});
```

- The server is started and listens for requests on the specified port. After running, it prints a message in the console indicating that the server is running and displays the link to access it.

### Basic idea:
This code acts as an intermediary between the user interface and the OpenAI API. It receives conversation requests from users, sends them to OpenAI for a response, and then returns this response to the user. The server is also set up to serve static files and can be used as a full-fledged web server for a simple application.
