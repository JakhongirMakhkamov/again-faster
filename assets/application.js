// Put your application javascript here

$(document).ready(function () {
  const priceContainer = $("#product-cost");
  const variantRadio = $(".variant-radio");

  $(variantRadio).on("click", function () {
    let data = $(this).attr("data-variant-price");
    priceContainer.text(data);
  });

  // Ajax Cart

  const addToCartFormSelector = "#AddToCartForm";
  const ajaxCart = $(".cart-ajax");
  const miniCartContentSelector = ".js-mini-cart-contents";

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
    let miniCartFieldset = $(miniCartContentSelector + " .js-cart-fieldset");

    miniCartFieldset.prop("disabled", true);

    $.ajax({
      type: "GET",
      url: "/cart",
      context: document.body,
      success: function (context) {
        let dataCartContents = $(context).find(".js-cart-contents");
        let dataCartHtml = dataCartContents.html();
        let dataCartItemCount = dataCartContents.attr("data-cart-item-count");
        let miniCartContents = $(miniCartContentSelector);
        let cartItemCount = $(".js-cart-item-count");

        // console.log(dataCartHtml);
        // console.log("//////");

        cartItemCount.text(dataCartItemCount);
        miniCartContents.html(dataCartHtml);

        // console.log(miniCartContents);

        if (parseInt(dataCartItemCount) > 0) {
          openCart();
        } else {
          closeCart();
        }
      },
    });
  };

  const onError = function (XMLHttpRequest, textStatus) {
    let data = XMLHttpRequest.responseJSON;
    alert(data.status + " - " + data.message + ": " + data.description);
  };

  const onCartButtonClick = function (e) {
    e.preventDefault();

    let isCartOpen = ajaxCart.hasClass("active");

    if (!isCartOpen) {
      openCart();
    } else {
      closeCart();
    }
  };

  const openCart = function () {
    ajaxCart.addClass("active");
  };

  const closeCart = function () {
    ajaxCart.removeClass("active");
  };

  $(document).on("submit", addToCartFormSelector, onAddToCart);
  $(document).on("click", ".js-cart-link, .ajax__close-btn", onCartButtonClick);

  // Cart Quantity Fields

  let quantityFieldSelector = ".js-quantity-field";
  let quantityButtonSelector = ".js-quantity-button";
  let quantityPickerSelector = ".js-quantity-picker";

  const onQuantityButtonClick = function () {
    let button = $(this);
    let picker = button.closest(quantityPickerSelector);
    let quantity = picker.find(".js-quantity-field");
    let quantityValue = parseInt(quantity.val());
    let max = quantity.attr("max") ? parseInt(quantity.attr("max")) : null;

    if (
      button.hasClass("plus") &&
      (max === "null" || quantityValue + 1 <= max)
    ) {
      quantity.val(quantityValue + 1).change();
    } else if (button.hasClass("minus")) {
      quantity.val(quantityValue - 1).change();
    }
  };

  const onQuantityChange = function () {
    let field = $(this);
    let picker = field.closest(quantityPickerSelector);
    let quantityText = picker.find(".js-quantity-text");
    let disableMinus = parseInt(this.value) === parseInt(field.attr("min"));
    let disablePlus = parseInt(this.value) === parseInt(field.attr("max"));
    let minusButton = picker.find(".js-quantity-button.minus");
    let plusButton = picker.find(".js-quantity-button.plus");

    quantityText.text(this.value);

    if (disableMinus) {
      minusButton.prop("disabled", true);
    } else if (minusButton.prop("disabled") === true) {
      minusButton.prop("disabled", false);
    }

    if (disablePlus) {
      plusButton.prop("disabled", true);
    } else if (plusButton.prop("disabled") === true) {
      plusButton.prop("disabled", false);
    }
  };

  $(document).on("click", quantityButtonSelector, onQuantityButtonClick);
  $(document).on("change", quantityFieldSelector, onQuantityChange);

  // Cart Line Items

  let removeLineSelector = ".js-remove-line";
  let lineQuantitySelector = ".js-line-quantity";

  const isInMiniCart = function (el) {
    let element = $(el);
    let miniCart = element.closest(miniCartContentSelector);
    let isInMiniCart = miniCart.length !== 0;

    return isInMiniCart;
  };

  const onLineQuantityChange = function () {
    let quantity = this.value;
    let id = $(this).attr("id").replace("updates_", "");
    let changes = {
      quantity,
      id,
    };
    let checkMiniCart = isInMiniCart(this);

    if (checkMiniCart) {
      $.post("/cart/change.js", changes, onCartUpdate, "json");
    }
  };

  const onLineRemoved = function (e) {
    let checkMiniCart = isInMiniCart(this);

    if (checkMiniCart) {
      e.preventDefault();

      console.log(e);

      let removeLink = $(this);
      let removeQuery = removeLink.attr("href").split("change?")[1];

      $.post("/cart/change.js", removeQuery, onCartUpdate, "json");
    }
  };

  $(document).on("click", removeLineSelector, onLineRemoved);
  $(document).on("change", lineQuantitySelector, onLineQuantityChange);
});
