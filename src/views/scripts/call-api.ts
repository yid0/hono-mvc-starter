export async function callApi(path: string) {
    try {
        const responseBlock = document.getElementById('response');
        responseBlock.textContent = 'Loading...';
        const response = await fetch(path);
        const data = await response.json();
        responseBlock.textContent = JSON.stringify(data, null, 2);
        responseBlock.style.display = 'block';

    } catch (error: any) {

        const responseBlock = document.getElementById('response');
        if (responseBlock) {
            responseBlock.textContent = `Error: ${error.message}`;
            responseBlock.style.display = 'block';
        }

    }
}
