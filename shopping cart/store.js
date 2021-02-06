let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'coffee cup',
        tag: 'coffeecup',
        price: 10,
        incart: 0
    },
    {
        name: 't-shirt',
        tag: 't-shirtpolo',
        price: 49,
        incart: 0
    },
    {
        name: 'ring light',
        tag: 'ringlight',
        price: 15,
        incart: 0
    },
    {
        name: 'bagTommy',
        tag: 'sac',
        price: 74,
        incart: 0
    },

]
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers() {
    let productsNumbers = localStorage.getItem('cartNumbers');

    if (productsNumbers) {
        document.querySelector('.cart span').textContent = productsNumbers;
    }
}

function cartNumbers(product) {
    console.log("The product clicked is", product);
    let productsNumbers = localStorage.getItem('cartNumbers');

    productsNumbers = parseInt(productsNumbers);

    if (productsNumbers) {
        localStorage.setItem('cartNumbers', productsNumbers + 1);
        document.querySelector('.cart span').innerText = productsNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').innerText = 1;
    }
    cartNumbers(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
    setItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products-container");

    console.log(cartItems);
    if (cartItems && productsContainer) {
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./${item.tag}.jpg" class="img-cart">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price},00</div>
            <div class="quantity">
            <ion-icon name="caret-back-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart*item.price},00
            </div>
            </div>
            `;

        });
    }




}

onLoadCartNumbers()
displayCart();