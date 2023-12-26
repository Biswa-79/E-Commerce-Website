console.log("Index JS LOADED");

async function fetchCategories(){
    // This function is marked async so this will also return a Promise 
    const response = await  fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    console.log(data);
    
    return data;
}

async function populateCategories(){
    const categories = await fetchCategories();
    removeLoader();

    const categoryList = document.getElementById('categoryList');
    categories.forEach((category) => {

        const categoryHolder = document.createElement("div");
        const categoryLink = document.createElement("a");
        categoryHolder.classList.add("category-item", "d-flex", "align-items-center", "justify-content-center");
        
        categoryLink.href = `productList.html?category=${category}`;
        categoryLink.textContent = category; // Setting the Category Name as the test of the anchor tag 
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);
    });
}

populateCategories();