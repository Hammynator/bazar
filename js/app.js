const kebapImage = "images/kebap.jpg";

const items = [
    { title: "Classic Döner", price: "7.50", desc: "Premium veal, secret sauce, fresh lettuce.", tags: ["Bestseller", "Autentisch"] },
    { title: "Adana Kebap", price: "14.90", desc: "Hand-minced lamb grilled over charcoal.", tags: ["Scharf"] },
    { title: "Durum Wrap", price: "8.00", desc: "Thin lavaş bread with toasted meat.", tags: ["Bestseller"] },
    { title: "Iskender", price: "16.00", desc: "Buttery tomato sauce over pita and yogurt.", tags: ["Bestseller"] }
];

while(items.length < 20) {
    if (items.length % 3 === 0) {
        items.push({ title: "Veggie Item", price: "7.50", desc: "Fresh ingredients and traditional spices.", tags: ["Vegetarisch"] });
    }
    else {
        items.push({ title: "Menu Item", price: "9.50", desc: "Fresh ingredients and traditional spices.", tags: ["Authentisch"] });
    }
}

const container = document.getElementById('menu-container')
const buttons = document.querySelectorAll('.filter-btn');
let filter = "All";


buttons.forEach(btn => {
    btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('btn-primary'));
            btn.classList.add('btn-primary');
            filter = btn.innerText;
            renderMenu();
        });
});

function renderMenu() {
    container.innerHTML = "";
    items.forEach(item => {
        if ( filter === "All" || item.tags.includes(filter)) {
            container.innerHTML += `
                <div class="card bg-base-100 shadow-xl border border-base-300 h-full">
                    <figure><img src="${kebapImage}" alt="Food" /></figure>
                    
                    <div class="card-body flex flex-col flex-grow">
                        <div class="flex justify-between items-start">
                            <h2 class="card-title">${item.title}</h2>
                            <div class="badge badge-secondary">€${item.price}</div>
                        </div>
                        
                        <p class="flex-grow">${item.desc}</p>
                        
                        <div class="card-actions justify-end mt-4">
                            ${item.tags.map(tag => `<div class="badge badge-outline">${tag}</div>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

function updateShopStatus() {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + min / 60;

    const dot = document.getElementById('shop-dot');
    const text = document.getElementById('status-text');
    
    const isOpen = (day !== 0) && (time >= 11.5 && time < 21);

    if (isOpen) {
      dot.className = "w-3 h-3 rounded-full bg-success animate-pulse-slow shadow-[0_0_10px_#36d399]";
      text.textContent = "geöffnet";
      text.className = "hidden sm:inline text-xs font-bold uppercase tracking-widest text-success";
    } else {
      dot.className = "w-3 h-3 rounded-full bg-error opacity-80 shadow-[0_0_5px_#f87272]";
      text.textContent = "geschlossen";
      text.className = "hidden sm:inline text-xs font-bold uppercase tracking-widest text-error";
    }
  }

updateShopStatus();
renderMenu();
setInterval(updateShopStatus, 60000);