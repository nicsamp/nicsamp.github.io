// --- State & Constants ---
const template = {"pages": [
    [{"type": "date"}, {"type": "content"}],
    [{"type": "content"}, {"type": "content"}]
]};
let tracker = JSON.parse(localStorage.getItem("userCache")) || { 0: {}, 1: {}, 2: {} };
let current_page = Temporal.Now.plainDateISO();
let current_view = 0;

let els = {};

let template_formatted = {
    "data": {}
};
let content_id = 1;
template.pages.forEach(page => {
    page.forEach(element => {
        if (element.type === "content") {
            template_formatted.data[`content_${content_id}`] = "";
            content_id++;
        }
    });
});

function create_content() {
    let element_ids = {};
    template.pages[0].forEach(element => {
        if (element.type === "date") {
            element_ids[element.type] ??= 1;

            els[`date_${element_ids[element.type]}`] = document.createElement("h1");
            els.page_1.appendChild(els[`date_${element_ids[element.type]}`]);

            element_ids[element.type]++;
        }
        else if (element.type === "content") {
            element_ids[element.type] ??= 1;

            els[`content_${element_ids[element.type]}`] = document.createElement("textarea");
            els[`content_${element_ids[element.type]}`].addEventListener("input", textarea_changed);
            els[`content_${element_ids[element.type]}`].dataset.id = `content_${element_ids[element.type]}`;
            els.page_1.appendChild(els[`content_${element_ids[element.type]}`]);

            element_ids[element.type]++;
        }
    });

    template.pages[1].forEach(element => {
        if (element.type === "date") {
            element_ids[element.type] ??= 1;

            els[`date-${element_ids[element.type]}`] = document.createElement("h1");
            els.page_2.appendChild(els[`date_${element_ids[element.type]}`]);

            element_ids[element.type]++;
        }
        else if (element.type === "content") {
            element_ids[element.type] ??= 1;

            els[`content_${element_ids[element.type]}`] = document.createElement("textarea");
            els[`content_${element_ids[element.type]}`].addEventListener("input", textarea_changed);
            els[`content_${element_ids[element.type]}`].dataset.id = `content_${element_ids[element.type]}`;
            els.page_2.appendChild(els[`content_${element_ids[element.type]}`]);

            element_ids[element.type]++;
        }
    });
}

function get_today() {
    let today = Temporal.Now.plainDateISO();
    if (current_view === 1) {
        let days_to_subtract = today.dayOfWeek - 1
        today = today.subtract({ days: days_to_subtract });
    }
    else if (current_view === 2) {
        today = today.with({ day: 1 });
    }

    return today;
}

function select_view(view) {
    let key = current_page.toString();
    if (tracker[current_view][key] === template_formatted) {
        delete tracker[current_view][key];
    }

    current_view = view;
    current_page = get_today()

    els.view_buttons.forEach((btn, i) => btn.classList.toggle("selected", view === i));

    update_today_button()
    load_page();
}

function update_today_button() {
    const isToday = get_today().equals(current_page);
    els.today_button.classList.toggle("button-hide-animation", isToday);
    els.today_button.classList.toggle("button-show-animation", !isToday);
}

function change_page(offset) {
    const key = current_page.toString();
    
    if (tracker[current_view][key] === template_formatted) {
        delete tracker[current_view][key];
    }

    let actual_offset = { days: offset }
    if (current_view === 1) {
        actual_offset = { days: offset * 7}
    }
    else if (current_view === 2) {
        actual_offset = { months: offset }
    }

    current_page = offset === 0 
        ? get_today()
        : current_page.add(actual_offset);

    update_today_button();
    load_page();
}

function textarea_changed(event) {
    const key = current_page.toString();

    if (tracker[current_view][key] === template_formatted) {
        tracker[current_view][key] = { ...template_formatted };
    }
    
    tracker[current_view][key].data[event.target.dataset.id] = event.target.value;
    localStorage.setItem("userCache", JSON.stringify(tracker));
}

function load_page() {
    const key = current_page.toString();
    
    // Assign template if the entry doesn't exist yet
    tracker[current_view][key] ??= template_formatted; 
    const data = tracker[current_view][key];

    // Streamlined date formatting
    const formatOpts = { month: 'short', ...(current_view != 2 && { day: 'numeric' }) };
    const format = (date) => date.toLocaleString('en-US', formatOpts);

    let date_string = format(current_page);
    if (current_view === 1) {
        date_string += ` - ${format(current_page.add({ days: 6 }))}`;
    }

    els.date_1.textContent = date_string;
    els.content_1.value = data.data.content_1;
    els.content_2.value = data.data.content_2;
    els.content_3.value = data.data.content_3;
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements once
    els = {
        page_1: document.getElementById("page-1"),
        page_2: document.getElementById("page-2"),
        today_button: document.getElementById("button-action-today"),
        view_buttons: [
            document.getElementById("button-view-day"),
            document.getElementById("button-view-week"),
            document.getElementById("button-view-month")
        ]
    };

    create_content()

    load_page();
    
    // Pagination listeners (-1 for back, 1 for forward, 0 for today)
    document.getElementById("button-page-back").addEventListener("click", () => change_page(-1));
    document.getElementById("button-page-forward").addEventListener("click", () => change_page(1));
    els.today_button.addEventListener("click", () => change_page(0));

    // View listeners
    els.view_buttons.forEach((btn, i) => btn.addEventListener("click", () => select_view(i)));
});