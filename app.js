/***
 * Доброго дня!
 * Домашка на 09.01:
 *
 * Завдання 1:
 * написати функцію getAverage, що приймає масив чисел та вертає середнє арифметичне значення цих чисел з точністю 2 знаки після коми.
 * приклад роботи:
 * var arr = [1, 3, 5];
 * getAverage(arr) має повертати 3.00
 ***/
var arr1 = [1, 3, 5];
// a) Перший спосіб вирішення:
var getAverage = (arr) => (arr.reduce((res, item) => res + item) / arr.length).toFixed(2);
console.log(getAverage(arr1));

// b) Другий спосіб вирішеняя:
function getAverage1(arr) {
    if (arr && Array.isArray(arr) && arr.length > 0) {
        var elementsOfArr = arr.length;
        var sumOfArrayElements = 0;
        for (const element of arr) {
            sumOfArrayElements += element;
        }
        var result = (sumOfArrayElements / elementsOfArr).toFixed(2);
        return result;
    } else {
        return "You enter not valid value";
    }
}
console.log(getAverage1(arr1));
console.log();
/***
/*** 
 * Завдання 2:
 * написати функцію sortArr, що приймає масив чисел та вертає цей масив відсортований (довільно обрати чи то за збільшенням, чи то за зменшенням)
 * приклад роботи:
 * var arr = [2, 4, 1, 3, 5, 2];
 * sortArr(arr); має повертати [5, 4, 3, 2, 2, 1] або [1, 2, 2, 3, 4, 5]
 *
 * Додатково завдання "із зірочкою": другим аргументом до завдання №2 надіслати аргумент order, значенням якого може бути або строка '+', або '-'.
 * зважаючи на цей аргумент, масив буде відсортований за збільшенням/зменшенням значень
 * приклад роботи:
 * sortArr(arr, '+') має повертати [1, 2, 2, 3, 4, 5]
***/
var arr2 = [2, 4, 1, 3, 5, 2];
//  a) Вирішення без зірочки:
function sortArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - 1; k++) {
            if (arr[k] > arr[k + 1]) {
                var boofer = arr[k];
                arr[k] = arr[k + 1];
                arr[k + 1] = boofer;
            }
        }
    }
    return arr;
}
console.log(sortArr(arr2));

// b) Рішення із зірочкой:
function sortArr1(arr, valueForSort) {
    if (arr && Array.isArray(arr) && arr.length > 0 && arr[0] == Number(arr[0]) && (valueForSort === "+" || valueForSort === "-")) {
        switch (valueForSort) {
            case "+":
                arr.sort((a, b) => a - b);
                break;

            case "-":
                arr.sort((a, b) => b - a);
                break;
        }
        return arr;
    } else {
        return "You enter not valid value";
    }
}
console.log(sortArr1(arr2, "-"));
console.log();
/***
 * Завдання 3:
 * написати функцію deleteFromStr, що приймає першим аргументом строку str, другим аргументом - строку subStr.
 * функція вертає str, з якої видалили subStr частину. я б користувався replaceAll.
 * приклад роботи:
 * deleteFromStr('this is sparta', 's') має повертати "thi i parta"
 ***/
// Рішення:
var str = "Happy New Year everybody";

function deleteFromStr(str, subStr) {
    if (str === String(str) && subStr === String(subStr)) {
        return str.replaceAll(subStr, "");
    } else {
        return "You enter not valid value";
    }
}
console.log(deleteFromStr(str, "e"));
console.log();
/***
 * Завдання 4:
 * написати функцію wrapStr, що приймає першим аргументом строку, другим - строку з назвою тегу. вертає строку, огорнуту у тег.
 * приклади роботи:
 * wrapStr('Welcome here!', 'div') вертає '<div>Welcome here</div>'
 * wrapStr('Welcome here!', 'h1') вертає '<h1>Welcome here</h1>'
 *
 * додатково "із зірочкою" до завдання №4:
 * можна надати третій аргумент params. аргумент є обʼєктом, що зберігає в собі назву атрибутів в тегу як ключі,
 * значення атрибутів як значення. повертає строку огорнуту у тег з атрибутами, що описані в обʼєкті params
 * приклад роботи:
 * wrapStr('Link to google', 'a', {id: 'google-link', href: 'https://google.com.ua', class: 'link'})
 * повертає cnhjre
 * '<a id="google-link" href="https://google.com.ua" class="link">Link to google</a>'
 * ***/
var strForWrapStrFunction = "Link to google";
var strTag = "a";
var obj = { id: "google-link", href: "https://google.com.ua", class: "link" };

// a) Вирішення без зірочки:
function wrapStr(str, strTag) {
    return `<${strTag}>${str}</${strTag}>`;
}
console.log(wrapStr(strForWrapStrFunction, strTag));
// b) Вирішення із зірочкой:
function wrapStr1(str, strTag, obj) {
    var result = "";
    if (str === String(str) && typeof obj === "object" && obj !== null && strTag === String(strTag)) {
        for (const key in obj) {
            result += ` ${key}="${obj[key]}"`;
        }
        return `<${strTag}${result}>${str}</${strTag}>`;
    } else {
        return "You enter not valid value";
    }
}
console.log(wrapStr1(strForWrapStrFunction, strTag, obj));
