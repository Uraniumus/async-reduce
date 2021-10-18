// solution/index.js
module.exports = function (Homework) {

    function getElementProm(asyncArray, elemNum) {
        return new Promise(function (resolve, reject) {
            asyncArray.get(elemNum, (res) => {
                resolve(res)
            });
        });
    }
    function getSizeProm(asyncArray) {
        return new Promise(function (resolve, reject) {
            asyncArray.length( (res) => {
                resolve(res)
            });
        });
    }
    function getIsBiggerProm(num1, num2) {
        return new Promise(function (resolve, reject) {
            less( num1, num2,(res) => {
                resolve(res)
            });
        });
    }
    
    function getIterProm(num1) {
        return new Promise(function (resolve, reject) {
            add( num1, 1,(res) => {
                resolve(res)
            });
        });
    }

    return (array, fn, initialValue, cb) => {

        let i = 0;
    let res = 0;
    
    if (initialValue){
        res = initialValue;
    }
    else {
        console.log('zero is false');
        res = await getElementProm(asyncArray, 0);
        i = 1;
    }
    let size = await getSizeProm(asyncArray);
    let flag = await getIsBiggerProm(i, size);
    
    while(flag){
        let elem1 = await getElementProm(asyncArray, i);
        let diff = new Promise(function (resolve, reject) {
        fn(elem1,res,null, null, (res1) => {
                resolve(res1)
            });
        }); 
        res = await diff;
        i = await getIterProm(i);
        flag = await getIsBiggerProm(i, size);
    }
    cb(res);

    }
}