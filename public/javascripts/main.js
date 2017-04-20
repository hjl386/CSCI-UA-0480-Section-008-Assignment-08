//Main.js

function handleButtonClick(evt){
	evt.preventDefault();
	const req = new XMLHttpRequest();
	req.open('POST', '/api/movies');
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	const title = document.querySelector('#movieTitle').value;
	const director = document.querySelector('#movieDirector').value;
	const year = document.querySelector('#movieYear').value;
	
	const data = `movieTitle=${title}&movieDirector=${director}&movieYear=${year}`;
	req.send(data);
}

function getMovies(){
	const req = new XMLHttpRequest();
	req.open('GET', '/api/movies');
	req.addEventListener('load', function handleMovies(){
		if(req.status >= 200 && req.status < 400){
			const div = document.querySelector('#movieList');
			div.innerHTML = '';
			const movies = JSON.parse(req.responseText);
			movies.forEach((m) => {
				const p = document.createElement('p');
				div.appendChild(p).textContent = m.title + ' by ' + m.director + ' during ' + m.year;
			});
		setTimeout(getMovies, 2000);
		}	
	});
	req.send();
}

function main(){
	console.log('loaded');
	const btn = document.querySelectorAll('input[type="submit"]')[1];	
	console.log(btn);
	btn.addEventListener('click', handleButtonClick);
	getMovies();
}

document.addEventListener('DOMContentLoaded', main);
