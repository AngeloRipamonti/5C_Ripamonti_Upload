
const inputFile = document.querySelector('#file');
const button = document.querySelector("#button");
const divLink = document.querySelector("#link"); 

const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("file", inputFile.files[0]);
    const body = formData;
    const fetchOptions = {
        method: 'post',
        body: body
    };
    try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        link.setAttribute("href", data.url);
        link.innerText = data.url;
    } catch (e) {
        console.log(e);
    }
}

button.onclick = handleSubmit;

async function render () {
    const res = await fetch("/filelist");
    const data = await res.json();

    `<a href="`+ data.url +`" class="text-blue-500 hover:underline">`+ data.url +`</a>`

}
render();