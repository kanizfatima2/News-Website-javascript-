// loading all data 
const loadAllNews = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return (data);
    }
    catch (error) {
        console.log(error);
    }
}

// setting all news menu 
const setAllMenu = async () => {
    const data = await loadAllNews();
    const news = (data.data.news_category);
    const ul = document.getElementById('ul');
    news.forEach(news => {

        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadAllCategoryNews('${news.category_id}','${news.category_name}')" class="fw-bold">${news.category_name} </a>`;
        ul.appendChild(li)
    })
}
setAllMenu();


// loading all news category by id 
const loadAllCategoryNews = async (id, name) => {
    //start loading
    toggleSpinner(true);


    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();


    const inputField = document.getElementById('input');
    if (data.data.length > 0) {
        inputField.value = `${data.data.length} items found for category ${name}`;

        displayAllNews(data.data);
    }
    else {
        inputField.value = `No items found for category ${name}`;
    }

}

// displaying all news
const displayAllNews = data => {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = '';


    // display all data 
    data.forEach(d => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card">
        <img src="${d.thumbnail_url}" class="card-img-top w-100 h-25" alt="...">
        <div class="card-body">
            <h5 class="card-title">${d.title.length > 15 ? d.title.slice(0, 15) + '...' : d.title}</h5>
            <p class="card-text">${d.details.length > 50 ? d.details.slice(0, 50) + '...' : d.details}</p>

            <div class="d-flex">
                <img class=" h-25 w-25 pt-1 pe-3 rounded-circle" src="${d.author.img}" alt="">
                <div>
                    <p class="fw-bold pt-3">
                        <small class="text-muted">${d.author.name ? d.author.name : 'not found'} <br>
                          ${d.author.published_date ? d.author.published_date : 'not found'}  </small>
                    </p>
                    
                </div>
                <p class="mx-auto bg-light d-flex justify-content-center align-items-center px-2"><i class="fa-solid fa-eye me-2"></i>${d.total_view ? d.total_view : 'no'}</p>
            </div>
            <button onclick="loadNewsDetails('${d._id}')" class="btn btn-primary w-50 mt-1" data-bs-toggle="modal" data-bs-target="#newsDetailModal">See Details</button>
            </div>
            </div>`;
        displayContainer.appendChild(div);
    })
    //stop loading
    toggleSpinner(false);
}

// loading and displaying news details in Modal 
const loadNewsDetails = async (id) => {
    try {
        const url = ` https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (e) {
        console.log(e)
    }
}
const displayNewsDetails = data => {
    data.forEach(d => {
        const title = document.getElementById('newsDetailModalLabel');
        title.innerText = `${d.title}`;

        const description = document.getElementById('descrition');
        description.innerHTML = `
        <p>${d.details.length > 200 ? d.details.slice(0, 200) + '...' : d.details}</p>
        <img class=" h-25 w-25 rounded-circle me-2" src="${d.author.img}" alt="">
        <small>
        ${d.author.name ? d.author.name : 'not found'}  ${d.author.published_date ? d.author.published_date : 'not found'}  
        <i class="fa-solid fa-eye float-end me-2 mt-5">
        <span class="float-end">
        ${d.total_view ? d.total_view : 'no'}</span></i>
        <small>
        <p class="mt=2 float-end"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star me-2"></i>${d.rating.number}</p>`;
    })
}


// spinner loading or not 
const toggleSpinner = (isLoading) => {
    const loaderSpinner = document.getElementById('loader');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none');
    }
    else {
        loaderSpinner.classList.add('d-none');
    }
}






