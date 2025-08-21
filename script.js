// grid elem
const grid = document.querySelector(".grid");
const delElem = document.querySelector(".delete")

// api url
const X_MASTER_KEY = "$2a$10$65sSZHRQj2MnXDJh1QMONOtEEnKqxPbRxi/VAkz4.Z2S4MjMvR0KC";
const BIN_ID = "68a321d943b1c97be92188ed";
const url = "https://api.jsonbin.io/v3/b";

// Add Modal elements
const prodAddModal = document.getElementById("prodAddModal");
const addId = document.getElementById("addId");
const addTitle = document.getElementById("addTitle");
const addPrice = document.getElementById("addPrice");
const addCategory = document.getElementById("addCategory");
const addImage = document.getElementById("addImage");
const addDescription = document.getElementById("addDescription");

// Edit Modal elements
const prodEditModal = document.getElementById("prodEditModal");
const editId = document.getElementById("editId");
const editTitle = document.getElementById("editTitle");
const editPrice = document.getElementById("editPrice");
const editCategory = document.getElementById("editCategory");
const editImage = document.getElementById("editImage");
const editDescription = document.getElementById("editDescription");

// open add modal
function addProdModal() {
    prodAddModal.classList.remove("hidden");

}

// open edit modal
function editProdModal(product) {
    prodEditModal.classList.remove("hidden");

    editId.value = product.dataset.id;
    editTitle.value = product.dataset.title;
    editPrice.value = product.dataset.price;
    editCategory.value = product.dataset.category;
    editImage.value = product.dataset.image;
    editDescription.value = product.dataset.description;
}

// close modal
function closeModal() {
    prodEditModal.classList.add("hidden");
    prodAddModal.classList.add("hidden");
}

// --- Manual POST REQUEST ---
// async function postData() {
//     const fetchData = await fetch('https://fakestoreapi.com/products')
//     const finalData = await fetchData.json()
//     console.log("Final Data:-", finalData)

//     const postData = await fetch(`${url}/${BIN_ID}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "X-MASTER-KEY": X_MASTER_KEY,
//         },
//         body: JSON.stringify(finalData)
//     })

//     console.log("Posted Data:-", postData)
// }

// --- READ REQUEST --- (fetch from JSONBin)
async function fetchProducts() {
    try {
        const getRes = await fetch(`${url}/${BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-MASTER-KEY": X_MASTER_KEY
            }
        });

        if (!getRes.ok) {
            console.log("issue with GET request:-", getRes.status);
            return;
        }

        const data = await getRes.json();
        const products = data.record;
        console.log("Fetched from JSONBin:-", products);

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
                        ⭐ ${product.rating?.rate || 0}/5 <span class="text-gray-500">(${product.rating?.count || 0} ratings)</span>
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

                    <!-- Delete Button -->
                    <button
                        onclick="delProduct(${product.id})"
                        class="delete-btn absolute top-2 left-2 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>

                    <!-- Edit Button -->
                    <button
                        data-id="${product.id}"
                        data-title="${product.title}"
                        data-price="${product.price}"
                        data-category="${product.category}"
                        data-image="${product.image}"
                        data-description="${product.description}"
                        onclick="editProdModal(this)"
                        class="edit-btn absolute top-2 right-2 bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>
                `;
            grid.innerHTML += productHTML;
        });

    } catch (error) {
        console.log("Error Fetching products:-", error);
    }
}
fetchProducts();

// --- UPDATE REQUEST ---
editForm.addEventListener("submit", async function updateProduct(e) {
    e.preventDefault();

    const productValue = {
        id: parseInt(editId.value),
        title: editTitle.value,
        price: editPrice.value,
        category: editCategory.value,
        image: editImage.value,
        description: editDescription.value,
    };

    try {
        // 1. Fetch latest products
        const res = await fetch(`${url}/${BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-MASTER-KEY": X_MASTER_KEY
            }
        });

        if (!res.ok) {
            console.log("Error finding product:-", res.status);
            return;
        }

        const data = await res.json();
        const products = data.record;

        // 2. Find the product by ID and Update
        const index = products.findIndex(p => p.id == productValue.id);
        if (index !== -1) {
            products[index] = { ...products[index], ...productValue };
        } else {
            console.log("Product not found for update...");
            return;
        }

        // 3. save the Array back to JSONBin
        const updateRes = await fetch(`${url}/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-MASTER-KEY": X_MASTER_KEY,
            },
            body: JSON.stringify(products)
        });

        if (!updateRes.ok) {
            console.log("issue with PUT request:-", updateRes);
            return;
        }

        console.log("Updating the product...")

        const updatedProduct = await updateRes.json();
        console.log("Updated product:-", products[index]);

        // closing modal
        closeModal();
        fetchProducts();
    } catch (error) {
        console.log("Error updating data:-", error);
    }
});

// --- CREATE REQUEST ---
addForm.addEventListener("submit", async function addProduct(e) {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        title: addTitle.value,
        price: addPrice.value,
        category: addCategory.value,
        image: addImage.value,
        description: addDescription.value,
        rating: {
            rate: (Math.random() * 5).toFixed(1),
            count: Math.floor(Math.random() * 500) + 1
        }
    }

    try {
        // 1. Fetch latest products
        const res = await fetch(`${url}/${BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-MASTER-KEY": X_MASTER_KEY,
            }
        })

        if (!res.ok) {
            console.log("Issue with GET request:-", res.status)
            return
        }

        const data = await res.json();
        const products = data.record;

        // 2. Push new Product
        products.push(newProduct)

        // 3. save the Array back to JSONBin
        const addRes = await fetch(`${url}/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-MASTER-KEY": X_MASTER_KEY,
            },
            body: JSON.stringify(products)
        })

        if (!addRes.ok) {
            console.log("Issue with CREATE request:-", addRes)
            return
        }
        console.log("Product added successfully:-", newProduct)

        closeModal();
        fetchProducts();
        addForm.reset();

    } catch (error) {
        console.log("Error creating Product:-", error)
    }
})
// --- DELETE REQUEST ---
async function delProduct(id) {
    try {
        // 1. Fetch all products
        const res = await fetch(`${url}/${BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": X_MASTER_KEY,
            }
        });

        const data = await res.json();
        let products = data.record;

        // 2. Remove the product
        products = products.filter(p => p.id !== id);

        // 3. Update products back to bin
        const putRes = await fetch(`${url}/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": X_MASTER_KEY,
            },
            body: JSON.stringify(products)
        });

        if (!putRes.ok) {
            console.log("Issue with DELETE request:-", putRes);
            return;
        }

        console.log(`Deleted product with id ${id}`);
        fetchProducts();
    } catch (error) {
        console.log("Error deleting product:-", error);
    }
}
