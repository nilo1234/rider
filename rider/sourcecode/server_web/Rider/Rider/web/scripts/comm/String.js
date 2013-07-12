function StringBuffer(){  
    this.string = new Array;  
}  
  
StringBuffer.prototype.append = function(str){  
    this.string .push(str);  
}  
  
StringBuffer.prototype.toString = function(){ 
    return this.string.join("");  
}