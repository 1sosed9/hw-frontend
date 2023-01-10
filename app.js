/***
 * Доброго дня!
 * Домашка на 11.01:
 *
 * Завдання:
 * написати функцію processArr, що приймає масив чисел.
 * Вертає обʼєкт, в якому є наступні поля:
 * 1. поле zeros. значення - кількість нулів в масиві
 * 2. поле count. значення - кількість унікальних елементів массива.
 * 3. поле pos_num. значення - кількість унікальних елементів, що > 0
 * 4. поле neg_num. значення - кількість унікальних елементів, що < 0
 * 5. поле evens. значення - кількість унікальних елементів, що діляться на 2 без остачі
 * 6. поле odds. значення - кількість унікальних елементів, що діляться на 2 з остачею
 *
 * приклад роботи:
 * var arr = [-1, 0, 1, 0, 3, 5, 8, 0, 2, 12, 2, 0, 8, -1];
 * getAverage(arr) має повертати:
 * {zeros: 4, count: 8, pos_num: 6, neg_num: 1, evens: 3, odds: 3}
 * якщо є проблеми з частиною умови "унікальних значень", можна зробити по оригінальному масиву arr,
 * а на його базі створенному новому масиву унікальних елементів
 * ***/
let arr = [-1, 0, 1, 0, 3, 5, 8, 0, 2, 12, 2, 0, 8, -1];
// Перший варіант вирішення:

function processArr(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return "Please enter valid argument";
    }
    const obj = {};
    const result = {};
    function addElementInResult(nameKey, obj) {
        if (obj[nameKey]) {
            obj[nameKey] += 1;
        } else {
            obj[nameKey] = 1;
        }
    }

    for (const el of arr) {
        if (obj[el]) {
            obj[el] += 1;
        } else {
            obj[el] = 1;
        }
    }

    for (const key in obj) {
        if (key === '0') {
            result['zeros'] = obj[key];
        }

        addElementInResult('count', result);

        if (key > 0) {
            addElementInResult('pos_num', result)
        }

        if (key < 0) {
            addElementInResult('neg_num', result)
        }

        if (key % 2 === 0 && key != 0) {
            addElementInResult('evens', result)
        }

        if (key % 2 !== 0) {
            addElementInResult('odds', result)
        }
    }
    return result;
}

// Другий варіант вирішення:
function processArr1(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return "Enter valid arguments please";
    }
    const uniqueArr = Array.from(new Set(arr));
    const result = {
        zeros: 0,
        count: 0,
        pos_num: 0,
        neg_num: 0,
        evens: 0,
        odds: 0
    }
    for (const el of arr) {
        if (!el) {
            result.zeros += 1;
        }
    }
    result.count = uniqueArr.length;
    for (const el of uniqueArr) {
        if (el > 0) {
            result.pos_num += 1;
        }
        if (el < 0) {
            result.neg_num += 1;
        }
        if (el % 2 === 0 && el !== 0) {
            result.evens += 1;
        }
        if (el % 2 !== 0) {
            result.odds += 1;
        }
    }
    return result;
}
