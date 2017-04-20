var a=new Buffer("abc");
var b=new Buffer("123");
a=new Buffer(a+b);
console.log(a);