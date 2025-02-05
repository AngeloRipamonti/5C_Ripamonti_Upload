
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
        await fetch("/upload", fetchOptions);
        await render();
    } catch (e) {
        console.log(e);
    }
}

button.onclick = handleSubmit;

async function render () {
    const res = await fetch("/filelist");
    const data = await res.json();
    let html = `<ul class="list-none">`;
    data.forEach(element => {
        html += `<li><a href="`+ element +`" class="text-blue-500 hover:underline">`+ element +`</a></li>`;
    });
    html+="</ul>";
    divLink.innerHTML = html;
}

render();