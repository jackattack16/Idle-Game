const store = {
    "b1": { //team member
        basePrice: 15,
        amount: 11,
        cps: .1,
        currentCPS: .1,
        multiplier: 1,
        upgrades: 1,
    },
    "b2": { //scouter
        basePrice: 100,
        amount: 2,
        cps: 2,
        currentCPS: 2,
        multiplier: 1,
        upgrades: 1,
    },
    "b3": { //pit crew
        basePrice: 1000,
        amount: 1,
        cps: 100,
        currentCPS: 100,
        multiplier: 1,
        upgrades: 1,
    },
    "b4": { //captin
        basePrice: 100000,
        amount: 5,
        cps: 250,
        currentCPS: 250,
        multiplier: 1,
        upgrades: 1,
    },
    "b5": { //Robot
        basePrice: 1000000,
        amount: 9,
        cps: 1000,
        currentCPS: 1000,
        multiplier: 1,
        upgrades: 1,
    },
};

function buyItem(item) {
    let price = calcPrice(item);
    if (RP >= price) {
        RP = RP - price;
        store[item]["amount"]++;
        console.log(store[item]["amount"]);
        updateStore();
        updateDisplays();
    }
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
