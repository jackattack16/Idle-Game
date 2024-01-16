let RP = 100000000;
let cps = 0;
let clickAmount = 1;
let tickSpeed = 100
const store = {
    "b1": { //team member
        basePrice: 15,
        amount: 0,
        cps: .1,
        multiplier: 1,
        upgrades: 1,
    },
    "b2": { //scouter
        basePrice: 100,
        amount: 0,
        cps: 2,
        multiplier: 1,
        upgrades: 1,
    },
    "b3": { //pit crew
        basePrice: 1000,
        amount: 0,
        cps: 100,
        multiplier: 1,
        upgrades: 1,
    },
    "b4": { //captin
        basePrice: 100000,
        amount: 0,
        cps: 250,
        multiplier: 1,
        upgrades: 1,
    },
    "b5": { //Robot
        basePrice: 1000000,
        amount: 0,
        cps: 1000,
        multiplier: 1,
        upgrades: 1,
    },
};

const upgrades = {
    "b1": {
        "u1": {
            "name": "Padded seats",
            "decription": "Give the scouters a nice, padded seat so that they are more comforatble while scouting.",
            "price": "1500",
            "multiplierIncrese": .1,
        },
        "u2": {
            "name": "Cookies",
            "decription": "Keep your scouters feed so that they stay happy, complacent workers.",
            "price": "7500",
            "multiplierIncrese": .1,
        },
        "u3": {
            "name": "No Breaks",
            "decription": "Who used them anyways?",
            "price": "15000",
            "multiplierIncrese": .15,
        },
        "u4": {
            "name": "Gold plated chairs",
            "decription": "Only for one so that they comnpete to make more ranking points so they get it.",
            "price": "75000",
            "multiplierIncrese": .15,
        },
        "u5": {
            "name": "Neuralink",
            "decription": "Replace the human scouters with a superinteligent AI for maximum accuracy.",
            "price": "150000",
            "multiplierIncrese": .5,
        }
    }
}
let b1UpgradePath = [5, 25, 50, 75, 100];
function calcPrice(item) {
    return Math.ceil(store[item]["basePrice"]*1.1**store[item]["amount"]);
}

function calcCPS(item) {
    return store[item]["cps"]*store[item]["multiplier"];
}

function press() {
    RP = RP + clickAmount;
    updateDisplays();
}

function buyItem(item) {
    let price = calcPrice(item);
    if (RP >= price) {
        RP = RP - price;
        store[item]["amount"]++;
        console.log(store[item]["amount"]);
        updateStore();
        cps += calcCPS(item);
        updateDisplays();
    }
}

function updateDisplays() {
    document.getElementById('counter').innerText = RP.toFixed(0) + " RP";
    document.getElementById('cpsCounter').innerText = cps.toFixed(2) + " RPPS";
}
function updateStore() {
    for (let i = 1; i < Object.keys(store).length+1; i++ ) {
        let item = 'b' + i;
        let infoDisplay = document.getElementById(item + 'Info');
        let price = calcPrice(item);
        let cps = calcCPS(item);
        let amount = store[item]["amount"];
        let content = "RPPS: " + cps + "<br/>" + "You Have: " + amount;
        infoDisplay.innerHTML = content;
        document.getElementById(item).textContent = price + "RP";
    }
}

function buyUpgrade(upgrade) {

}
function tick() {
    RP = RP + cps;
    console.log(RP);
    updateDisplays();
}
  
setInterval(tick, tickSpeed);

function checkForUpgrades() {
    if(b1UpgradePath[0] < store["b1"]["amount"]) {
        let table = document.getElementById('upgrades');
        const newRow = table.insertRow();
        const name = newRow.insertCell();
        name.innerText = upgrades["b1"]["u" + store["b1"]["upgrades"]]["name"];
        name.classList.add("upgradeName");
        const decription = newRow.insertCell();
        decription.innerText = upgrades["b1"]["u" + store["b1"]["upgrades"]]["decription"];
        decription.classList.add("upgradeDecription");
        const info = newRow.insertCell();
        info.innerText = upgrades["b1"]["u" + store["b1"]["upgrades"]]["multiplierIncrese"];
        const buy = newRow.insertCell();
        buy.innerHTML = "<button onclick='buyUpgrade(this.id)' id='" + "b" + 1 + "u" + store["b1"]["upgrades"] +"'>" + upgrades["b1"]["u" + store["b1"]["upgrades"]]["price"] + "</button>";
        b1UpgradePath.shift();
        store["b1"]["upgrades"]++;
    }
}
  
setInterval(checkForUpgrades, tickSpeed);