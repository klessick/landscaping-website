document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        form.style.display = 'none';
        document.getElementById('form-message').style.display = 'block';
    }
});