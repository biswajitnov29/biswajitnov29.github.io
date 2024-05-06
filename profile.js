const apiUrl = 'https://api.github.com/users/biswajitnov29';

// Fetch GitHub profile data
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const profilePicture = data.avatar_url;
        const name = data.name;
        const bio = data.bio;
        const repositories = data.public_repos;

        // Update HTML elements with fetched data
        document.getElementById('profile-picture').src = profilePicture;
        document.getElementById('profile-name').textContent = name || 'GitHub User';
        document.getElementById('profile-bio').textContent = bio || 'No bio provided';

        // Fetch user repositories
        fetch(`${apiUrl}/repos`)
            .then(response => response.json())
            .then(repos => {
                const repositoriesContainer = document.getElementById('repositories');
                repos.slice(0, 10).forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('py-2');
                    if(!repo.private){
                        repoItem.innerHTML = `
                            <a href="${repo.html_url}" class="text-blue-600 font-medium hover:underline">
                                ${repo.name}
                            </a>
                            <p class="text-sm text-gray-600 mt-1">${repo.description || 'No description'}</p>
                            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Card Image -->
        <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">

        <!-- Card Content -->
        <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Card Title</h2>
            <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Read More</a>
        </div>
    </div>
                        `;
                    } else {
                        repoItem.innerHTML = `
                            <a href="#" class="text-black-600 font-medium">
                                ${repo.name}
                            </a>
                            <p class="text-sm text-gray-600 mt-1">${repo.description || 'No description'}</p>
                            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Card Image -->
        <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">

        <!-- Card Content -->
        <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Card Title</h2>
            <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Read More</a>
        </div>
    </div>
                        `;
                    }
                    repositoriesContainer.appendChild(repoItem);
                });
            })
            .catch(error => console.error('Error fetching repositories:', error));
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));
