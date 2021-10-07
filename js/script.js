
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


document.getElementById("formCatalog").addEventListener("submit", (e) => {
    var year = document.getElementById("year").value;
    var brand = document.getElementById("brand").value;
    var models = document.getElementById("models").value;
    var drivetrain = document.getElementById("drivetrain").value;
    var gearbox = document.getElementById("gearbox").value;

    var priceNum = document.getElementById("price").value;

    priceNumFinal = numberWithCommas(priceNum);
    price = "$" + priceNumFinal;

    var engine = document.getElementById("engine").value;

    var bhpNum = document.getElementById("bhp").value;
    var kWNum = document.getElementById("kW").value;
    var bhp = bhpNum + " bhp (" + kWNum + " kW)";


    var torqueNum = document.getElementById("torque").value;
    torque = torqueNum + " lb-ft";

    var layoutEngine = document.getElementById("layoutEngine").value;

    var massNum = document.getElementById("mass").value;
    mass = massNum + " lbs";


    var transmission = document.getElementById("transmission").value;
    var time = document.getElementById("time").value;
    var topSpeed = document.getElementById("topSpeed").value;
    var range = document.getElementById("range").value;
    var pic = document.getElementById("pic").value;
    var logo = document.getElementById("logo").value;
    var country = document.getElementById("country").value;
    var flag = document.getElementById("flag").value;

    e.preventDefault();
    createCars(year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag)
    formCatalog.reset();
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function createCars(year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag) {
    console.log(counter);
    counter += 1;
    console.log(counter);

    var cars = {
        id: counter,
        year: year,
        brand: brand,
        models: models,
        drivetrain: drivetrain,
        gearbox: gearbox,
        price: price,
        engine: engine,
        bhp: bhp,
        torque: torque,
        layoutEngine: layoutEngine,
        mass: mass,
        transmission: transmission,
        time: time,
        topSpeed: topSpeed,
        range: range,
        pic: pic,
        logo: logo,
        country: country,
        flag: flag
    }
    let db = firebase.database().ref("cars/" + counter)
    db.set(cars);
    document.getElementById("cardSection").innerHTML = ``;
    readCars();
}


function readCars() {


    var cars = firebase.database().ref("cars/");
    cars.on("child_added", function (data) {
        var carsValue = data.val();
        console.log(carsValue);
        document.getElementById("cardSection").innerHTML += `
        <div class="card col-12 col-sm-6 col-lg-4">
            <div class="card-body">
            <p class="card-text">ID# ${carsValue.id}</p>
                <h5 class="card-title">${carsValue.year} ${carsValue.brand} ${carsValue.models}</h5>
                <p class="card-text">${carsValue.drivetrain} / ${carsValue.gearbox}</p>
                <img src="${carsValue.logo}" alt="MainImg" class="img-fluid logo d-block ">
                <img src="${carsValue.flag}" alt="flag"
                    class="img-fluid logoFlag d-block float-left align-middle mr-2">
                <p class="card-text text-secondary">${carsValue.country}</p>
                <p class="d-inline text-muted speed">Price : </p>
                <h5 class="card-title d-inline">${carsValue.price}</h5>
                <img src="${carsValue.pic}" class=" img-fluid" alt="pic">

                

                <div class="col-12">
                    <div class="row">
                        <div class="col-4 border-right ">
                            <div>
                                <h6 class="d-inline">${carsValue.time}</h6>
                                <p class="d-inline text-muted speed">s</p>
                            </div>
                        </div>
                        <div class="col-4 border-right">
                            <div>
                                <h6 class="d-inline">${carsValue.topSpeed}</h6>
                                <p class="d-inline text-muted speed">mph</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div>
                                <h6 class="d-inline">${carsValue.range}</h6>
                                <p class="d-inline text-muted speed">mi</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>

                <p class="d-inline text-muted speed">Engine : </p>
                <p class="card-title d-inline">${carsValue.engine}</p><br>

                <p class="d-inline text-muted speed">Brake Horse Power : </p>
                <p class="card-title d-inline">${carsValue.bhp}</p><br>

                <p class="d-inline text-muted speed">Torque : </p>
                <p class="card-title d-inline">${carsValue.torque}</p><br>

                <p class="d-inline text-muted speed">Engine Layout : </p>
                <p class="card-title d-inline">${carsValue.layoutEngine}</p><br>

                <p class="d-inline text-muted speed">Mass : </p>
                <p class="card-title d-inline">${carsValue.mass}</p><br>
                
                <p class="d-inline text-muted speed">Transmission : </p>
                <p class="card-title d-inline">${carsValue.transmission}</p><br>

                <div class="row">
                <button type="submit" style="color:white" class="btn btn-warning col-12 col-md-6 btn-buy" onclick="updateCars(${carsValue.id},'${carsValue.year}','${carsValue.brand}','${carsValue.models}','${carsValue.drivetrain}','${carsValue.gearbox}','${carsValue.price}','${carsValue.engine}','${carsValue.bhp}','${carsValue.torque}','${carsValue.layoutEngine}','${carsValue.mass}','${carsValue.transmission}','${carsValue.time}','${carsValue.topSpeed}','${carsValue.range}','${carsValue.pic}','${carsValue.logo}','${carsValue.country}','${carsValue.flag}')">Edit Cars</button>
                <button type="submit" class="btn btn-danger col-12 col-md-6 btn-buy" onclick="deleteCars(${carsValue.id})">Delete Cars</button>
                </div>
            </div>
        </div> 
        
        `
    })
}


function reset() {
    document.getElementById("buttonSection").innerHTML = `
    
        <button type="submit" id="button1" class="btn btn-outline-dark btn-block btn-buy col-12">Add Data</button>
    `

    document.getElementById("formCatalog").reset();
    ;

}

function updateCars(id, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag) {
    window.scrollTo(0, 0);

    console.log(id, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag)

    document.getElementById("buttonSection").innerHTML = `
    
        <button type="submit" style="display:none" id="button1" class="btn btn-dark col-12">Add Data</button>
        
        <button style="" id="buttonCancel" class="btn btn-danger btn-buy col-6 ">Cancel</button>
        <button type="submit" style="" id="buttonUpdate" class="btn btn-success btn-buy col-6">Update Cars</button>
        
    `;
    document.getElementById("formCatalog").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    document.getElementById("buttonCancel").addEventListener("click", (e) => {
        reset();
    });

    document.getElementById("buttonUpdate").addEventListener("click", (e) => {
        var year = document.getElementById("year").value;
        var brand = document.getElementById("brand").value;
        var models = document.getElementById("models").value;
        var drivetrain = document.getElementById("drivetrain").value;
        var gearbox = document.getElementById("gearbox").value;

        var priceNum = document.getElementById("price").value;

        priceNumFinal = numberWithCommas(priceNum);
        price = "$" + priceNumFinal;

        var engine = document.getElementById("engine").value;

        var bhpNum = document.getElementById("bhp").value;
        var kWNum = document.getElementById("kW").value;
        var bhp = bhpNum + " bhp (" + kWNum + " kW)";


        var torqueNum = document.getElementById("torque").value;
        torque = torqueNum + " lb-ft";

        var layoutEngine = document.getElementById("layoutEngine").value;

        var massNum = document.getElementById("mass").value;
        mass = massNum + " lbs";


        var transmission = document.getElementById("transmission").value;
        var time = document.getElementById("time").value;
        var topSpeed = document.getElementById("topSpeed").value;
        var range = document.getElementById("range").value;
        var pic = document.getElementById("pic").value;
        var logo = document.getElementById("logo").value;
        var country = document.getElementById("country").value;
        var flag = document.getElementById("flag").value;

        updateCars2(id, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag);
    });


    document.getElementById("year").value = year;
    document.getElementById("brand").value = brand;
    document.getElementById("models").value = models;
    document.getElementById("drivetrain").value = drivetrain;
    document.getElementById("gearbox").value = gearbox;

    var priceNew = price.replace('$', '')
    var priceFinal = priceNew.replace(/,/g, '')
    price = priceFinal

    document.getElementById("price").value = price;

    document.getElementById("engine").value = engine;

    var bhpkw = bhp.replace(' bhp (', '~');
    var bhpkwFinal = bhpkw.replace(' kW)','')
    var split = bhpkwFinal.split('~');
    bhp = split[0];
    var kW = split[1];

    document.getElementById("bhp").value = bhp;
    document.getElementById("kW").value = kW;

    var torqueNew = torque.replace(' lb-ft','')
    torque = torqueNew;

    document.getElementById("torque").value = torque;
    document.getElementById("layoutEngine").value = layoutEngine;

    var massNew = mass.replace(' lbs','')
    mass = massNew;

    document.getElementById("mass").value = mass;
    document.getElementById("transmission").value = transmission;
    document.getElementById("time").value = time;
    document.getElementById("topSpeed").value = topSpeed;
    document.getElementById("range").value = range;
    document.getElementById("pic").value = pic;
    document.getElementById("logo").value = logo;
    document.getElementById("country").value = country;
    document.getElementById("flag").value = flag;
}

function updateCars2(id, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag) {

    console.log(id, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag)

    var carsUpdated = {
        id: id,
        year: year,
        brand: brand,
        models: models,
        drivetrain: drivetrain,
        gearbox: gearbox,
        price: price, engine,
        bhp: bhp,
        torque: torque,
        layoutEngine: layoutEngine,
        mass: mass,
        transmission: transmission,
        time: time,
        topSpeed: topSpeed,
        range: range,
        pic: pic,
        logo: logo,
        country: country,
        flag: flag
    }
    let db = firebase.database().ref("cars/" + id)
    db.set(carsUpdated);

    document.getElementById("cardSection").innerHTML = ``;
    readCars();
    reset();
}

function deleteCars(id) {
    var result = confirm("Want to delete?");
    if (result) {
        var cars = firebase.database().ref("cars/" + id);
        cars.remove();
        reset();
        document.getElementById("cardSection").innerHTML = ``;
        readCars();
    }

}



function readCarsCatalog() {
    var cars = firebase.database().ref("cars/");
    cars.on("child_added", function (data) {
        var carsValue = data.val();
        console.log(carsValue);
        document.getElementById("catalog").innerHTML += `
        <div class="col-12 col-xl-6 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between pb-0">
                    <div class="mr-auto">
                        <h5 class="card-title text-dark mr-2"> ${carsValue.year}
                            <br class="d-block d-sm-none"> ${carsValue.models}
                        </h5>
                        <p class="card-text text-dark">${carsValue.brand}</p>
                        <p class="card-text text-secondary gearT">${carsValue.drivetrain}</p>
                        <p class="card-text text-secondary gearT">${carsValue.gearbox}</p>
                    </div>
                    <div class="ml-auto">
                        <h5 class="card-title d-block text-center">${carsValue.price}</h5>
                        <img src="${carsValue.logo}" alt="MainImg"
                            class="img-fluid logo d-block mx-auto">
                    </div>
                </div>
                <img src="${carsValue.pic}" class="card-img-top" alt="Logo">
                <div class="card-body">
                    <div class="row text-center mx-2 ">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-4 border-right ">
                                    <div>
                                        <h4 class="d-inline">${carsValue.time}</h4>
                                        <p class="d-inline text-muted speed">s</p>
                                    </div>
                                    <div>
                                        <p class="d-inline text-muted speedText">0-60 mph</p>
                                    </div>
                                </div>
                                <div class="col-4 border-right">
                                    <div>
                                        <h4 class="d-inline">${carsValue.topSpeed}</h4>
                                        <p class="d-inline text-muted speed">mph</p>
                                    </div>
                                    <div>
                                        <p class="d-inline text-muted speedText">Top Speed</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div>
                                        <h4 class="d-inline">${carsValue.range}</h4>
                                        <p class="d-inline text-muted speed">mi</p>
                                    </div>
                                    <div>
                                        <p class="d-inline text-muted speedText">range</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-12 mt-4 ">
                            <div class="row">
                                <div class="col-6">
                                    <button type="button"
                                    class="btn btn-primary btn-block btn-buy" onclick="selectBuy(${carsValue.id})">Buy Now</button>

                                </div>
                                <div class="col-6">
                                    <button type="button"
                                    class="btn btn-outline-dark btn-block btn-buy" onclick="selectDetail(${carsValue.id})">View Detail</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
        `
    })
}

function selectBuy(id) {
    // (A) VARIABLES TO PASS
    console.log(id);
    var data = id;

    // (B) SAVE TO SESSION STORAGE
    // sessionStorage.setItem("KEY", "VALUE");
    sessionStorage.setItem("dataId", data);
    // session storage cannot store array and objects
    // JSON encode before storing, convert to string
    // sessionStorage.setItem("second", JSON.stringify(second));

    // (C) REDIRECT
    location.href = "carsBuy.html";
    // Opening new window works too
    // window.open("1b-session.html");
}

function selectDetail(id) {
    console.log(id);
    var data = id;
    sessionStorage.setItem("dataId", data);
    location.href = "carsDetail.html";
}

function getselectDetail() {
    var id = sessionStorage.getItem("dataId");
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

    readCarsDetail(id)

}

function getselectBuy() {
    var id = sessionStorage.getItem("dataId");
    console.log(id);
    readCarsBuy(id)

}

function readCarsDetail(id) {
    var cars = firebase.database().ref("cars/" + id);
    cars.on("value", function (data) {
        var key = data.key;
        var year = data.child("year").val();
        var brand = data.child("brand").val();
        var models = data.child("models").val();
        var drivetrain = data.child("drivetrain").val();
        var gearbox = data.child("gearbox").val();
        var price = data.child("price").val();
        var engine = data.child("engine").val();
        var bhp = data.child("bhp").val();
        var torque = data.child("torque").val();
        var layoutEngine = data.child("layoutEngine").val();
        var mass = data.child("mass").val();
        var transmission = data.child("transmission").val();
        var time = data.child("time").val();
        var topSpeed = data.child("topSpeed").val();
        var range = data.child("range").val();
        var pic = data.child("pic").val();
        var logo = data.child("logo").val();
        var country = data.child("country").val();
        var flag = data.child("flag").val();


        console.log(key, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag)

        document.getElementById("carsDetail").innerHTML += `
        <div class="row pt-5">
            <div class="col-12 .bg-white pt-5 ">
                <div class="row">
                    <div class="col-12 col-md-8 ">
                        <div class="row">
                            <div class="col-12 col-xl-12 mb-4 ">
                                <div class="card">
                                    <div class="card-body text-center pb-0 d-block d-md-none">
                                        <div class="">
                                            <h1 class="card-title text-dark mr-2"> ${year} ${brand}
                                            ${models}
                                            </h1>
                                            <img src="${logo}" alt="MainImg"
                                                class="img-fluid logo d-block mx-auto">
                                            <p class="card-text text-secondary "
                                                style="font-weight: 100; font-size: 25px;">${drivetrain} /
                                                ${gearbox}</p>
                                            <img src="${flag}" alt="flag" class="img-fluid logoFlag ">
                                            <p class="card-text text-secondary">${country}</p>
                                        </div>
                                    </div>

                                    <div class="card-body text-left pb-0 d-none d-md-block">
                                        <div class="">
                                            <h1 class="card-title text-dark mr-2"> ${year} ${brand}
                                            ${models}
                                            </h1>
                                            <p class="card-text text-secondary "
                                                style="font-weight: 100; font-size: 25px;">${drivetrain} /
                                                ${gearbox}</p>
                                            <img src="${logo}" alt="MainImg" class="img-fluid logo d-block ">
                                            <img src="${flag}" alt="flag"
                                                class="img-fluid logoFlag d-block float-left align-middle mr-2">
                                            <p class="card-text text-secondary">${country}</p>

                                        </div>
                                    </div>
                                </div>
                                <img src="${pic}" class="card-img-top" alt="ic">
                                <div class="card-body">
                                    <div class="row text-center mx-2 ">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-4 border-right ">
                                                    <div>
                                                        <h2 class="d-inline">${time}</h2>
                                                        <p class="d-inline text-muted speed">s</p>
                                                    </div>
                                                    <div>
                                                        <p class="d-inline text-muted ">0-60 mph</p>
                                                    </div>
                                                </div>
                                                <div class="col-4 border-right">
                                                    <div>
                                                        <h2 class="d-inline">${topSpeed}</h2>
                                                        <p class="d-inline text-muted speed">mph</p>
                                                    </div>
                                                    <div>
                                                        <p class="d-inline text-muted ">Top Speed</p>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div>
                                                        <h2 class="d-inline">${range}</h2>
                                                        <p class="d-inline text-muted speed">mi</p>
                                                    </div>
                                                    <div>
                                                        <p class="d-inline text-muted ">range</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-12 col-md-4  pb-5 card-body">
                        <div class="row">
                            <div class="col-12">
                                <h5 class="card-title d-block text-left">Price</h5>
                            </div>
                            <div class="col-12 mb-2">
                                <h3 class="card-title d-block text-left">${price}</h3>
                            </div>
                            <div class="col-12 mb-2">
                                <p class="card-text text-secondary gearT">$500 Order Deposit and no est. Transportation
                                    Fee to your nearest delivery location
                                </p>
                            </div>

                            <div class="col-12 mb-5">
                                    <button type="button" class="btn btn-primary btn-block btn-buy" onclick="selectBuy(${key})">Buy</button>
                            </div>

                            <div class="col-12 mb-4">
                                <h4 class="mb-4">Technical Specifications</h4>
                                <p class="text-muted mb-0">Engine</p>
                                <p>${engine}</p>
                                <p class="text-muted mb-0">Brake Horse Power</p>
                                <p>${bhp}</p>
                                <p class="text-muted mb-0">Torque</p>
                                <p>${torque}</p>
                                <p class="text-muted mb-0">Engine Layout</p>
                                <p>${layoutEngine}</p>
                                <p class="text-muted mb-0">Mass</p>
                                <p>${mass}</p>
                                <p class="text-muted mb-0">Transmission</p>
                                <p>${transmission}</p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        `
    })
}

function readCarsBuy(id) {
    var cars = firebase.database().ref("cars/" + id);
    cars.on("value", function (data) {
        var key = data.key;
        var year = data.child("year").val();
        var brand = data.child("brand").val();
        var models = data.child("models").val();
        var drivetrain = data.child("drivetrain").val();
        var gearbox = data.child("gearbox").val();
        var price = data.child("price").val();
        var engine = data.child("engine").val();
        var bhp = data.child("bhp").val();
        var torque = data.child("torque").val();
        var layoutEngine = data.child("layoutEngine").val();
        var mass = data.child("mass").val();
        var transmission = data.child("transmission").val();
        var time = data.child("time").val();
        var topSpeed = data.child("topSpeed").val();
        var range = data.child("range").val();
        var pic = data.child("pic").val();
        var logo = data.child("logo").val();
        var country = data.child("country").val();
        var flag = data.child("flag").val();


        console.log(key, year, brand, models, drivetrain, gearbox, price, engine, bhp, torque, layoutEngine, mass, transmission, time, topSpeed, range, pic, logo, country, flag)

        document.getElementById("carsBuy").innerHTML += `
        <div class="row">
            <div class="col-12 col-xl-12 mb-1 ">

                <img src="${pic}" class="card-img-top" alt="pic">

                <div class="card">
                    <div class="card-body text-center pb-0 d-block d-md-none">
                        <div">
                            <h3 class="card-title text-dark mr-2"> ${year} ${brand}
                            ${models}
                            </h3>
                            <p class="card-text text-secondary "
                                style="font-weight: 100; font-size: 20px;">${drivetrain} /
                                ${gearbox}</p>
                    </div>
                </div>

                <div class="card-body text-left pb-0 d-none d-md-block">
                    <div class="">
                        <h2 class="card-title text-dark mr-2"> ${year} ${brand}
                        ${models}
                        </h2>
                        <p class="card-text text-secondary " style="font-weight: 100; font-size: 21px;">
                        ${drivetrain} /
                        ${gearbox}

                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="row text-center  ">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-4 border-right ">
                                <div>
                                    <h4 class="d-inline">${time}</h4>
                                    <p class="d-inline text-muted speed">s</p>
                                </div>
                                <div>
                                    <p class="d-inline text-muted ">0-60 mph</p>
                                </div>
                            </div>
                            <div class="col-4 border-right">
                                <div>
                                    <h4 class="d-inline">${topSpeed}</h4>
                                    <p class="d-inline text-muted speed">mph</p>
                                </div>
                                <div>
                                    <p class="d-inline text-muted ">Top Speed</p>
                                </div>
                            </div>
                            <div class="col-4">
                                <div>
                                    <h4 class="d-inline">${range}</h4>
                                    <p class="d-inline text-muted speed">mi</p>
                                </div>
                                <div>
                                    <p class="d-inline text-muted ">range</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 d-flex justify-content-between">
            <h5 class="card-title d-block text-left text-secondary">Purchase Price</h5>
            <h3 class="card-title d-block text-left">${price}</h3>
        </div>

        <div class="col-12 mb-2">
            <p class="card-text text-secondary gearT">Excluding taxes and fees</p>
        </div>

        <div class="col-12 d-flex justify-content-between mb-0">
            <h4 class="card-title d-block text-left text-dark">Due Today</h4>
            <h3 class="card-title d-block text-left">$500</h3>
        </div>
        <div class="col-12 mb-5">
            <p class="card-text text-secondary gearT">Non-refundable Order Deposit</p>
        </div>

        <div class="col-12 mb-2 text-left">
            <p class="card-text text-secondary gearT">By placing this order, I agree to the Model 3
                Order Agreement, Terms of Use, and Privacy
                Notice.I acknowledge wear and tear will be present on the car. If I cancel my order, any
                Order
                Deposit and Transportation Fee paid will not be refunded.</p>
        </div>
        
        `
    })
}



