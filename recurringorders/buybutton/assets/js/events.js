document.querySelector(".overlay__inner").addEventListener("click", function(event){
	event.stopPropagation();
});

document.querySelector(".overlay").addEventListener("click", function(event){
	overlay();
});