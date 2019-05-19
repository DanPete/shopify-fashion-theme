const selectors = {
  cartLink: '[data-cart-link]',
  cartDrawer: '.cart-drawer',
  cartDrawerInner: '.cart-drawer__inner',
  cartDrawerClose: '[data-cart-close]',
  cartItemRemove: '[data-remove-cart-item]',
  cartDrawerItems: '.cart-drawer__items',
  cartCount: '.cart-count',
  submitButton: '[data-submit-button]',
  productForm: '[data-product-form]'
}


$('[data-cart-link]').click(function(e){
  e.preventDefault()
  openCart()
});

$('[data-cart-close]').click(function(){
  closeCart();
});

$('.cart-drawer').click(function(e){
  // console.log($(e.target).data("cart-drawer-outer"))
  if ($(e.target).data("cart-drawer-outer")) {
    e.preventDefault()
    closeCart()
  } 
})

$(selectors.submitButton).click(function(e) {
  e.preventDefault();
  console.log($('#variant-id').val())
  console.log($(selectors.productForm).serialize())
  ajaxAddItemToCart($('#variant-id').val())
})

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
    data: {
      id: id,
      properties: properties
    },
    success: function(data) {
      console.log("Ajax worked")
      refreshCart();
    }
  })
}



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

// window.openCart()






