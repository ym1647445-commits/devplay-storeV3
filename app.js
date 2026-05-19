
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let PRODUCTS = [];

const SHIPPING_NOTE =
  "تنبيه مهم: متوسط مدة الشحن حسب التواجد. أحيانًا يتم الشحن خلال دقائق، وأحيانًا قد يتأخر 3 إلى 4 ساعات إذا كنت بالخارج، أو 8 إلى 9 ساعات أثناء النوم أو عدم التواجد بجانب الموبايل.";

const FALLBACK_PRODUCTS = [
  {id:1,category:"games",game:"PUBG",name:"60 UC",price:55,img:"pubg.png",need:"ID ببجي",popular:true,active:true},
  {id:2,category:"games",game:"Free Fire",name:"100 جوهرة",price:65,img:"free_fire.png",need:"ID فري فاير",popular:true,active:true},
  {id:3,category:"games",game:"COD",name:"420 CP",price:240,img:"callofduty.png",need:"ID كول أوف ديوتي",popular:true,active:true},
  {id:4,category:"cards",game:"Steam US",name:"5$",price:320,img:"steam.png",need:"إيميل Steam",popular:true,active:true},
  {id:5,category:"mobile",game:"Vodafone",name:"رصيد 10 جنيه",price:17,img:"vodafone.png",need:"رقم الموبايل",popular:true,active:true}
];

async function loadProductsFromDB() {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("active", true)
    .order("category", { ascending: true })
    .order("game", { ascending: true })
    .order("price", { ascending: true });

  if (error || !data || !data.length) {
    PRODUCTS = FALLBACK_PRODUCTS;
    return PRODUCTS;
  }

  PRODUCTS = data;
  return PRODUCTS;
}

function cart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(c) {
  localStorage.setItem("cart", JSON.stringify(c));
  updateCartCount();
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cart().length;
  });
}

function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => {
    t.style.display = "none";
  }, 2600);
}

function header(active = "") {
  return `
    <header class="main-header">
      <div class="container nav-wrap">
        <a class="logo-area" href="index.html">
          <img src="logo.png" onerror="this.style.display='none'">
          <h1>DevPlay</h1>
        </a>

        <button class="menu-btn" onclick="toggleMenu()">☰</button>

        <nav id="mobileMenu" class="nav-links">
          <a class="${active === "home" ? "active" : ""}" href="index.html">الرئيسية</a>
          <a class="${active === "games" ? "active" : ""}" href="games.html">المتجر</a>
          <a class="${active === "offers" ? "active" : ""}" href="offers.html">العروض</a>
          <a class="${active === "track" ? "active" : ""}" href="track.html">تتبع الطلب</a>
          <a class="${active === "account" ? "active" : ""}" href="account.html">حسابي</a>
          <a class="cart-btn" href="cart.html">🛒 السلة <span data-cart-count>0</span></a>
        </nav>
      </div>
    </header>
  `;
}

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("show");
}

function footer() {
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <h3>DevPlay Studio</h3>
          <p class="muted">متجر شحن ألعاب، بطاقات، رصيد، وخدمات رقمية.</p>
        </div>

        <div>
          <h3>الدفع</h3>
          <p>Vodafone Cash</p>
          <h3 class="num">${CASH_NUMBER}</h3>
        </div>

        <div>
          <h3>روابط</h3>
          <p><a href="games.html">المتجر</a></p>
          <p><a href="track.html">تتبع الطلب</a></p>
          <p><a target="_blank" href="${WHATSAPP_CHANNEL}">قناة واتساب</a></p>
        </div>
      </div>
    </footer>
  `;
}

async function currentUser() {
  const { data: { user } } = await client.auth.getUser();
  return user;
}

function categoryLabel(category) {
  if (category === "games") return "ألعاب";
  if (category === "cards") return "بطاقات";
  if (category === "mobile") return "رصيد";
  if (category === "fakka") return "فكة";
  return category || "منتجات";
}

function productCard(p, index) {
  return `
    <div class="card glass product-card">
      ${p.offer_label ? `<span class="badge">${p.offer_label}</span>` : ""}
      ${p.popular ? `<span class="badge">الأكثر طلبًا</span>` : ""}
      <img src="${p.img || "logo.png"}" onerror="this.src='logo.png'">

      <h3>${p.game || "-"}</h3>
      <p class="muted">${p.name || "-"}</p>
      <p class="muted">القسم: ${categoryLabel(p.category)}</p>

      <div class="price">${p.price} جنيه</div>

      <button class="btn" onclick="openAddModal(${index})">
        + أضف للسلة
      </button>
    </div>
  `;
}

let selectedProduct = null;

function openAddModal(index) {
  selectedProduct = PRODUCTS[index];

  const modalInfo = document.getElementById("modalInfo");
  const playerInput = document.getElementById("playerInput");
  const modal = document.getElementById("modal");

  if (!modalInfo || !playerInput || !modal) return;

  modalInfo.innerHTML = `
    <h3>${selectedProduct.game}</h3>
    <p>${selectedProduct.name}</p>
    <p class="muted">المطلوب: ${selectedProduct.need || "بيانات الطلب"}</p>
    <p class="muted">${SHIPPING_NOTE}</p>
  `;

  playerInput.placeholder = selectedProduct.need || "اكتب البيانات";
  playerInput.value = "";
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

async function confirmAdd() {
  const playerInput = document.getElementById("playerInput");
  if (!playerInput) return;

  const value = playerInput.value.trim();

  if (!value) {
    return toast("اكتبي البيانات المطلوبة");
  }

  const c = cart();

  c.push({
    product_id: selectedProduct.id || null,
    category: selectedProduct.category || "",
    game: selectedProduct.game,
    name: selectedProduct.name,
    price: Number(selectedProduct.price),
    playerId: value,
    need: selectedProduct.need || ""
  });

  setCart(c);

  const user = await currentUser();

  if (user) {
    await client.from("saved_ids").insert([{
      user_id: user.id,
      game: selectedProduct.game,
      label: selectedProduct.need || "بيانات",
      value: value
    }]);
  }

  closeModal();
  toast("تمت الإضافة للسلة ✅");
}

function statusText(status) {
  if (status === "shipped") return "تم الشحن";
  if (status === "rejected") return "مرفوض";
  return "قيد المراجعة";
}

function statusClass(status) {
  if (status === "shipped") return "shipped";
  if (status === "rejected") return "rejected";
  return "pending";
}

function orderCode() {
  return "DP" + Math.floor(100000 + Math.random() * 899999);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
