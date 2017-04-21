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
//	const data = document.getElementById('director').value;
//	alert(data);
	req.open('GET', '/api/movies');
	req.addEventListener('load', function handleFilter(){
//		console.log(req,status);
		if(req.status >= 200 && req.status < 400){
//			const div = document.querySelector('#movie-list');
			const div = document.getElementById('movie-list');
			div.innerHTML = '';
			const movies = JSON.parse(req.responseText);
//			alert(req.responseText);
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
//		setTimeout(handleFilter, 2000);
//	  	setTimeout(handleFilterClick, 2000);
		}
	});
//	alert(req.query.director);
	req.send();
}

function main(){
	const btn = document.querySelectorAll('input[type="submit"]')[1];	
	btn.addEventListener('click', handleButtonClick);
	getMovies();
//	const filter = document.querySelectorAll('input[type="submit"]')[0];
	const filter = document.getElementById('filterBtn');
	filter.addEventListener('click', handleFilterClick);
}

document.addEventListener('DOMContentLoaded', main);
