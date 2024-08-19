document.getElementById('fetch-button').addEventListener('click', jugar);

async function jugar() {
  renderLoadingState();
  try {
    const playerName = document.getElementById('name').value;
    const playerChoice = document.getElementById('choice').value;
    console.log(playerName, playerChoice);
    const player = {
      name: playerName,
      choice: playerChoice,
      profilePicture: 'https://avatar.iran.liara.run/public/13', // Placeholder image
    };
    const response = await fetch('http://localhost:5050/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(player), // Convert the data to a JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Player data sent successfully', response);
    renderData();
  } catch (error) {
    renderErrorState();
  }
}

function renderData() {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Clear previous data
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = 'Player created';
  container.appendChild(div);
}

function renderErrorState() {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Clear previous data
  container.innerHTML = '<p>Failed to load data</p>';
  console.log('Failed to load data');
}

function renderLoadingState() {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Clear previous data
  container.innerHTML = '<p>Loading...</p>';
  console.log('Loading...');
}
