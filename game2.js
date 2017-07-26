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
    'MATH', 'MATX','OLDAUD','GEO','XWI','CHEM', 'NEST', 'HEBB', 'SAUD',
    'LSK', 'PH', 'ALUM', 'WESB', 'BOOK', 'EOS', 'LSC', 'BEATY', 'CEMEL', 'SUB',
    'NEV', 'MACM', 'OC', 'BIOL', 'ICICS', 'PURDY'];

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    random = getRandomIntInclusive(0, buildings.length -1);
    while (random == prevRandom)
        random = getRandomIntInclusive(0, buildings.length - 1);
    //console.log(ids[random]);
    prevRandom = random;
    $('#question').empty().append("Click where you think " + buildings[random] + " is.");
}


function getHighScores(){
    table.orderByDescending("score").take(5).read().done(function(results){
        var len = results.length;
        for(var i=0;i<len;i++){
            var data = results[i];
            $("<li>"+data.name+":"+data.score+"</li>").appendTo('.results');
        }
    })
}


$(document).ready(function() {
    $('map').imageMapResize();
    $("area").click(function (e) {
        e.stopPropagation();
    });

    generateQuestion();
});


function end() {
    $('#question').empty();
    $("#map").empty().append("<a href='./game2.html'><img style='max-width: 410px; width: 90%' src='./images/gameover.gif'></a>");
}

setTimeout(end,60000);

function grade(id) {
    scroll(0,0);
    if(id == ids[random])
        score++;
    $('#score').empty().append("Score: " + score);

    generateQuestion();
}



