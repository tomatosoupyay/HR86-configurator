const carData = {
    base: {
        price: 18000,
        colors: ["white", "black", "gray", "red", "blue", "silver"]
    },

    cascade: {
        price: 19500,
        colors: ["cascadegreen"]
    },

    camping: {
        price: 19000,
        colors: ["campinglivery"]
    },

    rally: {
        price: 20000,
        colors: ["rallyred", "rallyblue","rallywhite"]
    }
}
const colorData = {
    blue: {
        name: "Base Blue",
        price: 0
    },
    white: {
        name: "Champion White",
        price: 0
    },
    black: {
        name: "Raven Black",
        price: 0
    },
    gray: {
        name: "Boring Gray",
        price: 500
    },
    red: {
        name: "Racing Red",
        price: 0
    },
    silver: {
        name: "Aluminium",
        price: 0
    },
    cascadegreen: {
        name: "Cascades Green",
        price: 0
    },
    campinglivery: {
        name: "Camping Gray-Red color scheme",
        price: 0
    },
    rallyred: {
        name: "Rally scheme red",
        price: 0
    },
    rallyblue: {
        name: "Rally scheme blue",
        price: 0
    },
    rallywhite: {
        name: "Rally scheme white",
        price: 0
    }
}
const transmissionData = {
    manual: {
        name: "4-Speed Manual",
        price: 0
    },

    automatic: {
        name: "4-Speed Automatic",
        price: 500
    }
}
const equipmentData = {
    frontplatebracket: {
        name: "Front Plate Bracket",
        price: 1000
    },

    firstaid: {
        name: "First Aid Kit",
        price: 100
    }
}
const finalDriveData = {
    standardfinaldrive: {
        name: "Standard Final Drive (1.2:1)",
        price: 0
    },

    shortfinaldrive: {
        name: "Short Final Drive (1:1)",
        price: 200
    }
}

const marketData = {
    canada: {
        name: "Canadian Market",
        price: 0
    },

    EUDM: {
        name: "European Market",
        price: 200
    },

    UKDM: {
        name: "Great Britain",
        price: 1000
    },

    AUDM: {
        name: "Australia",
        price: 1000
    },

    JDM: {
        name: "Japan",
        price: 1000
    },

    "USDM-F": {
        name: "United States (Fahrenheit)",
        price: 2000
    },

    TMS: {
        name: "TomatoMarket-Special",
        price: 500
    },

    Europe27: {
        name: "Europe-2027 Onward",
        price: 5000
    }
}

let currentTrim = "base"
let currentTrans = "manual"
let currentColor = "white"
let currentEquipment = []
let currentTire = "allround"
let currentMarket = "canada"
let currentFinal = "standardfinaldrive"


function setTrim(trim){

    currentTrim = trim

    document.getElementById("selectedTrim").textContent =
        "Trim: " + capitalize(trim)

    updateAvailableColors()

    updatePrice()

    // force valid color
    if (!carData[trim].colors.includes(currentColor)){
        setColor(carData[trim].colors[0])
    }
}
function setColor(color){

    currentColor = color

    document.getElementById("carImage").src =
        "images/exterior/" + color + ".jpg"

    document.getElementById("selectedColor").textContent =
        "Color: " + colorData[color].name

}
function setTrans(trans){

    currentTrans = trans

    document.getElementById("selectedTrans").textContent =
        "Transmission: " + transmissionData[trans].name

    updateBreakdown()
    updatePrice()
}
function addEquip(item){

    if(currentEquipment.includes(item))
        currentEquipment = currentEquipment.filter(x=>x!=item)
    else
        currentEquipment.push(item)

    updateBreakdown()
    updatePrice()
}
function setMarket(market){

    currentMarket = market

    document.getElementById("selectedMarket").textContent =
        "Market Compliance: " + marketData[market].name

    updateBreakdown()
    updatePrice()
}
function setFinalDrive(final){

    currentFinal = final

    document.getElementById("selectedFinalDrive").textContent =
        "Final Drive: " + finalDriveData[final].name

    updateBreakdown()
    updatePrice()
}
function updateAvailableColors(){

    const container = document.getElementById("colorButtons")
    container.innerHTML = ""

    carData[currentTrim].colors.forEach(color => {

        const btn = document.createElement("button")
        btn.textContent = capitalize(color)

        btn.onclick = () => setColor(color)

        container.appendChild(btn)
    })
}
function updatePrice(){

    let price = carData[currentTrim].price

    price += transmissionData[currentTrans].price
    price += finalDriveData[currentFinal].price
    price += marketData[currentMarket].price
    price += colorData[currentColor].price

    currentEquipment.forEach(item=>{
        price += equipmentData[item].price
    })

    document.getElementById("headerPrice").textContent =
        "$" + price.toLocaleString()

    document.getElementById("summaryPrice").textContent =
        "Sale Price: $" + price.toLocaleString()
}
function updateBreakdown(){

    let breakdown = ""

    if(transmissionData[currentTrans].price > 0){
        breakdown += transmissionData[currentTrans].name +
            " +$" +
            transmissionData[currentTrans].price.toLocaleString() +
            "<br>"
    }

    if(finalDriveData[currentFinal].price > 0){
        breakdown += finalDriveData[currentFinal].name +
            " +$" +
            finalDriveData[currentFinal].price.toLocaleString() +
            "<br>"
    }

    if(marketData[currentMarket].price > 0){
        breakdown += marketData[currentMarket].name +
            " +$" +
            marketData[currentMarket].price.toLocaleString() +
            "<br>"
    }

    if(colorData[currentColor].price > 0){
        breakdown += colorData[currentColor].name +
            " +$" +
            colorData[currentColor].price.toLocaleString() +
            "<br>"
    }

    currentEquipment.forEach(item=>{
        breakdown += equipmentData[item].name +
            " +$" +
            equipmentData[item].price.toLocaleString() +
            "<br>"
    })

    if(breakdown=="")
        breakdown="No Additional Equipment"

    document.getElementById("optionBreakdown").innerHTML =
        breakdown
}
function capitalize(text){

    return text.charAt(0).toUpperCase() +
        text.slice(1)

}
updateAvailableColors()
updateBreakdown()
updatePrice()
