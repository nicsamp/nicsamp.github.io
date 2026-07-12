function one() {
    num = parseFloat(num.toString() + "1");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function two() {
    num = parseFloat(num.toString() + "2");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function three() {
    num = parseFloat(num.toString() + "3");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function four() {
    num = parseFloat(num.toString() + "4");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function five() {
    num = parseFloat(num.toString() + "5");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function six() {
    num = parseFloat(num.toString() + "6");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function seven() {
    num = parseFloat(num.toString() + "7");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function eight() {
    num = parseFloat(num.toString() + "8");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function nine() {
    num = parseFloat(num.toString() + "9");
    numbers[current_num] = num;
    result_text.textContent = num;
}

function zero() {
    num = num.toString() + "0";
    if (!num.toString().includes(".")) {
        num = parseFloat(num);
        numbers[current_num] = num;
    }
    result_text.textContent = num;
}

function point() {
    if (num.toString().includes(".")) {
        return;
    }
    num = num.toString() + ".";
    result_text.textContent = num;
}

function pi() {
    numbers[current_num] = Math.PI;
    result_text.textContent = numbers[current_num];

    num = 0;
}

function sqrt() {
    numbers[current_num] = Math.sqrt(parseFloat(numbers[current_num]));
    result_text.textContent = numbers[current_num];

    num = 0;
}

function plusminus() {
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
        result_text.textContent = num;
        num = 0;
    }
    else {
        result_text.textContent = num;
    }
    
}

function del() {
    num = num.toString().slice(0,num.toString().length-1);
    if (num == "") {
        num = 0;
    }
    numbers[current_num] = num;
    result_text.textContent = num;
}

function cl() {
    num = 0;
    numbers = [0, 0];
    current_num = 0;
    result_text.textContent = num;
}

function memsave() {
    memory = memory + parseFloat(numbers[current_num]);
    saved = true;
    save_icon.classList.remove("hidden");
}

function memload() {
    numbers[current_num] = memory;
    result_text.textContent = numbers[current_num];

    num = 0;
}

function memclear() {
    memory = 0;
    saved = false;
    save_icon.classList.add("hidden");
}

function plus() {
    if (current_num == 1) {
        do_operation();
    }
    current_num = 1;
    operation = "+";
    num = 0;
}

function do_operation() {
    if (operation == "+") {
        numbers[0] = numbers[0] + numbers[1]
    }
    numbers[1] = 0;
    current_num = 0;
    operation = "";
    num = 0;
    result_text.textContent = numbers[0];
}

let numbers = [0,0]
let current_num = 0;
let operation = "";

let num = 0;
let memory = 0;
let saved = false;

let result_text;
let save_icon;

document.addEventListener("DOMContentLoaded", () => {
    result_text = document.getElementById("result");
    save_icon = document.getElementById("save-symbol");
})