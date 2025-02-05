export async function callApi(path) {
    try {
        const responseDiv = document.getElementById('response');
        responseDiv.textContent = 'Loading...';
        const resp = await fetch(path);
        const data = await resp.json();
        responseDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('response').textContent = 'Error: ' + error.message;
    }
}
