$(document).ready(function(){

	if($('body').hasClass('details')){
		getPhoneDetails(location.search.split('?')[1]);
		$('body').on('mouseenter','.galleryImg',function(){

			var imgSrc=$(this).children().attr("src");
			$('.heroImg img').attr('src',imgSrc);

		});
	}else{
		getAllPhones();
		$("body").on("click",".age-filter",function(){
			$(".age-filter,.price-filter").prop("checked", false);
			$(this).prop("checked", true);
			var filter=$(this).attr('id');
			 if(filter=="recent"){
		    	$('.mobile-zone').find('.phone').sort(function (a, b) {
				    return +b.dataset.age - +a.dataset.age;
				})
				.appendTo( $('.mobile-zone') );
		    }else{
		    	$('.mobile-zone').find('.phone').sort(function (a, b) {
		    		return +a.dataset.age - +b.dataset.age;
				})
				.appendTo( $('.mobile-zone') );
		    }
		});
		$("body").on("click",".price-filter",function(){
			$(".price-filter,.age-filter").prop("checked", false);
			$(this).prop("checked", true);
			var filter=$(this).attr('id');
			 if(filter=="l2h"){
		    	$('.mobile-zone').find('.phone').sort(function (a, b) {
				    return +a.dataset.price - +b.dataset.price;
				})
				.appendTo( $('.mobile-zone') );
		    }else{
		    	$('.mobile-zone').find('.phone').sort(function (a, b) {
				    return +b.dataset.price - +a.dataset.price;
				})
				.appendTo( $('.mobile-zone') );
		    }
		});
		$("body").on("click",".sub-filter",function(){
			$(".sub-filter").prop("checked", false);
			$(this).prop("checked", true);
			var brand=$(this).attr('id');
			$('.phone').each(function(i,phone){
				if($(this).attr('data-brand')==brand){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		});
		
	}
});
function getAllPhones(){
	$.ajax({
		type : "GET",
		url : "./phones/phones.json",
		datatype:"json",
		success : function(data){

			var content="";brands=[];
			$.each(data,function(i,phone){
				
				brands.push(phone.brand);
				content+="<a class='phone' data-brand='"+phone.brand+"' data-index='"+i+"' data-price='"+phone.price+"' data-age='"+phone.age+"' target='_blank' href='./details.html?"+phone.id+"'><div class='pImg'><img src='"+phone.imageUrl+"' width='150px' height='150px'></div><div class='pName'>"+phone.name+"</br>Age: "+phone.age+"</br>Price: "+phone.price+"</br>Brand: "+phone.brand+"</div></a>";
			});
			$('.mobile-zone').html(content);
			var uniqueNames = [];
			$.each(brands, function(i, el){
			    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			temp='';
			$.each(uniqueNames,function(i,brand){
				temp+='<p><input type="checkbox" name="'+uniqueNames[i]+'" id="'+uniqueNames[i]+'" class="sub-filter"><label for="'+uniqueNames[i]+'">'+uniqueNames[i]+'</label></p>';
			});
			$('.brands').html(temp);
			$('#recent').click();
		},
		error:function(err){
			alert('Internal server error');
		}
	});
}
function getPhoneDetails(phone){
	$.ajax({
		type : "GET",
		url : "./phones/"+phone+".json",
		success : function(data){
			var phoneInfo=data,content="";
			
			content+="<div class='img-zone'><div class='heroImg'><img src='./"+phoneInfo.images[0]+"' width='350px'></div><div class='moreImgs'>";
			$.each(phoneInfo.images,function(i,image){
				content+="<div class='galleryImg'><img src='./"+phoneInfo.images[i]+"'  width='50px' height='50px'></div>";
			});
			content+='</div></div>';
			
			content+='<div class="details-zone">';
			content+='<h1>'+phoneInfo.name+'</h1>';
			
			content+='<div class="param"><div class="param-head">Description</div><div>'+phoneInfo.description+'</div></div>';
			
			content+='<div class="param"><div class="param-head">Additional Features</div><div>'+phoneInfo.additionalFeatures+'</div></div>';
			
			content+='<div class="param"><div class="param-head">Android</div>';
			$.each(phoneInfo.android,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Availability</div>';
			$.each(phoneInfo.availability,function(index,aval){
				content+='<div>'+phoneInfo.availability[index]+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Battery</div>';
			$.each(phoneInfo.battery,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Camera</div>';
			$.each(phoneInfo.camera.features,function(i,feature){
				content+='<div>'+phoneInfo.camera.features[i]+'</div>';
			});
			content+='<div>Primary: '+phoneInfo.camera.primary+'</div></div>';
			
			content+='<div class="param"><div class="param-head">connectivity</div>';
			$.each(phoneInfo.connectivity,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Display</div>';
			$.each(phoneInfo.display,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Hardware</div>';
			$.each(phoneInfo.hardware,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Size and Weight</div>';
			$.each(phoneInfo.sizeAndWeight,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='<div class="param"><div class="param-head">Storage</div>';
			$.each(phoneInfo.storage,function(i,spec){
				content+='<div>'+i+': '+spec+'</div>';
			});
			content+='</div>';
			
			content+='</div>';	
			$('.body').html(content);
		},
		error:function(err){
			alert('Internal server error');
		}
	});
}
function resetPhones(){
	$('.mobile-zone').find('.phone').sort(function (a, b) {
	    return +b.dataset.index - +a.dataset.index;
	})
	.appendTo( $('.mobile-zone') );
}
