document.getElementById('saveProfile').addEventListener('click', async () => {
    const platform = document.getElementById('platform').value;
    const url = document.getElementById('url').value.trim();
    const target = document.getElementById('target').value;

    if (!platform || !url || !target) {
        alert('All fields are required!');
        return;
    }

    const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, url, target })
    });

    const data = await res.json();
    alert(data.message || 'Saved!');
});
