$(document).ready(function() {

    fn1().then(function() { console.log("fn1") });
    //fn2().then(function() { console.log("fn2") });

    console.log("Inicio fn2")
    
    for(let i = 0; i < 100; i++) {
        console.log("fn2 -> " + i);
    }
});

function fn1() {
    return new Promise(function(resolve, reject) {

        console.log("Inicio fn1")

        for(let i = 0; i < 1000; i++) {
            console.log("fn1 -> " + i);
        }

        resolve();
//        setTimeout(resolve, 5 * 1000)
    }) 
}

function fn2() {
    return new Promise(function(resolve, reject) {

        console.log("Inicio fn2")

        for(let i = 0; i < 100; i++) {
            console.log("fn2 -> " + i);
        }

        setTimeout(resolve, 3 * 1000)
    }) 
}