function add(a){
    return function(b){
        if(b !== undefined){
            return add(a + b);
        }
        return a;
    }
}


console.log(add(1)(2)(3)());

const add = (a) => (b) => b !== undefined ? add(a+b) : a;
