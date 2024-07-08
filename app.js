// Global Degiskenlerimi tanimliyoruz

let topof24 = document.getElementById('topof24');
let lowerof24 = document.getElementById('lowerof24');
let ath = document.getElementById('ath');
let lastUpdate = document.getElementById('lastUpdate')
let nowPrice = document.getElementById('now-price')
let updateInterval; // Burayi ChatGPT'den aldim. Interval ID icin global degisken

// Burada Sayfa yuklenir yuklenmez goruntulemek istedigim coin bilgilerini yaziyorum
window.addEventListener('load', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            setInformation(data)
            setAgainInformation(data[0].id); // Başlangıçta Bitcoin için interval başlat . Burayi ChatGPT'den aldim
        })



})

function setInformation(data) {
    topof24.textContent = data[0].high_24h;
    lowerof24.textContent = data[0].low_24h
    lastUpdate.textContent = data[0].last_updated
    nowPrice.textContent = data[0].current_price
    ath.textContent = data[0].ath

}

//! Burada baslangicta ekledigim bitcoin bilgilerini her 10 dakika bir guncelliyorum

function setAgainInformation(data) {
    clearInterval(updateInterval); // Önceki interval'ı temizle . ChatGPT'ten aldim
    updateInterval = setInterval(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
            .then(response => {
                return response.json()
            })
            .then(data => [
                setInformation(data)
            ])
    }, 1000 * 60 * 3)
}

// BURADA HER BIR ELEMENT ICIN FARKLI GORUNTULER OLUSTURUYORUZ...


// ETHEREUM Baslangic
const ethLink = document.getElementById('etherium-link')
ethLink.addEventListener('click', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
        .then(response => {
            return response.json()
        })
        .then(data => {
            setImage(data)
            setAgainInformation('ethereum'); // Ethereum için interval başlat
        })
})



// ETHEREUM Bitis

// Tek seferde tanimladigim , her coin icin gecerli olan resim guncelleme func.

function setImage(data) {
    const image_el = document.getElementById('image');
    console.log(image_el)
    image_el.setAttribute('src', data[0].image)
    image_el.style.width = '200px'
    image_el.style.height = '200px'

    setCoinInfo(data)
}

function setCoinInfo(data) {
    topof24.textContent = data[0].high_24h;
    lowerof24.textContent = data[0].low_24h
    lastUpdate.textContent = data[0].last_updated
    nowPrice.textContent = data[0].current_price
    ath.textContent = data[0].ath

}


// DOGE COIN

const doge_el = document.getElementById('doge-link');
doge_el.addEventListener('click', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin')
        .then(response => {
            return response.json()
        })
        .then(data => {
            setImage(data)
            setAgainInformation('dogecoin'); // Dogecoin için interval başlat.ChatGPT'den aldim
        })
})


// BITCOIN 

const bitcoin_el = document.getElementById('bitcoin-link')
bitcoin_el.addEventListener('click', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
        .then(response => {
            return response.json()
        })
        .then(data => {
            setImage(data)
            setAgainInformation('bitcoin'); // Bitcoin için interval başlat.ChatGPT
        })
})


