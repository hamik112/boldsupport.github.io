document.querySelector(".overlay__inner").addEventListener("click", function(event){
	event.stopPropagation();
});

document.querySelector(".overlay").addEventListener("click", function(event){
	overlay("overlay");
});

document.querySelector(".btn-go-shopify").addEventListener("click", function(event){
	var domain = extractDomain(document.getElementById('myshopify').value);
	if(domain.indexOf('.myshopify.com') !== -1){
		myshopify_domain = domain;
		overlay('who-are-you', function(){
			overlay('loading');
			getProductDataFromPage(function(productData){
				overlay('loading', function(){
					displayProductCards(1, productData);
					overlay('product-cards-info');
					overlay('product-cards');
				});
			});
		});
	}
	else{
		alert("Please enter a valid myshopify domain found in the URL of your Shopify admin.");
	}
});

document.querySelector('#variant-id').addEventListener('change', function(){

	active_variant_id = this.value;
	active_variant_title = this.options[this.selectedIndex].innerHTML;
	document.getElementById('variant-title-display').innerHTML = active_variant_title;
	overlayHide('subscription-details', function(){
		document.getElementById('select-variant').style.display = 'block';
	});

});