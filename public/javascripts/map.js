const departmentColors = {
    "Roads & Transport":    "#FF5733",
    "Water Supply":         "#3498DB",
    "Health Department":    "#2ECC71",
    "Police Department":    "#2C3E50",
    "Waste Management":     "#8B4513",
    "Education Department": "#9B59B6",
    "Housing Department":   "#F39C12",
    "Electricity Board":    "#F1C40F",
    "Parks & Recreation":   "#27AE60"
};

const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

fetch('/api/complaints')
    .then(res => res.json())
    .then(complaints => {
        if (complaints.length === 0) { console.log('No complaints yet'); return; }
        complaints.forEach(c => {
            if (!c.lat || !c.lng) return;
            const color = departmentColors[c.department] || '#999999';
            const circleMarker = L.circleMarker([c.lat, c.lng], {
                radius: 10, fillColor: color, color: '#fff',
                weight: 2, opacity: 1, fillOpacity: 0.9
            }).addTo(map);
            circleMarker.bindPopup(`
                <div style="min-width:200px">
                    <strong style="color:${color}">${c.department}</strong><br>
                    <hr style="margin:4px 0">
                    <b>Complaint:</b> ${c.complaint}<br>
                    <b>Category:</b> ${c.category}<br>
                    <b>Priority:</b> ${c.priority}<br>
                    <b>Summary:</b> ${c.summary}
                </div>
            `);
        });
    })
    .catch(err => console.error('Failed to load complaints:', err));