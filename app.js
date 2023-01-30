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

function searchCountry(currentSearch) {
    const backup = storage.getСurrencies();
    const filteredCurrensies = backup.filter(function (currencies) {
        return currencies.name.toLowerCase().includes(currentSearch);
    })
    renderСurrencies(filteredCurrensies);
}

function searchCountrySecond(currentSearch) {
    const backup = storage.getСurrencies();
    const filteredCurrensies = backup.filter(function (currencies) {
        return currencies.name.toLowerCase().includes(currentSearch);
    })
    renderСurrenciesSecond(filteredCurrensies);
}

// function buildSelect(currencies) {
//     const htmlStr = currencies.map(currency => `<option value="${currency.name}">${currency.name}</option>`).join("");
//     // document.getElementById("currencies-list").innerHTML = htmlStr;
//     const selectElement = document.createElement("select");
//     selectElement.id = "currencies-list";
//     selectElement.innerHTML = htmlStr;
//     selectElement.className = "my-3 col-3 rounded form-control";
//     document.getElementById("search").before(selectElement);
// }

function buildAutocomlite(currencies) {
    const availableTags = currencies.map(currency => currency.name);
    $("#сurrency-autocomplete").autocomplete({
        source: availableTags,
        select: function (event, ui) {
            const currentSearch = ui.item.value.toLowerCase().trim();
            searchCountry(currentSearch);
            addCurrenciesSecondTable();

            for (let index = 1; index < 4; index++) {
                let time = moment().subtract(index, 'days').format('L').split("/");
                let boofer = time.pop();
                time.unshift(boofer);
                time = time.join("");
                fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${time}&json`).then
                    ((data) => data.json()).then(data => {
                        const currency = data.filter(currency => {
                            return currency.txt.toLowerCase().includes(currentSearch);
                        })
                        currency.reduce((acc, currency) => {
                            acc += `<tr>
                                        <td>${currency.txt}</td>
                                        <td>${currency.rate.toFixed(2)}</td>
                                        <td>${currency.exchangedate}</td>
                                        <td>${currency.cc}</td>
                                    </tr>`
                            let tboby = document.getElementById("currencies-tbody-second");
                            tboby.innerHTML += acc;
                        }, "")
                    });
            }
            document.getElementById("search").value = currentSearch;
        }
    });
}

function addCurrenciesSecondTable(currentSearch) {
    const backup = storage.getСurrencies();
    const filteredCurrensies = backup.filter(function (currencies) {
        return currencies.name.toLowerCase().includes(currentSearch);
    })
    renderСurrenciesSecond(filteredCurrensies);
    document.getElementById("table-second").className = "d-block table";

}

function renderСurrencies(currencies) {
    let htmlStr = currencies.reduce((acc, infoAboutСurrency) => {
        return acc + `
            <tr>
                <td>${infoAboutСurrency.name}</td>
                <td>${infoAboutСurrency.rate}</td>
                <td>${infoAboutСurrency.exchangedate}</td>
                <td>${infoAboutСurrency.abbreviation}</td>
            </tr>`
    }, "");
    let tboby = document.getElementById("currencies-tbody");
    tboby.innerHTML = htmlStr;
}

function renderСurrenciesSecond(currencies) {
    let htmlStr = currencies.reduce((acc, infoAboutСurrency) => {
        return acc + `
            <tr>
                <td>${infoAboutСurrency.name}</td>
                <td>${infoAboutСurrency.rate}</td>
                <td>${infoAboutСurrency.exchangedate}</td>
                <td>${infoAboutСurrency.abbreviation}</td>
            </tr>`
    }, "");
    let tboby = document.getElementById("currencies-tbody-second");
    tboby.innerHTML = htmlStr;
}

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20230117&json").then
    ((data) => data.json()).then(data => {
        const currencies = data.map(currency => {
            return {
                name: currency?.txt,
                rate: currency?.rate.toFixed(2),
                exchangedate: currency?.exchangedate,
                abbreviation: currency?.cc
            };
        })
        storage.setСurrencies(currencies);
        // buildSelect(currencies);
        buildAutocomlite(currencies);
        renderСurrencies(currencies);
    });

document.getElementById('search').onkeyup = function (e) {
    const currentSearch = e.currentTarget.value.toLowerCase().trim();
    searchCountry(currentSearch);
}

document.getElementById('input-date').onchange = function (e) {
    let date = document.getElementById('input-date').value.split('-').join('');
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=' + date + '&json').then(function (data) {
        return data.json();
    }).then(function (data) {
        const currencies = data.map(currency => {
            return {
                name: currency?.txt,
                rate: currency?.rate.toFixed(2),
                exchangedate: currency?.exchangedate,
                abbreviation: currency?.cc
            };
        })
        storage.setСurrencies(currencies);
        renderСurrencies(currencies);
    });
}






