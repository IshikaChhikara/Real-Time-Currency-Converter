const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);   //sare countries ko dropdown m lane k liye hmne append kra means add kra html m
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);   //target ka mtlb => agr hmne kahi bhi change kra toh kha pr change aaya
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();  //button phele jo bhi by default kaam ho rahe the abb wo nhi honge
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;   //api capital letter m work nhi krti toh usse small value m convert krna hoga
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    // yha se add kiya hai..check later
    const mssg = document.querySelector(".mssg");

    let finalAmount = amtVal * rate;
    mssg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`; //toFixed use kiya jisse decimal clear ho (bas 2 decimal places tk he ho show)

});
