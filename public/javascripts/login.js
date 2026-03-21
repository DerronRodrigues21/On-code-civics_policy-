document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email:    document.getElementById('loginEmail').value,
                password: document.getElementById('loginPass').value
            })
        });
        const data = await res.json();
        if (data.success) {
            window.location.href = '/report';
        } else {
            alert(data.error || 'Login failed');
        }
    });
});