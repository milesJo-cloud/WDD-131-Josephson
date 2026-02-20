console.log("Credit Card Form Loaded");

// Format card number with spaces every 4 digits
const numberInput = document.getElementById('number');
numberInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '').substring(0, 16);
  e.target.value = val.match(/.{1,4}/g)?.join(' ') ?? val;
});

// Allow only digits in month, year, cvc
['month', 'year', 'cvc'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });
});
