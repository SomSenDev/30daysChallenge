//get the button and text and author
const btn = document.querySelector('.btn');
const quote = document.querySelector('.text');
const author = document.querySelector('.author');

//function to get quote from api

function getQuote() {
    fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json())
        .then(data => {
            quote.innerHTML = `"${data.quote}"`;
            author.innerHTML = data.author;
        })
        .catch(err => console.log(err));
}

getQuote();
//add event listener

btn.addEventListener('click', getQuote);

//copy to clipboard

const copy = document.querySelector('.copy');
copy.addEventListener('click', () => {
    //get the text
    const text = quote.innerText;
    //copy to clipboard
    navigator.clipboard.writeText(text);
    //alert
    alert('Quote copied to clipboard');
});
