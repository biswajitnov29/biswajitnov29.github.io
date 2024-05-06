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
                    repoItem.classList.add('bg-white');
                    repoItem.classList.add('rounded-lg');
                    repoItem.classList.add('shadow-lg');
                    repoItem.classList.add('overflow-hidden');
                    if(!repo.private){
                        repoItem.innerHTML = `
        <!-- Card Image -->
        <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">

        <!-- Card Content -->
        <div class="p-4">
            <a href="${repo.html_url}" class="text-xl font-semibold text-gray-800 mb-2">${repo.name}</a>
            <p class="text-sm text-gray-600 mb-4">
            ${repo.description || 'No description'}
            </p>
            
        </div>
                        `;
                    } else {
                        repoItem.innerHTML = `
                            
        <!-- Card Image -->
        <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">

        <!-- Card Content -->
        <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">${repo.name}</h2>
            <p class="text-sm text-gray-600 mb-4">
            ${repo.description || 'No description'}
            </p>
            
        </div>
                        `;
                    }
                    repositoriesContainer.appendChild(repoItem);
                });
            })
            .catch(error => console.error('Error fetching repositories:', error));
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));
