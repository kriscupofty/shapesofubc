/**
 * Created by kristys on 2017-07-22.
 */

var score = 0;
var random;
var prevRandom = -1;
var buildings = ["MOA", 'ANSOC', 'Allard Hall', 'Rose Garden', 'University Center', 'Buchanan A', 'Buchanan Tower',
    'Hennings', 'Chan Center', 'Belkin Art Gallery', 'Wood Theater', 'Music Building', 'Brock Hall', 'Irving', 'Koerner',
    'Mathematics', 'Math Annex', 'Old Auditorium', 'Geography', 'Xwi7xwa Library', 'Chemistry', 'The Nest', 'Hebb', 'Sauder',
    'LSK', 'Power House', 'Alumni Center', 'Wesbrook', 'UBC Bookstore', 'EOS', 'LSC', 'Beaty', 'CEME Labs', 'The Old SUB',
    'Neville', 'MacMillan', 'Orchard Commons', 'Biological Sciences', 'ICICS', 'Purdy Pavillion'];
var ids = ['MOA', 'ANSOC', 'ALLARD', 'ROSE', 'UC', 'BUCHA', 'BUCHT',
    'HENN', 'CHAN', 'BAG', 'WT', 'MUSIC', 'BROCK', 'IKB', 'KOERNER',
    'MATH', 'MATX', 'OLDAUD', 'GEO', 'XWI', 'CHEM', 'NEST', 'HEBB', 'SAUD',
    'LSK', 'PH', 'ALUM', 'WESB', 'BOOK', 'EOS', 'LSC', 'BEATY', 'CEMEL', 'SUB',
    'NEV', 'MACM', 'OC', 'BIOL', 'ICICS', 'PURDY'];
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

function generateQuestion() {
    random = getRandomIntInclusive(0, buildings.length - 1);
    while ((asked.has(random) && asked.size != buildings.length) || (asked.size == buildings.length && random == prevRandom))
        random = getRandomIntInclusive(0, buildings.length - 1);

    asked.add(random);
    prevRandom = random;
    //console.log(random);
    $('#question').empty().append("Click where you think " + buildings[random] + " is.");
}

function grade(id) {
    scroll(0, 0);
    if (id == ids[random])
        score++;
    $('#score').empty().append("Score: " + score);

    generateQuestion();
}

$(document).ready(function () {
    $('map').imageMapResize();
    $("area").click(function (e) {
        e.stopPropagation();
    });

    generateQuestion();
});


function end() {
    $('#question').empty();
    $('#map').attr('onClick', "").empty().append("<a href='./game2.html'><img style='max-width: 410px; width: 90%' src='./images/gameover.gif'></a>")
        .append("<p style='margin-top: 10px; font-size: 18px' id='load'>Checking leaderboard . . .</p>");

    function filter(request, next, callback) {
        request.headers['zumo-api-key'] = "samplekey";
        next(request, callback);
    }

    var clientRef = new WindowsAzure.MobileServiceClient('https://shapesofubc.azurewebsites.net').withFilter(filter);
    table = clientRef.getTable('topScores');
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






