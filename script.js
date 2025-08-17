// grid elem
const grid = document.querySelector(".grid");

// api url
const url = "https://fakestoreapi.com/products";

// --- GET REQUEST ---
async function fetchProducts() {
    const res = await fetch(url);
    const products = await res.json();
    console.log(products);

    grid.innerHTML = "";

    products.forEach(product => {
        grid.innerHTML += `
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
                        <span class="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
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
                    class="edit-btn absolute top-2 right-2 bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </div>
        `
    })
}

fetchProducts();
