document.addEventListener('DOMContentLoaded', () => {
    const roleCitizen = document.getElementById('roleCitizen');
    const roleOfficial = document.getElementById('roleOfficial');
    const deptField = document.getElementById('deptField');
    const authTitle = document.getElementById('authTitle');
    const toggleLink = document.getElementById('toggleLink');
    const signupForm = document.getElementById('signupForm');

    let isLoginMode = false;

    // Toggle Department ID field based on Role
    roleOfficial.addEventListener('change', () => {
        deptField.style.display = 'block';
    });

    roleCitizen.addEventListener('change', () => {
        deptField.style.display = 'none';
    });

    // Toggle between Signup and Login Mode
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            authTitle.innerText = "Login";
            document.getElementById('userName').parentElement.style.display = 'none';
            toggleLink.innerText = "Create an account";
            signupForm.querySelector('button').innerText = "Login";
        } else {
            authTitle.innerText = "Create Account";
            document.getElementById('userName').parentElement.style.display = 'block';
            toggleLink.innerText = "Login here";
            signupForm.querySelector('button').innerText = "Sign Up";
        }
    });

    // Form Submission Logic
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('userEmail').value;
        const role = roleOfficial.checked ? "Official" : "Citizen";

        // Logic: Redirect based on role
        alert(`Welcome, ${email}! Logged in as ${role}.`);
        
        if (role === "Official") {
            window.location.href = "admin.html"; // Redirect to Admin Dashboard
        } else {
            window.location.href = "report.html"; // Redirect to Report Form
        }
    });
});