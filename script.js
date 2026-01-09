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

