let buttons = document.querySelectorAll(".btn");
let output = document.querySelector(".output");
let outputValue = "";
let specialChar = ["%", "+", "/", "*", "="];
let haveDot = false;
let dot = document.querySelector(".dot");
let allClear = document.querySelector(".all-clear");

buttons.forEach((btn) => {
  btn.addEventListener("click", (el) => calculate(el.target.innerHTML));  // btns par click karne ke liye eventlistener
});

allClear.addEventListener("click", (e) => {
  outputValue = "";
  output.innerHTML = outputValue;      // all clear karne ke liye eventlistener
  haveDot = false;
});

// calculate function
let calculate = (btnValue) => {

  // ek bar dot ke liye in decimals 
  if (btnValue == "." && !haveDot) {
    haveDot = true; // for dot only one time
  } else if (btnValue == "." && haveDot) {
    return;
  } else if (
    outputValue.charAt(outputValue.length - 1) == "+" ||
    outputValue.charAt(outputValue.length - 1) == "-" ||
    outputValue.charAt(outputValue.length - 1) == "*" ||
    outputValue.charAt(outputValue.length - 1) == "/" ||
    outputValue.charAt(outputValue.length - 1) == "%"
  ) {
    haveDot = false;
  }

  // percentage 
  if (outputValue.charAt(outputValue.length - 1) == "%" && btnValue == "=") {
    outputValue = outputValue.slice(0, -1);
    outputValue = outputValue / 100;
  }

  // equals "=" press pe kya hoga
  if (btnValue == "=" && outputValue !== "") {
    outputValue = eval(outputValue); // for calculation
    output.innerHTML = outputValue;
    if (btnValue == "DEL") {
      outputValue = outputValue.slice(0, -1); // for last value clear
    }
  }

  // DEl btn last value delete karne ke liye 
   else if (btnValue == "DEL") {
    outputValue = outputValue.slice(0, -1); // for last value clear
  } 
  
  // multi operator repeat nhi ho ek durse ke baad uske liye
  else if (
    outputValue.charAt(outputValue.length - 1) == "+" ||
    outputValue.charAt(outputValue.length - 1) == "-" ||
    outputValue.charAt(outputValue.length - 1) == "*" ||
    outputValue.charAt(outputValue.length - 1) == "/" ||
    outputValue.charAt(outputValue.length - 1) == "%"
  ) {
    if (
      btnValue !== "+" &&
      btnValue !== "-" &&
      btnValue !== "*" &&
      btnValue !== "/" &&
      btnValue !== "%"
    ) {
      outputValue += btnValue;
    } else {
      haveDot = false;
    }
  }

  // last me jo bhi btn hum press kar rhe hai usko output me append karne ke liye
   else {
    if (outputValue == "" && specialChar.includes(btnValue))
      return; // no char at first
    else {
      outputValue += btnValue; // append values
    }
  }
  output.innerHTML = outputValue;
};
