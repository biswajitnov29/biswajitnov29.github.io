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
                repos.slice(0, 5).forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('py-2');
                    repoItem.innerHTML = `
                        <a href="${repo.html_url}" class="text-blue-600 font-medium hover:underline">
                            ${repo.name}
                        </a>
                        <p class="text-sm text-gray-600 mt-1">${repo.description || 'No description'}</p>
                    `;
                    repositoriesContainer.appendChild(repoItem);
                });
            })
            .catch(error => console.error('Error fetching repositories:', error));
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));
