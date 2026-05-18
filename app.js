const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const PRODUCTS = [

{
game:"PUBG",
name:"60 UC",
price:50,
img:"pubg.png",
need:"ID ببجي",
popular:true
},

{
game:"PUBG",
name:"325 UC",
price:220,
img:"pubg.png",
need:"ID ببجي",
popular:true
},

{
game:"Free Fire",
name:"100 جوهرة",
price:65,
img:"free_fire.png",
need:"ID فري فاير",
popular:true
},

{
game:"COD",
name:"30 CP",
price:25,
img:"callofduty.png",
need:"ID كول أوف ديوتي",
popular:true
},

{
game:"COD",
name:"420 CP",
price:240,
img:"callofduty.png",
need:"ID كول أوف ديوتي",
popular:true
},

{
game:"Steam",
name:"5$",
price:320,
img:"steam.png",
need:"إيميل Steam",
popular:true
},

{
game:"Anghami",
name:"اشتراك شهر",
price:160,
img:"Anghami.png",
need:"رقم أنغامي",
popular:true
}

];



function cart(){

return JSON.parse(
localStorage.getItem("cart") || "[]"
);

}



function setCart(c){

localStorage.setItem(
"cart",
JSON.stringify(c)
);

updateCartCount();

}



function updateCartCount(){

document
.querySelectorAll("[data-cart-count]")
.forEach(el=>{

el.textContent = cart().length;

});

}



function toast(msg){

const t = document.getElementById("toast");

if(!t) return;

t.textContent = msg;

t.style.display = "block";

setTimeout(()=>{

t.style.display = "none";

},2500);

}



function header(active = "") {

return `

<header class="header">

<div class="container navbar">

<a class="brand" href="index.html">

<img
src="logo.png"
onerror="this.style.display='none'"
>

Dev<span>Play</span>

</a>

<nav class="nav">

<a
class="${active === 'home' ? 'active' : ''}"
href="index.html"
>

🏠 الرئيسية

</a>

<a
class="${active === 'games' ? 'active' : ''}"
href="games.html"
>

🎮 المتجر

</a>

<a
class="${active === 'offers' ? 'active' : ''}"
href="offers.html"
>

🔥 العروض

</a>

<a
class="${active === 'track' ? 'active' : ''}"
href="track.html"
>

📦 تتبع الطلب

</a>

<a
class="${active === 'account' ? 'active' : ''}"
href="account.html"
>

👤 حسابي

</a>
</nav>

<a class="pill" href="cart.html">

🛒 السلة

<b data-cart-count>0</b>

</a>

</div>

</header>

`;

}



function footer(){

return `

<footer class="footer">

<div class="container footer-grid">

<div>

<h3>DevPlay Studio</h3>

<p class="muted">

متجر شحن ألعاب واشتراكات رقمية

</p>

</div>

<div>

<h3>الدفع</h3>

<p>Vodafone Cash</p>

<h3 class="num">

${CASH_NUMBER}

</h3>

</div>

<div>

<h3>تواصل</h3>

<p>

<a
target="_blank"
href="${WHATSAPP_CHANNEL}"
>

قناة واتساب

</a>

</p>

<p>

<a
target="_blank"
href="${FACEBOOK_URL}"
>

فيسبوك

</a>

</p>

</div>

</div>

</footer>

`;

}



async function currentUser(){

const {
data:{user}
} = await client.auth.getUser();

return user;

}



function productCard(p,index){

return `

<div class="card glass">

${p.popular ?
'<span class="badge">الأكثر طلبًا</span>'
:
''
}

<img src="${p.img}">

<h3>${p.game}</h3>

<p class="muted">

${p.name}

</p>

<div class="price">

${p.price} جنيه

</div>

<button
class="btn"
onclick="openAddModal(${index})"
>

+ أضف للسلة

</button>

</div>

`;

}



let selectedProduct = null;



function openAddModal(index){

selectedProduct = PRODUCTS[index];

modalInfo.innerHTML = `

<h3>${selectedProduct.game}</h3>

<p>${selectedProduct.name}</p>

<p class="muted">

المطلوب:
${selectedProduct.need}

</p>

`;

playerInput.placeholder =
selectedProduct.need;

playerInput.value = "";

modal.style.display = "flex";

}



function closeModal(){

modal.style.display = "none";

}



async function confirmAdd(){

const value =
playerInput.value.trim();

if(!value){

return toast("اكتب البيانات");

}

const c = cart();

c.push({

game:selectedProduct.game,

name:selectedProduct.name,

price:selectedProduct.price,

playerId:value

});

setCart(c);

const user = await currentUser();

if(user){

await client
.from("saved_ids")
.insert([{

user_id:user.id,

game:selectedProduct.game,

label:selectedProduct.need,

value:value

}]);

}

closeModal();

toast("تمت الإضافة للسلة ✅");

}



function statusText(status){

if(status === "shipped"){

return "تم الشحن";

}

if(status === "rejected"){

return "مرفوض";

}

return "قيد المراجعة";

}



function statusClass(status){

if(status === "shipped"){

return "shipped";

}

if(status === "rejected"){

return "rejected";

}

return "pending";

}



function orderCode(){

return "DP" +

Math.floor(
100000 + Math.random() * 899999
);

}



document.addEventListener(
"DOMContentLoaded",
()=>{

updateCartCount();

if("serviceWorker" in navigator){

navigator
.serviceWorker
.register("sw.js")
.catch(()=>{});

}

}
);
