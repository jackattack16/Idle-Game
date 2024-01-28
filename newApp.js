let RP = 500;
let cps = 0;
let tickSpeed = 0;
let clickAmount = 1;

const store = {
    "b1": { //team member
        basePrice: 15, //The starting price of the item
        currentPrice: 0, //The current price of the item
        amount: 0, //Amount curently owned
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
/* buff: [type (multiplier = 1, special = 2, flag = 3], [Building or flag], [multiplier amound, or flag value or special buff id */
const upgrades = {
    "b1": {
        u1: {
            name: "Hats",
            decription: "Give your team members some swag!.",
            price: 1500,
            buff: "1,b1,2",
            textStatBuff: "Members are twice as efficent!"
        },
        u2: {
            name: "Saftey Glasses",
            decription: "To decrese the fatality rate",
            price: 7500,
            buff: "3,1,false",
            textStatBuff: "Members wont have anymore tragic accidents!"
        },
        u3: {
            name: "4090Ti",
            decription: "For those who open the field",
            price: 15000,
            buff: "1,b1,2",
            textStatBuff: "Members work twice as fast!"
        },
        u4: {
            name: "Saturday Lunches",
            decription: "So they can keep working",
            price: 75000,
            buff: "1,b1,2",
            textStatBuff: "Members are twice as efficent!"
        },
        u5: {
            name: "Monarchy",
            decription: "To remove the time taken away from neutrino by democracy.",
            price: 150000,
            buff: "2,b1,0.5#TM",
            textStatBuff: "Members gain 0.1 RPS for every Team Member Owned!"
        }
    },
    "b2": {
        u1: {
            name: "Padded seats",
            decription: "Give the scouters a nice, padded seat so that they are more comforatble while scouting.",
            price: 5000,
            multiplierIncrese: 1,
        },
        u2: {
            name: "Cookies",
            decription: "Keep your scouters feed so that they stay happy, complacent workers.",
            price: 14000,
            multiplierIncrese: .1,
        },
        u3: {
            name: "No Breaks",
            decription: "Who used them anyways?",
            price: 35000,
            multiplierIncrese: .15,
        },
        u4: {
            name: "Gold plated chairs",
            decription: "Only for one so that they comnpete to make more ranking points so they get it.",
            price: 100000,
            multiplierIncrese: .15,
        },
        u5: {
            name: "Neuralink",
            decription: "Replace the human scouters with a superinteligent AI for maximum accuracy.",
            price: 1000000,
            multiplierIncrese: .5,
        }
    }
};


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
        document.getElementById(building + "Info").innerHTML = "RPPS: " + store[building]["currentCPS"] + "<br/> <br/> -------- <br/> <br/>" + "You Have: " + store[building]["amount"];
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
        while(store[item]["upgradeTrack"][0] < store[item]["amount"]) {
          let upgrade = "u" + store[item]["upgrades"];
            addUpgrade(item, upgrade);
            store[item]["upgradeTrack"].shift();
            store[item]["upgrades"]++;
        }
    }
}
function tick() {
    RP = RP + cps;
    updateDisplays();
    checkForUpgrades();
}
  
setInterval(tick, tickSpeed);



function applyUpgradeEffect(input) {
  let value1 = input.split(",")[0];
  let value2 = input.split(",")[1];
  let value3 = input.split(",")[2];
  if (value1 == 1) {
    changeItemRPS(value2, value3);
  }
  if (value1 == 2) {
    specialEffect(value2, value3);
  }
  if (value1 == 3) {
    changeFlag(value2, value3);
  }
}

function changeItemRPS(item, value) {
  store[item]["currentCPS"] = store[item]["currentCPS"]*value;
  calculateTotalCPS(); 
  updateStore();
  updateDisplays();
}




/* <p class="dec"> upgrades[item][upgrade]["decription"]</p> <p class="buff"> upgrades[item][upgrade]["textStatBuff"]</p> */

function buyUpgrade(input) {
  let item = input.split(";")[0];
  let upgrade = input.split(";")[1];
  if(upgrades[item][upgrade]["price"] <= RP) {
        RP = RP - upgrades[item][upgrade]["price"];
        var row = document.getElementById(item + upgrade);
        row.parentNode.removeChild(row);
        applyUpgradeEffect(upgrades[item][upgrade]["buff"]);
        updateDisplays();
    }
}


function addUpgrade(item, upgrade) {
  if(item == "b1" || item == "b2") {
  let table = document.getElementById('upgrades');
  let row = table.insertRow();
  row.id = item + upgrade;
  var cellName = row.insertCell(0);
  var cellDec = row.insertCell(1);
  var cellBuy = row.insertCell(2);
  cellName.innerHTML = upgrades[item][upgrade]["name"];
  cellName.classList.add("upName");
  cellDec.innerHTML = "<p class=\"buff\">" + upgrades[item][upgrade]["textStatBuff"] + "</p> <p class=\"dec\">" + upgrades[item][upgrade]["decription"] + "</p>";
  cellBuy.innerHTML = "<button onclick=\"buyUpgrade(this.id)\" id=\"" + item + ";" + upgrade + "\" class=\"buyUpgrade\">" + upgrades[item][upgrade]["price"] + "RP </button>";
  cellBuy.classList.add("upBuy");
}
}
