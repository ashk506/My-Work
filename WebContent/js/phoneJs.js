document.addEventListener('DOMContentLoaded', function(){ 
	var detailsPage=hasClass(document.getElementsByClassName('body')[0],'details');
	if(detailsPage){
		getPhoneDetails(location.search.split('?')[1]);
		
		document.addEventListener('mouseover', function (e) {
		    if ((e.target.className =='galleryImg')) {
		    	var list, src='';
		    	list = e.target.getElementsByTagName('img');
		    	if (list.length > 0) {
		    	    src = list[0].src;
		    	}
		    	document.getElementsByTagName('img')[0].src=src;
		    }
		}, false);

	}else{
		getAllPhones();
		var ageFilter = document.getElementsByClassName('age-filter');
		for(var x=0; x<ageFilter.length; x++){
			ageFilter[x].addEventListener('click', age,false);
		}
		var priceFilter = document.getElementsByClassName('price-filter');
		for(var x=0; x<priceFilter.length; x++){
			priceFilter[x].addEventListener('click', price,false);
		}
		var brandFilter = document.getElementsByClassName('sub-filter');
		for(var x=0; x<brandFilter.length; x++){
			brandFilter[x].addEventListener('click', brand,false);
		}
		document.addEventListener('click', function (e) {
		    if (hasClass(e.target, 'sub-filter')) {
		        brand(e.target);
		    }
		}, false);
		
	}
}, false);
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
function age(e){
	var age=document.getElementsByClassName('age-filter');
	for(var x=0;x<age.length;x++){
		age[x].checked=false;
	}
	var price=document.getElementsByClassName('price-filter');
	for(var x=0;x<price.length;x++){
		price[x].checked=false;
	}
	this.checked=true;
	var filter=this.getAttribute('id');
	 if(filter=="recent"){
		 var dom = document.querySelector(".mobile-zone"),phones = dom.querySelectorAll(".phone"),allPhones = Array.prototype.slice.call( phones );
    	 allPhones.sort(function(a, b) {
    		 return +b.dataset.age - +a.dataset.age;
    	 }).forEach(function(phone) {
    	     dom.appendChild(phone);
    	 });
   }else{
	   var dom = document.querySelector(".mobile-zone"),phones = dom.querySelectorAll(".phone"),allPhones = Array.prototype.slice.call( phones );
  	 allPhones.sort(function(a, b) {
  		 return +a.dataset.age - +b.dataset.age;
  	 }).forEach(function(phone) {
  	     dom.appendChild(phone);
  	 });
   }
	
}
function price(e){
	var age=document.getElementsByClassName('age-filter');
	for(var x=0;x<age.length;x++){
		age[x].checked=false;
	}
	var price=document.getElementsByClassName('price-filter');
	for(var x=0;x<price.length;x++){
		price[x].checked=false;
	}
	this.checked=true;
	var filter=this.getAttribute('id');
	 if(filter=="l2h"){
		 var dom = document.querySelector(".mobile-zone"),phones = dom.querySelectorAll(".phone"),allPhones = Array.prototype.slice.call( phones );
    	 allPhones.sort(function(a, b) {
    		 return +a.dataset.price - +b.dataset.price;
    	 }).forEach(function(phone) {
    	     dom.appendChild(phone);
    	 });
   }else{
	   var dom = document.querySelector(".mobile-zone"),phones = dom.querySelectorAll(".phone"),allPhones = Array.prototype.slice.call( phones );
  	 allPhones.sort(function(a, b) {
  		 return +b.dataset.price - +a.dataset.price;
  	 }).forEach(function(phone) {
  	     dom.appendChild(phone);
  	 });
   }
	
}
function brand(e){
	var element=e;
	var brands=document.getElementsByClassName('sub-filter'),phones=document.getElementsByClassName('phone');
	for(var x=0;x<brands.length;x++){
		brands[x].checked=false;
	}
	element.checked=true;
	var brand=element.getAttribute('id');
	for(var x=0; x<phones.length; x++){
		console.log(phones[x].dataset.brand);
		if(phones[x].getAttribute('data-brand')==brand){
			phones[x].style.display  = 'block';
		}else{
			phones[x].style.display  = 'none';
		}
	}
	
}
function hasClass(element,cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function resetPhones(){
	 var dom = document.querySelector(".mobile-zone"),phones = dom.querySelectorAll(".phone"),allPhones = Array.prototype.slice.call( phones );
	 allPhones.sort(function(a, b) {
		 return +a.dataset.index - +b.dataset.index;
	 }).forEach(function(phone) {
	     dom.appendChild(phone);
	 });
}
function getAllPhones(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	var data = xhttp.responseText,phones = JSON.parse(data),content="",brands=[],uniqueNames = [];
    	phones.forEach( function( phone, i ){
    		brands.push(phone.brand);
    		content+="<a class='phone' data-index='"+i+"' data-brand='"+phone.brand+"' data-price='"+phone.price+"' data-age='"+phone.age+"' target='_blank' href='./details2.html?"+phone.id+"'><div class='pImg'><img src='"+phone.imageUrl+"' width='150px' height='150px'></div><div class='pName'>"+phone.name+"</br>Age: "+phone.age+"</br>Price: "+phone.price+"</br>Brand: "+phone.brand+"</div></a>";
		});
    	document.getElementsByClassName('mobile-zone')[0].innerHTML=content;
    	uniqueNames =brands.filter(function(item, pos) {
    	    return brands.indexOf(item) == pos;
    	});
		temp='';
		uniqueNames.forEach( function(i,brand){
			temp+='<p><input type="checkbox" name="'+i+'" id="'+i+'" class="sub-filter"><label for="'+i+'">'+i+'</label></p>';
		});
		document.getElementsByClassName('brands')[0].innerHTML=temp;
    	document.getElementById('recent').click();
    }
	};
	xhttp.open("GET", "./phones/phones.json", true);
	xhttp.send();
}
function getPhoneDetails(phone){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	var data = xhttp.responseText,phoneInfo = JSON.parse(data),content="";
    	content+="<div class='img-zone'><div class='heroImg'><img src='./"+phoneInfo.images[0]+"' width='350px'></div><div class='moreImgs'>";
		phoneInfo.images.forEach( function( spec, i ){
			content+="<div class='galleryImg'><img src='./"+phoneInfo.images[i]+"'  width='50px' height='50px'></div>";
		});
		content+='</div></div>';
		
		content+='<div class="details-zone">';
		content+='<h1>'+phoneInfo.name+'</h1>';
		
		content+='<div class="param"><div class="param-head">Description</div><div>'+phoneInfo.description+'</div></div>';
		
		content+='<div class="param"><div class="param-head">Additional Features</div><div>'+phoneInfo.additionalFeatures+'</div></div>';
		
		content+='<div class="param"><div class="param-head">Android</div>';
		for (var prop in phoneInfo.android) {
			content+='<div>'+prop+': '+phoneInfo.android[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Availability</div>';
		phoneInfo.availability.forEach( function( number, i ){
			content+='<div>'+phoneInfo.availability[i]+'</div>';
		});
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Battery</div>';
		for (var prop in phoneInfo.battery) {
			content+='<div>'+prop+': '+phoneInfo.battery[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Camera</div>';
		phoneInfo.camera.features.forEach(function(value,i){
			content+='<div>'+phoneInfo.camera.features[i]+'</div>';
		});
		content+='<div>Primary: '+phoneInfo.camera.primary+'</div></div>';
		
		content+='<div class="param"><div class="param-head">Connectivity</div>';
		for (var prop in phoneInfo.connectivity) {
			content+='<div>'+prop+': '+phoneInfo.connectivity[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Display</div>';
		for (var prop in phoneInfo.display) {
			content+='<div>'+prop+': '+phoneInfo.display[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Hardware</div>';
		for (var prop in phoneInfo.hardware) {
			content+='<div>'+prop+': '+phoneInfo.hardware[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Size and Weight</div>';
		for (var prop in phoneInfo.sizeAndWeight) {
			content+='<div>'+prop+': '+phoneInfo.sizeAndWeight[prop]+'</div>';
		}
		content+='</div>';
		
		content+='<div class="param"><div class="param-head">Storage</div>';
		for (var prop in phoneInfo.storage) {
			content+='<div>'+prop+': '+phoneInfo.storage[prop]+'</div>';
		}
		content+='</div>';
		document.getElementsByClassName('body')[0].innerHTML=content;
    }
	};
	xhttp.open("GET", "./phones/"+phone+".json", true);
	xhttp.send();
}