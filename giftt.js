document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', sendToWhatsApp);
    }
});

function sendToWhatsApp() {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const items = document.getElementById('items').value.trim();
    const customization = document.getElementById('customization').value.trim();

    // Validate required fields
    if (!name || !phone || !address || !items) {
        alert("Please fill in all required fields");
        return;
    }

    // Format WhatsApp message
    const message = `*CUSTOM ORDER REQUEST*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n\n` +
                   `*Delivery Address:*\n${address}\n\n` +
                   `*Items:*\n${items}\n\n` +
                   (customization ? `*Customization:*\n${customization}\n\n` : '') +
                   `Please confirm this order. Thank you!`;

    // Replace with your WhatsApp number (with country code, no + or 0)
    const whatsappNumber = "0112840674";
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    window.open(`https://wa.me/${+254112840674}?text=${encodedMessage}`, '_blank');
}