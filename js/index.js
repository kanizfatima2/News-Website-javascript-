// loading all data 
const loadAllNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return (data);
}

// setting all news menu 
const setAllMenu = async () => {
    const data = await loadAllNews();
    const news = (data.data.news_category);
    const ul = document.getElementById('ul');
    news.forEach(news => {
        // console.log(news.category_name)
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadAllCategoryNews('${news.category_id}','${news.category_name}')" class="fw-bold">${news.category_name} </a>`;
        ul.appendChild(li)
    })
}
setAllMenu();
// loadAllNews();

// loading all news category by id 
const loadAllCategoryNews = async (id, name) => {
    // console.log(id);
    // console.log(name)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.length)
    //setting news category
    const inputField = document.getElementById('input');
    if (data.data.length > 0) {
        inputField.value = `${data.data.length} items found for category ${name}`;
    }
    else {
        inputField.value = `No items found for category ${name}`;
    }
}