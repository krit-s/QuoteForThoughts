// Declaring constants.
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

//Get quote from API
async function getQuote() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        showloadingSpinner();
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        //if author field is null, add 'Unknown'
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = '-Unknown'
        } else {
            quoteAuthor.innerText = '-' + data.quoteAuthor;
        }

        //Reduce the font size for long quotes.
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Quote fetch is complete so hide loading
        hideLoadingSpinner();
    } catch (error) {
        //Recursive call... BecareFul with it.
        getQuote();
    }
}
//Tweet quote on twitter page.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on window load
getQuote();
