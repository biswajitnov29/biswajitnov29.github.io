const apiUrl = 'https://api.github.com/users/biswajitnov29';

const itemsPerPage = 2; // Number of items per page
let currentPage = 1; // Current page

const gridContainer = document.getElementById('gridContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Event listener for previous button
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderGridItems();
    }
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(itemsData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderGridItems();
    }
});

function renderGridItems(itemsData) {
    // Clear previous items
    gridContainer.innerHTML = '';

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Render grid items for current page
    for (let i = startIndex; i < endIndex && i < itemsData.length; i++) {
        const item = itemsData[i];

        // Create grid item element
        const gridItem = document.createElement('div');
        gridItem.className = 'bg-white rounded-lg shadow-lg overflow-hidden';
        gridItem.innerHTML = `
            <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">${item.name}</h2>
                <p class="text-gray-600">${item.description || 'No description'}</p>
            </div>
        `;

        // Append grid item to grid container
        gridContainer.appendChild(gridItem);
    }

    // Update pagination buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= itemsData.length;
}



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
                renderGridItems(repos);
            })
            .catch(error => console.error('Error fetching repositories:', error));
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));
