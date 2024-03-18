const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const cashInDrawer = document.getElementById('cash-in-drawer');
const purchaseBtn = document.getElementById('purchase-btn');

let price = 19.5;

let cid = [
    ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
];

const currency = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

const authorize = () => {
    const cashIn = parseFloat(cash.value);

    if (cashIn < price) {
        return alert("Customer does not have enough money to purchase the item");
    } else if (cashIn === price) {
        return changeDue.innerHTML = "No change due - customer paid with exact cash";
    } else {
        calculateChangeDue(price, cashIn, cid);
    }
};

const calculateChangeDue = (price, cashIn, cid) => {
    
    let cidTotal = Number(cid.reduce((sum, element) => sum + element[1], 0));

    let change = cashIn - price;

    if (cidTotal < change) {
        return changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";  
    } else if (cidTotal === change) {
        let changeArr = [];
        let changeHtml = "";
        for (let i = cid.length - 1; i >= 0; i--) {
            let denomination = cid[i][0];
            let valueTotal = cid[i][1];
            if (valueTotal > 0) {
                changeArr.push([denomination, valueTotal]);
                cid[i][1] = 0;
                changeHtml += `<div>${changeArr[i][0]}: $${changeArr[i][1]}</div>`;
                break; 
            }
        }
        return changeDue.innerHTML = `Status: CLOSED <br> change: ${changeHtml}`;
     } else {
        let changeArr = [];

        for (let i = cid.length - 1; i >= 0; i--) {
            let denomination = cid[i][0];
            let valueTotal = cid[i][1];
            let value = currency[denomination];
            let currencyAmount = Number((valueTotal / value).toFixed(2));
            let amountUsed = 0;

            while (change >= value && currencyAmount > 0) {
                change -= value;
                change = Number(change.toFixed(2));
                currencyAmount --;
                amountUsed += value;
            }   
        
            if (amountUsed > 0) {
                changeArr.push([denomination, amountUsed]);
            }
        }

        if (change > 0) {
            return changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
        }

        let changeHtml = '';
        for (let i = 0; i < changeArr.length; i++) {
            changeHtml += `<div>${changeArr[i][0]}: $${changeArr[i][1]}</div>`;
        }
        return changeDue.innerHTML = `Status: OPEN<br> ${changeHtml}`;
    }

    drawer();
};

const drawer = ()=> {
    let drawerHtml = 'Price: $' + price.toFixed(2) + '<br> Change in drawer: <br>';

    for (let i = 0; i < cid.length; i++) {
        drawerHtml += `${cid[i][0]} : $${cid[i][1].toFixed(2)}<br>`
    }
    cashInDrawer.innerHTML = drawerHtml;
}

drawer();

purchaseBtn.addEventListener('click', () => {
    authorize();
    cash.value = "";
});
