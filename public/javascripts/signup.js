document.addEventListener('DOMContentLoaded', () => {
    const roleCitizen = document.getElementById('roleCitizen');
    const roleOfficial = document.getElementById('roleOfficial');
    const deptField = document.getElementById('deptField');
    const authTitle = document.getElementById('authTitle');
    const toggleLink = document.getElementById('toggleLink');
    const signupForm = document.getElementById('signupForm');

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
        // just redirect to login page
        window.location.href = '/login';
    });

    // Form Submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const role = roleOfficial.checked ? 'official' : 'citizen';

        const res = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name:     document.getElementById('userName').value,
                email:    document.getElementById('userEmail').value,
                password: document.getElementById('userPass').value,
                role
            })
        });

        const data = await res.json();
        if (data.success) {
            window.location.href = '/report';
        } else {
            alert(data.error || 'Signup failed');
        }
    });
});