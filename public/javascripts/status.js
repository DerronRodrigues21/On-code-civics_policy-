document.addEventListener('DOMContentLoaded', () => {
    // Logic to grab Ticket ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id');

    if (ticketId) {
        console.log(`Tracking ticket: ${ticketId}`);
        // Here you would normally fetch(api/complaint/${ticketId})
    }

    // Optional: Auto-refresh data every 30 seconds
    /*
    setInterval(() => {
        location.reload();
    }, 30000);
    */
});