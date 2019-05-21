const selectors = {
  cartLink: '[data-cart-link]',
  cartDrawer: '.cart-drawer',
  cartDrawerInner: '.cart-drawer__inner',
  cartDrawerClose: '[data-cart-close]',
  cartItemRemove: '[data-remove-cart-item]',
  cartDrawerItems: '.cart-drawer__items',
  cartCount: '.cart-count',
}

//cart drawer open
$('[data-cart-link]').click(function(e){
  e.preventDefault()
  openCart()
});


//cart drawer close
$('[data-cart-close]').click(function(){
  console.log("clicked")
  closeCart();
});

$('.cart-drawer').click(function(e){
  // console.log($(e.target).data("cart-drawer-outer"))
  if ($(e.target).data("cart-drawer-outer")) {
    e.preventDefault()
    closeCart()
  } 
});

$(selectors.cartItemRemove).click((e) => {
  // e.preventDefault();
  console.log("clicked")
  var lineItemNumber = $(e.currentTarget).data('line-number');
  var quantity = 0;
  $.ajax({
    url: "/cart/change.js",
    type: 'POST',
    dataType: 'JSON',
    data: { quantity: quantity, line: lineItemNumber},
    success: function() {
      refreshCart()
    }
  })
});

function refreshCartButtons(){
  $(selectors.cartDrawerClose).click((e) => {
    e.preventDefault();
    closeCart();
  })

  $(selectors.cartItemRemove).click((e) => {
    // e.preventDefault();
    console.log("clicked")
    var lineItemNumber = $(e.currentTarget).data('line-number');
    var quantity = 0;
    $.ajax({
      url: "/cart/change.js",
      type: 'POST',
      dataType: 'JSON',
      data: { quantity: quantity, line: lineItemNumber},
      success: function() {
        refreshCart()
      }
    })
  })
}



function addItem(form_id) {
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    data: $('#'+form_id).serialized(),
    success: console.log(form_id)
  });
}

window.ajaxAddItemToCart = function(id, properties = null) {
  var text = $.ajax({
    url: "/cart/add.js",
    type: 'POST',
    dataType: 'JSON',
    data: id,
    success: function(data) {
      console.log("Ajax worked")
      refreshCart();
    }
  })
}



// window.ajaxAddItemToCart = function(id, properties = null) {
//   var text = $.ajax({
//     url: "/cart/add.js",
//     type: 'POST',
//     dataType: 'JSON',
//     data: {
//       quantity: 1,
//       id: id,
//       properties: properties
//     },
//     success: function(data) {
//       console.log("Ajax worked")
//       refreshCart();
//     }
//   })
// }



window.openCart = function () {
  // $('.cart-drawer').css('transform', 'translateX(0px)');
  $('.cart-drawer').css('z-index', '1000');
  $('.cart-drawer').css('background-color', 'rgba(0, 0, 0, 0.7)');
  $('.cart-drawer__inner').css('transform', 'translateX(0px)');
  $('body').addClass('scroll-lock');
  $('.cart-drawer__inner').css('z-index', '1200');
}

window.closeCart = function () {
  $('.cart-drawer__inner').css('transform', 'translateX(100%)');
  $('.cart-drawer').css('z-index', '-1');
  $('.cart-drawer__inner').css('z-index', '-1');
  $('body').removeClass('scroll-lock');
  $('.cart-drawer').css('background-color', 'transparent');
}

window.refreshCart = function() {
  $.ajax({
    url: "/account/login",
    type: 'GET',
    success: function(data) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = data;
      console.log(wrapper)
      var cartInnerHtml = wrapper.querySelector('.cart-drawer__inner').innerHTML;
      var cartItemCount = wrapper.querySelector('.cart-count');
      if(cartItemCount != undefined) {
        var cartCount = ""
      } else {
        var cartCount = cartItemCount.innerHTML
      }
      $(selectors.cartCount).html(cartItemCount);
      $(selectors.cartDrawerInner).html(cartInnerHtml);
      openCart();
      refreshCartButtons();
    }
  })
}

// window.openCart()






