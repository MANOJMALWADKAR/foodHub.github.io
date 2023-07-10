'use strict'
//for Cookie section msg

// const header = document.querySelector('.header')

// const message = document.createElement('div');
// message.classList.add('cookie-message')

// message.innerHTML = ' Our website uses cookies to make your browsing experience better.  <button class= "btnc btn-close-cookie"> Got it</button>';

// header.before(message)

// document.querySelector('.btn-close-cookie').addEventListener('click', function () {
//   message.remove();
// })
// console.log(message)

//Cookie Section End


//  for shopping cart

let cart = document.querySelector('.cart-container');

document.querySelector('#shop-cart').onclick = () => {
  cart.classList.toggle('active');
  form.classList.remove('active');
  navbar.classList.remove('active');

}


// login form  

let form = document.querySelector('.login-container');

document.querySelector('#login-btn').onclick = () => {
  form.classList.toggle('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
}

// navbar

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  cart.classList.remove('active');
  form.classList.remove('active');

}

// when we scroll main page content menu will be removed

window.onscroll = () => {
  navbar.classList.remove('active');
}

// food slider


var swiper = new Swiper(".food-content", {
  loop: true,
  grabCursor: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    268: {
      slidesPerView: 2,
    },
    391: {
      slidesPerView: 3,
    },

    491: {
      slidesPerView: 4,
    },

    591: {
      slidesPerView: 5,
    },


  },
});

//Shop-CArt
const closeItems = document.querySelectorAll('.fa-times');
// for (let i = 0; i < closeItems.length; i++) {
//   let button = closeItems[i];
//   button.addEventListener('click', removeCartitems)
// }

closeItems.forEach((item, index) => {
  let button = closeItems[index];
  button.addEventListener('click', removeCartitems)
})

let quantityInputs = document.getElementsByClassName('cart-quantity')
for (let i = 0; i < quantityInputs.length; i++) {
  let inputs = quantityInputs[i];
  inputs.addEventListener('change', quantityChanged)
}


function removeCartitems(e) {
  let buttonClicked = e.target
  buttonClicked.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function updateCartTotal() {
  let cartContainer = document.getElementsByClassName('box-container')[0];
  let cartRows = cartContainer.getElementsByClassName('box')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
    let cartrow = cartRows[i];
    let priceElement = cartrow.getElementsByClassName('price')[0]
    let quantityElement = cartrow.getElementsByClassName('cart-quantity')[0]
    // console.log(priceElement, quantityElement)
    let price = parseFloat(priceElement.innerText.replace("$", ""))
    let quantity = quantityElement.value
    total = total + (price * quantity)

  }
  total = +total.toFixed(2)
  // console.log(total)
  document.querySelector('.total').innerText = `Total : $${total}`

}

const addToCartButtons = document.querySelectorAll('.fa-plus');
// for (let i = 0; i < addToCartButtons.length; i++) {
//   let button = addToCartButtons[i];
//   button.addEventListener('click', addToCartClicked)
// }

addToCartButtons.forEach((items, index) => {
  let button = addToCartButtons[index];
  button.addEventListener('click', addToCartClicked)
})

function addToCartClicked(e) {
  let button = e.target;
  let shopItems = button.parentElement.parentElement;
  let title = shopItems.querySelectorAll('.p')[0].innerText;
  let price = shopItems.querySelectorAll('.flex-container')[0].innerText
  let imgSrc = shopItems.querySelectorAll('.dish_image img')[0].src
  console.log(title, price, imgSrc)
  addItemsToCart(title, price, imgSrc);
  updateCartTotal()
}

function addItemsToCart(title, price, imgSrc) {
  let cartBox = document.createElement('div')
  cartBox.classList.add('box')
  let cartItems = document.querySelectorAll('.box-container')[0]

  let cartItemsNames = cartItems.getElementsByClassName('cart_title')
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('already added to cart')
      return
    }
  }

  let cartBoxContent = `<i class="fas fa-times"></i>
  <img src="${imgSrc}" alt="">
  <div class="content">
      <h3 class="cart_title">${title}</h3>
      <span>quantity : </span>
      <input class="cart-quantity" type="number" value="1" id="">
      <br>
      <span> price : </span>
      <span class="price"> ${price} </span>
  </div>`

  cartBox.innerHTML = cartBoxContent;
  cartItems.append(cartBox);
  cartBox.querySelectorAll('.fa-times')[0].addEventListener('click', removeCartitems)
  cartBox.querySelectorAll('.cart-quantity')[0].addEventListener('change', quantityChanged)
}


document.getElementsByClassName('pay')[0].addEventListener('click', purchaseClicked)

function purchaseClicked() {
  alert('Thank you for purchasing Food')
  let cartItems = document.getElementsByClassName('box-container')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}


// Slider
const slider = document.querySelector('.review_section');
const slide = document.querySelectorAll('.review_slider')
const btn_left = document.querySelector('.slider__btn--left')
const btn_right = document.querySelector('.slider__btn--right')

let curSlide = 0;
let maxSlide = slide.length;

const gotoSlide = function (slides) {
  slide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slides)}%)`
  })
}
gotoSlide(0)

const nextSlide = function () {
  curSlide = (curSlide + 1) % maxSlide;
  // if (curSlide === maxSlide - 1) {
  //   curSlide = 0
  // } else {
  //   curSlide++;
  // }
  gotoSlide(curSlide)
  activaeDot(curSlide)
}

const prevSlide = function () {
  curSlide = (curSlide + maxSlide - 1) % maxSlide;
  // if (curSlide === 0) {
  //   curSlide = maxSlide - 1
  // } else {
  //   curSlide--;
  // }
  gotoSlide(curSlide)
  activaeDot(curSlide)
}

btn_left.addEventListener('click', prevSlide)
btn_right.addEventListener('click', nextSlide)

