function play() {
    if (running) return;

    running = true;
    last_time = performance.now()
    requestAnimationFrame(update_time);

    play_reset_div.classList.toggle("hidden");
    pause_lap_div.classList.toggle("hidden");

    reset_button.classList.add("reset-unused");
    reset_button.classList.remove("reset-used");
}

function reset() {
    time_elapsed = 0;
    time.innerText = "00 : 00 . 00";
    laps_box.innerHTML = "";

    reset_button.classList.remove("reset-unused");
    reset_button.classList.add("reset-used");
}

function pause() {
    running = false;

    play_reset_div.classList.toggle("hidden");
    pause_lap_div.classList.toggle("hidden");
}

function lap() {
    let item = document.createElement("li")
    item.textContent = `${format_time(time_elapsed)}`
    laps_box.appendChild(item);
}

function format_time(time) {
    let cs = Math.floor((time / 10) % 100)
    let s = Math.floor((time / 1000) % 60)
    let m = Math.floor((time / 60000) % 60)
    let h = Math.floor((time / 3600000) % 100)

    if (h == 0) {
        return `${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")} . ${cs.toString().padStart(2, "0")}`
    }
    return `${h.toString().padStart(2, "0")} : ${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")} . ${cs.toString().padStart(2, "0")}`
}


function update_time() {
    if (!running) {
        return;
    }

    time_elapsed += performance.now() - last_time;
    last_time = performance.now();

    time.innerText = format_time(time_elapsed);

    requestAnimationFrame(update_time);
}


let time_elapsed = 0;
let last_time = 0;
let running = false;
let lap_n = 1;
let time;
let play_reset_div;
let pause_lap_div;
let reset_button;
let laps_box;

document.addEventListener("DOMContentLoaded", () => {
    time = document.getElementById("time");
    play_reset_div = document.getElementById("paused-buttons");
    pause_lap_div = document.getElementById("playing-buttons");
    reset_button = document.getElementById("reset");
    laps_box = document.getElementById("laps-box");
})
