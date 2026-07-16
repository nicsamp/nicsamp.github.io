function one() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "1");
    numbers[current_num] = num;
    show_number(num);
}

function two() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "2");
    numbers[current_num] = num;
    show_number(num);
}

function three() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "3");
    numbers[current_num] = num;
    show_number(num);
}

function four() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "4");
    numbers[current_num] = num;
    show_number(num);
}

function five() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "5");
    numbers[current_num] = num;
    show_number(num);
}

function six() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "6");
    numbers[current_num] = num;
    show_number(num);
}

function seven() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "7");
    numbers[current_num] = num;
    show_number(num);
}

function eight() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "8");
    numbers[current_num] = num;
    show_number(num);
}

function nine() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = parseFloat(num.toString() + "9");
    numbers[current_num] = num;
    show_number(num);
}

function zero() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    num = num.toString() + "0";
    if (!num.toString().includes(".")) {
        num = parseFloat(num);
        numbers[current_num] = num;
    }
    show_number(num);
}

function point() {
    if (errored) {
        return;
    }
    if (num.toString().length >= 10) {
        return;
    }
    if (num.toString().includes(".")) {
        return;
    }
    num = num.toString() + ".";
    show_number(num);
}

function pi() {
    if (errored) {
        return;
    }
    numbers[current_num] = Math.PI;
    show_number(numbers[current_num]);

    num = 0;
}

function sqrt() {
    if (errored) {
        return;
    }
    numbers[current_num] = Math.sqrt(parseFloat(numbers[current_num]));
    show_number(numbers[current_num]);

    num = 0;
}

function plusminus() {
    if (errored) {
        return;
    }
    let was_zero = false;
    if (num == 0) {
        num = numbers[current_num];
        was_zero = true;
    }

    num = num.toString()
    if (num.toString()[0] == "-") {
        num = num.slice(1,num.length)
    }
    else {
        num = "-" + num
    }

    numbers[current_num] = parseFloat(num);

    if (was_zero) {
        numbers[current_num] = parseFloat(num);
        show_number(num);
        num = 0;
    }
    else {
        show_number(num);
    }
    
}

function del() {
    if (errored) {
        return;
    }
    num = num.toString().slice(0,num.toString().length-1);
    if (num == "") {
        num = 0;
    }
    numbers[current_num] = num;
    show_number(num);
}

function cl() {
    num = 0;
    numbers = [0, 0];
    current_num = 0;
    show_number(num);
}

function memsave() {
    if (errored) {
        return;
    }
    memory = memory + parseFloat(numbers[current_num]);
    saved = true;
    save_icon.classList.remove("hidden");
}

function memload() {
    if (errored) {
        return;
    }
    numbers[current_num] = memory;
    show_number(numbers[current_num]);

    num = 0;
}

function memclear() {
    if (errored) {
        return;
    }
    memory = 0;
    saved = false;
    save_icon.classList.add("hidden");
}

function plus() {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "+";
    num = 0;
}

function minus() {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "-";
    num = 0;
}

function times() {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "*";
    num = 0;
}

function div() {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "/";
    num = 0;
}

function pow() {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "**";
    num = 0;
}

function equal() {
    if (errored) {
        return;
    }
    do_operation();
}

function do_operation() {
    if (operation == "+") {
        numbers[0] = numbers[0] + numbers[1]
    }
    if (operation == "-") {
        numbers[0] = numbers[0] - numbers[1]
    }
    if (operation == "*") {
        numbers[0] = numbers[0] * numbers[1]
    }
    if (operation == "/") {
        numbers[0] = numbers[0] / numbers[1]
    }
    if (operation == "**") {
        numbers[0] = numbers[0] ** numbers[1]
    }

    numbers[1] = 0;
    current_num = 0;
    operation = "";
    num = 0;
    show_number(numbers[0]);
}

function show_number(number) {
    if (number == Infinity) {
        number = "∞";
    }
    else if (Number.isNaN(number)) {
        number = "!";
        error_icon.classList.remove("hidden");
        errored = true;
    }
    else {
        error_icon.classList.add("hidden");
    }

    if (Math.abs(number) > 9999999999) {
        big_icon.classList.remove("hidden");
    }
    else {
        big_icon.classList.add("hidden");
    }

    result_text.textContent = number;
}

let numbers = [0,0];
let current_num = 0;
let operation = "";

let num = 0;
let memory = 0;
let saved = false;

let errored = false;

let result_text;
let save_icon;
let big_icon;
let error_icon;

document.addEventListener("DOMContentLoaded", () => {
    result_text = document.getElementById("result");
    save_icon = document.getElementById("save-symbol");
    big_icon = document.getElementById("big-symbol");
    error_icon = document.getElementById("error-symbol");
})