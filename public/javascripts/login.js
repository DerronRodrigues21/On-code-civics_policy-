document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.toLowerCase();
        
        // Simulating authentication logic
        // In a real app, you would validate this against Firebase or MongoDB
        console.log("Attempting login for:", email);

        // HACKATHON LOGIC: 
        // 1. If email contains "admin" or "gov", send to Admin Dashboard
        // 2. Otherwise, send to User Profile/Report Page
        
        if (email.includes('admin') || email.includes('gov')) {
            window.location.href = "admin.html";
        } else {
            window.location.href = "report.html";
        }
    });
});