const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const revealEls = document.querySelectorAll('.reveal');
const tiltEls = document.querySelectorAll('[data-tilt]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealEls.forEach((el) => revealObserver.observe(el));

tiltEls.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 821) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
  // =========================
// REVEAL ON SCROLL
// tanpa ubah HTML
// =========================
const motionTargets = document.querySelectorAll(
  ".hero, .collection, .signature, .lookbook, .craft, .cta, footer, .product-card, .lookbook-card, .lookbook-feature, .signature-card"
);

motionTargets.forEach((el) => el.classList.add("motion-reveal"));

const motionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("motion-in");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

motionTargets.forEach((el) => motionObserver.observe(el));

// =========================
// HERO PARALLAX RING ONLY
// tanpa ubah layout
// =========================
const bagStage = document.querySelector(".bag-stage");
const silverRing = document.querySelector(".silver-ring");

if (bagStage && silverRing) {
  bagStage.addEventListener("mousemove", (e) => {
    const rect = bagStage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 10;
    const moveY = (y / rect.height - 0.5) * 10;

    silverRing.style.transform = `translate(calc(-50% + ${moveX * 0.4}px), calc(-50% + ${moveY * 0.4}px))`;
  });

  bagStage.addEventListener("mouseleave", () => {
    silverRing.style.transform = "translate(-50%, -50%)";
  });
}
});
