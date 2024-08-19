document.getElementById('fetch-button').addEventListener('click', fetchData);

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5050/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; 
  container.innerHTML = '<p>Failed to load data</p>';
  console.log('Failed to load data');
}

function renderLoadingState() {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; 
  container.innerHTML = '<p>Loading...</p>';
  console.log('Loading...');
}

function renderData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; 

  if (data.player1 && data.player2) {
    const divPlayer1 = document.createElement('div');
    divPlayer1.className = 'item player1';
    divPlayer1.innerHTML = `
      <p><strong>${data.player1.name}</strong> chose ${data.player1.choice}</p>
    `;
    
    const divPlayer2 = document.createElement('div');
    divPlayer2.className = 'item player2';
    divPlayer2.innerHTML = `
      <p><strong>${data.player2.name}</strong> chose ${data.player2.choice}</p>
    `;

    const divResult = document.createElement('div');
    divResult.className = 'result';
    divResult.innerHTML = `<p><strong>Result:</strong> ${data.result}</p>`;

    container.appendChild(divPlayer1);
    container.appendChild(divPlayer2);
    container.appendChild(divResult);
  }
}
