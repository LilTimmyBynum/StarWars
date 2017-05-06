// Narutoscrips.js file

// dynamically create fighter face cards

// crete the loop to dynamically create all fighters

var winner = false;

// array of ALL ninjas
var theNinjas = ["Naruto", "Sakura", "Sasuke", "Gaara", "Neji", "Orochimaru", "Tsunade", "RockLee", "Kakashe"];

function ninjaBattle() {
    var heroHitMultiplier = 1;

    // load up 'ninjasName' and 'ninjasFace' eith random ninjas
    var pickedNinjas = [];
    var ninjasName = [];
    var ninjasFace = [];

    for (list = 0; list < 4; list++) {
        var ninjaPick = Math.floor((Math.random() * 9) + 0); // pick a random ninja

        var listCheck = pickedNinjas.indexOf(ninjaPick);
        if (listCheck == -1) {
            console.log("FALSE");
            pickedNinjas.push(ninjaPick);
            ninjasName.push(theNinjas[ninjaPick]);
            ninjasFace.push("assets/" + theNinjas[ninjaPick] + "_face.jpg");
        } else {
            console.log("Number is inside TRUE");
            list--;
        }
    } // end of 'list' loop
 
    //stats for chosen ninjas
    var ninjasAttack = [20, 20, 20, 20];
    var ninjasCounter = [25, 25, 25, 25];
    var ninjasLife = [120, 110, 150, 180];

    // get fighters
    for (count = 0; count < 4; count++) {
        var spanId = ("#fightClub" + (count + 1));
        var fighterName = (ninjasName[count]);
        var fighterLife = (ninjasLife[count]);
        var fighterAttack = (ninjasAttack[count]);
        var fighterCounter = (ninjasCounter[count]);

        $(spanId).addClass("myImgSpan");
        $(spanId).html("<div id='fightClub" + (count + 1) + "Name'>" + fighterName + "</div>");
        $(spanId).append("<img class= 'myFaceImg' src=" + ninjasFace[count] + "  />");
        $(spanId).append("<div id='fightClub" + (count + 1) + "Life'>" + fighterLife + "</div>");


        // using 'extras' to add info to fighter and 'hide' these elements
        $(spanId).append("<div id='extras" + fighterName + "' class='extras'</div>");
        var extrasId = ("#extras" + fighterName);
        $(extrasId).append("<div id='fightClub" + (count + 1) + "Attack'>" + fighterAttack + "</div>");
        $(extrasId).append("<div id='fightClub" + (count + 1) + "Counter'>" + fighterCounter + "</div>");

        $(spanId).on("click", function() {

            //if 'Your character' slot is empty then move fighter there
            if ($('#hero').is(':parent')) {
                // do nothing
            } else {
                // create hero on 'Your character' slot ...this one has no click event
                var incomingFighter = "#" + this.id;
                // remove click event...may be unecessary.. just wanted to try it
                $(incomingFighter).off("click");
                $(incomingFighter).appendTo("#hero");
            }

            // append remaining fighters to villians 
            for (loop = 0; loop < 3; loop++) {
                var tempName = $("#fighters").children()[0];
                var fighterId = "#" + tempName.id;
                // remove click event...may be unecessary 
                $(fighterId).off("click");
                $(fighterId).appendTo("#villians");
            }

            // hide upper panels.. just because 
            $("#available").hide();

            //add new click event to villians
            for (badLoop = 0; badLoop < 3; badLoop++) {
                var villianName = $("#villians").children()[badLoop];
                var villianId = "#" + villianName.id;
                $(villianId).on("click", function() {
                    //if defender slot is empty then move villian there

                    if ($('#defender').is(':parent')) {
                        // do nothing
                    } else {
                        var badBoy = "#" + this.id;
                        $(badBoy).appendTo("#defender");
                    }
                });
            }
        });
    } // end of get fighters 'for' loop

    // add click event to attack button
    $("#attackBtn").on("click", function() {

        // if hero or defender missing then 'attack' button will do nothing
        if (($('#defender').is(':parent')) && ($('#hero').is(':parent'))) {

            // get hero stats
            var currentHero = $("#hero span:first-child");
            var currentHeroId = currentHero.attr('id');

            var heroName = ("#" + currentHeroId + "Name");
            var heroLife = ("#" + currentHeroId + "Life");
            var heroAttack = ("#" + currentHeroId + "Attack");
            var heroCounter = ("#" + currentHeroId + "Counter");

            // get defender stats
            var currentDefender = $("#defender span:first-child");
            var currentDefenderId = currentDefender.attr('id');

            var defenderName = ("#" + currentDefenderId + "Name");
            var defenderLife = ("#" + currentDefenderId + "Life");
            var defenderAttack = ("#" + currentDefenderId + "Attack");
            var defenderCounter = ("#" + currentDefenderId + "Counter");

            var heroHealth = Number($(heroLife).text());
            var defenderHealth = Number($(defenderLife).text());
            var heroHit = Number($(heroAttack).text()) * heroHitMultiplier;
            var defenderHit = Number($(defenderCounter).text());

            // attack action hero hits first

            var defenderHealth = defenderHealth - heroHit;
            heroHitMultiplier++;
            $(defenderLife).html(defenderHealth);
            var attackString = ($(heroName).text() + " attacked " + $(defenderName).text() + " for " + heroHit + " damage!");

            $("#attackMessage").html(attackString);

            if (defenderHealth > 0) {
                // attack action defender counter hit
                var heroHealth = heroHealth - defenderHit;
                $(heroLife).html(heroHealth);
                var counterString = ($(defenderName).text() + " counter-attacked for " + defenderHit + " damage !!");

                $("#counterMessage").html(counterString);
                // check if the hero is dead
                if (heroHealth <= 0) {
                    //remove the hero
                    $("#hero").empty();
                    var youLoserString = "YOU LOSE !!!!";
                    var loserString = ($(defenderName).text() + " is the Champion !!");
                    $("#attackMessage").html(youLoserString);
                    $("#counterMessage").html(loserString);
                    winner = true;
                }

            } else {
                if ($('#villians').is(':parent')) {
                    var defenderDefeatString = ($(defenderName).text() + " has been defeated !!!!!!!!");
                    $("#attackMessage").html(defenderDefeatString);
                } else {
                    var winnerString = ($(heroName).text() + " is the Champion !!");
                    $("#attackMessage").html(winnerString);
                    winner = true;
                }
                $("#counterMessage").empty();
                // clear the 'defender' element
                $("#defender").empty();
            }
        } // end of 'if' check for empty hero or defender 
    }); // end of 'attack' button click event



} // end of function 'ninjaBattle'


// add click event to 'reset' button
$("#restartBtn").on("click", function() {
    //if someone has won the battle then restart is available
    if (winner) {
        // reset E-VER-Y-THANG !!!!...i decided to just reload the entire page!!!
        location.reload();
    }
}); // end of 'restartBtn' click event
