const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show Loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote 

function newQuote() {
    loading();
    //Pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // Check if Author field is blank and replace it with 'Unknown'

    if (quote.author === '' ) {
        quote.author = 'Unknow';
    } else {
        authorText.textContent = quote.author;
    }

    // or

    // if(!quote.author) {
    //     authorText.textContent = 'Unknow';
    // } else {
    //     authorText.textContent = quote.author;
    // }

    // authorText.textContent = quote.author;


    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide Loader


    quoteText.textContent = quote.text;
    complete();
}




// Get Quotes From Api
async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQuotes[12]);
    } catch(error) {
        // Catch Error Here
    }
}

// Tweet Quote (or send to X)
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


// On Load

getQuotes();


