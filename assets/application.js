// Put your application javascript here

$(document).ready(function () {
  const priceContainer = $("#product-cost");
  const variantRadio = $(".variant-radio");

  $(variantRadio).on("click", function () {
    let data = $(this).attr("data-variant-price");
    priceContainer.text(data);
  });

  // Ajax Cart

  const ajaxCart = $("#cart-ajax");
  const closeAjaxCart = $(".ajax__close-btn");

  const onAddToCart = function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: $(this).serialize(),
      dataType: "json",
      success: onCartUpdate,
      error: onError,
    });
  };

  const onCartUpdate = function () {
    ajaxCart.addClass("active");
  };

  const onError = function (XMLHttpRequest, textStatus) {
    let data = XMLHttpRequest.responseJSON;
    alert(data.status + " - " + data.message + ": " + data.description);
  };

  const onAjaxCartClose = function () {
    ajaxCart.removeClass("active");
  };

  $(document).on("submit", "#AddToCartForm", onAddToCart);
  $(closeAjaxCart).on("click", onAjaxCartClose);
});
