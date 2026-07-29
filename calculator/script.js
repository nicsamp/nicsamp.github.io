function add_digit(digit) {
    if (errored || num.toString().length >= 10 || (digit == "." && num.toString().includes("."))) {
        return;
    }
    if (current_num == 0) {
        numbers[1] = 0;
        operation = "";
    }

    num = num.toString() + digit
    
    if (((digit != "0") && (digit != ".")) || ((digit == "0") && !num.toString().includes("."))) {
        num = parseFloat(num);
        numbers[current_num] = num;
    }

    show_number(num);
}

function set_const(constant) {
    if (errored) {
        return;
    }
    if (current_num == 0) {
        numbers[1] = 0;
        operation = "";
    }

    numbers[current_num] = constant;
    show_number(numbers[current_num]);

    num = 0;
}

function binary_op(op) {
    if (errored) {
        return;
    }
    if (current_num == 1) {
        do_operation();
    }

    current_num = 1;
    operation = op;
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

    current_num = 0;
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

    if (Math.abs(number) > 9999999999) {
        big_icon.classList.remove("hidden");
    }
    else {
        big_icon.classList.add("hidden");
    }

    result_text.textContent = number;
}




function one() {
    add_digit("1")
}

function two() {
    add_digit("2")
}

function three() {
    add_digit("3")
}

function four() {
    add_digit("4")
}

function five() {
    add_digit("5")
}

function six() {
    add_digit("6")
}

function seven() {
    add_digit("7")
}

function eight() {
    add_digit("8")
}

function nine() {
    add_digit("9")
}

function zero() {
    add_digit("0")
}

function point() {
    add_digit(".")
}

function pi() {
    set_const(Math.PI)
}

function sqrt() {
    if (errored) {
        return;
    }
    if (current_num == 0) {
        numbers[1] = 0;
        operation = "";
    }

    numbers[current_num] = Math.sqrt(parseFloat(numbers[current_num]));
    show_number(numbers[current_num]);

    num = 0;
}

function plusminus() {
    if (errored) {
        return;
    }
    if (current_num == 0) {
        numbers[1] = 0;
        operation = "";
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
    errored = false;
    operation = "";
    error_icon.classList.add("hidden");
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
    set_const(memory)
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
    binary_op("+")
}

function minus() {
    binary_op("-")
}

function times() {
    binary_op("*")
}

function div() {
    binary_op("/")
}

function pow() {
    binary_op("**")
}

function equal() {
    if (errored) {
        return;
    }
    do_operation();
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