// constants

// State

let bank = [];
let odds = [];
let evens = [];

// create a form
// use input in form to add to bank
// display all inputs in bank -> render after input
// sort 1 -> sort first number in bank using %
//

function addToBank(input) {
  bank.push(input);
  render();
}
function sortBank(idName) {
  // amount of times to sort (based on id name)
  let amount;
  if (idName === "one") amount = 1;
  else amount = bank.length;
  // make shallow copy of bank to replace bank after it has been sorted
  // from indices of times sorted to total bank length
  let newBank = bank.slice(amount, bank.length);
  // calculate evens and odds
  for (let i = 0; i < amount; i++) {
    if (bank[i] % 2 !== 0) odds.push(bank[i]);
    else evens.push(bank[i]);
  }
  // after calculations are complete, update bank
  bank = newBank;
  // re-render the page after updating
  render();
}

// Components
function BankForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
  <label>
  Add a new number to the bank
  <input name="num" type="number" />
  </label>
  <button>+</button>
  `;
  $form.addEventListener("submit", () => {
    event.preventDefault();
    const formData = new FormData($form);
    const dataToNum = Number(formData.get("num"));
    addToBank(dataToNum);
  });
  return $form;
}
function CreateButton(idName) {
  const $button = document.createElement("button");
  $button.innerHTML = `
  <button id="${idName}">Sort ${idName}</button>
  `;
  $button.addEventListener("click", () => {
    // check for empty bank
    if (bank.length !== 0) sortBank(idName);
  });
  return $button;
}

function DisplayArray(bankType) {
  const $ul = document.createElement("ul");
  for (i = 0; i < bankType.length; i++) {
    const $li = document.createElement("li");
    $li.innerHTML = bankType[i];
    $ul.appendChild($li);
  }
  return $ul;
}

// Render()
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <BankForm></BankForm>
  <ButtonOne></ButtonOne>
  <ButtonAll></Buttonall>
  <h2>Bank</h2>
  <DisplayBank></DisplayBank>
  <h2>Odds</h2>
  <DisplayOdds></DisplayOdds>
  <h2>Evens</h2>
  <DisplayEvens></DisplayEvens>
  `;
  $app.querySelector("BankForm").replaceWith(BankForm());
  $app.querySelector("ButtonOne").replaceWith(CreateButton("one"));
  $app.querySelector("ButtonAll").replaceWith(CreateButton("all"));
  $app.querySelector("DisplayBank").replaceWith(DisplayArray(bank));
  $app.querySelector("DisplayOdds").replaceWith(DisplayArray(odds));
  $app.querySelector("DisplayEvens").replaceWith(DisplayArray(evens));
}
render();
