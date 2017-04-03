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

function triggerChange(element){
	if ("createEvent" in document) {
	    var evt = document.createEvent("HTMLEvents");
	    evt.initEvent("change", false, true);
	    element.dispatchEvent(evt);
	}
	else{
	    element.fireEvent("onchange");
	}
}

function useProduct(product_el){
	var product_id = product_el.dataset.productId;
	var product_title = productData[product_id].title;
	var featured_image = productData[product_id].featured_image;

	active_product_id = product_id;
	active_product_title = product_title;
	active_featured_image = featured_image;

	document.getElementById('progress-1').style.display = 'none';
	document.getElementById('complete-1').style.display = 'inline-block';
	document.getElementById('select-prod').innerHTML = 'Change Product';

	displayProductVariants(product_id);
	overlay('overlay', function(){
		overlayShow('variant-select', function(){
			overlayHide('subscription-details', function(){
				document.getElementById('select-variant').style.display = 'block';
			});
		});
	});
}

function fetchSubscriptionDetails(){

	document.getElementById('progress-2').style.display = 'none';
	document.getElementById('complete-2').style.display = 'inline-block';
	document.getElementById('select-variant').style.display = 'none';

	overlay('subscription-details');

}

function displayProductVariants(product_id){

	var variant_select_el = document.getElementById('variant-id');
	variant_select_el.innerHTML = '';
	var keys = Object.keys(productData[product_id].variants);
	for(var i=0;i<keys.length;i++){

		var option = document.createElement('option');
		option.value= keys[i];
		option.innerHTML = productData[product_id].variants[keys[i]].title;
		variant_select_el.appendChild(option);

	}

	active_variant_title = productData[product_id].variants[keys[0]].title;
	active_variant_id = keys[0];
	active_group_id = productData[product_id].variants[keys[0]].group_id;

	document.getElementById('product-image-display').src = active_featured_image;
	document.getElementById('product-title-display').innerHTML = active_product_title;
	document.getElementById('variant-title-display').innerHTML = active_variant_title;

}

function displayProductCards(page){

	document.querySelector('.product-cards').innerHTML = "";
	var keys = Object.keys(productData);
	for(var i=(page-1)*15;i<keys.length && i<((page-1)*15)+15;i++){

		var product_id = keys[i];
		var product_title = productData[product_id].title;
		var featured_image = productData[product_id].featured_image;
		var product_card_el = document.querySelector('.product-cards');
		var new_card_html = document.getElementById('product-card-template').innerHTML;
		new_card_html = new_card_html.replace('{{product_id}}', product_id);
		new_card_html = new_card_html.replace('{{product_title}}', product_title);
		new_card_html = new_card_html.replace('{{featured_image}}', featured_image);

		var new_element = document.createElement('div');
		new_element.innerHTML = new_card_html;
		new_element.dataset.productId = product_id;

		product_card_el.appendChild(new_element);
	}

}

function getProductDataFromPage(callback){
	httpGetAsync("https://" + myshopify_domain + "/pages/ro-get-products", function(response){
		productData = JSON.parse(response);
		callback(productData);
	});
}

function overlayShow(elementClass, callback){
	el = document.getElementsByClassName(elementClass)[0];
	if(isHidden(el)){
		el.style.display = "block";
		setTimeout(function(){
			el.style.opacity = "1";
		}, 200);
	}
	setTimeout(function(){
		if(typeof(callback) == 'function'){
			callback();
		}
	}, 400);
}

function overlayHide(elementClass, callback){
	el = document.getElementsByClassName(elementClass)[0];

	el.style.opacity = "0";
	setTimeout(function(){
		el.style.display = "none";
	}, 300);

	setTimeout(function(){
		if(typeof(callback) == 'function'){
			callback();
		}
	}, 400);
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