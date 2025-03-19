document.addEventListener("DOMContentLoaded", function () {
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartContainer || !cartTotal) {
        console.error("⚠️ Cart elements not found! Check your HTML structure.");
        return;
    }

    function updateCartUI() {
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                let imageSrc = item.image || "default.jpg";  // Fallback image

                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${imageSrc}" alt="${item.name}" width="50">
                    <p>${item.name} - KSH ${item.price} (x${item.quantity})</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            });

            cartTotal.innerText = total.toFixed(2);
        }

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }

    updateCartUI();
});
