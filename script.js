function formatDate(dateString) {
    const [datePart, timePart] = dateString.split('T');
    const[year, month, day] = datePart.split('-');
    return `${month} - ${day} - ${year}`
}

// Function to fetch and display news data
async function fetchAndDisplayNews(searchTerm = 'planet') {
    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm)
        const apiUrl = `https://api.spaceflightnewsapi.net/v4/articles/?limit=20&search=${searchTerm}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(JSON.stringify(data, null, ' '))

        // Clear previous results
        const dataContainer = document.getElementById('data');
        dataContainer.innerHTML = '';

        if (data.results && data.results.length > 0) {
            for (const article of data.results) {
                let card = document.createElement('div');
                card.className = 'news-card';
                
                let title = document.createElement('H2');
                title.textContent = article.title;

                let publishDate = document.createElement('p');
                publishDate.textContent = `Published: ${formatDate(article.published_at)}`;
                publishDate.className = "publish-date";

                /*
                function formatDate(date) {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone };
                return date.toLocaleDateString('es-MX', options);
                 */

                let summary = document.createElement('p');
                summary.textContent = article.summary;

                let link = document.createElement('a');
                link.textContent = 'Read more';
                link.href = article.url;
                link.target = '_blank'

                let image = document.createElement('img');
                image.className = 'card-image'
                image.src = article.image_url;

                
                card.appendChild(title);
                card.appendChild(publishDate);
                card.appendChild(image);
                card.appendChild(summary);
                card.appendChild(link);
                
                document.getElementById('data').appendChild(card);
            }
        } else {
            dataContainer.textContent = "No results found";
        }
        console.log(JSON.stringify(data, null, " "))
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('data').textContent = "Error fetching news";
    }
}

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    fetchAndDisplayNews(searchTerm);
}

// Call the function when the page loads
window.addEventListener('load', () => {
    const searchForm = document.createElement('form');
    searchForm.id = 'searchForm';
    searchForm.innerHTML = `
        <input type="text" id="searchInput" placeholder="Enter search">
        <button type="submit" id="search-button"><i class="fa fa-search"></i></button>
    `;
    const formContainer = document.getElementById("form");
    formContainer.appendChild(searchForm);
    //document.body.insertBefore(searchForm, document.getElementById('data'));

    // Add event listener to the form
    searchForm.addEventListener('submit', handleSearch);

    // Initial fetch with default search term
    fetchAndDisplayNews('space')
});