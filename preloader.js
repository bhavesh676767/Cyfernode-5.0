document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    
    if (preloader) {
        // Simulate a loading state
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 800); // Hide preloader after 800ms
    }
});
