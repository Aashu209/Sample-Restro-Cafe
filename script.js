const isMenuPage = document.querySelector(".menu-section");
const isCartPage = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];



document.addEventListener("DOMContentLoaded", () => {
    /* ===================== */
    /* PAGE LOADER */
    /* ===================== */
    window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader")?.classList.add("hide");

        // show WhatsApp button AFTER loader
        document.querySelector(".whatsapp-float")?.classList.add("show");
        document.querySelector(".whatsapp-float")?.classList.remove("hidden");

    }, 1200);
});


    /* ===================== */
    /* STICKY NAV */
    /* ===================== */
    window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (!nav) return;
        nav.style.padding = window.scrollY > 50 ? "12px 8%" : "20px 8%";
    });

    /* ===================== */
    /* MENU IMAGE SLIDER */
    /* ===================== */
    const menuSlider = document.querySelector(".menu-slider");
    const menuNext = document.querySelector(".menu-slider-container .next");
    const menuPrev = document.querySelector(".menu-slider-container .prev");

    menuNext?.addEventListener("click", () => {
        menuSlider.scrollBy({ left: 340, behavior: "smooth" });
    });

    menuPrev?.addEventListener("click", () => {
        menuSlider.scrollBy({ left: -340, behavior: "smooth" });
    });

    /* ============================= */
    /* GALLERY LIGHTBOX (ZOMATO STYLE) */
    /* ============================= */

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");

    let currentIndex = 0;

    if (!galleryImages.length || !lightbox) return;

    /* Open lightbox */
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    /* Close */
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    /* Navigation */
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    });

    /* Keyboard support */
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "ArrowLeft") prevBtn.click();
            if (e.key === "Escape") closeBtn.click();
        }
    });

    /* Swipe support */
    let startX = 0;

    lightbox.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextBtn.click();
        if (endX - startX > 50) prevBtn.click();
    });
});

/* ============================= */
/* HORIZONTAL GALLERY – SMART SCROLL */
/* ============================= */

const galleryWrapper = document.querySelector(".gallery-wrapper");

if (galleryWrapper) {
    galleryWrapper.addEventListener(
        "wheel",
        (e) => {
            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);

            // 👉 Trackpad vertical scroll → allow page scroll
            if (absY > absX) {
                return; // DO NOT preventDefault
            }

            // 👉 Intentional horizontal scroll (mouse or trackpad)
            galleryWrapper.scrollBy({
                left: e.deltaX || e.deltaY,
                behavior: "smooth",
            });

            e.preventDefault(); // only block when horizontal intent
        },
        { passive: false }
    );
}

/* Testimonials  – AUto Slide */
    const track = document.getElementById("testimonialTrack");
    let index = 0;
    function slideTestimonials() {
        const cardWidth = document.querySelector(".testimonial-card").offsetWidth + 30;
        index++;

        if (index > track.children.length - 3) {
            index = 0;
        }

        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
    setInterval(slideTestimonials, 2000);

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon from bars to X when active
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});



if (isCartPage) {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">₹${item.price * item.qty}</p>
        </div>

        <div class="qty-controls">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
          <button class="remove-btn" onclick="removeItem(${i})">🗑</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cart-total").innerText = `Total: ₹${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

  window.changeQty = (i, d) => {
    cart[i].qty += d;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    renderCart();
  };

  window.removeItem = i => {
    cart.splice(i, 1);
    renderCart();
  };

  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = count;
  });
}
updateCartCount();
document.getElementById("whatsapp-order")?.addEventListener("click", () => {
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;
  const type = document.getElementById("order-type").value;

  if (!name || !phone) return alert("Fill details");

  let msg = "Hello Sample Restro Cafe ☕\n\nOrder:\n";
  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    msg += `• ${i.name} x ${i.qty}\n`;
  });

  msg += `\nTotal: ₹${total}\nType: ${type}\nName: ${name}\nPhone: ${phone}`;

  window.open(
    `https://wa.me/918260858269?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
});

// MENU + / - CONTROLS
document.querySelectorAll(".menu-card li").forEach(li => {
  const addBtn = li.querySelector(".add-btn");
  const qtyBox = li.querySelector(".qty-box");
  const qtyText = li.querySelector(".qty");
  const plus = li.querySelector(".qty-plus");
  const minus = li.querySelector(".qty-minus");

  const name = li.dataset.name;
  const price = Number(li.dataset.price);

  // Check if item already in cart
  const existing = cart.find(i => i.name === name);
  if (existing) {
    qtyText.innerText = existing.qty;
    addBtn.classList.add("hidden");
    qtyBox.classList.remove("hidden");
  }

  // ADD
  addBtn.addEventListener("click", () => {
    cart.push({ name, price, qty: 1 });
    qtyText.innerText = 1;
    addBtn.classList.add("hidden");
    qtyBox.classList.remove("hidden");
    syncCart();
  });

  // PLUS
  plus.addEventListener("click", () => {
    const item = cart.find(i => i.name === name);
    item.qty++;
    qtyText.innerText = item.qty;
    syncCart();
  });

  // MINUS
  minus.addEventListener("click", () => {
    const itemIndex = cart.findIndex(i => i.name === name);
    cart[itemIndex].qty--;

    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
      qtyBox.classList.add("hidden");
      addBtn.classList.remove("hidden");
    } else {
      qtyText.innerText = cart[itemIndex].qty;
    }
    syncCart();
  });
});
function syncCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
