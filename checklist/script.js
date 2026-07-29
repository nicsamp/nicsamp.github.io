function check_button_click(event) {
    event.currentTarget.querySelector("i").classList.toggle("hidden");
    event.currentTarget.parentElement.querySelector(".checklist-item-delete").classList.toggle("hidden");
    
    event.currentTarget.parentElement.classList.toggle("checked");
    
    event.currentTarget.nextElementSibling.disabled = !event.currentTarget.nextElementSibling.disabled;

    const id = event.currentTarget.dataset.item_id;
    items[id]["checked"] = !items[id]["checked"];
    localStorage.setItem("userCache", JSON.stringify(items));
}

function delete_button_click(event) {
    const id = event.currentTarget.dataset.item_id;
    delete items[id];
    localStorage.setItem("userCache", JSON.stringify(items));

    event.currentTarget.parentElement.parentElement.remove();
}

function textbox_changed(event) {
    const id = event.currentTarget.dataset.item_id;
    const text  = event.currentTarget.value;
    items[id]["text"] = text;

    localStorage.setItem("userCache", JSON.stringify(items));
}

function add_item(event, data = {"checked": false, "text": ""}) {
    const li = document.createElement("li");
    li.className = "checklist-item-box" + (data.checked ? " checked" : "");

    const check_button = document.createElement("button");
    check_button.className = "checklist-item-checkbox";
    check_button.dataset.item_id = num_items;
    check_button.addEventListener("click", check_button_click);

    const check_icon = document.createElement("i");
    check_icon.className = "material-symbols-outlined" + (data.checked ? "" : " hidden");
    check_icon.textContent = "check";
    check_button.appendChild(check_icon);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Task name...";
    input.className = "checklist-item-input";
    input.value = data.text;
    input.disabled = data.checked;
    input.dataset.item_id = num_items;
    input.addEventListener("input", textbox_changed)

    const actions_box = document.createElement("div");
    actions_box.className = "checklist-item-actions";

    const delete_button = document.createElement("button");
    delete_button.className = "checklist-item-delete" + (data.checked ? "" : " hidden");
    delete_button.dataset.item_id = num_items;
    delete_button.addEventListener("click", delete_button_click);

    const delete_icon = document.createElement("i");
    delete_icon.className = "material-symbols-outlined";
    delete_icon.textContent = "delete";
    delete_button.appendChild(delete_icon);

    actions_box.appendChild(delete_button);
    li.append(check_button, input, actions_box);

    checklist.appendChild(li);

    items[num_items] = data;
    num_items++;
}

let cached_items = localStorage.getItem("userCache")
let items = {};
let num_items = 0;
let checklist;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-item").addEventListener("click", add_item)
    
    checklist = document.getElementById("checklist")

    if (cached_items) {
        for (const item of Object.values(JSON.parse(cached_items))) {
            add_item(null, item)
        }
        console.log(items);
    }
});