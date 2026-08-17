// --- State & Constants ---
const template = {"pages": [
    [{"type": "date", "object": "h1"}, {"type": "content", "object": "textarea"}],
    [{"type": "content", "object": "textarea"}]
]};

let tracker = JSON.parse(localStorage.getItem("userCache")) || { 0: {}, 1: {}, 2: {} };
let current_page = Temporal.Now.plainDateISO();
let current_view = 0;

let els = {};
let template_formatted = {}; // Used purely as a read-only blueprint now

// Generates the baseline structure once on startup
function init_template_blueprint() {
    let element_ids = {};
    template.pages.forEach((page) => {
        page.forEach(element => {
            element_ids[element.type] ??= 1;
            let full_id = `${element.type}_${element_ids[element.type]}`;
            template_formatted[full_id] = { ...element, value: "" };
            element_ids[element.type]++;
        });
    });
}

function get_today() {
    let today = Temporal.Now.plainDateISO();
    if (current_view === 1) {
        let days_to_subtract = today.dayOfWeek - 1;
        today = today.subtract({ days: days_to_subtract });
    }
    else if (current_view === 2) {
        today = today.with({ day: 1 });
    }
    return today;
}

function select_view(view) {
    current_view = view;
    current_page = get_today();

    els.view_buttons.forEach((btn, i) => btn.classList.toggle("selected", view === i));

    update_today_button();
    render_page();
}

function update_today_button() {
    const isToday = get_today().equals(current_page);
    els.today_button.classList.toggle("button-hide-animation", isToday);
    els.today_button.classList.toggle("button-show-animation", !isToday);
}

function change_page(offset) {
    let actual_offset = { days: offset };
    if (current_view === 1) {
        actual_offset = { days: offset * 7};
    }
    else if (current_view === 2) {
        actual_offset = { months: offset };
    }

    current_page = offset === 0 
        ? get_today()
        : current_page.add(actual_offset);

    update_today_button();
    render_page();
}

function textarea_changed(event) {
    const key = current_page.toString();

    if (!tracker[current_view][key]) {
        tracker[current_view][key] = structuredClone(template_formatted);
    }
    
    tracker[current_view][key][event.target.dataset.id].value = event.target.value;
    localStorage.setItem("userCache", JSON.stringify(tracker));
}

function render_page() {
    const key = current_page.toString();
    
    const data = tracker[current_view][key] || template_formatted;
    let element_ids = {};

    for (let i = 0; i < template.pages.length; i++) {
        const page_id = i + 1;
        if (els[`page_${page_id}`]) {
            els[`page_${page_id}`].innerHTML = ''; // Wipes all old elements from the DOM
        }
    }

    for (let i = 0; i < template.pages.length; i++) {
        const page = template.pages[i];
        const page_id = i + 1;

        page.forEach(element => {
            element_ids[element.type] ??= 1;
            let full_id = `${element.type}_${element_ids[element.type]}`;

            els[full_id] = document.createElement(element.object);
            els[full_id].dataset.id = full_id;

            if (element.type === "content") {
                els[full_id].addEventListener("input", textarea_changed);
            }

            if (element.type === "content") {
                els[full_id].value = data[full_id].value;
            }
            else if (element.type === "date") {
                const formatOpts = { month: 'short', ...(current_view != 2 && { day: 'numeric' }) };
                const format = (date) => date.toLocaleString('en-US', formatOpts);

                let date_string = format(current_page);
                if (current_view === 1) {
                    date_string += ` - ${format(current_page.add({ days: 6 }))}`;
                }

                els[full_id].textContent = date_string;
            }

            els[`page_${page_id}`].appendChild(els[full_id]);

            element_ids[element.type]++;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
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

    init_template_blueprint();
    render_page();
    
    document.getElementById("button-page-back").addEventListener("click", () => change_page(-1));
    document.getElementById("button-page-forward").addEventListener("click", () => change_page(1));
    els.today_button.addEventListener("click", () => change_page(0));

    els.view_buttons.forEach((btn, i) => btn.addEventListener("click", () => select_view(i)));
});