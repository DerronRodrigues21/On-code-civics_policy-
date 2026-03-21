// Initialize Map
const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

// Place marker on map click
map.on('click', function(e) {
    updateMarker(e.latlng.lat, e.latlng.lng);
});

function updateMarker(lat, lng) {
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);

    // Store in hidden inputs
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;

    // Show coords to user
    document.getElementById('coordsDisplay').textContent = 
        `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    document.getElementById('locationDisplay').style.display = 'block';
}

// Use My Location button — no inline onclick needed
document.getElementById('locateBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 15);
            updateMarker(lat, lng);
        }, () => {
            alert("Could not get your location. Please click on the map instead.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Form Submission
document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');

    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;

    // Validate location selected
    if (!lat || !lng) {
        alert("Please select a location on the map first!");
        return;
    }

    // UI Feedback
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> AI Analyzing...`;
    submitBtn.disabled = true;

    const data = {
        complaint: document.getElementById('description').value,
        lat,
        lng
    };

    try {
        const response = await fetch('/report/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Show result
        document.getElementById('aiSuggestion').innerHTML = `
            <div class="alert alert-success mt-2 p-2">
                <strong>Department:</strong> ${result.department}<br>
                <strong>Category:</strong> ${result.category}<br>
                <strong>Priority:</strong> ${result.priority}<br>
                <strong>Summary:</strong> ${result.summary}
            </div>
        `;

        submitBtn.innerHTML = 'Submit to AI Router';
        submitBtn.disabled = false;

        // Redirect to status after 2 seconds
        setTimeout(() => {
            window.location.href = '/status';
        }, 2000);

    } catch (error) {
        document.getElementById('aiSuggestion').innerHTML =
            `<div class="alert alert-danger mt-2 p-2">Classification failed. Try again.</div>`;
        submitBtn.innerHTML = 'Submit to AI Router';
        submitBtn.disabled = false;
    }
});