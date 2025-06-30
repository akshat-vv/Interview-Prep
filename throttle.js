function throttle(fn, limit){
    let lasCall = 0;
    return function(...args){
        const context = this;
        const now = Date.now();
        if(now-lasCall >= limit){
            lasCall = now;
            fn.apply(context, args);
        }
    }
}

const logScroll = () => {
  console.log("Scroll event:", Date.now());
};

window.addEventListener("scroll", throttle(logScroll, 1000));
