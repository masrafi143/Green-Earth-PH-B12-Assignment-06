const manageSpinner =(status) => {
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("tree-container").classList.add("hidden");
    } else{
        document.getElementById("tree-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => {
        console.log(json.categories)
        displayCategories(json.categories)
    });
}
loadCategories();
const displayCategories = (categories) => {
    const treeCategories = document.getElementById("tree-categories");
    for(let category of categories){
        const treeCategoryDiv = document.createElement("div");
        treeCategoryDiv.innerHTML=`
        <button onclick="loadTreeCategories(${category.id})" id="btn-${category.id}" class="active-btn btn btn-ghost hover:bg-[#15803d] w-full hover:text-white">${category.category_name}</button>
        `
        treeCategories.appendChild(treeCategoryDiv);
    }
}

        const loadTreeCategories = (id) => {
                fetch(`https://openapi.programming-hero.com/api/category/${id}`)
                .then(res => res.json())
                .then(json => {
                    document.querySelectorAll(".active-btn").forEach(btn => btn.classList.remove("active"));
                    const clickedBtn = document.getElementById(`btn-${id}`);
                    clickedBtn.classList.add("active");
                    displayCards(json.plants)
                });
        }
        const loadCards = () => {
            manageSpinner(true);
            fetch("https://openapi.programming-hero.com/api/plants")
            .then(res => res.json())
            .then(json => {
                console.log(json.plants)
                displayCards(json.plants)
            });
        }
loadCards();
const loadTreeInfo=async (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayTreeInfo(details.plants)
}
const displayTreeInfo = (details) => {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML=`
            <div class="tree-card rounded-2xl shadow-lg p-5 bg-white space-y-3 h-full w-fit">
            <h1 class="tree-name font-bold text-lg">${details.name}</h1>
                <img class="w-full h-40 object-cover rounded-md" src="${details.image}" alt="">
                <p><span class="font-bold">Category:</span> ${details.category}</p>
                <p><span class="font-bold">Price:</span>৳ ${details.price}</p>
                <p class="text-sm"><span class="font-bold">Description:</span> ${details.description}</p>
            </div>
    `
    document.getElementById("details_modal").showModal();
}
const cartData = [];
const displayCards = (trees) => {
    const treeCards = document.getElementById("tree-cards");
    treeCards.innerHTML="";
    for(let tree of trees){
        const treeCardDiv = document.createElement("div");
        treeCardDiv.innerHTML=`
            <div class="tree-card rounded-2xl shadow-lg p-5 bg-white space-y-3 h-full w-fit">
                <img class="w-full h-40 object-cover rounded-md" src="${tree.image}" alt="">
                <h1 onclick="loadTreeInfo(${tree.id})" class="tree-name font-bold text-lg">${tree.name}</h1>
                <p class="text-sm">${tree.description}</p>
                <div class="flex items-center justify-between">
                    <p class="bg-[#DCFCE7] text-[#15803D] text-center px-3 py-2 rounded-2xl">${tree.category}</p>
                    <p class="tree-price font-bold">৳ <span class="price">${tree.price}</span></p>
                </div>
                <button class="add-to-cart btn w-full rounded-3xl bg-green-700 text-white">Add to cart</button>
            </div>
        `;
        treeCards.appendChild(treeCardDiv);
    }
    // cart functionality
    document.querySelectorAll(".add-to-cart").forEach(function (el) {
        el.addEventListener("click", function () {
            const card = el.closest(".tree-card");
            const treeName = card.querySelector(".tree-name").innerText;
            const price = parseInt(card.querySelector(".price").innerText);

            const data = { name: treeName, price: price };
            cartData.push(data);
            renderCart();
        });
    });
    manageSpinner(false);
};

function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cartData.forEach((item, index) => {
        totalPrice += item.price;

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="flex justify-between items-center border bg-gray-300 rounded-2xl p-2">
                <div>
                    <h1>${item.name}</h1>
                    <p>৳ ${item.price}</p>
                </div>
                <button class="cancel-cart text-red-600">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            </div>
        `;

        div.querySelector(".cancel-cart").addEventListener("click", function () {
            cartData.splice(index, 1);
            renderCart();
        });

        cartContainer.appendChild(div);
    });

    document.getElementById("total-price").innerText = totalPrice;
}