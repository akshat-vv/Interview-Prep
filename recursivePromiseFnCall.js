const firstFunction = () => {
    return new Promise((res)=>{
        setTimeout(()=>{
            res("First Function")
        }, 1000);
    })
}

const secondFunction = () => {
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Second Function")
        }, 1000);
    })
}

const thirdFunction = () => {
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Third Function")
        }, 1000);
    })
}



async function promiseRecurse(funPromises){
    if(funPromises.length === 0 ) return;

    const fn = funPromises.shift();
    fn.then((res)=>console.log(res)).catch(e=>console.log(e))

    promiseRecurse(funPromises)

}


promiseRecurse([firstFunction(), secondFunction(), thirdFunction()])