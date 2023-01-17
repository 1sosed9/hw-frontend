function renderCureincess(currensies) {
    let htmlStr = currensies.map(infoAboutСurrency => {
        return `
            <tr>
                <td>${infoAboutСurrency.currensie}</td>
                <td>${infoAboutСurrency.rate}</td>
                <td>${infoAboutСurrency.exchangedate}</td>
                <td>${infoAboutСurrency.abbreviation}</td>
            </tr>`
    }).join("");
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
        renderCureincess(currensies);
    });

