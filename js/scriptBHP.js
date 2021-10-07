function convertBHP() {
    var bhpNum = document.getElementById("bhp").value;

    bhpNumMulty = bhpNum * 0.7457;
    var finalBHP = parseInt(bhpNumMulty)

    document.getElementById("kW").value = finalBHP;
}