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
	if(el.style.display == "none" || el.style.display == ""){
		el.style.display = "block";
		setTimeout(function(){
			el.style.opacity = (el.style.opacity == 0) ? "1" : "0";
		}, 200);
	}
	else{
		el.style.opacity = (el.style.opacity == 0) ? "1" : "0";
		setTimeout(function(){
			el.style.display = (el.style.display == "block") ? "none" : "block";
		}, 300);
	}
}
