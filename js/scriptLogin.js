
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

document.getElementById("formLogin").addEventListener("submit", (e) => {
    var uName = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    console.log(uName + pass)


    e.preventDefault();
    adminLogin(uName, pass)
});

function adminLogin(uName, pass) {
    var admin = firebase.database().ref("users/220401");
    admin.on("value", function (data) {
        var key = data.key;
        var username = data.child("username").val();
        var password = data.child("password").val();

        if (uName == username && pass == password) {
            alert("Logged In")
            saveId(key)
        } else {
            alert("Failed")
            document.getElementById("error").innerHTML += `
            <div class="alert alert-danger" role="alert">
            Please input the correct username or password
            </div>`
        }

    })
}

function saveId(id) {
    // (A) VARIABLES TO PASS
    console.log(id);
    var data = id;

    // (B) SAVE TO SESSION STORAGE
    // sessionStorage.setItem("KEY", "VALUE");
    sessionStorage.setItem("loginId", data);
    // session storage cannot store array and objects
    // JSON encode before storing, convert to string
    // sessionStorage.setItem("second", JSON.stringify(second));

    // (C) REDIRECT
    location.href = "adminpages.html";
    // Opening new window works too
    // window.open("1b-session.html");
}