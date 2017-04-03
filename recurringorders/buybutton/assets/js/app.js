function handleProductData(data){
	console.log(JSON.parse(data));
	productData = JSON.parse(data);
}

function getProductData(myshopify_url, page){
	httpGetAsync("https://" + myshopify_url + "/collections/all-products/products.json?page=" + page, handleProductData);
}

function httpGetAsync(url, callback=function(){})
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}

function displayProductCards(page){

	document.querySelector('.product-cards').innerHTML = "";
	var keys = Object.keys(productData);
	for(var i=(page-1)*15;i<keys.length && i<((page-1)*15)+15;i++){
		var product_id = keys[i];
		var product_title = productData[product_id].title;
		var featured_image = productData[product_id].featured_image;
		document.querySelector('.product-cards').innerHTML += 
		document.getElementById('product-card-template').innerHTML
		.replace('{{product_title}}', product_title)
		.replace('{{featured_image}}', featured_image);
	}

}

function getProductDataFromPage(callback){
	httpGetAsync("https://" + myshopify_domain + "/pages/get-products", function(response){
		productData = JSON.parse(response);
		callback(productData);
	});
}

function overlay(elementClass, callback) {
	el = document.getElementsByClassName(elementClass)[0];
	if(isHidden(el)){
		el.style.display = "block";
		setTimeout(function(){
			el.style.opacity = "1";
		}, 200);
	}
	else{
		el.style.opacity = "0";
		setTimeout(function(){
			el.style.display = "none";
		}, 300);
	}
	setTimeout(function(){
		if(typeof(callback) == 'function'){
			callback();
		}
	}, 400);
}

function isHidden(el) {
    return (el.offsetParent === null);
}

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}