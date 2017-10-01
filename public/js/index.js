const textarea = document.querySelector('textarea');
const displayPalavra = document.querySelector('input');
const divDefinicao = document.querySelector('div.panel-body');
let ultimaPalavra = '';
let isAjaxHappening = false;
textarea.addEventListener('input', onInput);
textarea.addEventListener('keyup', onInput);
textarea.addEventListener('click', onInput);

/* function onTimeout() {
    const palavra = getPalavraSelecionada(textarea).replace(' ', '');
    let url = 'http://dicionario-aberto.net/search-json/' + palavra;
    if (palavra !== ultimaPalavra && !isAjaxHappening) {
        ultimaPalavra = palavra;
        ajax(url, function (event) {
            let entry = JSON.parse(event.target.responseText);
            divDefinicao.innerHTML = entry.entry.sense[0].def;
            isAjaxHappening = false;
        }, function (event) {
            isAjaxHappening = false;
            divDefinicao.innerHTML = '';
        });
    }
    setTimeout(onTimeout, 2000);
} */

function getPalavraSelecionada(textarea) {
    let selected = textarea.selectionEnd;
    let text = textarea.value;
    let start = 0;
    let end = text.length;
    for (let i = selected - 1; i >= 0; i--) {
        if (text[i] === ' ') {
            start = i;
            break;
        }
    }
    for (let i = selected - 1; i < text.length; i++) {
        if (text[i] === ' ') {
            end = i;
            break;
        }
    }
    return textarea.value.slice(start, end + 1).replace(' ', '');
}

function onInput(event) {
    let palavra = getPalavraSelecionada(textarea);
    displayPalavra.value = palavra;
    let url = 'http://dicionario-aberto.net/search-json/' + palavra;
    if (palavra !== ultimaPalavra) {
        ultimaPalavra = palavra;
        ajax(url, function (event) {
            let entry = JSON.parse(event.target.responseText);
            divDefinicao.innerHTML = entry.entry.sense[0].def;
        }, function (event) {
            divDefinicao.innerHTML = '';
        });
    }
}

function ajax(url, callback, error) {
    isAjaxHappening = true;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = callback;
    xhr.onerror = error;
    xhr.send();
}

/* onTimeout(); */
