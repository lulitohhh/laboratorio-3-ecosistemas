const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const db = {
  players: [],
};

app.get('/users', (request, response) => {
  response.send(db);
});

app.post('/user', (request, response) => {
  const { body } = request;

  console.log(body);

  // Find the index of the player by name
  const existe = db.players.findIndex((item) => item.name === body.name);

  if (existe === -1) {
    // Add new player if not exists and there are less than 2 players
    if (db.players.length < 2) {
      db.players.push(body);
      console.log('Player added');
      response.status(201).send(body);
    } else {
      console.log('Cannot add more than 2 players');
      response.status(400).send({ error: 'Cannot add more than 2 players' });
    }
  } else {
    // Update existing player
    db.players[existe] = body;
    console.log('Player updated');
    response.status(200).send(body);
  }
});

app.post('/evaluate', (request, response) => {
  if (db.players.length < 2) {
    return response.status(400).json({ error: 'Not enough players' });
  }

  // Get the last two players
  const [player1, player2] = db.players.slice(-2);

  // Determine the winner
  let result;
  if (player1.choice === player2.choice) {
    result = 'Draw';
  } else if (
    (player1.choice === 'rock' && player2.choice === 'scissors') ||
    (player1.choice === 'scissors' && player2.choice === 'paper') ||
    (player1.choice === 'paper' && player2.choice === 'rock')
  ) {
    result = `${player1.name} wins!`;
  } else {
    result = `${player2.name} wins!`;
  }

  // Clear players after evaluation
  db.players = [];

  response.json({ player1, player2, result });
});

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});
