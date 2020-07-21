/* 
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    
    request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputUsd.value = (inputRub.value / data.usd).toFixed(2);
        } else {
            inputUsd.value = "Что-то пошло не так!";
        }
    });

}); */


// using Promises:

let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

    function catchData() {
        return new Promise(function(resolve, reject) {     
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.onload = function() {
                if (request.readyState === 4) {
                        if (request.status == 200) {
                            resolve(this.response)
                        }
                        else {
                            reject();
                        }
                }
            }
        });
    };

    catchData()
    .then(response => {
        console.log(response);
        let data = JSON.parse(response);
        inputUsd.value = (inputRub.value / data.usd).toFixed(2);
    })
    .then(() => console.log(5000))
    .catch(() => inputUsd.value = "Error")
});
