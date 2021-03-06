((global) => {
    const _wrap = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * 20);
    };

    const AsyncArray = function (initial) {
        if (initial && !(initial instanceof Array)) {
            throw new Error('initial value is not an array');
        }

        const a = initial ? Array.from(initial) : [];

        this.set = (index, value, cb) => _wrap(() => { a[index] = value }, cb);
        this.push = (value, cb) => _wrap(() => { a.push(value) }, cb);

        this.get = (index, cb) => _wrap(() => a[index], cb);
        this.pop = (cb) => _wrap(() => a.pop(), cb);
        this.length = (cb) => _wrap(() => a.length, cb);

        this.print = () => { console.log(a.toString()); };
    }

    const add = (a, b, cb) => _wrap(() => a + b, cb);
    const subtract = (a, b, cb) => _wrap(() => a - b, cb);
    const multiply = (a, b, cb) => _wrap(() => a * b, cb);
    const divide = (a, b, cb) => _wrap(() => a / b, cb);

    const less = (a, b, cb) => _wrap(() => a < b, cb);
    const equal = (a, b, cb) => _wrap(() => a == b, cb);
    const lessOrEqual = (a, b, cb) => _wrap(() => a <= b, cb);

    global.Homework = {
        AsyncArray,
        add,
        subtract,
        multiply,
        divide,
        less,
        equal,
        lessOrEqual,
    };

    Object.freeze(global.Homework);
})(typeof window === 'undefined' ? global : window);

const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;

// const a = new AsyncArray([1, 2, 3]);

// a.push(4, () => {
//     console.log('добавление элемента выполнено');
//     a.print();

//     a.set(2, 999, () => {
//         console.log('присваивание элемента по индексу выполнено');
//         a.print();

//         a.get(0, (result) => {
//             console.log('получение элемента по индексу выполнено, результат', result);
//             a.print();

//             a.pop((result) => {
//                 console.log('получение последнего элемента выполнено, результат', result);
//                 a.print();

//                 a.length((result) => {
//                     console.log('получение длины массива выполнено, результат', result);
//                     a.print();
//                 });
//             });
//         });
//     });
// });

// add(5, 2, (result) => console.log('результат сложения', result));

// subtract(11, 7, (result) => console.log('результат вычитания', result));

// multiply(6, 7, (result) => console.log('результат умножения', result));

// divide(13, 7, (result) => console.log('результат деления', result));

// less(5, 3, (result) => console.log('результат операции МЕНЬШЕ', result));

// equal(1, 1, (result) => console.log('результат операции РАВНО', result));

// lessOrEqual(12, 19, (result) => console.log('результат операции МЕНЬШЕ ИЛИ РАВНО', result));

const asyncArray = new Homework.AsyncArray([0,1]);
const reducerSum = (acc, curr, i, src, cb) => Homework.divide(acc, curr, cb);

const myReduce = require("./solution/index")(Homework)
myReduce(asyncArray, reducerSum, 1, (res) => { console.log(res); // 10
});
// reduce(asyncArray, reducerSum, 0, (res) => {
//     console.log(res); // 10
// });

// function getElementProm(asyncArray, elemNum) {
//     return new Promise(function (resolve, reject) {
//         asyncArray.get(elemNum, (res) => {
//             resolve(res)
//         });
//     });
// }
// function getSizeProm(asyncArray) {
//     return new Promise(function (resolve, reject) {
//         asyncArray.length( (res) => {
//             resolve(res)
//         });
//     });
// }
// function getIsBiggerProm(num1, num2) {
//     return new Promise(function (resolve, reject) {
//         less( num1, num2,(res) => {
//             resolve(res)
//         });
//     });
// }

// function getIterProm(num1) {
//     return new Promise(function (resolve, reject) {
//         add( num1, 1,(res) => {
//             resolve(res)
//         });
//     });
// }

// async function reduce(asyncArray, fn, initialValue, cb) {
//     let i = 0;
//     let res = 0;
    
//     if (initialValue){
//         res = initialValue;
//     }
//     else {
//         console.log('zero is false');
//         res = await getElementProm(asyncArray, 0);
//         i = 1;
//     }
//     let size = await getSizeProm(asyncArray);
//     let flag = await getIsBiggerProm(i, size);

//     while(flag){
//         let elem1 = await getElementProm(asyncArray, i);
//         let diff = new Promise(function (resolve, reject) {
//         fn(elem1,res,null, null, (res1) => {
//                 resolve(res1)
//             });
//         }); 
//         res = await diff;
//         i = await getIterProm(i);
//         flag = await getIsBiggerProm(i, size);
//     }
//     cb(res);

// }
