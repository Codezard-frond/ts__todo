const form = document.querySelector("form")!;
const ul = document.querySelector("ul")!;
const template = document.querySelector("template")!;
const nameInput = form.elements.namedItem("name") as HTMLInputElement;
const ageInput = form.elements.namedItem("age") as HTMLInputElement;

type User = {
  name: string;
  age: number;
};

let users: User[] = [];  
let editIndex: number | null = null;

function saveToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadFromLocalStorage() {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);  
    updateUI(users); 
  }
}

function updateUI(users: User[]) {
  users.forEach((item, index) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const h4 = clone.querySelector("h4")!;
    const h5 = clone.querySelector("h5")!;
    const delete__btn = clone.querySelector("#delete__btn")!;
    const rename__btn = clone.querySelector("#rename__btn")!;

    h4.textContent = item.name;
    h5.textContent = item.age.toString();

    delete__btn.addEventListener("click", () => {
      users.splice(index, 1);  
      saveToLocalStorage();  
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

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const age = +ageInput.value.trim();

  if (!name || !age) return;

  if (editIndex !== null) {
    users[editIndex] = { name, age }; 
    editIndex = null;
  } else {
    users.push({ name, age });  
  }

  saveToLocalStorage(); 
  updateUI(users); 
  form.reset();  
});

loadFromLocalStorage();
