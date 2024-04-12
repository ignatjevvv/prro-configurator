'use strict';

const formHeader = document.querySelector('#form-receipt'),
      nameInput = document.querySelector('#name'),
      form = document.querySelector('#form'),
      shop = document.querySelector('#shop'),
      ip = document.querySelector('#ip'),
      dot = document.querySelector('.dot'),
      btn = document.querySelector('#push'),
      input = document.querySelectorAll('input'),
      terminalRadioInput = document.querySelectorAll('#terminal');

// ***************** Radio Input Button *****************
terminalRadioInput.forEach((radio) => {
    radio.addEventListener('click', function () {
    
        for (var i = 0; i < terminalRadioInput.length; i++) {
            if (terminalRadioInput[i] != this) 
                terminalRadioInput[i].oldChecked = false;
        }

        if (this.oldChecked) 
            this.checked = false;
            this.oldChecked = this.checked;
    });
});

// ***************** Input Only Number *****************
const inputPrro = document.querySelectorAll('.input_prro'), 
      inputPrroIP = document.querySelector("[name='ip']");

inputPrro.forEach(inputs => {
    inputs.oninput = function () {
        inputs.value = inputs.value.replace(/[^\d]/g, '');
    };
});

inputPrroIP.oninput = function () {
    inputPrroIP.value = inputPrroIP.value.replace(/[^.\d]+/g, "");
};

// ***************** END *****************

form.addEventListener('submit', (e) => {
    let shopNumber = 
    ip.value == '' ? 
    shop.value : 
    shop.value + '_' + ip.value.slice(-3);

    let zipName = 'EVA' + shopNumber;
    e.preventDefault();
    postData('POST', '/upload', form, `${zipName}.zip`);
});

formHeader.addEventListener('submit', (e) => {
    e.preventDefault();
    postData('POST', '/receipt', formHeader, 'memory.json');
});

let debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments); };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};

function shopVerification() {
    if (shop.value) {
        console.log(`Request has been sent: ${shop.value}`);
        getData("GET", `/varification/?shop=${shop.value}`);
    }
};

let shopVerifications = debounce(shopVerification, 200);

shop.addEventListener('input', (event) => {
    shop.value != '' ? shopVerifications() : lockBtnGetConfig();
});

function setStatusVerifications(status) {
    switch (status.status) {
        case "ok":
            dot.classList.remove('no');
            dot.classList.add('ok');
            btn.removeAttribute('disabled', '');
            btn.classList.remove('lock');
            break;
        case "no":
            dot.classList.remove('ok');
            dot.classList.add('no');
            btn.setAttribute('disabled', '');
            btn.classList.add('lock');
            break;
        default:
            break;
    }
}

function lockBtnGetConfig() {
    btn.classList.add('lock');
    dot.classList = 'dot';
    statusCountKeys.classList = 'key-status';
    keyForm.innerHTML = '';
}

const keyForm = document.querySelector('#key');

function showListOfCertificates(obj) {
    keyForm.innerHTML = '';

    let keys = obj.keys;

    keys.forEach(key => {
        keyForm.innerHTML += `<option value="${key}">${key.split('_')[2]}</option>`;
    });

    statusCountKey(keys);
}

const statusCountKeys = document.querySelector('.key-status');

function statusCountKey(keys) {
    let countKey = keys.length;

    countKey > 1 ? statusCountKeys.classList.add('more') 
    : statusCountKeys.classList = 'key-status';
    console.log(countKey);
}

// const routeServerIP = '84.246.80.172';
// const routeServerIP = '3.72.198.119';
const routeServerIP = '127.0.0.1';
const serverPort = '8000';

function getData(method, path) {
    fetch(`http://${routeServerIP}:${serverPort}` + path, {
        method: method,
    })
        .then((data) => { return data.json(); })
        .then((data) => {
            setStatusVerifications(data);
            showListOfCertificates(data);
        });
}

function postData(method, path, selector, fileFormat) {
    let payload = new FormData(selector);

    fetch(`http://${routeServerIP}:${serverPort}` + path, {
        method: method,
        body: payload
    })

    .then((data) => { return data.blob(); })
    .then((data) => {
        window.URL.revokeObjectURL(data);
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        console.log(fileFormat);
        a.download = fileFormat;
        a.click();
        location.reload();
    });
}

const themeIcon = document.querySelector('span.theme i');
const container = document.querySelector('.container');

themeIcon.addEventListener('click', (e) => {
    themeIcon.classList.toggle('uil-sun');
    document.body.classList.toggle('light-theme');
});