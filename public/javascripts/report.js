// Initialize Map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Default: India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

// Function to place marker on click
map.on('click', function(e) {
    updateMarker(e.latlng.lat, e.latlng.lng);
});

function updateMarker(lat, lng) {
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 15);
            updateMarker(lat, lng);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Form Submission
document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    
    // UI Feedback
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> AI Analyzing...`;
    submitBtn.disabled = true;

    const data = {
        description: document.getElementById('description').value,
        lat: document.getElementById('lat').value,
        lng: document.getElementById('lng').value
    };

    console.log("Submitting Data:", data);

    // After 2 seconds, simulate redirect to status page
    setTimeout(() => {
        alert("AI has categorized your issue as 'Public Works'. Redirecting to status tracker...");
        window.location.href = "/status"; 
    }, 2000);
});