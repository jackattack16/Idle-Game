let RP = 0;
let cps = 0;
let clickAmount = 1;

const store = {
    b1: { //team member
        basePrice: 15,
        amount: 0,
        cps: .1,
        multiplier: 1,
    },
    b2: { //scouter
        basePrice: 100,
        amount: 0,
        cps: 2,
        multiplier: 1,
    },
    b3: { //pit crew
        basePrice: 1000,
        amount: 0,
        cps: 100,
        multiplier: 1,
    },
    b4: { //captin
        basePrice: 100000,
        amount: 0,
        cps: 250,
        multiplier: 1,
    },
    b5: { //Robot
        basePrice: 1000000,
        amount: 0,
        cps: 1000,
        multiplier: 1,
    },
};

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


function tick() {
    RP = RP + cps;
    console.log(RP);
    updateDisplays();
  }
  
  setInterval(tick, 1);
  