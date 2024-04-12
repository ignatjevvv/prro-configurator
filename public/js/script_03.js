'use strict';

const formHeader = document.querySelector('#form-receipt'),
      nameInput = document.querySelector('#name'),
      form = document.querySelector('#form'),
      shop = document.querySelector('#shop'),
      ip = document.querySelector('#ip'),
      statusIndicator = document.querySelector('.dot'),
      btn = document.querySelector('#push'),
      input = document.querySelectorAll('input');


/* ====================  RADIO BUTTUN FOR BANK TERMINAL ==================== */
const terminalRadioInput = document.querySelectorAll('#terminal');

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

/* ==================== VALIDATION INPUT ==================== */
const inputPrro = document.querySelectorAll('.input_prro'), 
      inputPrroIP = document.querySelector("[name='ip']");

inputPrro.forEach(inputs => {
    inputs.oninput = function () {
        // Only press number key
        inputs.value = inputs.value.replace(/[^\d]/g, '');
    };
});

inputPrroIP.oninput = function () {
    inputPrroIP.value = inputPrroIP.value.replace(/[^.\d]+/g, "");
};
/* ==================== END ==================== */

/* ==================== SUBMIT FORM POST ==================== */
form.addEventListener('submit', (e) => {
    // If input have an IP address, then we enter the name with the last IP address in the archive name.
    e.preventDefault();

    if (Boolean(+shop.value)) {
        let shopNumber = 
        ip.value == '' ? 
        shop.value : 
        shop.value + '_' + ip.value.slice(-3);
    
        let zipName = 'EVA' + shopNumber;
        postData('POST', '/upload', form, `${zipName}.zip`);
    }
});

formHeader.addEventListener('submit', (e) => {
    e.preventDefault();
    postData('POST', '/receipt', formHeader, 'memory.json');
});
/* ==================== END ==================== */

let debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments); };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};

let shopVerifications = debounce(shopVerification, 200);

/* ==================== SHOW KEY AVAILABILITY STATUS ==================== */
shop.addEventListener('input', () => {
    shop.value != '' ? shopVerifications() : lockBtnGetConfig();
});

function shopVerification() {
    if (shop.value) {
        console.log(`Request has been sent: ${shop.value}`);

        getData("GET", `/varification/?shop=${shop.value}`)
        .then(response => {
            setStatusVerifications(response);
            showListOfCertificates(response);
        })
        .catch((err) => {
            statusIndicator.classList.add('waiting');
        });
    }
}

function lockBtnGetConfig() {
    btn.classList.add('lock');
    statusIndicator.classList = 'dot';
    statusCountKeys.classList = 'key-status';
    keyForm.innerHTML = '';
}


function setStatusVerifications(status) {
    switch (status.status) {
        case "ok":
            statusIndicator.classList.remove('no');
            statusIndicator.classList.add('ok');
            btn.removeAttribute('disabled', '');
            btn.classList.remove('lock');
            break;
        case "no":
            statusIndicator.classList.remove('ok');
            statusIndicator.classList.add('no');
            btn.setAttribute('disabled', '');
            btn.classList.add('lock');
            break;
        default:
            break;
    }
}


/* ==================== RENDER KEY LIST IN FORM INPUT ==================== */
const keyForm = document.querySelector('#key');
let arrKey = [];

function showListOfCertificates(obj) {
    arrKey.length = 0;
    keyForm.innerHTML = '';

    let keys = obj.keys;

    keys.forEach(key => {
        keyForm.innerHTML += `<option value="${key.key}">${key.key.split('_')[2]}</option>`;
        arrKey.push(key.key);
    });

    statusCountKey(keys);
    // querySQL(arrKey);
}

/* ==================== STATUS COUNT KEYS ==================== */
const statusCountKeys = document.querySelector('.key-status');

function statusCountKey(keys) {
    let countKey = keys.length;

    countKey > 1 ? statusCountKeys.classList.add('more') 
    : statusCountKeys.classList = 'key-status';
}

/* ==================== GET DATA ON SERVER ==================== */
// const routeServerIP = '84.246.80.172';
const routeServerIP = 'prro-configurator.onrender.com';
// const routeServerIP = '127.0.0.1';
// const serverPort = '8000';

function getData(method, path) {
    return fetch(`https://${routeServerIP}` + path, {
        method: method,
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(`Error: ${err}!`));
}

/* ==================== POST DATA ON SERVER ==================== */
function postData(method, path, form, fileFormat) {
    let payload = new FormData(form);


    let object = {};
    payload.forEach(function(value, key){
        object[key] = value;
    });
    let json = JSON.stringify(object);
    console.log("***");
    console.log(json);

    fetch(`https://${routeServerIP}` + path, {
        method: method,
        body: payload
    })

    .then((data) => { return data.blob(); })
    .then((blob) => {
        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileFormat;
        downloadLink.click();
        location.reload();
    });
}

/* ==================== DARK LIGHT THEME ==================== */
const themeIcon = document.querySelector('span.theme i');
const container = document.querySelector('.container');

themeIcon.addEventListener('click', (e) => {
    themeIcon.classList.toggle('uil-sun');
    document.body.classList.toggle('light-theme');
});
