/**
 * Created by kristys on 2017-07-16.
 */
var random;
var prevRandom = -1;
var score = 0;
var buildings = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", 'r', "s", "t", "u", 'v'];
var asked = new Set();

function getRandomIntInclusive(min, max) {
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomIntInclusive(min, max);
    return min + (byteArray[0] % range);
}

function generatePicSRC() {
    random = getRandomIntInclusive(0, buildings.length - 1);
    while ((asked.has(random) && asked.size != buildings.length) || (asked.size == buildings.length && random == prevRandom))
        random = getRandomIntInclusive(0, buildings.length - 1);

    asked.add(random);
    prevRandom = random;

    //console.log(random);
    return './images/' + buildings[random] + '.png';
}

$(document).ready(function () {
    $('span.glyphicon.glyphicon-ok').toggle();
    $('span.glyphicon.glyphicon-remove').toggle();
    $("#picture-div").append("<img style='max-height: 50vh; max-width: 90%' id='picture' src=" + generatePicSRC() + " />");
});

function end() {
    $("#inner").empty().append("<a href='./game1.html'><img style='max-width: 410px; width: 90%' src='./images/gameover.gif'></a>")
        .append("<p style='margin-top: 20px' class='lead'>You scored " + score + ". </p>")
        .append("<p style='margin-top: 10px; font-size: 18px' id='load'>Checking leaderboard . . .</p>");

    var clientRef = new WindowsAzure.MobileServiceClient('https://shapesofubc.azurewebsites.net');
    table = clientRef.getTable('topScores1');
    leaderboard();
}

function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, 'linear');
    if(timeleft > -1) {
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    } else return end();
}

function submit1() {
    var selected = $('span.filter-option.pull-left').text();
    var correct = false;
    switch (random) {
        case 0:
            if (selected == 'Abdul Ladha')
                correct = true;
            break;
        case 1:
            if (selected == 'Audain Art Center (AAC)')
                correct = true;
            break;
        case 2:
            if (selected == 'Biological Sciences')
                correct = true;
            break;
        case 3:
            if (selected == 'Buchanan')
                correct = true;
            break;
        case 4:
            if (selected == 'Chan Center')
                correct = true;
            break;
        case 5:
            if (selected == 'Chemistry')
                correct = true;
            break;
        case 6:
            if (selected == 'Earth Sciences Building (ESB)')
                correct = true;
            break;
        case 7:
            if (selected == 'Geography')
                correct = true;
            break;
        case 8:
            if (selected == 'Hebb')
                correct = true;
            break;
        case 9:
            if (selected == 'Institute for Computing (ICICS)')
                correct = true;
            break;
        case 10:
            if (selected == 'Irving K. Barber Learning Center')
                correct = true;
            break;
        case 11:
            if (selected == 'Walter C. Koerner Library')
                correct = true;
            break;
        case 12:
            if (selected == 'Life Sciences Center (LSC)')
                correct = true;
            break;
        case 13:
            if (selected == 'Leonard S. Klick (LSK)')
                correct = true;
            break;
        case 14:
            if (selected == 'MacMillan (MCML)')
                correct = true;
            break;
        case 15:
            if (selected == 'Math Annex (MATX)')
                correct = true;
            break;
        case 16:
            if (selected == 'Mathematics')
                correct = true;
            break;
        case 17:
            if (selected == 'Museum of Anthropology (MOA)')
                correct = true;
            break;
        case 18:
            if (selected == 'Neville Scarfe (SCRF)')
                correct = true;
            break;
        case 19:
            if (selected == 'Nitobe Garden')
                correct = true;
            break;
        case 20:
            if (selected == 'University Hill Secondary (UHIL)')
                correct = true;
            break;
        case 21:
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
    //console.log(score);

    setTimeout(function () {
        if(correct)
            $('span.glyphicon.glyphicon-ok').toggle();
        else $('span.glyphicon.glyphicon-remove').toggle();
        $('#picture').attr('src', generatePicSRC());
        $("#submit1").toggle();
    }, 2000);

}
