// Vercel Speed Insights initialization
// Following official documentation: https://vercel.com/docs/speed-insights/quickstart
(function() {
  // Initialize the Speed Insights function
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // Load the Speed Insights script
  const script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  
  script.onerror = function() {
    console.log('[Speed Insights] Failed to load script. Please ensure Speed Insights is enabled in Vercel dashboard.');
  };
  
  document.head.appendChild(script);
})();
