
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCFz3bXYaHEddYCk6mLDtebTex4ZfGMgy0",
    authDomain: "kcdealership-39743.firebaseapp.com",
    databaseURL: "https://kcdealership-39743-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kcdealership-39743",
    storageBucket: "kcdealership-39743.appspot.com",
    messagingSenderId: "1023544218183",
    appId: "1:1023544218183:web:3e311acf19f13b920b5762",
    measurementId: "G-9P7NNMB1BG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("formPersonal").addEventListener("submit", (e) => {
    var address = document.getElementById("inputAddress").value;
    var address2 = document.getElementById("inputAddress2").value;
    var city = document.getElementById("inputCity").value;
    var state = document.getElementById("inputState").value;
    var zip = document.getElementById("inputZip").value;
    var fName = document.getElementById("inputFirstName").value;
    var lName = document.getElementById("inputLastName").value;
    var email = document.getElementById("Email").value;
    var phone = document.getElementById("Phone").value;


    e.preventDefault();
    dataPersonal(address, address2, city, state, zip, fName, lName, email, phone)
});

function dataPersonal(address, address2, city, state, zip, fName, lName, email, phone) {
    var id = sessionStorage.getItem("dataId");
    console.log(id);
    var cars = firebase.database().ref("cars/" + id);
    cars.on("value", function (data) {
        var key = data.key;
        var brand = data.child("brand").val();
        var models = data.child("models").val();
        var price = data.child("price").val();

        createPersonal(key, brand, models, price, address, address2, city, state, zip, fName, lName, email, phone)

    })
}

function createPersonal(key, brand, models, price, address, address2, city, state, zip, fName, lName, email, phone) {

    console.log(counter);
    counter += 1;
    console.log(counter);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var personalOrder = {
        id: counter,
        date: date,
        time: time,
        carsId: key,
        carsBrand: brand,
        carsModels: models,
        carsPrice: price,
        address: address,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        firstName: fName,
        lastName: lName,
        email: email,
        phone: phone

    }
    let db = firebase.database().ref("personalOrder/" + counter)
    db.set(personalOrder);
    location.href = "orderFinish.html";
}

function readOrder() {
    var cars = firebase.database().ref("personalOrder/");
    cars.on("child_added", function (data) {
        var orderValue = data.val();
        console.log(orderValue);
        document.getElementById("tableSection").innerHTML += `
        <tr>
            <th scope="row">${orderValue.id}</th>
            <td>${orderValue.date}<br> / ${orderValue.time}</td>
            <td>${orderValue.firstName} ${orderValue.lastName}</td>
            <td>${orderValue.address} - ${orderValue.address2}</td>
            <td>${orderValue.city}</td>
            <td>${orderValue.state}</td>
            <td>${orderValue.zip}</td>
            <td>${orderValue.email}</td>
            <td>${orderValue.phone}</td>
            <th>${orderValue.carsId}</th>
            <td>${orderValue.carsBrand} / ${orderValue.carsModels}</td>
            <td>${orderValue.carsPrice}</td>
        </tr>
        
        `

        var tbody = $('table tbody');
        tbody.html($('tr', tbody).get().reverse());
    })
}