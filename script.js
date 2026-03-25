const button = document.getElementById("click-button");
const count = document.getElementById("click-count");
const shopContainer = document.getElementById("shop-items");

let totalClickCount = 0;
let itemsOwned = [];

const shopItems = [
    {
        name: "Slime",
        description: "Slimes click for you, earning you money.",
        cost: 10,
        startingCost: 10
    },
    {
    name: "Multiplier",
    description: "Multiplies the value of each click by 2.",
    cost: 50,
    startingCost: 50,
  },
];

function buttonClick() {
  console.log("Button was clicked!");

  const MultiplierOwned = itemsOwned.find((i) => i.name ==="Multiplier");
  const MultiplierCount = MultiplierOwned ? MultiplierOwned.amount : 0;

  totalClickCount = totalClickCount + 1 * 2 ** MultiplierCount;
  count.textContent = totalClickCount;
}

button.addEventListener("click", buttonClick);


function updateOwnedItems() {
  const ownedContainer = document.getElementById("owned-items");
  if (!ownedContainer) return;

  ownedContainer.innerHTML = ""; // clear old list

  itemsOwned.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "owned-item";
    itemDiv.innerHTML = `
      <strong>${item.name}:</strong> ${item.amount}
    `;
    ownedContainer.appendChild(itemDiv);
  });
}

function createShopItems() {

  document.querySelectorAll(".shop-item") .forEach((element) => {
    element.remove();
  });

  shopItems.forEach((item) => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    shopItem.innerHTML = `
     <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <button onclick="buyItem('${item.name}')">
        Buy $${item.cost}
      </button>
    `;

    shopContainer.appendChild(shopItem);
  });
}

function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (!item) return;

  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;

    
    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    // make the item cost more each time you buy it
    item.cost = item.startingCost + item.startingCost * (amount ** 2);
 console.log(`New ${item.name} price: $${item.cost}, owned: ${amount}`);
    createShopItems(); 
    updateOwnedItems();  

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}


setInterval(() => {
  const slimeOwned = itemsOwned.find((i) => i.name === "Slime");
  if (slimeOwned) {
    for (let i = 0; i < slimeOwned.amount; i++) {
      buttonClick();
    }
  }
}, 1000);

createShopItems();
updateOwnedItems();