let b1UpgradePath = [10, 25, 50, 100, 200];
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
    }
}

function buyUpgrade(id) {
    let building = id[0] + id[1];
    console.log(building);
    let upgrade = id[2] + id[3];
    console.log(upgrade);
    if(upgrades[building][upgrade]["price"] <= RP) {
        store[building]["multiplier"] += upgrades[building][upgrade]["multiplierIncrese"];
        RP = RP-upgrades[building][upgrade]["price"];
        console.log(store[building]["multiplier"]);
    /* var row = document.getElementById(upgrade);
        row.parentNode.removeChild(row); */
    } 
}  


function checkForUpgrades() {
    if(b1UpgradePath[0] < store["b1"]["amount"]) {
        let table = document.getElementById('upgrades');
        const newRow = table.insertRow();
        newRow.id = "u" + store["b1"]["upgrades"];
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