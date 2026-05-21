
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
          <a class="${active === "wallet" ? "active" : ""}" href="wallet.html">
  💰 رصيدي: <span data-wallet-balance>0</span> ج
</a>
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
function supportWidget() {
  if (document.getElementById("supportWidget")) return;

  const whatsappText = encodeURIComponent(
    "السلام عليكم، محتاج أتواصل مع خدمة عملاء DevPlay"
  );

  const supportNumber =
    typeof SUPPORT_WHATSAPP !== "undefined"
      ? SUPPORT_WHATSAPP
      : "201036797528";

  const faqs = [
    {
      q: "مدة الشحن قد إيه؟",
      a: "مدة الشحن غالبًا بتكون خلال دقائق، لكن أحيانًا ممكن تتأخر 3 إلى 4 ساعات لو خارج البيت، أو 8 إلى 9 ساعات أثناء النوم أو عدم التواجد بجانب الموبايل."
    },
    {
      q: "إزاي أعمل طلب؟",
      a: "اختار المنتج من المتجر، اكتب ID اللعبة أو رقم الموبايل حسب نوع الخدمة، ضيفه للسلة، وبعدها أكمل الطلب من صفحة الدفع."
    },
    {
      q: "طرق الدفع المتاحة؟",
      a: "الدفع حاليًا عن طريق فودافون كاش على الرقم الموجود في صفحة الدفع."
    },
    {
      q: "الطلب اتأخر أعمل إيه؟",
      a: "لو الطلب اتأخر، راجع حالة الطلب من صفحة تتبع الطلب. ولو محتاج مساعدة مباشرة اضغط على زر التحدث مع خدمة العملاء."
    },
    {
      q: "كتبت ID أو رقم غلط؟",
      a: "لو كتبت البيانات غلط، تواصل مع خدمة العملاء فورًا قبل تنفيذ الطلب."
    },
    {
      q: "عايز أتحدث مع خدمة العملاء",
      a: "اضغط الزر التالي للتواصل معنا على واتساب."
    }
  ];

  const box = document.createElement("div");

  box.id = "supportWidget";

  box.innerHTML = `
    <button class="support-bot-btn" onclick="toggleSupportChat()">
      💬 خدمة العملاء
    </button>

    <div class="support-chat" id="supportChat">
      <div class="support-chat-head">
        <b>🤖 مساعد DevPlay</b>
        <button class="close-support" onclick="toggleSupportChat()">×</button>
      </div>

      <div class="support-chat-body" id="supportChatBody">
        <div class="bot-msg">
          أهلاً بيك 👋  
          اختار سؤال من الأسئلة دي:
        </div>

        ${faqs.map((item, index) => `
          <button class="faq-btn" onclick="answerFaq(${index})">
            ${item.q}
          </button>
        `).join("")}
      </div>
    </div>

    <div class="support-float">
      <button class="support-whatsapp" onclick="openSupportWhatsApp()">
        ☎
      </button>
    </div>
  `;

  document.body.appendChild(box);

  window.supportFaqs = faqs;
  window.supportNumber = supportNumber;
  window.supportText = whatsappText;
}

function toggleSupportChat() {
  const chat = document.getElementById("supportChat");
  if (chat) chat.classList.toggle("show");
}

function answerFaq(index) {
  const body = document.getElementById("supportChatBody");
  const item = window.supportFaqs[index];

  body.innerHTML += `
    <div class="user-msg">${item.q}</div>
    <div class="bot-msg">${item.a}</div>
  `;

  if (item.q.includes("خدمة العملاء")) {
    body.innerHTML += `
      <button class="btn green" style="width:100%;margin-top:8px" onclick="openSupportWhatsApp()">
        فتح واتساب خدمة العملاء
      </button>
    `;
  }

  body.scrollTop = body.scrollHeight;
}

function openSupportWhatsApp() {
  window.open(
    `https://wa.me/${window.supportNumber}?text=${window.supportText}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateWalletBalance();
});
async function updateWalletBalance() {
  const user = await currentUser();

  const holders = document.querySelectorAll("[data-wallet-balance]");

  if (!holders.length) return;

  if (!user) {
    holders.forEach(el => {
      el.textContent = "0";
    });
    return;
  }

  let { data: wallet } = await client
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!wallet) {
    await client.from("wallets").insert([{
      user_id: user.id,
      balance: 0
    }]);

    wallet = { balance: 0 };
  }

  holders.forEach(el => {
    el.textContent = Number(wallet.balance || 0);
  });
}
function floatingButtons() {
  if (document.getElementById("floatingButtons")) return;

  const box = document.createElement("div");
  box.id = "floatingButtons";

  box.innerHTML = `
    <button class="float-bot" onclick="toggleSupportChat()">
      💬 خدمة العملاء
    </button>

    <button class="float-whatsapp" onclick="window.open('https://wa.me/201036797528?text=السلام عليكم، محتاج خدمة العملاء', '_blank')">
      واتساب
    </button>

    <button class="float-cart" onclick="location.href='cart.html'">
      🛒 السلة <span data-cart-count>0</span>
    </button>
  `;

  document.body.appendChild(box);
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  floatingButtons();
});
function smartSupportBot() {
  if (document.getElementById("aiSupportWidget")) return;

  const phone = "201036797528";

  const options = [
    {
      q: "طريقة الشحن إزاي؟",
      a: "اختاري المنتج من المتجر، اكتبي ID اللعبة أو رقم الموبايل حسب الخدمة، ضيفيه للسلة، وبعدها ادفعي من رصيد المحفظة. لو رصيدك مش كافي، ادخلي على محفظتي واعملي طلب إضافة رصيد بصورة التحويل."
    },
    {
      q: "الشحن بياخد قد إيه؟",
      a: "غالبًا الشحن بيتم خلال دقائق، لكن أحيانًا ممكن يتأخر 3 إلى 4 ساعات لو الإدارة خارج البيت، أو 8 إلى 9 ساعات أثناء النوم أو عدم التواجد بجانب الموبايل."
    },
    {
      q: "الرصيد مضافش بعد التحويل",
      a: "لو حولتي ورفعتي صورة التحويل ولسه الرصيد مضافش، ابعتي لخدمة العملاء رقم التحويل، الرقم اللي حولتي منه، والمبلغ.",
      whatsapp: "السلام عليكم، حولت رصيد للمحفظة ولسه مضافش. الرقم اللي حولت منه: ، المبلغ: ، رقم العملية: "
    },
    {
      q: "الطلب اتأخر",
      a: "لو الطلب اتأخر، افتحي صفحة تتبع الطلب وشوفي حالته. لو بقاله وقت طويل، ابعتي رقم الطلب لخدمة العملاء.",
      whatsapp: "السلام عليكم، طلبي اتأخر. رقم الطلب: "
    },
    {
      q: "كتبت ID أو رقم غلط",
      a: "لو كتبتي ID أو رقم غلط، تواصلي فورًا قبل تنفيذ الطلب. بعد التنفيذ قد لا يمكن الإلغاء حسب نوع الخدمة.",
      whatsapp: "السلام عليكم، كتبت بيانات غلط في الطلب. رقم الطلب: ، البيانات الصح: "
    },
    {
      q: "إزاي أتتبع طلبي؟",
      a: "ادخلي صفحة تتبع الطلب واكتبي رقم الطلب، أو افتحي حسابي وهتلاقي سجل الشحن وحالة كل طلب."
    },
    {
      q: "طرق الدفع المتاحة",
      a: "الدفع داخل الموقع من رصيد المحفظة فقط. لإضافة رصيد، حولي على فودافون كاش ثم ارفعي صورة التحويل من صفحة محفظتي."
    },
    {
      q: "التحدث مع خدمة العملاء",
      a: "اضغطي الزر الأخضر وسيتم فتح واتساب للتواصل المباشر.",
      whatsapp: "السلام عليكم، محتاج خدمة العملاء."
    }
  ];

  const box = document.createElement("div");
  box.id = "aiSupportWidget";

  box.innerHTML = `
    <button class="ai-chat-btn" onclick="toggleAiChat()">
      🤖 مساعد DevPlay
    </button>

    <div class="ai-chat-box" id="aiChatBox">
      <div class="ai-chat-head">
        <b>🤖 مساعد DevPlay الذكي</b>
        <button class="ai-close" onclick="toggleAiChat()">×</button>
      </div>

      <div class="ai-chat-body" id="aiChatBody">
        <div class="ai-msg ai-bot">
          أهلاً بيك في DevPlay 👋<br>
          اختاري المشكلة أو السؤال، وأنا هقولك الحل بسرعة.
        </div>

        ${options.map((item, index) => `
          <button class="ai-option" onclick="aiAnswer(${index})">
            ${item.q}
          </button>
        `).join("")}
      </div>
    </div>
  `;

  document.body.appendChild(box);
  window.aiSupportOptions = options;
  window.aiSupportPhone = phone;
}

function toggleAiChat() {
  const chat = document.getElementById("aiChatBox");
  if (chat) chat.classList.toggle("show");
}

function aiAnswer(index) {
  const item = window.aiSupportOptions[index];
  const body = document.getElementById("aiChatBody");

  body.innerHTML += `
    <div class="ai-msg ai-user">${item.q}</div>
    <div class="ai-msg ai-bot">${item.a}</div>
  `;

  if (item.whatsapp) {
    const text = encodeURIComponent(item.whatsapp);
    body.innerHTML += `
      <a class="ai-whatsapp" target="_blank" href="https://wa.me/${window.aiSupportPhone}?text=${text}">
        فتح واتساب خدمة العملاء
      </a>
    `;
  }

  body.scrollTop = body.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  smartSupportBot();
});
