// .forEach
const steps = [ 'one', 'two', 'three', 'four', 'five' ];

// steps.forEach(function(item){
//     console.log(item);
// })

steps.forEach(showSteps);

function showSteps(steps){
    console.log(steps);
}

//.map
let myList = document.querySelector('#myList');

const stepsHtml = steps.map(listTemplate);

function listTemplate(item) {
    return `<li>${item}</li>`;//     return '<li>' + step + '</li>';
}

//myList.innerHTML =stepsHtml.join('');

let grades = [ 'A', 'B', 'C',];
const gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

console.log(gpaPoints);

function getTotal(total, item){
    return total + item;
}

let totalPoints = gpaPoints.reduce(getTotal);
console.log(totalPoints);

let average = totalPoints / gpaPoints.length;
console.log(average);
//.fiter

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const shortWords = words.filter(function(word){
    return word.length < 6;
});
console.log(shortWords);

const myArray = [12, 34, 21, 54];
const luckNumber = 21;
let luckyIndex = myArray.indexOf(luckNumber);
console.log(luckyIndex);

let container = document.querySelector('#studentContainer');


const students = [
    {last: 'Andrus', 
    first: 'Aaron'
    },

    {last: 'Masa',
    first:'Manny'
    },

    {last: 'Tanda',
    first: 'Tamanda'
    }
];

students.forEach(function(student){
    let name = document.createElement('div');
    name.className = 'format';

    let html = `
       <span>${student.first}</span>
        <span>${student.last}</span>
        <hr>
    `;
    name.innerHTML = html;
    container.appendChild(name);
})
          