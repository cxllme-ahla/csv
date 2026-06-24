const ITEMS_PER_PAGE = 7;

let currentPage = 1;

let allData = [];

async function loadTXT(){

const txt = await fetch("data/info.txt");

document.getElementById("txtContent")
.textContent = await txt.text();

}

async function loadCSV(){

const res = await fetch("data/news.csv");

const csv = await res.text();

const rows = csv
.trim()
.split("\n")
.slice(1);

allData = rows.map(row=>{

const [tanggal,judul,deskripsi] =
row.split(",");

return {
tanggal,
judul,
deskripsi
};

});

renderPage(1);

}

function renderPage(page){

currentPage = page;

const container =
document.getElementById("historyContainer");

container.innerHTML = "";

const start =
(page-1)*ITEMS_PER_PAGE;

const end =
start+ITEMS_PER_PAGE;

const pageItems =
allData.slice(start,end);

pageItems.forEach(item=>{

container.innerHTML += `

<div class="history-item">

<h3>${item.judul}</h3>

<small>${item.tanggal}</small>

<p>${item.deskripsi}</p>

</div>

`;

});

renderPagination();

}

function renderPagination(){

const totalPages =
Math.ceil(
allData.length /
ITEMS_PER_PAGE
);

const div =
document.getElementById("pagination");

div.className =
"pagination";

div.innerHTML="";

for(let i=1;i<=totalPages;i++){

div.innerHTML += `

<button onclick="renderPage(${i})">

${i}

</button>

`;

}

}

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

const theme =
document.documentElement
.getAttribute("data-theme");

if(theme==="dark"){

document.documentElement
.removeAttribute("data-theme");

}else{

document.documentElement
.setAttribute(
"data-theme",
"dark"
);

}

});

loadTXT();
loadCSV();
