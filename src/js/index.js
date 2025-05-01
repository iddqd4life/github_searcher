import '../scss/styles.scss';

const searchInput = document.querySelector('.main__search-input');
const autoCompleteList = document.querySelector('.main__autocomplete-list')
const repositoryList = document.querySelector('.main__repos-list');
const autoCompleteWrapper = document.querySelector('.main__autocomplete-wrapper');

function debounce(callback, ms) {
    let timeout;
    
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, ms)     
    }
}

async function getResponseJSON(url) {
    try {
        const fetchUrl = await fetch(url);
        if (fetchUrl.ok) {
            return fetchUrl.json();
        }
    } catch (error) {
        throw new Error(error);
    }
}

function addRepository(title, href, user, stars) {
    const itemTemplate = document.getElementById('repositoryItem').content.cloneNode(true);
    const repositoryItem = itemTemplate.querySelector('.main__repos-item')
    repositoryItem.querySelector('.repository__name--link').textContent = title;
    repositoryItem.querySelector('.repository__name--link').href = href;
    repositoryItem.querySelector('.repository__owner--name').textContent = user;
    repositoryItem.querySelector('.repository__stars--number').textContent = stars;
    repositoryList.appendChild(repositoryItem);
}

const renderAutocomplete = debounce(async (query) => {
    const url = `https://api.github.com/search/repositories?q=${query}&per_page=5`;

    try {
        const data = await getResponseJSON(url)

        if (data.items.length === 0) {
            return;
        }
        
        const autoCompleteListFragment = document.createDocumentFragment()
        
        for (const item of data.items) {
            const listItem = document.createElement('li');
            listItem.classList.add('main__autocomplete-item');
            listItem.textContent = item.name;
            listItem.id = item.id;
            autoCompleteListFragment.appendChild(listItem);
        }

        localStorage.setItem("repoBatch", JSON.stringify(data.items))

        autoCompleteList.replaceChildren(autoCompleteListFragment)
        autoCompleteWrapper.classList.add('main__autocomplete-wrapper--active')
    } catch (error) {
        throw new Error(error)
    }
}, 600)

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.trim();

    if (searchValue.length > 0) {
        try {
            renderAutocomplete(searchValue)
        } catch (error) {
            throw new Error(error)
        }
    } else {
        autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active')
    }
})

document.addEventListener('click', e => {
    if (!e.target.classList.contains('.main__search-wrapper')) {
        autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active')
    }
})

autoCompleteList.addEventListener('click', e => {
    searchInput.value = "";
    autoCompleteWrapper.classList.remove('main__autocomplete-wrapper--active')

    const id = Number(e.target.id);
    const data = JSON.parse(localStorage.getItem("repoBatch"));
    const [item] = data.filter(dataItem => dataItem.id === id);

    addRepository(item.name, item.svn_url, item.owner.login, item.stargazers_count)
})

repositoryList.addEventListener('click', e => {
    if (!e.target.classList.contains("repository__remove-button")) {
        return;
    }

    repositoryList.removeChild(e.target.closest('li'))
    
})