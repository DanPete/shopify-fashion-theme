import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';

const selectors = {
  productAddToCart: '[data-product-atc-button]',
  productForm: '[data-product-form]'
} 

$(selectors.productAddToCart).click(function(e) {
  console.log('add to cart');
  e.preventDefault();
  if(!$(this).hasClass('out-of-stock')) {
    const variantId = $(selectors.productForm).serialize()
    // const variantId = selectors.productForm.variant()['id'];
    ajaxAddItemToCart(variantId);
  }
})

console.log("It all works")