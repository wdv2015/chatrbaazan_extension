const app = document.getElementById("changeColor");

const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(container);

var request = new XMLHttpRequest();
request.open("GET", "https://ghibliapi.herokuapp.com/films", true);
request.onload = function() {
	var data = JSON.parse(this.response);
	data.forEach(movie => {
		const eachOff = document.createElement("div");
		eachOff.setAttribute("class", "card");

		const offCode = document.createElement("p");
		offCode.setAttribute("class", "offCode");
		offCode.textContent = movie.title;

		container.appendChild(eachOff);
		eachOff.appendChild(offCode);
	});
};
request.send();
