function odliczanie() {
    let dzisiaj = new Date()

    let dzien = dzisiaj.getDate()
    let miesiac = dzisiaj.getMonth() + 1
    let rok = dzisiaj.getFullYear()

    let godzina = dzisiaj.getHours()
    if (godzina < 10) godzina = '0' + godzina

    let minuta = dzisiaj.getMinutes()
    if (minuta < 10) minuta = '0' + minuta

    let sekunda = dzisiaj.getSeconds()
    if (sekunda < 10) sekunda = '0' + sekunda

    document.getElementById('zegar').innerHTML = `${dzien}/${miesiac}/${rok} ${godzina}:${minuta}:${sekunda}`
}

function dodaj() {
    let nazwa = document.getElementById('pole').value

    if (nazwa == '') document.getElementById('wynik').innerHTML = 'podaj nazwe'
    else createDiv()
}

function createDiv() {
    let div = document.createElement('div')
    div.innerText = document.getElementById('pole').value
    div.style.textAlign = 'center'
    div.style.float = 'left'
    div.style.width = '100%'

    document.body.appendChild(div)
}

setInterval(odliczanie, 1000)