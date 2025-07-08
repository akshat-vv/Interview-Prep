function debounce(fn , delay, options={}){

    let timeout;
    let lastArgs;
    let leadingCalled = false;


    const {leading = false, trailing=true } = options;

    return function(...args){
        lastArgs = args;

        const callNow = leading && !timeout;

        if(callNow){
            fn.apply(this,args);
            leadingCalled = true;
        }


        clearTimeout(timeout);

        timeout = setTimeout(()=>{
            if(trailing && (!leading || leadingCalled)){
                fn.apply(this, lastArgs)
            }
            timeout = null;
            leadingCalled = false;
        }, delay)
    }


}

const debouncedLog = debounce(()=>console.log("DEbounced at", new Date().toISOString()), 1000);


debouncedLog();
debouncedLog();
debouncedLog();