function handleProductData(data){
	productData = JSON.parse(data);
}

function getProductData(myshopify_url, page){
	httpGetAsync("https://" + myshopify_url + "/collections/all-products/products.json?page=" + page, handleProductData);
}

function httpGetAsync(url, callback)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.send(null);
}

function overlay() {
	el = document.getElementsByClassName("overlay")[0];
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

document.attachEvent("onreadystatechange", function(){
	if (document.readyState === "complete"){

		document.querySelector(".overlay__inner")[0].addEventListener("click", function(event){
			event.stopPropagation();
		});

		document.querySelector(".overlay")[0].addEventListener("click", function(event){
			overlay();
		});

	}
});