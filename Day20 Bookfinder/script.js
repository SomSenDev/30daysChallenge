const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
async function fetchBooks(sectionId, query) {
    
    

    try {
        const response = await fetch(`${apiUrl}?q=${query}`);
        const data = await response.json();

        const booksContainer = document.getElementById(sectionId).querySelector('.books');

        data.items.forEach(item => {
            const book = document.createElement('div');
            book.classList.add('book');
            const title = item.volumeInfo.title;
            const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://placehold.co/250x350/png?text=No+image+available';
            book.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
            `;

            booksContainer.appendChild(book);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Populate sections with books
fetchBooks('popular-books', 'popular');
fetchBooks('highest-rated-books', 'highest+rated');
fetchBooks('newest-books', 'newest');
fetchBooks('free-ebooks', 'free+ebooks');
fetchBooks('top-selling-books', 'top+selling')
fetchBooks('comic-books', 'comic+books');



async function searchBook(value){
    const response = await fetch(`${apiUrl}?q=${value}`);
    const data = await response.json();
    const main = document.querySelector('main');
    main.innerHTML = '';
    try{
         //clear main 
    
        //create section
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = 'Search Results';
        section.appendChild(h2);
        //create div
        const books = document.createElement('div');
        books.classList.add('books');
        if(data.items && data.items.length > 0){
            data.items.forEach(item => {
                //create div
                const book = document.createElement('div');
                book.classList.add('book');
                const title = item.volumeInfo.title;
                const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://placehold.co/250x350/png?text=No+image+available';
                book.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                `;
                books.appendChild(book);
                console.log(title)
            });
            section.appendChild(books);
            main.appendChild(section);            
        }
        else{
            h2.textContent = 'No results found';
        }
        
        
    }
    catch(error){
        console.log(error);
    }
}

//search bar
const searchForm = document.querySelector('.search input');
const searchBtn = document.querySelector('.btnSearch');

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
   
    //get search value
    const searchValue = searchForm.value;
    if(searchValue){
        searchBook(searchValue);
        searchForm.value = '';
    }
});

//search by enter
window.addEventListener('keydown', function (e) {
    //if enter is pressed
    if(e.key === 'Enter'){
        e.preventDefault();
        const searchValue = searchForm.value;
        if(searchValue){
            searchBook(searchValue);
            searchForm.value = '';
        }
    }
});