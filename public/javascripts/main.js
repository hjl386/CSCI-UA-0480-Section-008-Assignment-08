//Main.js

function getMovies(){
	const req = new XMLHttpRequest();
	const url = 'http://localhost:3000/api/movies/create';
	req.open('GET', url, true);	
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
			});
		}	
	});
	req.addEventListener('error', function(){
		console.log("ERROR");
	});
	req.send();
}

function add(evt){
	evt.preventDefault();
	const req = new XMLHttpRequest();
	const url = 'http://localhost:3000/api/movies/create';
	req.open('POST', url, true);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	const movieTitle = document.querySelector('#movieTitle').value;
	const movieDirector = document.querySelector('#movieDirector').value;
	const movieYear = document.querySelector('#movieYear').value;
	const data = `movieTitle=${movieTitle}&movieDirector=${movieDirector}&movieYear=${movieYear}`;
	req.send(data);
	req.addEventListener('load', function(){
		getMovies();
	});	
}

function filter(evt){
	evt.preventDefault();
	const req = new XMLHttpRequest();
	let url = 'http://localhost:3000/api/movies';
	const director = document.getElementById('director').value;
	console.log(director+"FILTERMOVIES");
	console.log(director.length, "LENGTH");
	if(director.length > 0){
		console.log(url, "URL");
		url += '?director=' + director;
	}
	console.log(url, "AFTER");
	req.open('GET', url, true);
	req.addEventListener('load', function handleFilter(){
		if(req.status >= 200 && req.status < 400){
			console.log("RESPONSE TEXT ", req.responseText);
			const data = JSON.parse(req.responseText);
		//	const movieList = document.querySelector('#movie-List');
			const movieList = document.getElementById('movie-list');
			movieList.innerHTML = '';
			data.forEach((m) => {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				tr.appendChild(td).textContent = m.title;
				const td2 = document.createElement('td');
				tr.appendChild(td2).textContent = m.director;	
				const td3 = document.createElement('td');
				tr.appendChild(td3).textContent = m.year;
				movieList.appendChild(tr);
			});
		}
	});	
	req.send();
}

function main(){
	const filterBtn = document.querySelectorAll('input[type="submit"]')[0];
	filterBtn.addEventListener('click', filter);
	const addBtn = document.querySelectorAll('input[type="submit"]')[1];
	addBtn.addEventListener('click', add);
}

document.addEventListener('DOMContentLoaded', main);
