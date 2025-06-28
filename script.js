let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let it;
function getTotal()
{
    if(price.value != ''){
        result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value) ;
        total.innerHTML = result;
        total.style.background = '#00c500'
    }
    else{
        total.innerHTML = ''
        total.style.background = '#14ff14'
    }
}
let newProducts;
if (localStorage.product != null) {
    newProducts = JSON.parse(localStorage.product);
}
else {
    newProducts = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    if(title.value != '' 
        && price.value != '' 
        && category.value != ''
        && newProduct.count < 100){
        if(mood === 'create'){
            if(newProduct.count>1){
                for(let i = 0; i < newProduct.count; i++){
                    newProducts.push(newProduct);
                    clearData();
                }
            }else{
                newProducts.push(newProduct);
                clearData();
            }
        }
        else{
            newProducts[it] = newProduct;
            mood = 'create'; 
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            clearData();
        }
    }
    
    localStorage.setItem('product', JSON.stringify(newProducts)); 
    showProducts();
};

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showProducts(){
    let table = '';
    for(let i = 0; i < newProducts.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${newProducts[i].title}</td>
                <td>${newProducts[i].price}</td>
                <td>${newProducts[i].taxes}</td>
                <td>${newProducts[i].ads}</td>
                <td>${newProducts[i].discount}</td>
                <td>${newProducts[i].total}</td>
                <td>${newProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deletAll = document.getElementById('deletall');
    if(newProducts.length>0){
        deletAll.innerHTML = `
        <button onclick="deleteAllProduct()">Delete All (${newProducts.length})</button>
        `
    }
    else{
        deletAll.innerHTML = '';
    }
    getTotal();
}
showProducts();
function deleteProduct(i){
    newProducts.splice(i,1);
    localStorage.product = JSON.stringify(newProducts);
    showProducts();
}
function deleteAllProduct(){
    let confirmDelete = confirm('Are you sure you want to delete all the products?');
    if (confirmDelete){
        localStorage.clear()
        newProducts.splice(0)
        showProducts();
    }
}
function updateProduct(i){
    title.value = newProducts[i].title;
    price.value = newProducts[i].price;
    taxes.value = newProducts[i].taxes;
    ads.value = newProducts[i].ads;
    discount.value = newProducts[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = newProducts[i].category;
    submit.innerHTML = 'Update'
    mood = 'update';
    it = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
let searchMood = 'Title';
function searchBy(id){
    let search = document.getElementById('search')
    if(id == 'sbt'){
        searchMood = 'Title';
        
    }
    else{
        searchMood = 'Category';
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus();
    search.value = '';
    showProducts();
}
function searching(value){
    let table = '';
    value = value.toLowerCase()
    for(let i = 0; i < newProducts.length ; i++){
        if(searchMood === 'Title'){
            if(newProducts[i].title.toLowerCase().includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${newProducts[i].title}</td>
                        <td>${newProducts[i].price}</td>
                        <td>${newProducts[i].taxes}</td>
                        <td>${newProducts[i].ads}</td>
                        <td>${newProducts[i].discount}</td>
                        <td>${newProducts[i].total}</td>
                        <td>${newProducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>
                    </tr>
                `;
            }
        }
        else{
            if(newProducts[i].category.toLowerCase().includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${newProducts[i].title}</td>
                        <td>${newProducts[i].price}</td>
                        <td>${newProducts[i].taxes}</td>
                        <td>${newProducts[i].ads}</td>
                        <td>${newProducts[i].discount}</td>
                        <td>${newProducts[i].total}</td>
                        <td>${newProducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
