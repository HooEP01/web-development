var array = [];
var count = 1;

function fizzBuzz(array, count) {
    if(count % 3 === 0 && count % 5 === 0) {
        array.push("FizzBuzz");
    } else if (count % 3 === 0) {
        array.push("Fuzz");
    } else if (count % 5 === 0) {
        array.push("Bizz");
    } else {
        array.push(count);
    }
    return array;
}

for(var i = 0; i < 20; i++) {
    console.log(fizzBuzz(array, count))
    count++
}
