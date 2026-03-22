const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function(e) {
    updateMarker(e.latlng.lat, e.latlng.lng);
});

function updateMarker(lat, lng) {
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
    document.getElementById('coordsDisplay').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    document.getElementById('locationDisplay').style.display = 'block';
}

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

document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');

    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;

    if (!lat || !lng) {
        alert("Please select a location on the map first!");
        return;
    }

    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> AI Analyzing...`;
    submitBtn.disabled = true;

    try {
        const response = await fetch('/report/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                complaint: document.getElementById('description').value,
                lat,
                lng
            })
        });

        const result = await response.json();

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

        setTimeout(() => { window.location.href = '/status'; }, 2000);

    } catch (error) {
        document.getElementById('aiSuggestion').innerHTML =
            `<div class="alert alert-danger mt-2 p-2">Classification failed. Try again.</div>`;
        submitBtn.innerHTML = 'Submit to AI Router';
        submitBtn.disabled = false;
    }
});