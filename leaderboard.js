/**
 * Created by kristys on 2017-07-28.
 */

var fifth;
var table;
function printTop5msg() {
    $('#load').remove();
    $('div.center').append("<div id='input'<p class='lead' style='margin-bottom: 5px; margin-top: 10px'>Congrats! You are in the top 5.</p>Enter your name here to go onto the leaderboard: " +
        "<input class='form-control' style='width: 100px' type='text' value='' id='name'> </br>" +
        "<input type='submit' value='submit' class='btn btn-default btn-lg' onclick='printHighScores()'/></div>");
}

function printHighScores(results) {
    $('div.center').append("<div><p style='margin-top: 15px; font-size: 20px; color: #c7b6f5; font-weight: 500' class='results'></p>" +
        "<table id='table'></table></div>");

    var name = document.getElementById("name").value;

    function containsSpecChar(str){
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
    }
    if(containsSpecChar(name))
        return alert("Error: Name cannot contain any special characters");
    if (name.length > 10 || name.length == 0)
        return alert("Error: Please enter a name with 1-10 characters");

    $('#input').empty();

    $('.results').append("Top 5 Scores").append("<p style='margin-top: 10px; font-size: 18px' id='update'>Updating leaderboard . . .</p>");

    var entry = {'name': name, 'score': score};
    if (fifth != undefined) {
        table.del({id: fifth.id}).done(function () {
            updateTop5();
        });
    } else updateTop5();

    function updateTop5() {
        table.insert(entry).done(function () {
            table.orderByDescending("score").take(5).read().done(function (results) {
                $('#update').remove();

                $('#table').bootstrapTable({
                    columns: [{field: 'name', title: 'name'}, {field: 'score', title: 'score'}],
                    data: results
                }).attr('class', "table table-no-bordered");

            })
        });
    }

}

function leaderboard() {
    table.orderByDescending("score").take(5).read().done(function (entries) {
        if (entries.length < 5) {
            printTop5msg();
        } else {
            fifth = entries[4];
            if (score >= fifth.score) {
                printTop5msg();
            } else {
                $('div.center').append("<div><p style=' margin-top: 15px; font-size: 18px; color: #c7b6f5; font-weight: 500' class='results'></p>" +
                    "<table id='table'></table></div>");

                $('#load').remove();
                $('.results').append("Top 5 Scores");
                $('#table').bootstrapTable({
                    columns: [{field: 'name', title: 'name'}, {field: 'score', title: 'score'}],
                    data: entries
                }).attr('class', "table table-no-bordered");

            }
        }
    });
}

