/* ============================================
   HERBAMOUR MEDAN - VANILLA JS
   ============================================ */

// Product Data
const products = [
    {
        id: 1,
        name: "Gluwi Collagen",
        category: "herbal",
        price: 115000,
        image: "assets/images/product-2.png",
        description: "Suplemen kolagen premium untuk kecantikan kulit dari dalam",
        bpom: true,
        halal: true
    },
    {
        id: 2,
        name: "Gentle Facial Wash",
        category: "skincare",
        price: 115000,
        image: "assets/images/product-3.png",
        description: "Pembersih wajah lembut dengan ekstrak herbal alami",
        bpom: true,
        halal: true
    },
    {
        id: 3,
        name: "DNA Salmon Sunscreen SPF 50",
        category: "skincare",
        price: 145000,
        image: "assets/images/product-4.png",
        description: "Tabir surya premium dengan ekstrak DNA Salmon",
        bpom: true,
        halal: true
    },
    {
        id: 4,
        name: "Deep Cleansing Oil",
        category: "skincare",
        price: 115000,
        image: "assets/images/product-5.png",
        description: "Minyak pembersih mendalam untuk double cleansing",
        bpom: true,
        halal: true
    },
    {
        id: 5,
        name: "Acne Care Serum",
        category: "skincare",
        price: 115000,
        image: "assets/images/product-6.png",
        description: "Serum perawatan jerawat dengan formula herbal",
        bpom: true,
        halal: true
    },
    {
        id: 6,
        name: "Nondja Mengkudu",
        category: "herbal",
        price: 115000,
        image: "assets/images/product-7.png",
        description: "Ekstrak buah mengkudu untuk kesehatan dan imunitas",
        bpom: true,
        halal: true
    },
    {
        id: 7,
        name: "Ramcin Herbal",
        category: "herbal",
        price: 113000,
        image: "assets/images/product-8.png",
        description: "Rimpang herbal untuk diet dan kesehatan pencernaan",
        bpom: true,
        halal: true
    },
    {
        id: 8,
        name: "Herbal Essence Serum",
        category: "skincare",
        price: 125000,
        image: "assets/images/product-1.png",
        description: "Serum herbal premium untuk perawatan wajah harian",
        bpom: true,
        halal: true
    }
];

// Format Price
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close Mobile Menu on Link Click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Render Products
const renderProducts = (filter = 'all') => {
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badges">
                    ${product.bpom ? '<span class="badge-small badge-bpom">BPOM</span>' : ''}
                    ${product.halal ? '<span class="badge-small badge-halal">Halal</span>' : ''}
                </div>
                <div class="product-overlay">
                    <button class="btn btn-primary" onclick="openModal(${product.id})">
                        <i class="fas fa-shopping-bag"></i>
                        Lihat Detail
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn-wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const id = parseInt(card.dataset.id);
                openModal(id);
            }
        });
    });
};

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// Open Modal
const openModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-info">
                <div class="modal-category">${product.category}</div>
                <h2 class="modal-title">${product.name}</h2>
                <p class="modal-description">${product.description}</p>
                <div class="modal-badges">
                    ${product.bpom ? '<span class="badge-small badge-bpom">BPOM</span>' : ''}
                    ${product.halal ? '<span class="badge-small badge-halal">Halal</span>' : ''}
                </div>
                <div class="modal-price">${formatPrice(product.price)}</div>
                <a href="#kontak" class="btn btn-primary" onclick="closeModal()">
                    <i class="fas fa-phone"></i>
                    Pesan Sekarang
                </a>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close Modal
const closeModal = () => {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);

// Close modal on outside click
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Halo Herbamour Medan,%0A%0ANama: ${name}%0AKontak: ${contact}%0A%0APesan: ${message}`;
    const whatsappUrl = `https://wa.me/62812XXXXXXXX?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Initial reveal check
revealOnScroll();

// Reveal on scroll
window.addEventListener('scroll', revealOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Wishlist button click
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-wishlist')) {
        const btn = e.target.closest('.btn-wishlist');
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.backgroundColor = '#e74c3c';
            btn.style.color = 'white';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }
    }
});

// Initialize
renderProducts();

// Console log
console.log('%cHerbamour Medan', 'color: #1a3c34; font-size: 24px; font-weight: bold;');
console.log('%cDistributor Resmi Produk Herbal', 'color: #c8a27a; font-size: 14px;');
