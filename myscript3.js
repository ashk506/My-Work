//var count=0;
//while(count<=10){
    
   // document.write(count+"<br>");
   // count++
// }

/*function myFunction(x){
    document.getElementById("demo1").innerHTML= "Hi";
    document.getElementById("demo2").innerHTML= "Hello";
    
    
}*/
   function myFunction(){
var menu=["home","Services","about","contact","faq"];
menu[0];
var d= document.createElement("div");
document.body.appendChild(d);
var u= document.createElement("ul");
d.appendChild(u);

var mlen= menu.length;
//alert(mlen);
for(i=0;i<mlen;i++){
    
    var l= document.createElement('li');
    var a=document.createElement('a');
    a.innerHTML= menu[i];
    a.setAttribute('href',menu[i]+".html");
    l.appendChild(a);
    u.appendChild(l);
    
       
}
   }
