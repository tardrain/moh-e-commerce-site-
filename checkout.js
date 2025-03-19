document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutContainer = document.getElementById("checkout-items");

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p>No items in cart.</p>";
    } else {
        cart.forEach(item => {
            let listItem = document.createElement("p");
            listItem.innerText = `${item.name} - KSH ${item.price}`;
            checkoutContainer.appendChild(listItem);
        });
    }

    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        alert("✅ Thanks for your purchase! Your order is on the way. 🚚");

        localStorage.removeItem("cart"); // Clear cart after order
        window.location.href = "index.html"; // Redirect to homepage
    });
});
