/**
 * Created by kristys on 2017-07-16.
 */
var building;
var prevRandom = -1;
var score = 0;
var buildings = ["Abdul", "ArtCenter", "Biological", "Buchanan", "ChanCenter", "Chemistry", "ESB", "Geo", "Hebb", "ICICS", "IrvingKBarber",
    "Koerner", "LSC", "LSK", "MacMillan", "MathAnnex", "Mathematics", 'MOA', "Neville", "Nitobe", "Uhill", 'Wesbrook'];

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePicSRC() {
    var random = getRandomIntInclusive(0, buildings.length - 1);
    while (random == prevRandom)
        random = getRandomIntInclusive(0, buildings.length - 1);
    prevRandom = random;

    building = buildings[random];
    //console.log(building);
    return './images/' + building + '.png';
}

function end() {
    $("div.center").empty().append("<a href='./game1.html'><img style='max-width: 410px; width: 90%' src='./images/gameover.gif'></a>")
        .append("<p style='margin-top: 20px' class='lead'>You scored " + score + ". </p>");
}

$(document).ready(function () {
    $('span.glyphicon.glyphicon-ok').toggle();
    $('span.glyphicon.glyphicon-remove').toggle();
    $("#picture-div").append("<img style='max-width: 410px; width: 90%' id='picture' src=" + generatePicSRC() + " />");

});

setTimeout(end,60000);

function submit1() {
    var selected = $('span.filter-option.pull-left').text();
    console.log(selected);
    var correct = false;
    switch (building) {
        case "Abdul":
            if (selected == 'Abdul Ladha')
                correct = true;
            break;
        case 'ArtCenter':
            if (selected == 'Audain Art Center (AAC)')
                correct = true;
            break;
        case 'Biological':
            if (selected == 'Biological Sciences')
                correct = true;
            break;
        case 'Buchanan':
            if (selected == 'Buchanan')
                correct = true;
            break;
        case 'ChanCenter':
            if (selected == 'Chan Center')
                correct = true;
            break;
        case 'Chemistry':
            if (selected == 'Chemistry')
                correct = true;
            break;
        case 'ESB':
            if (selected == 'Earth Sciences Building (ESB)')
                correct = true;
            break;
        case 'Geo':
            if (selected == 'Geography')
                correct = true;
            break;
        case 'Hebb':
            if (selected == 'Hebb')
                correct = true;
            break;
        case 'ICICS':
            if (selected == 'Institute for Computing (ICCS)')
                correct = true;
            break;
        case 'IrvingKBarber':
            if (selected == 'Irving K. Barber Learning Center (IBLC)')
                correct = true;
            break;
        case 'Koerner':
            if (selected == 'Walter C. Koerner Library')
                correct = true;
            break;
        case 'LSC':
            if (selected == 'Life Sciences Center (LSC)')
                correct = true;
            break;
        case 'LSK':
            if (selected == 'Leonard S. Klick (LSK)')
                correct = true;
            break;
        case 'MacMillan':
            if (selected == 'MacMillan (MCML)')
                correct = true;
            break;
        case 'MathAnnex':
            if (selected == 'Math Annex (MATX)')
                correct = true;
            break;
        case 'Mathematics':
            if (selected == 'Mathematics')
                correct = true;
            break;
        case 'MOA':
            if (selected == 'Museum of Anthropology (MOA)')
                correct = true;
            break;
        case 'Neville':
            if (selected == 'Neville Scarfe (SCRF)')
                correct = true;
            break;
        case 'Nitobe':
            if (selected == 'Nitobe Garden')
                correct = true;
            break;
        case 'Uhill':
            if (selected == 'University Hill Secondary (UHIL)')
                correct = true;
            break;
        case 'Wesbrook':
            if (selected == 'Wesbrook')
                correct = true;
            break;
        default:
    }

    if (correct) {
        score++;
        $("#submit1").toggle();
        $('span.glyphicon.glyphicon-ok').toggle();
        $('#picture').attr('src', "./images/thumbUp.gif");
    } else {
        $("#submit1").toggle();
        $('span.glyphicon.glyphicon-remove').toggle();
        $('#picture').attr('src', "./images/sad.gif");
    }
    console.log(score);

    setTimeout(function () {
        if(correct)
            $('span.glyphicon.glyphicon-ok').toggle();
        else $('span.glyphicon.glyphicon-remove').toggle();
        $('#picture').attr('src', generatePicSRC());
        $("#submit1").toggle();
    }, 2000);

}
