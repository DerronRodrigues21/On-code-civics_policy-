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