let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current == 'dark') {
        document.body.style.backgroundColor = '#333333';
        document.body.style.color = '#FFFFFF';  

        logo.style.filter = 'brightness(1) invert(2)';
        // code for changes to colors and logo
    } else {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.color = '#000000';


        logo.style.filter = 'none';
        // code for changes to colors and logo
    }
}           
                    