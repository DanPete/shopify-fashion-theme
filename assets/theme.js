$('.btn.edit-address').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').show();
    $(this).siblings('.btn.edit-address-cancel').show();
    $(this).siblings('.btn.edit-address-submit').show();
    $(this).siblings('.btn.delete-address').hide();
    $(this).parents('td').siblings('.address-record').hide()
  });
  
  $('.btn.edit-address-submit').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').hide();
    $(this).siblings('.btn.edit-address-cancel').hide();
    $(this).siblings('.btn.edit-address').show();
    $(this).siblings('.btn.delete-address').show();
    $(this).parents('td').siblings('.address-record').show()
  });
  
  $('.btn.edit-address-cancel').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').hide();
    $(this).siblings('.btn.edit-address-submit').hide();
    $(this).siblings('.btn.edit-address').show();
    $(this).siblings('.btn.delete-address').show();
    $(this).parents('td').siblings('.address-record').show()
  });
  
  $('.carousel').carousel()
  
  $('.single-product-images').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data('thumb');
      return `<a><img class="img-fluid" src=${thumb} /></a>`;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
         // TODO maybe change this?? slidesToShow: 3, slidesToScroll: 3
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  function getVariantFromOptions() {
    let variantArr = []
    $(".product-category select").map(function(i, el) {
      variant = {value: $(el).val(), index: $(el).data('index')};
      variantArr.push(variant)
    });
    return variantArr;
  }
  
  function updateHistoryState(variant) {
    if (!history.replaceState || !variant) {
      return;
    }
  
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?variant=' +
      variant.id;
    
    window.history.replaceState({ path: newurl }, '', newurl);
  }
  
  $('.product-category select').on('change', function() {
    var selectedValues = getVariantFromOptions();
    var variants = window.product.variants;
    
    // Search for product variants based on what was selected in the dropdowns
    var found = _.find(variants, function(variant) {
      return selectedValues.every(function(values) {
        return _.isEqual(variant[values.index], values.value);
      });
    });
    updateHistoryState(found)
    $('#variant-id').val(found.id)
  });
  
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $('nav').addClass('shrink');
    } else {
      $('nav').removeClass('shrink');
    }
  });

  $(window).scroll(function() {
    if ($(document).scrollTop() > 1) {
      $('.header').addClass('scroll');
    } else {
      $('.header').removeClass('scroll');
    }
  });

  /* Open and Close Drawers with Mobile Menus */

  document.querySelector('[data-mobile-menu-open]').addEventListener("click", function() {
    document.getElementById('mobile-menu').style.transform = "translateX(0px)"
    document.body.classList.add("scroll-lock")
  });

  $('[data-mobile-menu-close]').click(function () {
    $('.mobile-menu').css('transform', 'translateX(-125%)')
    $('.mobile-menu__mega-menu').css('transform', 'translateX(-125%)')
    
  });

  // document.querySelectorAll('[data-mobile-menu-close]').addEventListener("click", function() {
  //   console.log(document.getElementById('mobile-menu').style)
  //   document.getElementById('mobile-menu').style.transform = "translateX(-125%)"
  //   document.getElementById('mobile-menu__mega-menu').style.transform = "translateX(-125%)"
  //   document.body.classList.remove("scroll-lock")
  // });

  document.querySelector('[data-submenu-link]').addEventListener("click", function(e) {
    e.preventDefault()
    document.getElementById('mobile-menu__mega-menu').style.transform = "translateX(0px)"
  });

  $('[data-mobile-menu-back]').click(function(){
    $('.mobile-menu__mega-menu').css('transform', 'translateX(-125%)')
  });