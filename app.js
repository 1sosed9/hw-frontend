function createStorage() {
    let currensiesBackup = [];

    return {
        getСurrencies: function () {
            return currensiesBackup;
        },
        setСurrencies: function (newCurrensies) {
            if (!newCurrensies || !newCurrensies.length) { return; }
            currensiesBackup = newCurrensies;
        }
    }
}

const storage = createStorage();

function renderСurrencies(currencies) {
    let htmlStr = currencies.reduce((acc, infoAboutСurrency) => {
        return acc + `
            <tr>
                <td>${infoAboutСurrency.currency}</td>
                <td>${infoAboutСurrency.rate}</td>
                <td>${infoAboutСurrency.exchangedate}</td>
                <td>${infoAboutСurrency.abbreviation}</td>
            </tr>`
    }, "");
    let tboby = document.getElementById("currencies-tbody");
    tboby.innerHTML = htmlStr;
}

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20230117&json").then
    ((data) => data.json()).then(data => {
        console.log(data);
        const currencies = data.map(currency => {
            return {
                currency: currency?.txt,
                rate: currency?.rate.toFixed(2),
                exchangedate: currency?.exchangedate,
                abbreviation: currency?.cc
            };
        })
        storage.setСurrencies(currencies);
        renderСurrencies(currencies);
    });

document.getElementById('search').onkeyup = function (e) {
    const currentSearch = e.currentTarget.value.toLowerCase().trim();
    console.log(currentSearch);
    const backup = storage.getСurrencies();
    const filteredCurrensies = backup.filter(function (сurrensies) {
        return сurrensies.currency.toLowerCase().includes(currentSearch);
    })
    console.log(filteredCurrensies);
    renderСurrencies(filteredCurrensies);
}

document.getElementById('input-date').onchange = function (e) {
    let date = document.getElementById('input-date').value.split('-').join('');
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + date + '&json').then(function (data) {
        return data.json();
    }).then(function (data) {
        const currencies = data.map(currency => {
            return {
                currency: currency?.txt,
                rate: currency?.rate.toFixed(2),
                exchangedate: currency?.exchangedate,
                abbreviation: currency?.cc
            };
        })
        storage.setСurrencies(currencies);
        renderСurrencies(currencies);
    });
}



