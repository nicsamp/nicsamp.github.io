function check_today() {
    if (Temporal.Now.plainDateISO().equals(current_page)) {
        today_button.classList.add("hidden");
    }
    else {
        today_button.classList.remove("hidden");
    }
}



function page_back() {
    current_page = current_page.subtract({days: 1});
    check_today();
    load_page(current_page);
}

function page_forward() {
    current_page = current_page.add({days: 1});
    check_today();
    load_page(current_page);
}

function page_current() {
    current_page = Temporal.Now.plainDateISO();
    today_button.classList.add("hidden");
    load_page(current_page); 
}

function textarea_changed(event) {
    tracker[current_page.toString()][event.currentTarget.dataset.id] = event.currentTarget.value;
    localStorage.setItem("userCache", JSON.stringify(tracker));
}

function load_page(page) {
    let data;
    let key = page.toString();
    if (Object.hasOwn(tracker, key)) {
        data = tracker[key];
    }
    else {
        data = {
            "content_1": "",
            "content_2": ""
        }
        tracker[key] = data;

        localStorage.setItem("userCache", JSON.stringify(tracker));
    }

    let date_string = page.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    date_label.textContent = date_string;
    content_textarea_1.value = data["content_1"];
    content_textarea_2.value = data["content_2"];

}

let tracker_cached = localStorage.getItem("userCache")
let tracker = {};
let current_page = Temporal.Now.plainDateISO();
let date_label;
let content_textarea_1;
let content_textarea_2;
let today_button;

if (tracker_cached) {
    tracker = JSON.parse(tracker_cached);
}

document.addEventListener("DOMContentLoaded", () => {
    date_label = document.getElementById("date");
    content_textarea_1 = document.getElementById("content-1");
    content_textarea_2 = document.getElementById("content-2");

    load_page(current_page);

    content_textarea_1.addEventListener("input", textarea_changed);
    content_textarea_2.addEventListener("input", textarea_changed);

    document.getElementById("button-page-forward").addEventListener("click", page_forward);
    document.getElementById("button-page-back").addEventListener("click", page_back);
    today_button = document.getElementById("button-action-today")
    today_button.addEventListener("click", page_current)
});