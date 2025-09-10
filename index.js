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
        <button onclick="loadTreeCategories(${category.id})" class="btn btn-ghost hover:bg-[#15803d] w-full hover:text-white">${category.category_name}</button>
        `
        treeCategories.appendChild(treeCategoryDiv);
    }
}

const loadTreeCategories = (id) => {
        fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(json => {
                displayCards(json.plants)
            });
        }
        const loadCards = () => {
            fetch("https://openapi.programming-hero.com/api/plants")
            .then(res => res.json())
            .then(json => {
                console.log(json.plants)
                displayCards(json.plants)
            });
        }
loadCards();
const cartData = [];
const displayCards = (trees) => {
    const treeCards = document.getElementById("tree-cards");
    treeCards.innerHTML="";
    for(let tree of trees){
        const treeCardDiv = document.createElement("div");
        treeCardDiv.innerHTML=`
            <div class="tree-card rounded-2xl shadow-lg p-5 bg-white space-y-3 h-full w-fit">
                <img class="w-full h-40 object-cover rounded-md" src="${tree.image}" alt="">
                <h1 class="tree-name font-bold text-lg">${tree.name}</h1>
                <p class="text-sm">${tree.description}</p>
                <div class="flex items-center justify-between">
                    <p class="bg-[#DCFCE7] text-[#15803D] text-center px-3 py-2 rounded-2xl">${tree.category}</p>
                    <p class="tree-price font-bold"> ৳<span class="price">${tree.price}</span></p>
                </div>
                <button class="add-to-cart btn w-full rounded-3xl bg-green-700 text-white">Add to cart</button>
            </div>
        `
        treeCards.appendChild(treeCardDiv);
    }
    // cart-functionality
    document.querySelectorAll(".add-to-cart").forEach(function(el) {
        el.addEventListener("click", function() {
            const card = el.closest(".tree-card");
            const treeName = card.querySelector(".tree-name").innerText;
            const treePrice = card.querySelector(".tree-price").innerText;
            const price = card.querySelector(".price").innerText;
            const cartContainer = document.getElementById("cart-container");
            const data = {
                name: treeName,
                price: treePrice,
            };
            cartData.push(data);
            cartContainer.innerText = "";
            for(const data of cartData){
                const div = document.createElement("div");
                div.innerHTML = `
                        <div class="flex justify-between items-center border bg-gray-300 rounded-2xl p-2">
                            <div>
                                <h1>${data.name}</h1>
                                <p>${data.price}</p>
                            </div>
                            <div id="cancel-cart">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </div>
                        </div>
                        `
                    cartContainer.appendChild(div);
            }

            let totalPrice = parseInt(document.getElementById("total-price").innerText);
            console.log(totalPrice)
            totalPrice += parseInt(price);
            document.getElementById("total-price").innerText = totalPrice;
        });
    });
}