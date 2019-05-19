const productSelectors = {
  productAddToCart: '[data-product-atc-button]',
  productForm: '[data-product-form]'
} 

// $(productSelectors.productAddToCart).click(function(e) {
//   console.log('add to cart');
//   e.preventDefault();
//   if(!$(this).hasClass('out-of-stock')) {
//     const variantId = productSelectors.productForm.variant()['id'];
//     ajaxAddItemToCart(variantId);
//   }
// })