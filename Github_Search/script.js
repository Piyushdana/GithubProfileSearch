const form = document.getElementById("myForm");
const userImg = document.getElementById("userImg");
const resultContainer = document.getElementById("result");
const repositoriesContainer = document.getElementById("repositories");
const paginationContainer = document.getElementById("pagination");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const search = document.getElementById('search').value;
    const originalName = search.split(' ').join('');

    fetchUserData(originalName);
    fetchRepositories(originalName);
});

function fetchUserData(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((result) => result.json())
        .then((data) => {
            console.log(data);
            userImg.innerHTML = `<img src="${data.avatar_url}" alt="${data.login}" />`;
            document.getElementById("userName").innerHTML = `<strong>${data.name}</strong>`;
            document.getElementById("userBio").innerHTML = `<p> <span>Bio:- </span> ${data.bio}</p>`;
            document.getElementById("userLocation").innerHTML = `<p> <span>Location:- </span>${data.location}</p>`;
            
            const userProfileLink = document.getElementById("userProfileLink");
            userProfileLink.innerHTML = `<a href="${data.html_url}" target="_blank">${data.html_url}</a>`;
            userImg.style.height

        });
}

function fetchRepositories(username, page = 1, perPage = 10) {
    //  loading Displayed 
    repositoriesContainer.innerHTML = '<p>Loading repositories...</p>';

    // Fetch repositories 
    fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`)
        .then((result) => result.json())
        .then((repositories) => {
            // Removing loading indicator
            repositoriesContainer.innerHTML = '';

            // Displaying repositories
            repositories.forEach((repo) => {
                repositoriesContainer.innerHTML += `
                
                
                <div class="container">
                    <div class="head"><h5><h6>Repo Name:- </h6> ${repo.name} </h5> </div>
                     <div class="des"> <h5> <h6>Description:- </h6> ${repo.description}</h5></div>
                    <div class="bg-primary  text-center language">${repo.language}</div>
                </div>`;
                 
            });

            // Updating pagination 
            updatePagination(username, page, perPage);
        })
        .catch((error) => {
            console.error('Error fetching repositories:', error);
            repositoriesContainer.innerHTML = '<p>Error fetching repositories.</p>';
        });
}

function updatePagination(username, currentPage, perPage) {
     paginationContainer.innerHTML = `
        <button class="btns " onclick="fetchRepositories('${username}', ${currentPage - 1}, ${perPage})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <button class="btns " onclick="fetchRepositories('${username}', ${currentPage + 1}, ${perPage})">Next</button>
    `;
}

function updateRepositories(repositories) {
    const repositoriesContainer = document.getElementById("repositories");
    repositoriesContainer.innerHTML = '';

    repositories.forEach((repo) => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available"}</p>
            <p>Languages: ${Object.keys(repo.languages).join(', ')}</p>
        `;
        repoElement.classList.add('repository-item');
        repositoriesContainer.appendChild(repoElement);
    });
}























 