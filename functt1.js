/*function sum(){
    
    alert('This is a Sum Function');
}*/

/*function sum(){
    alert('This is a Sum Function');
    var x= sum;
     x();
    }*/
function product(){
    
    var res=0;
    alen=arguments.length;
    for(var i=0;i<alen;i++){
        res += arguments[i]
        
    }
    return res;
}

product()