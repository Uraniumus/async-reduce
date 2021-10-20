module.exports =  function (Homework) {

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
            Homework.less( num1, num2,(res) => {
                resolve(res)
            });
        });
    }
    
    function getIterProm(num1) {
        return new Promise(function (resolve, reject) {
            Homework.add( num1, 1,(res) => {
                resolve(res)
            });
        });
    }

    function getEqualProm(num1, num2) {
        return new Promise(function (resolve, reject) {
            Homework.equal( num1, num2,(res) => {
                resolve(res)
            });
        });
    }

    return async (array, fn, initialValue, cb) => {
        
    let i = 0;
    let res = 0;
    let initFlag = await getEqualProm(initialValue, null);
    if (!initFlag){
        res = initialValue;
    }
    else {
        res = await getElementProm(array, 0);
        i = 1;
    }
    let size = await getSizeProm(array);
    let flag = await getIsBiggerProm(i, size);
    
    while(flag){
        let elem1 = await getElementProm(array, i);
        let diff = new Promise(function (resolve, reject) {
        fn(res, elem1, i, array, (res1) => {
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