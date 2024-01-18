let RP = 0;
let cps = 0;
let tickSpeed = 1000;
let clickAmount = 1;

const store = {
    "b1": { //team member
        basePrice: 15, //The starting price of the item
        currentPrice: 0, //The current price of the item
        amount: 25, //Amount curently owned
        cps: .1, //The base CPS of the item
        currentCPS: .1, //The current CPS of the item
        upgrades: 1, //Upgrades unlocked
        upgradeTrack: [10, 25, 50, 100, 200], //Amount of items owned to unlock an upgrade
    },
    "b2": { //scouter
        basePrice: 100,
        currentPrice: 0,
        amount: 0,
        cps: 2,
        currentCPS: 2,
        upgrades: 1,
        upgradeTrack: [10, 25, 50, 100, 200],
    },
    "b3": { //pit crew
        basePrice: 1000,
        currentPrice: 0,
        amount: 0,
        cps: 100,
        currentCPS: 100,
        upgrades: 1,
        upgradeTrack: [10, 25, 50, 100, 200],
    },
    "b4": { //captin
        basePrice: 100000,
        currentPrice: 0,
        amount: 0,
        cps: 250,
        currentCPS: 250,
        upgrades: 1,
        upgradeTrack: [10, 25, 50, 100, 200],
    },
    "b5": { //Robot
        basePrice: 1000000,
        currentPrice: 0,
        amount: 0,
        cps: 1000,
        currentCPS: 1000,
        upgrades: 1,
        upgradeTrack: [10, 25, 50, 100, 200],
    },
};

const upgrades = {
    "b1": {
        u1: {
            name: "Padded seats",
            decription: "Give the scouters a nice, padded seat so that they are more comforatble while scouting.",
            price: "1500",
            multiplierIncrese: 1,
        },
        u2: {
            name: "Cookies",
            decription: "Keep your scouters feed so that they stay happy, complacent workers.",
            price: "7500",
            multiplierIncrese: .1,
        },
        u3: {
            name: "No Breaks",
            decription: "Who used them anyways?",
            price: "15000",
            multiplierIncrese: .15,
        },
        u4: {
            name: "Gold plated chairs",
            decription: "Only for one so that they comnpete to make more ranking points so they get it.",
            price: "75000",
            multiplierIncrese: .15,
        },
        u5: {
            name: "Neuralink",
            decription: "Replace the human scouters with a superinteligent AI for maximum accuracy.",
            price: "150000",
            multiplierIncrese: .5,
        }
    },
    "b2": {
        u1: {
            name: "Padded seats",
            decription: "Give the scouters a nice, padded seat so that they are more comforatble while scouting.",
            price: "1500",
            multiplierIncrese: 1,
        },
        u2: {
            name: "Cookies",
            decription: "Keep your scouters feed so that they stay happy, complacent workers.",
            price: "7500",
            multiplierIncrese: .1,
        },
        u3: {
            name: "No Breaks",
            decription: "Who used them anyways?",
            price: "15000",
            multiplierIncrese: .15,
        },
        u4: {
            name: "Gold plated chairs",
            decription: "Only for one so that they comnpete to make more ranking points so they get it.",
            price: "75000",
            multiplierIncrese: .15,
        },
        u5: {
            name: "Neuralink",
            decription: "Replace the human scouters with a superinteligent AI for maximum accuracy.",
            price: "150000",
            multiplierIncrese: .5,
        }
    }
}

function calcPrice(item) {
    return Math.ceil(store[item]["basePrice"]*1.1**store[item]["amount"]);
}

function calculateTotalCPS() {
    cps = 0;
    for(let i = 1; i < Object.keys(store).length+1; i++) {
        let building = "b" + i;
        cps += store[building]["currentCPS"]*store[building]["amount"];
    }
    console.log("cps = "+ cps);
}

function updateDisplays() {
    document.getElementById('counter').innerText = parseFloat(RP.toFixed(3)) + " RP";
    document.getElementById('cpsCounter').innerText = parseFloat(cps.toFixed(3)) + " RPPS";
}

function onLoad() {
    for(let i = 1; i < Object.keys(store).length+1; i++ ) {
        let building = "b" + i;
        store[building]["currentPrice"] = calcPrice(building);
    }
    updateStore();
    calculateTotalCPS();
    updateDisplays();
}



function updateStore() {
    for(let i = 1; i < Object.keys(store).length+1; i++ ) {
        let building = "b" + i;
        document.getElementById(building + "Info").innerHTML = "RPPS: " + store[building]["currentCPS"] + "<br/>" + "You Have: " + store[building]["amount"];
        document.getElementById(building).textContent = store[building]["currentPrice"] + "RP";
    }
}

function press() {
    RP = RP + clickAmount;
    updateDisplays();
}

function buyItem(building) {
    console.log(building);
    if(store[building]["currentPrice"] <= RP) {
        RP = RP - store[building]["currentPrice"];
        store[building]["amount"]++;
        store[building]["currentPrice"] = calcPrice(building);
        updateStore();
        calculateTotalCPS();
        updateDisplays();
    }
}

function checkForUpgrades() {
    for(let i = 1; Object.keys(store).length+1; i++) {
        let item = "b" + i;
        if(store[item]["upgradeTrack"][0] < store[item]["amount"]) {
            console.log(upgrades[item]["u" + store[item]["upgrades"]]);
        }
    }
}
function tick() {
    RP = RP + cps;
    updateDisplays();
    checkForUpgrades();
}
  
setInterval(tick, tickSpeed);