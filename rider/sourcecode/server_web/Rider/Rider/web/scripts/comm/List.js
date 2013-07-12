
// 不是正宗的List  有以下特定：不重复，按顺序。

  var List = function(){
	  this.list = new Array();
	  }
  
    List.prototype.getIndex = function(index){
    if(this.list.length==0)
      return 1;
	 return this.list[index];
  }   
  List.prototype.add = function(obj){
	  //判断是否存在，如果存在,替换掉
	   var index = -1;
    for(var i=0;i<this.list.length;i++){
		  if(this.list[i]==obj){
			    index=i;
				break;
			  }
	    }
      if(index==-1){//不存在
    	  this.list.push(obj);
      }else{
    	  this.list.splice(index,1);	//移除，再添加
    	  this.list.push(obj);
      }
   } 
   

  List.prototype.length = function(){
	return this.list.length;  
  } 
  

  List.prototype.remove = function(value){
	  var index = -1;
    for(var i=0;i<this.list.length;i++){
		  if(this.list[i]==value){
			    index=i;
				break;
			  }
		}
	return this.list.splice(index,1);	
  }
  
   List.prototype.join = function(split){
	  return  this.list.join(split);
	 }
   
   List.prototype.contait = function(value){
	    for(var i=0;i<this.list.length;i++){
			  if(this.list[i]==value){
					return true;
				  }
			}
	    return false;
   }
   
    List.prototype.setValue = function(index,value){
     this.list[index]=value;
   }
    
 /**
  * 给array定义移除方法 dx为下标
  */   
 Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 