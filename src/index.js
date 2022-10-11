import "./styles.css";

const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richest_people = [
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Larry Ellison",
  "Mukesh Ambani",
  "Larry Page",
  "Sergey Brin"
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richest_people]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, i) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", i);
      listItem.innerHTML = `
    <span class="number">${i + 1}</span>
    <div class="draggable" draggable = "true">
    <p class="person-name">${person}</p>
    <i class="fa fa-bars"></i>
    </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  //  console.log("Event: ", "dragstart");
  dragStartIndex = this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}
function dragOver(e) {
  // console.log("Event: ", "dragstart");
  e.preventDefault();
}
function dragDrop() {
  //  console.log("Event: ", "drop");
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function dragEnter() {
  //  console.log("Event: ", "dragenter");
  this.classList.add("over");
}
function dragLeave() {
  //  console.log("Event: ", "dragleave");
  this.classList.remove("over");
}

function swapItems(from, to) {
  // console.log(from);
  const itemOne = listItems[from].querySelector(".draggable");
  const itemTwo = listItems[to].querySelector(".draggable");

  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    let personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richest_people[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

check.addEventListener("click", checkOrder);
