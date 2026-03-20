document.addEventListener('DOMContentLoaded', () => {
    const btnTrack = document.getElementById('btnTrack');
    const ticketInput = document.getElementById('ticketId');
    const resultDiv = document.getElementById('searchResult');

    btnTrack.addEventListener('click', () => {
        const id = ticketInput.value.trim();

        if (id === "") {
            resultDiv.innerHTML = `<div class="alert alert-warning">Please enter a valid Ticket ID.</div>`;
            return;
        }

        // Simulating an API call for the Hackathon Demo
        resultDiv.innerHTML = `<div class="spinner-border text-primary" role="status"></div>`;

        setTimeout(() => {
            if (id.toUpperCase() === "DEMO123") {
                resultDiv.innerHTML = `
                    <div class="card border-success text-start">
                        <div class="card-body">
                            <h5 class="card-title text-success">Complaint Found!</h5>
                            <p class="mb-1"><strong>Status:</strong> In-Progress 🟡</p>
                            <p class="mb-1"><strong>Dept:</strong> Sanitation</p>
                            <p class="small text-muted">Assigned to: Central Zone Team</p>
                            <a href="status.html?id=${id}" class="btn btn-sm btn-outline-primary mt-2">View Full Timeline</a>
                        </div>
                    </div>`;
            } else {
                resultDiv.innerHTML = `<div class="alert alert-danger">Ticket ID not found. Try "DEMO123" for testing.</div>`;
            }
        }, 800);
    });
});