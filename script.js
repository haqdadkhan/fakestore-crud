// grid elem
const grid = document.querySelector(".grid");
// api url
////const url = "https://cacbaca778004faab3e8.free.beeceptor.com/api/users/";
const url = "https://fakestoreapi.com/products";

// Modal elements
const editId = document.getElementById("editId");
const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle")
const editPrice = document.getElementById("editPrice")
const editCategory = document.getElementById("editCategory")
const editImage = document.getElementById("editImage")
const editDescription = document.getElementById("editDescription")

// open modal
function openModal(product) {
    editModal.classList.remove("hidden")

    editId.value = product.dataset.id;
    editTitle.value = product.dataset.title;
    editPrice.value = product.dataset.price;
    editCategory.value = product.dataset.category;
    editImage.value = product.dataset.image;
    editDescription.value = product.dataset.description;
}

// close modal
function closeModal() {
    editModal.classList.add("hidden");
}

// --- GET REQUEST ---
async function fetchProducts() {
    try {
        console.log("Getting the products...")
        const res = await fetch(url);
        // guard clause
        if (!res.ok) {
            console.log("issue with GET request:-", res.status);
            return;
        }

        const products = await res.json();
        console.log("Fetched:-", products);

        // clearing the grid
        grid.innerHTML = "";
        products.forEach(product => {
            const productHTML =
                `
                <div class="product-card bg-white rounded-xl overflow-hidden relative border-2 border-indigo-100">
                    <!-- Product Image with Overlay -->
                    <div class="p-2 h-48 overflow-hidden relative">
                        <img src=${product.image} alt="Red Chillies"
                            class="w-full h-full object-contain">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    <!-- Product Info -->
                    <div class="p-2">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-md font-bold text-gray-800 truncate">${product.title}</h3>
                            <span class="text-md font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">$${product.price}</span>
                        </div>

                        <div class="text-sm mb-2">
                        ⭐ ${product.rating.rate}/5 <span class="text-gray-500">(${product.rating.count} ratings)</span>
                        </div>

                        <div class="mb-2">
                            <span class="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full capitalize">
                                ${product.category}
                            </span>
                        </div>

                        <p class="text-gray-600 mt-1 mb-4 text-sm truncate">
                            ${product.description}
                        </p>

                        <div class="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
                            <span>Product ID: ${product.id}</span>
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Available
                            </div>
                        </div>
                    </div>

                    <!-- Edit Button -->
                    <button
                        data-id="${product.id}"
                        data-title="${product.title}"
                        data-price="${product.price}"
                        data-category="${product.category}"
                        data-image="${product.image}"
                        data-description="${product.description}"
                        onclick="openModal(this)"

                        class="edit-btn absolute top-2 right-2 bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
                `
            // appending multiple products
            grid.innerHTML += productHTML;
        })

    } catch (error) {
        console.log("Error Fetching products:-", error);
    }
}

fetchProducts();


// --- POST REQUEST ---
// product = {
//     title: "Red Chillies",
//     price: 0.1,
//     description: "These chillies are red, and gives spicy taste.",
//     category: "Vegetables",
//     image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
//     // "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png"
//     rating: {
//         rate: 4.5,
//         count: 42
//     },
// }

// async function addProduct() {
//     const res = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(product)
//     })

//     if (!res.ok) {
//         console.log("issue with POST request:-", res)
//         return
//     }
//     const newProduct = await res.json();
//     console.log("Product created:-", newProduct);
// }


// --- PUT REQUEST ---
editForm.addEventListener("submit", async function updateProduct(e) {
    e.preventDefault();

    const productValue = {
        title: editTitle.value,
        price: editPrice.value,
        category: editCategory.value,
        image: editImage.value,
        description: editDescription.value,
    };

    try {
        console.log("Updating the product...")
        const res = await fetch(`${url}/${editId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productValue)
        })

        // guard clause
        if (!res.ok) {
            console.log("issue with PUT request:-", res);
            return;
        }

        const updatedProduct = await res.json();
        console.log("Updated product:-", updatedProduct)
    } catch (error) {
        console.log("Error updating data:-", error)
    }

    // calling to close the update modal
    closeModal()
})
