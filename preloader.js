/**
 * preloader.js — Optimized Preloader with Resource Prefetching
 * Handles initial page load animations and prefetches team page resources
 */

document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
        // Hide preloader after 800ms
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 800);
    }
    
    // Prefetch team page resources when on home page
    prefetchTeamResources();
});

/**
 * Prefetch team page and its resources for faster navigation
 */
function prefetchTeamResources() {
    // Only prefetch if we're on the home page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Prefetch team page HTML
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/team';
        link.as = 'document';
        document.head.appendChild(link);
        
        // Prefetch team data script
        const scriptLink = document.createElement('link');
        scriptLink.rel = 'prefetch';
        scriptLink.href = '/team-data.js';
        scriptLink.as = 'script';
        document.head.appendChild(scriptLink);
        
        // Prefetch critical images from team members (Discord CDN is already optimized)
        // This helps with faster rendering when team page loads
        const imagesToPrefetch = [
            'https://cdn.discordapp.com/attachments/1284568055644553303/1505518387881709568/content.png?ex=6a0aeac2&is=6a099942&hm=ce8aad1c42617e8f60886aed6271fbfd5960dc79b40e2a3751a29b60337b29cd&',
            'https://media.discordapp.net/attachments/1284568055644553303/1505508597273202779/namish.jpeg?ex=6a0ae1a4&is=6a099024&hm=d7a1a9b712a9d3a998aafa7cde4db7cc053febcbd507f50ce068e6e841f77d54&=&format=webp&width=523&height=930',
            'https://cdn.discordapp.com/attachments/1505686652805320925/1505876609972961290/image.png?ex=6a0c3861&is=6a0ae6e1&hm=2e7e63f0e3c1f0c93c8511ac2faba4e732eedf8f283c09a9110b022785cc4e06&',
            'https://media.discordapp.net/attachments/1284568055644553303/1505514105438601236/image.png?ex=6a0ae6c5&is=6a099545&hm=8426c1afc03989c5d05c3dbe13c4a3ddb6d357040bfa0aa6816ce1d1dd650963&=&format=webp&quality=lossless&width=784&height=881'
        ];
        
        imagesToPrefetch.forEach(imgUrl => {
            const imgLink = document.createElement('link');
            imgLink.rel = 'prefetch';
            imgLink.href = imgUrl;
            imgLink.as = 'image';
            document.head.appendChild(imgLink);
        });
    }
}

/**
 * Smooth page transition when navigating to team page
 * Triggered by nav.js click handlers
 */
function smoothNavigateToTeam() {
    const page = document.getElementById("page");
    if (page) {
        page.style.opacity = "0";
        page.style.transition = "opacity 0.3s ease-out";
        setTimeout(() => {
            window.location.href = "/team";
        }, 300);
    }
}
