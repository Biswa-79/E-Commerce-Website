console.log("Product LIst JS Working Fine ");

document.addEventListener("DOMContentLoaded" , () =>{
    
    async function fetchProducts(){
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response.data);
        return response.data;
    }
    
    // Fetch Products by Category Name
    async function fetchProductsByCategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data);
        return response.data;
    }
   // Fetch Caegory 
   async function fetchCategories(){
    // This function is marked async so this will also return a Promise 
    const response = await  fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    console.log(data);
    
    return data;
}

    async function populateProducts(flag, customerProducts ){

        let products = customerProducts;
        // This is the Bsic syntax for getting the Params 
        const queryParams = new URLSearchParams(window.location.search);
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        if(flag == false){
            if(queryParamsObject['category']){
                products = await fetchProductsByCategory(queryParamsObject['category']);
            }else {
             products = await fetchProducts();
            }
        }
       
        const productList = document.getElementById('productList');

        products.forEach((product) => {
            const productItem = document.createElement('a');
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none","d-inline-block");
            productItem.href = `productDetails.html?id=${product.id}`;

            const productImg = document.createElement('div');
            const productName = document.createElement('div');
            const productPrice = document.createElement('div');

            productImg.classList.add("product-img");
            productName.classList.add("product-name","text-center");
            productPrice.classList.add("product-price", "text-center");

            let titlee = product.title;
            if(titlee.length >= 30){
                productName.textContent = titlee.substr(0,15)+"...";
            }else{
                productName.textContent = titlee;
            }
            
            productPrice.textContent = `₹ ${product.price}`;
            
            const imageInsideProductImage = document.createElement('img');
            imageInsideProductImage.src = product.image;

            // append divs
            productImg.appendChild(imageInsideProductImage);
            productItem.appendChild(productImg);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

            productList.appendChild(productItem);

        })
    }

    async  function populateCategories(){
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category =>{
            const categoryLink = document.createElement('a');
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;

            categoryList.appendChild(categoryLink);
        })
    }

   async function downloadContentAndPopulate(){
     
        Promise.all([populateProducts(false), populateCategories()])
        .then(() =>{
            removeLoader();
        });
        /// Both of these things happen Parallaly , so ew have to make the above Promise function which return parallely

        // await  populateProducts(false);
        // await populateCategories();

        
    }
    downloadContentAndPopulate();
   

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener('click' , async()=>{
        const productList = document.getElementById("productList");
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);

        const products = await fetchProducts();
        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

        productList.innerHTML = "";
        populateProducts(true, filteredProducts);
    })
});


//  from 24 number 