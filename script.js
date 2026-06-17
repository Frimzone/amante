
// EmailJS init
(function initEmailJS(){
  try {
    emailjs.init('FH5NNYZlD3gbDkaFq');
  } catch (e) {
    console.error('EmailJS init failed', e);
  }
})();

// EmailJS config
const EMAILJS_SERVICE_ID = 'service_0z32zi8';
// TODO: set these template IDs once you paste them from EmailJS dashboard
const EMAILJS_TEMPLATE_ID_ORDER = 'template_eoxbqb8';
// If you want booking to use the same EmailJS template, keep this equal to ORDER.
const EMAILJS_TEMPLATE_ID_BOOKING = 'template_eoxbqb8';

function sendEmailJS({ templateId, variables }){
  if (!templateId || templateId.startsWith('YOUR_')){
    alert('EmailJS template IDs are not set yet. Please update EMAILJS_TEMPLATE_ID_ORDER / EMAILJS_TEMPLATE_ID_BOOKING.');
    return Promise.reject(new Error('Missing EmailJS templateId'));
  }
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, variables);
}

// ─── DATA ───────────────────────────────────────────────────
const SERVICES_DATA = [
  { emoji:'🧽', title:'Deep Shoe Cleaning', desc:'Complete interior and exterior cleaning. Removes dirt, stains, and odors. Restored to like-new freshness.', price:'₱150', img:'https://images.unsplash.com/photo-1556906781-9a414961a183?w=400&q=80' },
  { emoji:'🔧', title:'Sole Regluing', desc:'Reattachment of separating or detached soles using industrial-grade adhesive for lasting hold.', price:'₱120', img:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80' },
  { emoji:'👟', title:'Sole Replacement', desc:'Full or partial sole replacement with quality rubber or leather soles. Custom fit for any shoe type.', price:'₱250', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { emoji:'✨', title:'Shoe Restoration', desc:'Complete restoration of worn, damaged, or aged footwear. Structural repairs, cleaning, and finishing.', price:'₱400', img:'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' },
  { emoji:'💧', title:'Leather Conditioning', desc:'Deep moisturizing treatment to restore suppleness, prevent cracking, and extend the life of leather.', price:'₱180', img:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&q=80' },
  { emoji:'🎨', title:'Color Repainting', desc:'Professional color restoration and custom repainting for faded or scuffed leather and synthetic shoes.', price:'₱300', img:'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&q=80' },
  { emoji:'🏃', title:'Sneaker Restoration', desc:'Specialized cleaning, sole restoration, and whitening for premium sneakers and athletic footwear.', price:'₱350', img:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80' },
  { emoji:'👜', title:'Bag Repair', desc:'Stitching, strap repair, zipper replacement, and conditioning for leather bags and accessories.', price:'₱200', img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
  { emoji:'🎿', title:'Belt Repair', desc:'Hole punching, stitching repair, buckle replacement, and leather conditioning for belts of all types.', price:'₱100', img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80' },
];

const TESTIMONIALS_DATA = [
  { name:'Maria Santos', initial:'MS', rating:5, text:'Amante completely restored my husband\'s favorite leather shoes that I thought were beyond saving. The craftsmanship is incredible — you can\'t even tell they were damaged. Highly recommended!', role:'Verified Customer' },
  { name:'Carlo Reyes', initial:'CR', rating:5, text:'Best shoe repair shop in Dasmariñas, hands down. Brought in my Nike Air Forces that were completely yellowed. Got them back looking brand new. Super worth it!', role:'Verified Customer' },
  { name:'Liza Mendoza', initial:'LM', rating:5, text:'They repaired my leather bag and it looks absolutely stunning. Attention to detail is excellent. The price is very reasonable for the quality of work. Will definitely come back!', role:'Verified Customer' },
  { name:'Ryan Flores', initial:'RF', rating:5, text:'Had my sole replaced and reglued — very solid work. Walked in with shoes that were falling apart, walked out with shoes that feel brand new. Solid craftsmanship and great service.', role:'Verified Customer' },
  { name:'Jenny Cruz', initial:'JC', rating:5, text:'Very professional and fast turnaround. My suede boots needed deep cleaning and conditioning — the result was amazing. The staff was friendly and knowledgeable about shoe care.', role:'Verified Customer' },
  { name:'Mark Villanueva', initial:'MV', rating:4, text:'Good quality restoration on my leather dress shoes. Color repainting was done perfectly — matched the original color exactly. Will trust Amante with all my footwear needs.', role:'Verified Customer' },
];

// ─── PRODUCT STORE (localStorage) ───────────────────────────
function getProducts() {
  try {
    return JSON.parse(localStorage.getItem('amante_products') || '[]');
  } catch(e) { return []; }
}

function saveProducts(products) {
  localStorage.setItem('amante_products', JSON.stringify(products));
}

// Initialize with sample products if empty
function initProducts() {
  if (getProducts().length === 0) {
    const defaults = [
      { id: genId(), name: 'Leather Conditioner 250ml', desc: 'Premium leather conditioner for shoes, bags, and belts. Keeps leather supple and moisturized.', price: 299, stock: 15, img: 'https://images.unsplash.com/photo-1556906781-9a414961a183?w=400&q=80', emoji: '🧴' },
      { id: genId(), name: 'Shoe Cleaning Kit', desc: 'Complete set with brush, cleaning foam, and microfiber cloth. Ideal for sneakers and leather shoes.', price: 450, stock: 10, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', emoji: '🧽' },
      { id: genId(), name: 'Waterproof Spray 200ml', desc: 'Protective waterproof coating spray for all shoe materials. Guards against rain, stains, and moisture.', price: 199, stock: 20, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', emoji: '💦' },
      { id: genId(), name: 'Shoe Polish (Black)', desc: 'High-quality black leather shoe polish. Restores color, adds shine, and protects leather uppers.', price: 89, stock: 30, img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&q=80', emoji: '⚫' },
      { id: genId(), name: 'Sneaker Whitener Pen', desc: 'Easy-to-use whitening pen for rubber soles and white leather panels. Instant results.', price: 149, stock: 25, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80', emoji: '✏️' },
      { id: genId(), name: 'Shoe Deodorizer Spray', desc: 'Eliminates odors and freshens shoes with antibacterial formula. Long-lasting freshness.', price: 159, stock: 18, img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80', emoji: '🌿' },
    ];
    saveProducts(defaults);
  }
}

function genId() {
  return 'P' + Date.now() + Math.floor(Math.random() * 1000);
}

// ─── CART ───────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('amante_cart') || '[]');

function saveCart() {
  localStorage.setItem('amante_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((a, i) => a + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = total;
  badge.classList.toggle('show', total > 0);
}

function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    if (existing.qty < product.stock) existing.qty++;
    else { showNotification('Max stock reached!', '⚠️'); return; }
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, img: product.img, emoji: product.emoji });
  }
  saveCart();
  showNotification(product.name + ' added to cart!', '✓');
  renderCartItems();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else { saveCart(); renderCartItems(); }
}

function renderCartItems() {
  const list = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total');

  if (cart.length === 0) {
    list.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty.</p><p style="font-size:13px; margin-top:8px;">Browse our products and add items to get started.</p></div>';
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  list.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    const imgEl = item.img
      ? `<img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="cart-item-img" style="display:none; align-items:center; justify-content:center; font-size:24px;">${item.emoji || '📦'}</div>`
      : `<div class="cart-item-img" style="display:flex; align-items:center; justify-content:center; font-size:24px;">${item.emoji || '📦'}</div>`;
    return `
      <div class="cart-item">
        ${imgEl}
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₱${item.price.toLocaleString()} each</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            <button class="cart-remove" onclick="removeFromCart('${item.id}')" title="Remove">🗑</button>
          </div>
        </div>
      </div>`;
  }).join('');

  totalEl.textContent = '₱' + total.toLocaleString('en-PH', { minimumFractionDigits: 2 });
  footer.style.display = 'block';
}

function openCart() {
  renderCartItems();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-panel').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── CHECKOUT ───────────────────────────────────────────────
function openCheckout() {
  closeCart();
  const summary = document.getElementById('checkout-summary');
  let total = 0;
  let itemsHTML = cart.map(i => {
    total += i.price * i.qty;
    return `<div class="checkout-item"><span>${i.name} × ${i.qty}</span><span>₱${(i.price * i.qty).toLocaleString()}</span></div>`;
  }).join('');
  itemsHTML += `<div class="checkout-total"><span>Total Amount</span><span>₱${total.toLocaleString('en-PH', {minimumFractionDigits:2})}</span></div>`;
  summary.innerHTML = `<div class="checkout-summary-title">Order Summary</div>${itemsHTML}`;
  document.getElementById('checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.body.style.overflow = '';
}

async function placeOrder() {
  const name = document.getElementById('co-name').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const email = document.getElementById('co-email').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const notes = document.getElementById('co-notes').value.trim();

  if (!name || !phone || !email || !address) {
    alert('Please fill in all required fields.');
    return;
  }
  if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const btn = document.getElementById('place-order-btn');
  btn.innerHTML = '<span class="spinner"></span> Processing...';
  btn.disabled = true;

  const refNum = 'ORD-' + Date.now().toString().slice(-6);
  const orderDate = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
  let total = cart.reduce((a, i) => a + i.price * i.qty, 0);

  const orderItems = cart.map(i => `• ${i.name} × ${i.qty} = ₱${(i.price * i.qty).toLocaleString()}`).join('\n');

  const emailBody = `
🧾 NEW ORDER — AMANTE SHOE CARE CENTER
═══════════════════════════════════════

Order Reference: ${refNum}
Date & Time: ${orderDate}

CUSTOMER INFORMATION
────────────────────
Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
Notes: ${notes || 'None'}

ORDERED ITEMS
─────────────
${orderItems}

─────────────
TOTAL: ₱${total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}

Please process this order and contact the customer to confirm.

═══════════════════════════════════════
Amante Shoe Care Center
Zone 1, 15 Camerino Ave, Dasmariñas, Cavite
📞 0950 896 2600
`.trim();

// EmailJS send (replaces mailto)
  const toEmail = 'benferd22@gmail.com';

  // Variables must match your EmailJS template placeholders
  // Your template uses: {{name}}, {{phone}}, {{email}}, {{address}}, {{order_details}}, {{total}}, {{instructions}}, {{date}}
  const emailVariables = {
    name,
    phone,
    email,
    address,
    order_details: orderItems,
    total: total.toFixed(2),
    instructions: notes || 'None',
    date: orderDate,
    to_email: toEmail,
  };

  // Reduce stock
  const products = getProducts();
  cart.forEach(cartItem => {
    const p = products.find(x => x.id === cartItem.id);
    if (p) p.stock = Math.max(0, p.stock - cartItem.qty);
  });
  saveProducts(products);

  // Save order to localStorage as backup record
  const orders = JSON.parse(localStorage.getItem('amante_orders') || '[]');
  orders.unshift({ ref: refNum, date: orderDate, customer: name, phone, email, address, notes, items: [...cart], total });
  localStorage.setItem('amante_orders', JSON.stringify(orders.slice(0, 100)));

  // Clear cart
  cart = [];
  saveCart();
  renderProducts();

  btn.innerHTML = 'Place Order →';
  btn.disabled = false;

  closeCheckout();

  // Send email via EmailJS, then success UI
  try {
    console.log('EmailJS sending ORDER with:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID_ORDER,
      variables: emailVariables,
    });

    const res = await sendEmailJS({
      templateId: EMAILJS_TEMPLATE_ID_ORDER,
      variables: emailVariables,
    });

    console.log('EmailJS ORDER sent:', res);
  } catch (e) {
    console.error('Failed sending order email', e);
    alert('Order was placed, but EmailJS failed to send the email. Check browser console for the exact error.');
  }

  // Show success

  // Show success
  document.getElementById('success-title').textContent = 'Order Confirmed! 🎉';
  document.getElementById('success-msg').textContent = `Thank you, ${name}! Your order has been received. We'll contact you at ${phone} to confirm. Your email client has been opened to send the order details.`;
  document.getElementById('success-ref').textContent = refNum;
  document.getElementById('success-modal').classList.add('open');
}

function closeSuccess() {
  document.getElementById('success-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── BOOKING ───────────────────────────────────────────────
function openBooking() {
  document.getElementById('booking-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bk-date').min = today;
}

function closeBooking() {
  document.getElementById('booking-modal').classList.remove('open');
  document.body.style.overflow = '';
}

async function submitBooking() {
  const name = document.getElementById('bk-name').value.trim();
  const phone = document.getElementById('bk-phone').value.trim();
  const email = document.getElementById('bk-email').value.trim();
  const service = document.getElementById('bk-service').value;
  const date = document.getElementById('bk-date').value;
  const notes = document.getElementById('bk-notes').value.trim();

  if (!name || !phone || !service) {
    alert('Please fill in Name, Phone, and Service fields.');
    return;
  }

  const refNum = 'BK-' + Date.now().toString().slice(-6);
  const orderDate = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });

  const emailBody = `
📅 NEW BOOKING REQUEST — AMANTE SHOE CARE CENTER
══════════════════════════════════════════════════

Booking Reference: ${refNum}
Date Received: ${orderDate}

CUSTOMER DETAILS
────────────────
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}

SERVICE REQUESTED
─────────────────
Service: ${service}
Preferred Date: ${date || 'Flexible'}
Notes: ${notes || 'None'}

Please contact the customer to confirm the appointment.

══════════════════════════════════════════════════
Amante Shoe Care Center
📞 0950 896 2600
`.trim();

  const toEmail = 'benferd22@gmail.com';

  // Variables based on your order template placeholders.
  // If your booking template uses different fields, update these variables accordingly.
  const emailVariables = {
    name,
    phone,
    email: email || '',
    address: 'N/A',
    order_details: `Service: ${service}\nPreferred Date: ${date || 'Flexible'}\nNotes: ${notes || 'None'}`,
    total: '0.00',
    instructions: notes || 'None',
    date: orderDate,
    to_email: toEmail,
  };

  try {
    console.log('EmailJS sending BOOKING with:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID_BOOKING,
      variables: emailVariables,
    });

    const res = await sendEmailJS({
      templateId: EMAILJS_TEMPLATE_ID_BOOKING,
      variables: emailVariables,
    });

    console.log('EmailJS BOOKING sent:', res);
  } catch (e) {
    console.error('Failed sending booking email', e);
    alert('Booking was requested, but EmailJS failed to send the email. Check browser console for the exact error.');
  }

  closeBooking();

  document.getElementById('success-title').textContent = 'Booking Requested! 📅';
  document.getElementById('success-msg').textContent = `Thank you, ${name}! Your booking request for ${service} has been sent. We'll contact you at ${phone} to confirm your appointment.`;
  document.getElementById('success-ref').textContent = refNum;
  document.getElementById('success-modal').classList.add('open');

  // Reset form
  ['bk-name','bk-phone','bk-email','bk-notes'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('bk-service').value = '';
  document.getElementById('bk-date').value = '';
}

// ─── RENDER SERVICES ────────────────────────────────────────
function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = SERVICES_DATA.map(s => `
    <div class="service-card">
      <img class="service-img" src="${s.img}" alt="${s.title}" loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="service-img-placeholder" style="display:none;">${s.emoji}</div>
      <div class="service-body">
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
        <div class="service-footer">
          <div class="service-price">
            <div>${s.price} <span>starting price</span></div>
          </div>
          <button class="btn-service" onclick="openBooking()">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── RENDER PRODUCTS ────────────────────────────────────────
function renderProducts(query = '') {
  const products = getProducts();
  const filtered = query
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase()))
    : products;

  const grid = document.getElementById('products-grid');
  const empty = document.getElementById('no-products');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    const inCart = cart.find(i => i.id === p.id);
    const imgEl = p.img
      ? `<img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="product-img-placeholder" style="display:none;">${p.emoji || '📦'}</div>`
      : `<div class="product-img-placeholder">${p.emoji || '📦'}</div>`;
    return `
      <div class="product-card">
        ${imgEl}
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-footer">
            <div>
              <div class="product-price">₱${p.price.toLocaleString()}</div>
              <div class="product-stock">${p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</div>
            </div>
            <button class="btn-add-cart" onclick="addToCart('${p.id}')" ${p.stock === 0 ? 'disabled' : ''}>
              ${p.stock === 0 ? 'Out of Stock' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterProducts() {
  const q = document.getElementById('search-input').value;
  renderProducts(q);
}

// ─── RENDER TESTIMONIALS ────────────────────────────────────
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  grid.innerHTML = TESTIMONIALS_DATA.map(t => `
    <div class="testimonial-card">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initial}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-sub">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── ADMIN ──────────────────────────────────────────────────
let editingId = null;

function openAdmin() {
  renderAdminProducts();
  document.getElementById('admin-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAdmin() {
  document.getElementById('admin-panel').classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tabId) {
  document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');

  if (tabId === 'tab-manage') renderAdminProducts();
}

function saveProduct() {
  const name = document.getElementById('ap-name').value.trim();
  const desc = document.getElementById('ap-desc').value.trim();
  const price = parseFloat(document.getElementById('ap-price').value);
  const stock = parseInt(document.getElementById('ap-stock').value);
  const img = document.getElementById('ap-img').value.trim();
  const emoji = document.getElementById('ap-emoji').value.trim() || '📦';

  if (!name || !desc || isNaN(price) || isNaN(stock)) {
    alert('Please fill in Name, Description, Price, and Stock.'); return;
  }

  const products = getProducts();

  if (editingId) {
    const idx = products.findIndex(p => p.id === editingId);
    if (idx > -1) products[idx] = { ...products[idx], name, desc, price, stock, img, emoji };
    editingId = null;
    document.getElementById('save-product-btn').textContent = 'Save Product';
  } else {
    products.unshift({ id: genId(), name, desc, price, stock, img, emoji });
  }

  saveProducts(products);
  renderProducts();
  renderAdminProducts();
  resetProductForm();
  showNotification('Product saved!', '✓');
}

function resetProductForm() {
  ['ap-name','ap-desc','ap-price','ap-stock','ap-img','ap-emoji'].forEach(id => document.getElementById(id).value = '');
  editingId = null;
  document.getElementById('save-product-btn').textContent = 'Save Product';
}

function editProduct(id) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('ap-name').value = p.name;
  document.getElementById('ap-desc').value = p.desc;
  document.getElementById('ap-price').value = p.price;
  document.getElementById('ap-stock').value = p.stock;
  document.getElementById('ap-img').value = p.img || '';
  document.getElementById('ap-emoji').value = p.emoji || '';
  document.getElementById('save-product-btn').textContent = 'Update Product';
  // Switch to add tab
  document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-add').classList.add('active');
  document.querySelector('.admin-tab').classList.add('active');
  document.getElementById('ap-name').focus();
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProducts();
  renderAdminProducts();
  showNotification('Product deleted.', '🗑');
}

function renderAdminProducts() {
  const list = document.getElementById('admin-product-list');
  const empty = document.getElementById('admin-empty');
  const products = getProducts();

  if (products.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.innerHTML = products.map(p => `
    <div class="product-list-item">
      ${p.img
        ? `<img class="product-list-thumb" src="${p.img}" alt="${p.name}" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<div class=\\'product-list-thumb\\' style=\\'display:flex;align-items:center;justify-content:center;font-size:22px;\\'>${p.emoji || '📦'}</div>')" />`
        : `<div class="product-list-thumb" style="display:flex;align-items:center;justify-content:center;font-size:22px;">${p.emoji || '📦'}</div>`}
      <div class="product-list-info">
        <div class="product-list-name">${p.name}</div>
        <div class="product-list-meta">₱${p.price.toLocaleString()} · Stock: ${p.stock}</div>
      </div>
      <div class="product-list-actions">
        <button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn-delete" onclick="deleteProduct('${p.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// ─── BEFORE & AFTER SLIDERS ─────────────────────────────────
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const before = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    slider.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
    slider.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);
  });
}

// ─── NAVBAR ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

document.getElementById('nav-toggle').addEventListener('click', () => {
  const mobile = document.getElementById('nav-mobile');
  mobile.classList.toggle('open');
});

function closeNav() {
  document.getElementById('nav-mobile').classList.remove('open');
}

// Close modals on escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart(); closeCheckout(); closeBooking(); closeAdmin();
    document.getElementById('success-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─── NOTIFICATION ───────────────────────────────────────────
let notifTimer;
function showNotification(msg, icon = '✓') {
  clearTimeout(notifTimer);
  const n = document.getElementById('notification');
  document.getElementById('notif-text').textContent = msg;
  n.querySelector('.notif-icon').textContent = icon;
  n.classList.add('show');
  notifTimer = setTimeout(() => n.classList.remove('show'), 3000);
}

// ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ─── INIT ────────────────────────────────────────────────────
// ─── DYNAMIC PALETTE FROM LOGO ───────────────────────────────
function _rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function _mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function _lerpColor(hex, t, towardsWhite = true) {
  const r = parseInt(hex.substr(1,2),16);
  const g = parseInt(hex.substr(3,2),16);
  const b = parseInt(hex.substr(5,2),16);
  if (towardsWhite) return _rgbToHex(_mix(r,255,t), _mix(g,255,t), _mix(b,255,t));
  return _rgbToHex(_mix(r,0,t), _mix(g,0,t), _mix(b,0,t));
}

function _luminance(r,g,b){ return (0.2126*r + 0.7152*g + 0.0722*b)/255; }

function applyPalette(primaryHex){
  const root = document.documentElement.style;
  const light = _lerpColor(primaryHex, 0.62, true);
  const dark = _lerpColor(primaryHex, 0.36, false);
  root.setProperty('--gold', primaryHex);
  root.setProperty('--gold-light', light);
  root.setProperty('--gold-dark', dark);
  // set contrasting text for gold buttons
  const r = parseInt(primaryHex.substr(1,2),16);
  const g = parseInt(primaryHex.substr(3,2),16);
  const b = parseInt(primaryHex.substr(5,2),16);
  const textOn = _luminance(r,g,b) > 0.55 ? '#111111' : '#FFFFFF';
  root.setProperty('--gold-contrast', textOn);
}

function setPaletteFromLogo(imgSrc){
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imgSrc;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const W = 80, H = 80;
        canvas.width = W; canvas.height = H;
        ctx.drawImage(img, 0, 0, W, H);
        const data = ctx.getImageData(0,0,W,H).data;
        let r=0,g=0,b=0,count=0;
        const step = 4 * 4; // sample every 4th pixel
        for (let i=0;i<data.length;i+=step){
          const alpha = data[i+3]; if (alpha < 125) continue;
          r += data[i]; g += data[i+1]; b += data[i+2]; count++;
        }
        if (count===0) throw new Error('no visible pixels');
        r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
        const primaryHex = _rgbToHex(r,g,b);
        applyPalette(primaryHex);
        resolve(primaryHex);
      } catch(e){ resolve(null); }
    };
    img.onerror = () => resolve(null);
  });
}

// Safe fallback palette (keeps original look if logo missing or blocked)
function applyFallbackPalette(){ applyPalette('#C9A84C'); }

document.addEventListener('DOMContentLoaded', async () => {
  initProducts();
  renderServices();
  renderProducts();
  renderTestimonials();
  initSliders();
  updateCartBadge();

  // Try to derive palette from local logo image; if it fails, use fallback.
  const logoPath = 'images/logo.png';
  const primary = await setPaletteFromLogo(logoPath);
  if (!primary) applyFallbackPalette();
});
