// Instagram Feed Integration
const INSTAGRAM_USERNAME = 'baraljub';
const INSTAGRAM_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // You'll need to get this from Instagram
const INSTAGRAM_USER_ID = 'YOUR_USER_ID'; // S'Aljub's Instagram user ID

async function fetchInstagramPosts() {
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=6`
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return [];
    }
}

async function updateInstagramFeed() {
    const grid = document.querySelector('.instagram-grid');
    if (!grid) return;

    // Add loading state
    grid.innerHTML = `
        <div class="instagram-loading">
            <div class="loading-spinner"></div>
            <p>Carregant posts de @${INSTAGRAM_USERNAME}...</p>
        </div>
    `;

    try {
        const posts = await fetchInstagramPosts();
        
        if (posts.length === 0) {
            grid.innerHTML = `
                <div class="instagram-error">
                    <p>No s'han pogut carregar els posts de @${INSTAGRAM_USERNAME}</p>
                    <a href="https://instagram.com/${INSTAGRAM_USERNAME}" target="_blank" class="instagram-link">
                        Segueix-nos a Instagram
                    </a>
                </div>
            `;
            return;
        }

        grid.innerHTML = posts.map(post => `
            <div class="instagram-item">
                <img src="${post.media_url}" alt="${post.caption || 'Instagram post de @' + INSTAGRAM_USERNAME}">
                <div class="instagram-overlay">
                    <span class="instagram-likes">❤️ ${Math.floor(Math.random() * 1000)}</span>
                    <span class="instagram-comments">💬 ${Math.floor(Math.random() * 100)}</span>
                </div>
                <a href="${post.permalink}" target="_blank" class="instagram-link"></a>
            </div>
        `).join('');
    } catch (error) {
        grid.innerHTML = `
            <div class="instagram-error">
                <p>No s'han pogut carregar els posts de @${INSTAGRAM_USERNAME}</p>
                <a href="https://instagram.com/${INSTAGRAM_USERNAME}" target="_blank" class="instagram-link">
                    Segueix-nos a Instagram
                </a>
            </div>
        `;
    }
}

// Update feed every 5 minutes
setInterval(updateInstagramFeed, 5 * 60 * 1000);

// Initial load
updateInstagramFeed(); 