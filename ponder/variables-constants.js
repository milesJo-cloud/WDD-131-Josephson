
const PI = 3.14;
let radius = 3;

let area = PI * radius * radius;
console.log("Area of circle: " + area);
                  
radius = 20;
area = radius * radius * PI;

console.log(area);


const one = 1;
const two = '2';

let result = one * two;
console.log(result);

result = one + two;
console.log(result); //results in string concatenation
                    

let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block
                    