/////////////////////////////////// cachowanie

var SingletonClass = (function () {

    console.log("SDK Initialize");

    function SingletonClass(element) {

        var select = document.getElementById(element); // wczytanie menu rozwijanego

        easyPack.getPaczkomatyList('https://api-pl.easypack24.net/v4/machines?type=0').then(function (data) {
            //console.log("singleton start");
            var simpleData = data._embedded.machines;

            for (var i = 0; i < simpleData.length; i++) {
                var opt = simpleData[i].address.city + " " + simpleData[i].address.street + " " + simpleData[i].address.building_no + ", " + simpleData[i].address.post_code;
                //var opt = simpleData[i].id;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }, function (status) { //detekcja błędów
            alert('Something went wrong.');
        });
    }
    var instance;
    return {
        getInstance: function (element) {
            if (instance == null) {
                instance = new SingletonClass(element);
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

/////////////////////////////////// tworzenie widgetu

easyPack = {};
easyPack.ListWidget = function (element) {
    var position = "in" + element;
    document.getElementById('widget').innerHTML = '<select id="' + position + '"> <option>Wybierz Paczkomat</option> </select>';

    console.log('Widget Initialize');
    //console.log("nazwa: " + position);
    if (typeof element !== 'undefined') {
        SingletonClass.getInstance(position);
    }
}

/////////////////////////////////// funckja wczytująca plik JSON


easyPack.getPaczkomatyList = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
                console.log("file read");
            } else {
                reject(status);
            }
        };
        xhr.send();

    });
};

/////////////////////////////////// uruchomienie widgetu

//easyPack.ListWidget('widget');
