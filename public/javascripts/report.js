// report.js
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

    try {
        // Calls Express whch calls python classifier
        const response = await fetch('/report/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaint: data.description })
        });

        const result = await response.json();

        // Show result on page
        document.getElementById('aiSuggestion').innerHTML = `
            <strong>Department:</strong> ${result.department} <br>
            <strong>Category:</strong>   ${result.category} <br>
            <strong>Priority:</strong>   ${result.priority} <br>
            <strong>Summary:</strong>    ${result.summary}
        `;

        submitBtn.innerHTML = 'Submit to AI Router';
        submitBtn.disabled = false;

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '/status';
        }, 2000);

    } catch (error) {
        document.getElementById('aiSuggestion').innerHTML = 
            `<span class="text-danger">Classification failed. Try again.</span>`;
        submitBtn.innerHTML = 'Submit to AI Router';
        submitBtn.disabled = false;
    }
});