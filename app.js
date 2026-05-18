const cart = JSON.parse(localStorage.getItem("cart")) || [];

async function submitOrder(){

const customerName = document.getElementById("customerName").value;

const customerPhone = document.getElementById("customerPhone").value;

const authClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const { data: { user } } = await authClient.auth.getUser();

const userId = user ? user.id : null;

const orderId = "DP" + Math.floor(Math.random()*999999);

const rows = cart.map(item => ({
user_id: userId,
customer_name: customerName,
phone: customerPhone,
game: item.game,
package: item.name,
player_id: item.playerId,
status: "pending",
order_code: orderId
}));

const { error } = await authClient
.from("orders")
.insert(rows);

if(error){

alert(error.message);

}else{

alert("تم إرسال الطلب ❤️ رقم الطلب: " + orderId);

localStorage.removeItem("cart");

window.location.href="account.html";

}

}