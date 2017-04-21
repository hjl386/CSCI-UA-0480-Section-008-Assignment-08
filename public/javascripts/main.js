//Main.js

function handleButtonClick(evt){
	evt.preventDefault();
	const req = new XMLHttpRequest();
	req.open('POST', '/api/movies/create');
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	const movieTitle = document.querySelector('#movieTitle').value;
	const movieDirector = document.querySelector('#movieDirector').value;
	const movieYear = document.querySelector('#movieYear').value;
	
	const data = `movieTitle=${movieTitle}&movieDirector=${movieDirector}&movieYear=${movieYear}`;
	//alert(data);
	req.send(data);
}

function getMovies(){
	const req = new XMLHttpRequest();
	req.open('GET', '/api/movies/create');
	req.addEventListener('load', function handleMovies(){
		if(req.status >= 200 && req.status < 400){
			const div = document.querySelector('#movie-list');
			div.innerHTML = '';
			const movies = JSON.parse(req.responseText);
			movies.forEach((m) => {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				tr.appendChild(td).textContent = m.title;
				const td2 = document.createElement('td');
				tr.appendChild(td2).textContent = m.director;
				const td3 = document.createElement('td');
				tr.appendChild(td3).textContent = m.year;
				div.appendChild(tr);
				//div.appendChild(p).textContent = m.title + ' by ' + m.director + ' during ' + m.year;
			});
			setTimeout(getMovies, 2000);
		}	
	});
	req.send();
}

function handleFilterClick(evt){
	evt.preventDefault();
	const req = new XMLHttpRequest();
	req.open('GET', '/api/movies');
	req.addEventListener('load', function handleFilter(){
		if(req.status >= 200 && req.status < 400){
			const div = document.querySelector('#movie-list');
			div.innerHTML = '';
			const movies = JSON.parse(req.responseText);
			movies.forEach((m) => {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				tr.appendChild(td).textContent = m.title;
				const td2 = document.createElement('td');
				tr.appendChild(td2).textContent = m.director;
				const td3 = document.createElement('td');
				tr.appendChild(td3).textContent = m.year;
				div.appendChild(tr);
			});
		/*if(req.status >= 200 && req.status < 400){
			const div = document.querySelector('.highlight');
			div.innerHTML = '';
			const filter = JSON.parse(req.responseText);
			filter.forEach((m) => {
				const p = document.createElement('p');
				div.appendChild(p).textContent = m.title + ' by ' + m.director + ' during ' + m.year;
			});*/
			setTimeout(handleFilterClick, 2000);
		}
	});
	req.send();
}

function main(){
	console.log('loaded');
	//	const filter = document.querySelectorAll('input[type="submit"]')[0];
	const filter = document.getElementById('filterBtn');
	console.log("FILTER", filter);
	filter.addEventListener('click', handleFilterClick);
	const btn = document.querySelectorAll('input[type="submit"]')[1];	
	console.log(btn);
	btn.addEventListener('click', handleButtonClick);
	getMovies();
}

document.addEventListener('DOMContentLoaded', main);
