let cart = [];
let totalPrice = 0;
let currentQuantity = 1;
const itemPrice = 125.00; 


function updateQuantity(amount) {
    currentQuantity += amount;
    if (currentQuantity < 1) currentQuantity = 1; 
    document.getElementById('quantity').innerText = currentQuantity;
}


function addToCart() {
    const item = {
        name: 'Fall Limited Edition Sneakers',
        price: itemPrice,
        quantity: currentQuantity
    };
    
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push(item);
    }


    totalPrice += itemPrice * currentQuantity;


    updateCartDisplay();

    currentQuantity = 1;
    document.getElementById('quantity').innerText = currentQuantity;
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `<div class="cart">
            <span><img src="shoe1.png" style="height:80px;width:80px;"></img></span>
            <span style="color:grey;text-align:center;">${item.name} x ${item.quantity}</span>
            <span><button onclick="removeItemFromCart('${item.name}')"><img src="icon-delete.svg"></img></button></span></div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    
    totalPriceElement.innerText = totalPrice.toFixed(2);

    
    document.getElementById('cart-dropdown').style.display = 'block';
}

document.querySelector('.cart-icon').addEventListener('click', function () {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});


function removeItemFromCart(itemName) {
    const itemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        totalPrice -= item.price * item.quantity;
        cart.splice(itemIndex, 1); 
    }
    updateCartDisplay();
}
