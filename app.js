
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS = [

  // PUBG
  {
    game: "PUBG",
    name: "60 UC",
    price: 55,
    img: "pubg.png",
    need: "ID ببجي",
    popular: true
  },

  {
    game: "PUBG",
    name: "325 UC",
    price: 220,
    img: "pubg.png",
    need: "ID ببجي",
    popular: true
  },

  {
    game: "PUBG",
    name: "660 UC",
    price: 430,
    img: "pubg.png",
    need: "ID ببجي"
  },

  {
    game: "PUBG",
    name: "1800 UC",
    price: 1080,
    img: "pubg.png",
    need: "ID ببجي"
  },

  {
    game: "PUBG",
    name: "3850 UC",
    price: 2150,
    img: "pubg.png",
    need: "ID ببجي"
  },

  {
    game: "PUBG",
    name: "8100 UC",
    price: 4270,
    img: "pubg.png",
    need: "ID ببجي"
  },



  // FREE FIRE
  {
    game: "Free Fire",
    name: "100 جوهرة",
    price: 65,
    img: "free_fire.png",
    need: "ID فري فاير",
    popular: true
  },

  {
    game: "Free Fire",
    name: "210 جوهرة",
    price: 125,
    img: "free_fire.png",
    need: "ID فري فاير",
    popular: true
  },

  {
    game: "Free Fire",
    name: "530 جوهرة",
    price: 300,
    img: "free_fire.png",
    need: "ID فري فاير"
  },

  {
    game: "Free Fire",
    name: "1080 جوهرة",
    price: 600,
    img: "free_fire.png",
    need: "ID فري فاير",
    popular: true
  },

  {
    game: "Free Fire",
    name: "2200 جوهرة",
    price: 1200,
    img: "free_fire.png",
    need: "ID فري فاير"
  },



  // FC MOBILE
  {
    game: "FC Mobile",
    name: "40 FC",
    price: 30,
    img: "fc.png",
    need: "ID FC",
    popular: true
  },

  {
    game: "FC Mobile",
    name: "100 FC",
    price: 80,
    img: "fc.png",
    need: "ID FC"
  },

  {
    game: "FC Mobile",
    name: "520 FC",
    price: 280,
    img: "fc.png",
    need: "ID FC",
    popular: true
  },

  {
    game: "FC Mobile",
    name: "1070 FC",
    price: 550,
    img: "fc.png",
    need: "ID FC"
  },

  {
    game: "FC Mobile",
    name: "2200 FC",
    price: 1070,
    img: "fc.png",
    need: "ID FC"
  },

  {
    game: "FC Mobile",
    name: "5750 FC",
    price: 2600,
    img: "fc.png",
    need: "ID FC"
  },

  {
    game: "FC Mobile",
    name: "12000 FC",
    price: 5120,
    img: "fc.png",
    need: "ID FC"
  },



  // LORDS MOBILE
  {
    game: "Lords Mobile",
    name: "195 جوهرة",
    price: 115,
    img: "lords.png",
    need: "ID Lords"
  },

  {
    game: "Lords Mobile",
    name: "395 جوهرة",
    price: 225,
    img: "lords.png",
    need: "ID Lords"
  },

  {
    game: "Lords Mobile",
    name: "785 جوهرة",
    price: 430,
    img: "lords.png",
    need: "ID Lords"
  },

  {
    game: "Lords Mobile",
    name: "1964 جوهرة",
    price: 1400,
    img: "lords.png",
    need: "ID Lords"
  },

  {
    game: "Lords Mobile",
    name: "3928 جوهرة",
    price: 2800,
    img: "lords.png",
    need: "ID Lords"
  },



  // COD
  {
    game: "COD",
    name: "30 CP",
    price: 25,
    img: "cod.png",
    need: "ID كول أوف ديوتي",
    popular: true
  },

  {
    game: "COD",
    name: "80 CP",
    price: 60,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "420 CP",
    price: 240,
    img: "cod.png",
    need: "ID كول أوف ديوتي",
    popular: true
  },

  {
    game: "COD",
    name: "880 CP",
    price: 570,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "2400 CP",
    price: 1150,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "5000 CP",
    price: 2300,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "10800 CP",
    price: 4550,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "21600 CP",
    price: 9100,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "Battle Pass Premium",
    price: 150,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },

  {
    game: "COD",
    name: "Battle Pass Premium Bundle",
    price: 320,
    img: "cod.png",
    need: "ID كول أوف ديوتي"
  },



  // YALLA LUDO
  {
    game: "Yalla Ludo",
    name: "2320 ماسه",
    price: 320,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },

  {
    game: "Yalla Ludo",
    name: "830 ماسه",
    price: 140,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },

  {
    game: "Yalla Ludo",
    name: "5150 ماسه",
    price: 630,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },

  {
    game: "Yalla Ludo",
    name: "13.580 ماسه",
    price: 1530,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },

  {
    game: "Yalla Ludo",
    name: "27.640 ماسه",
    price: 3000,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },

  {
    game: "Yalla Ludo",
    name: "55.800 ماسه",
    price: 6000,
    img: "yallalado.png",
    need: "ID يلا لودو"
  },



  // HONOR OF KINGS
  {
    game: "Honor Of Kings",
    name: "16 توكن",
    price: 15,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "80 توكن",
    price: 65,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "240 توكن",
    price: 180,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "400 توكن",
    price: 300,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "560 توكن",
    price: 400,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "800+30 توكن",
    price: 570,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "1200+45 توكن",
    price: 850,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "2400+108 توكن",
    price: 1680,
    img: "honor.png",
    need: "ID اللعبة"
  },

  {
    game: "Honor Of Kings",
    name: "4000+180 توكن",
    price: 2800,
    img: "honor.png",
    need: "ID اللعبة"
  },



  // STEAM
  {
    game: "Steam US",
    name: "5$",
    price: 320,
    img: "steam.png",
    need: "إيميل Steam",
    popular: true
  },

  {
    game: "Steam US",
    name: "10$",
    price: 640,
    img: "steam.png",
    need: "إيميل Steam"
  },

  {
    game: "Steam US",
    name: "20$",
    price: 1150,
    img: "steam.png",
    need: "إيميل Steam"
  },

  {
    game: "Steam US",
    name: "25$",
    price: 1580,
    img: "steam.png",
    need: "إيميل Steam"
  },

  {
    game: "Steam US",
    name: "30$",
    price: 1830,
    img: "steam.png",
    need: "إيميل Steam"
  },

  {
    game: "Steam US",
    name: "50$",
    price: 3000,
    img: "steam.png",
    need: "إيميل Steam"
  },

  {
    game: "Steam US",
    name: "100$",
    price: 6280,
    img: "steam.png",
    need: "إيميل Steam"
  }

];
function cart(){return JSON.parse(localStorage.getItem("cart") || "[]");}
function setCart(c){localStorage.setItem("cart",JSON.stringify(c));updateCartCount();}
function updateCartCount(){document.querySelectorAll("[data-cart-count]").forEach(el=>{el.textContent=cart().length;});}
function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.style.display="block";setTimeout(()=>{t.style.display="none"},2500);}

function header(active = ""){
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

function toggleMenu(){const menu=document.getElementById("mobileMenu");if(menu)menu.classList.toggle("show");}

function footer(){
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div><h3>DevPlay Studio</h3><p class="muted">متجر شحن ألعاب واشتراكات رقمية</p></div>
        <div><h3>الدفع</h3><p>Vodafone Cash</p><h3 class="num">${CASH_NUMBER}</h3></div>
        <div><h3>تواصل</h3><p><a target="_blank" href="${WHATSAPP_CHANNEL}">قناة واتساب</a></p><p><a target="_blank" href="${FACEBOOK_URL}">فيسبوك</a></p></div>
      </div>
    </footer>
  `;
}

async function currentUser(){const {data:{user}}=await client.auth.getUser();return user;}

function productCard(p,index){
  return `
    <div class="card glass">
      ${p.popular ? '<span class="badge">الأكثر طلبًا</span>' : ""}
      <img src="${p.img}" onerror="this.src='logo.png'">
      <h3>${p.game}</h3>
      <p class="muted">${p.name}</p>
      <div class="price">${p.price} جنيه</div>
      <button class="btn" onclick="openAddModal(${index})">+ أضف للسلة</button>
    </div>
  `;
}

let selectedProduct=null;

function openAddModal(index){
  selectedProduct=PRODUCTS[index];
  const modalInfo=document.getElementById("modalInfo");
  const playerInput=document.getElementById("playerInput");
  const modal=document.getElementById("modal");
  if(!modalInfo||!playerInput||!modal)return;
  modalInfo.innerHTML=`<h3>${selectedProduct.game}</h3><p>${selectedProduct.name}</p><p class="muted">المطلوب: ${selectedProduct.need}</p>`;
  playerInput.placeholder=selectedProduct.need;
  playerInput.value="";
  modal.style.display="flex";
}

function closeModal(){const modal=document.getElementById("modal");if(modal)modal.style.display="none";}

async function confirmAdd(){
  const playerInput=document.getElementById("playerInput");
  if(!playerInput)return;
  const value=playerInput.value.trim();
  if(!value)return toast("اكتب البيانات");
  const c=cart();
  c.push({game:selectedProduct.game,name:selectedProduct.name,price:selectedProduct.price,playerId:value});
  setCart(c);
  const user=await currentUser();
  if(user){
    await client.from("saved_ids").insert([{user_id:user.id,game:selectedProduct.game,label:selectedProduct.need,value:value}]);
  }
  closeModal();
  toast("تمت الإضافة للسلة ✅");
}

function statusText(status){if(status==="shipped")return"تم الشحن";if(status==="rejected")return"مرفوض";return"قيد المراجعة";}
function statusClass(status){if(status==="shipped")return"shipped";if(status==="rejected")return"rejected";return"pending";}
function orderCode(){return"DP"+Math.floor(100000+Math.random()*899999);}
document.addEventListener("DOMContentLoaded",()=>{updateCartCount();if("serviceWorker"in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{});}});
