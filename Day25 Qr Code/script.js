const input = document.querySelector('#input'),
generate = document.querySelector('#generate'),
img = document.querySelector('.qr-code__image');

generate.addEventListener('click', () => {
// Get the value of the input
const inputValue = input.value;

// check if the input is empty
if (inputValue === '') {
    alert('Input cannot be empty');
    return;
}

// get the api to generate the qr code

const api = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;

//create img element to display the qr code

const qrImage = document.createElement('img');

// set the src attribute of the qr code image

qrImage.src = api;

//clear the previous qr code image
img.innerHTML = '';

// append the qr code image to the dom

img.appendChild(qrImage); 


generate.innerHTML = 'Generating QR Code...';
qrImage.addEventListener('load', () => {
    generate.innerHTML = 'Generate QR Code';
});

qrImage.addEventListener('click', () => {
   const copy = qrImage.src.split('=').pop();
    window.navigator.clipboard.writeText(copy).then(() => {
        alert('Copied to clipboard');
    }).catch((error) => {
        alert(error);
    });
});

// clear the input field
input.value = '';

//focus on the input field
input.focus();



});




