const auth = "ApQPTTLVKiqguNJI8qVdeTHjr0DMv8uujA2HX85YHNCnzSMREvtsyHtV";
const gallery = document.querySelector(".gallery");
const searchinput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchvalue;
const morebtn = document.querySelector(".more");
let fetchlink;
let currentsearch;
let page = 1;

// events---------------------------
searchinput.addEventListener("input", updateinput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentsearch = searchvalue;
  page = 1; // Reset the page to 1 when a new search is performed
  searchphoto(searchvalue, page);
});
morebtn.addEventListener("click", loadmore);

// ----------------------------------
function updateinput(e) {
  searchvalue = e.target.value;
}

async function curatedphotos() {
  fetchlink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=16`;
  const datafetch = await fetch(fetchlink, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await datafetch.json();
  console.log(data);
  displayPhotos(data);
}
curatedphotos();

async function searchphoto(searchinp, page) {
  fetchlink = `https://api.pexels.com/v1/search?query=${searchinp}&page=${page}&per_page=16`;
  const datafetch = await fetch(fetchlink, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await datafetch.json();
  console.log(data);
  if (page === 1) {
    // Clear the gallery only when it's the first page of search results
    gallery.innerHTML = "";
  }
  displayPhotos(data);
  clear();
}

function displayPhotos(data) {
  data.photos.forEach((photo) => {
    const galleryimg = document.createElement("div");
    galleryimg.classList.add("gallery-item");
    galleryimg.innerHTML = `<div class="gallary-info"> 
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}></img> 
    `;
    gallery.appendChild(galleryimg);
  });
}

function clear() {
  searchinput.value = "";
}

async function loadmore() {
  page++;
  if (currentsearch) {
    fetchlink = `https://api.pexels.com/v1/search?query=${currentsearch}&page=${page}&per_page=16`;
  } else {
    fetchlink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=16`;
  }

  const datafetch = await fetch(fetchlink, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await datafetch.json();
  console.log(data);
  displayPhotos(data);
}
