// Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key
const apiKey = '55022d5a39f0f0ebc90c1f46892f45e0';
const baseUrl = 'https://api.themoviedb.org/3';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

const categories = [
    { name: 'Now Playing', endpoint: '/movie/now_playing'},
    {name:'Trending',endpoint:'/trending/all/week'},
    { name: 'Popular Movies', endpoint: '/movie/popular' },
    { name: 'Top Rated Movies', endpoint: '/movie/top_rated' },
    { name: 'Popular TV Shows', endpoint: '/tv/popular' },
    { name: 'Top Rated TV Shows', endpoint: '/tv/top_rated' },
    { name: 'Upcoming Movies', endpoint: '/movie/upcoming' },
    
    // Add more categories here
];

// Create a card element
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = imgBaseUrl + item.poster_path;
    image.alt = item.title || item.name;

    const name = document.createElement('h3');
    name.className = 'name';
    name.textContent = item.title || item.name;

    const info = document.createElement('p');
    info.textContent = item.overview;

    const rating = document.createElement('p');
    rating.className = 'rating';
    rating.textContent = item.vote_average;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(info);
    card.appendChild(rating);

    return card;
}

// Fetch and display content for a category
async function fetchAndDisplayContent(endpoint, category) {
    const data = await getData(endpoint);

    const main = document.querySelector('main');
    const categorySection = document.createElement('div');
    categorySection.className = 'categories';

    const catHead = document.createElement('div');
    catHead.className = 'cat_head';

    const catTitle = document.createElement('h2');
    catTitle.textContent = category.name;

    const viewAllLink = document.createElement('a');
    viewAllLink.href = '#';
    viewAllLink.textContent = 'View All';

    catHead.appendChild(catTitle);
    catHead.appendChild(viewAllLink);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards';

    categorySection.appendChild(catHead);
    categorySection.appendChild(cardsContainer);

    data.forEach(item => {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    });

    main.appendChild(categorySection);
}

// Get data from API
async function getData(endpoint) {
    const response = await fetch(
        `${baseUrl}${endpoint}?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
}

//function of hero section slider with 10 seconds interval
async function heroSlider() {
    const hero = document.querySelector('.hero');
    const heroData = await getData('/movie/popular');
    const heroImg = 'https://image.tmdb.org/t/p/original'
    let i = Math.floor(Math.random() * heroData.length);
    hero.style.backgroundImage = `url(${heroImg}${heroData[i].backdrop_path})`;
    setInterval(() => {
        i = Math.floor(Math.random() * heroData.length);
        hero.style.backgroundImage = `url(${heroImg}${heroData[i].backdrop_path})`;
    }
        , 10000);

}



// Load content on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    for (const category of categories) {
        await fetchAndDisplayContent(category.endpoint, category);
    }
    heroSlider();
   
});
