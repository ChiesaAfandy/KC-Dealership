function starting() {
    var id = sessionStorage.getItem("loginId");
    // JSON parse to turn stored sting back into array
    // second = JSON.parse(sessionStorage.getItem("second"));

    // (B) IT WORKS!
    // Manually opening 1b-session.html will not work though
    // Session data will perish once tab/window is closed
    console.log(id); // Foo Bar
    // console.log(second); // ["Hello", "World"]

    // (EXTRA) TO CLEAR
    // sessionStorage.removeItem("KEY");
    // sessionStorage.clear();

    if (id == 220401) {
        readCars();
        readOrder()
    } else {
        location.href = "adminLogin.html";
    }



}

function logOut() {
    sessionStorage.clear();
    location.href = "adminLogin.html";
}

