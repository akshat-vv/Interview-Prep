function debounce(fn,delay){
 let timer;
 return function(...args){
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(()=>{
        fn.apply(context, args)
    },delay)
 }   
}

const search = (q)=>{
    console.log("Searching: ", q);
}

const debouncedSearch = debounce(search,1000);

debouncedSearch("a");
debouncedSearch("ak");
debouncedSearch("aks");