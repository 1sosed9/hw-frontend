function createStorage() {
    let currensiesBackup = [];

    return {
        getCurrensies: function () {
            return currensiesBackup;
        },
        setCurrensies: function (newCurrensies) {
            if (!newCurrensies || !newCurrensies.length) { return; }
            currensiesBackup = newCurrensies;
        }
    }
}

const storage = createStorage();

function renderCureincess(currensies) {
    let htmlStr = currensies.reduce((acc, infoAboutСurrency) => {
        return acc + `
            <tr>
                <td>${infoAboutСurrency.currensie}</td>
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
        const currensies = data.map(currensie => {
            return {
                currensie: currensie?.txt,
                rate: currensie?.rate.toFixed(2),
                exchangedate: currensie?.exchangedate,
                abbreviation: currensie?.cc
            };
        })
        storage.setCurrensies(currensies);
        renderCureincess(currensies);
    });

document.getElementById('search').onkeyup = function (e) {
    const currentSearch = e.currentTarget.value.toLowerCase().trim();
    const backup = storage.getCurrensies();
    const filteredCurrensies = backup.filter(function (currensies) {
        return currensies.currensie.toLowerCase().includes(currentSearch);
    })
    console.log(filteredCurrensies);
    renderCureincess(filteredCurrensies);
}

