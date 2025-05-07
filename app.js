"use strict";
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const template = document.querySelector("template");
const nameInput = form.elements.namedItem("name");
const ageInput = form.elements.namedItem("age");
const users = [];
let editIndex = null;
function updateUI(users) {
    ul.innerHTML = "";
    users.forEach((item, index) => {
        const clone = template.content.cloneNode(true);
        const h4 = clone.querySelector("h4");
        const h5 = clone.querySelector("h5");
        const delete__btn = clone.querySelector("#delete__btn");
        const rename__btn = clone.querySelector("#rename__btn");
        h4.textContent = item.name;
        h5.textContent = item.age.toString();
        delete__btn.addEventListener("click", () => {
            users.splice(index, 1);
            updateUI(users);
        });
        rename__btn.addEventListener("click", () => {
            nameInput.value = item.name;
            ageInput.value = item.age.toString();
            editIndex = index;
        });
        ul.appendChild(clone);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = +ageInput.value.trim();
    if (!name || !age)
        return;
    if (editIndex !== null) {
        users[editIndex] = { name, age };
        editIndex = null;
    }
    else {
        users.push({ name, age });
    }
    updateUI(users);
    form.reset();
});
