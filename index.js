async function fetchFilms() {
  try {
    const response = await fetch('https://api.npoint.io/0b2aef194151f5771a43/films/');
    const data = await response.json();
    renderFilms(data);
  } catch (error) {
    console.error(error);
  }
}

function renderFilms(data) {
  const div = document.getElementById('card');
  const ul = document.getElementById('films');

  data.forEach((movie) => {
    const li = document.createElement('li');
    li.classList.add('pointer', 'bold-italic-text');
    li.innerHTML = movie.title;

    const filmCard = document.createElement('div');
    filmCard.classList.add('film-card');
    filmCard.innerHTML = `
      <img src="${movie.poster}" height=500px width=300px/>
      <h2 class="bold-text">${movie.title}</h2>
      <p class="bold-text">${movie.description}</p>
      <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
      <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
    `;

    const tickets = document.createElement('p');
    tickets.classList.add('bold-italic-text');
    tickets.innerHTML = `Available tickets: ${movie.capacity - movie.tickets_sold}`;
    filmCard.appendChild(tickets);

    const btn = document.createElement('button');
    btn.textContent = 'Buy ticket';
    btn.addEventListener('click', () => {
      if (parseInt(tickets.innerText.split(': ')[1]) === 0) {
        alert('Ticket Sold Out');
      } else {
        tickets.innerText = `Available tickets: ${parseInt(tickets.innerText.split(': ')[1]) - 1}`;
      }
    });
    filmCard.appendChild(btn);

    li.addEventListener('click', () => {
      div.innerText = '';
      div.appendChild(filmCard);
      if (!filmCard.classList.contains('active')) {
        filmCard.classList.add('active');
        div.appendChild(filmCard);
      }
    });

    ul.appendChild(li);
  });
}

fetchFilms();