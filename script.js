// Get elements
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const closeButton = document.getElementById("closeButton");

// Open menu when clicking ☰
menuButton.addEventListener("click", () => {
    menuOverlay.classList.add("active");
});

// Close menu when clicking X
closeButton.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
});
// Add to Cart Function
function addToCart(name, price, description, size, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find(item => 
    item.name === name && 
    item.size === size
  );

  if (existingItem) {
    // If the item exists, increase its quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // If the item doesn't exist, add it to the cart
    const product = { 
      name, 
      price: Number(price), 
      description, 
      size, 
      image,
      quantity: 1 // Default quantity is 1
    };
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Display Cart Items
// Display Cart Items
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const itemCount = document.getElementById('item-count');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    itemCount.textContent = '0 Items | KES 0.00';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    // Ensure price is treated as a number (fallback to 0 if invalid)
    const price = Number(item.price) || 0;
    const quantity = item.quantity || 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${item.description || ''}</p>
        
        <p>KES ${price.toFixed(2)} x ${quantity} = KES ${itemTotal.toFixed(2)}</p>
      </div>
      <div class="cart-item-actions">
        <button onclick="increaseQuantity(${index})">+</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });

  itemCount.textContent = `${cart.length} Item${cart.length !== 1 ? 's' : ''} | KES ${total.toFixed(2)}`;
}

// Increase Quantity
function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity = (cart[index].quantity || 1) + 1; // Increase quantity
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart display
  }
}

// Delete Item
function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    if (cart[index].quantity > 1) {
      // If quantity is more than 1, decrease it by 1
      cart[index].quantity -= 1;
    } else {
      // If quantity is 1, remove the item entirely
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart display
  }
}

// Send Order to WhatsApp
function sendOrderToWhatsApp() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Generate order summary
  let orderSummary = `*Order Details:*\n\n`;
  orderSummary += `*Name:* ${name}\n`;
  orderSummary += `*Address:* ${address}\n`;
  orderSummary += `*Phone:* ${phone}\n\n`;
  orderSummary += `*Items:*\n`;

  let total = 0;
  cart.forEach((item, index) => {
    orderSummary += `- ${item.name} (Size: ${item.size || 'N/A'}) - KES ${item.price.toFixed(2)}\n`;
    total += item.price;
  });

  orderSummary += `\n*Total:* KES ${total.toFixed(2)}`;

  // Encode the message for WhatsApp
  const encodedMessage = encodeURIComponent(orderSummary);

  // Replace with your WhatsApp number in international format
  const whatsappNumber = '+254712345678'; // Example: Kenyan number
  const whatsappUrl = `https://wa.me/${254112840674}?text=${encodedMessage}`;

    // Clear the cart
    localStorage.removeItem('cart');

    // Reset the form fields
    document.getElementById('checkout-form').reset();
  
  

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
}
