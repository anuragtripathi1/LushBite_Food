const foodData=[
 {id:1,name:"Margherita Pizza",price:12.99,category:"pizza",image:"img/food/p1.jpg"},
 {id:2,name:"Pepperoni Pizza",price:14.99,category:"pizza",image:"img/category/pizza.jpg"},
 {id:3,name:"Cheeseburger",price:9.99,category:"burger",image:"img/food/b1.jpg"},
 {id:4,name:"Chicken Burger",price:10.99,category:"burger",image:"img/category/burger.jpg"},
 {id:5,name:"Club Sandwich",price:8.99,category:"sandwich",image:"img/food/s1.jpg"},
 {id:6,name:"Veg Sandwich",price:7.99,category:"sandwich",image:"img/category/sandwich.jpg"}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function renderFoods(data,id){
 const box=document.getElementById(id);
 if(!box)return;
 box.innerHTML="";
 data.forEach(f=>{
  box.innerHTML+=`
   <div class="food-card">
    <img src="${f.image}">
    <div class="food-info">
     <h3>${f.name}</h3>
     <p>$${f.price}</p>
     <button class="btn-primary" onclick="addToCart(${f.id})">Add to Cart</button>
    </div>
   </div>`;
 });
}

function addToCart(id){
 const item=cart.find(i=>i.id===id);
 if(item)item.qty++;
 else cart.push({...foodData.find(f=>f.id===id),qty:1});
 localStorage.setItem("cart",JSON.stringify(cart));
 updateCartCount();
 alert("Item added to cart");
}

function updateCartCount(){
 document.querySelectorAll(".cart-count")
 .forEach(c=>c.textContent=cart.reduce((a,b)=>a+b.qty,0));
}

function filterMenu(cat){
 renderFoods(cat==="all"?foodData:foodData.filter(f=>f.category===cat),"menuFoods");
}

document.addEventListener("DOMContentLoaded",()=>{
 renderFoods(foodData.slice(0,3),"featuredFoods");
 renderFoods(foodData,"menuFoods");
 updateCartCount();
});
