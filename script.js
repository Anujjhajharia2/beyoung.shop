
  document.addEventListener("DOMContentLoaded", () => {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartIcon = document.querySelector(".fa-shopping-cart");

      if (cartIcon) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        let badge = document.getElementById("cart-count");
        if (!badge) {
          badge = document.createElement("span");
          badge.id = "cart-count";
          badge.style.cssText = `
            background: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            position: absolute;
            top: 0;
            right: -10px;
          `;
          cartIcon.style.position = "relative";
          cartIcon.appendChild(badge);
        }
        badge.textContent = count;
      }
    }

    function addToCart(product) {
      console.log("🚨 addToCart called with:", product); // for debug
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.title === product.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();

      alert("✅ Product added to cart!");
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
      if (!button.classList.contains("listener-added")) {
        button.addEventListener("click", () => {
          const productCard = button.closest(".product-card");
          const title = productCard.querySelector("h3, h4")?.innerText || "Unknown";
          const price = productCard.querySelector(".price, strong")?.innerText || "₹0";
          const image = productCard.querySelector("img")?.getAttribute("src") || "";
          const product = { title, price, image };
          addToCart(product);
        });
        button.classList.add("listener-added");
      }
    });

    updateCartCount();
  });

