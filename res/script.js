Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

let rohstoffe = [];
rohstoffe['holz'] = 0;
rohstoffe['lehm'] = 0;
rohstoffe['getreide'] = 0;
rohstoffe['erz'] = 0;
rohstoffe['schaf'] = 0;

let entwicklungen = [];
entwicklungen['ritter'] = 0;
entwicklungen['siegpunkt'] = 0;
entwicklungen['monopol'] = 0;
entwicklungen['straßenbau'] = 0;
entwicklungen['erfindung'] = 0;

let figuren = [];
figuren['straße'] = 13;
figuren['siedlung'] = 3;
figuren['stadt'] = 4;

let karten = [];

let ritter = 0;

let siegpunkte = 2;

function addRohstoff(rohstoff){
    rohstoffe[rohstoff] ++;
    $('#'+rohstoff+' .circle--num').html(rohstoffe[rohstoff]);

    karten.push(rohstoff);
}

function removeRohstoff(rohstoff){
    if(rohstoffe[rohstoff] > 0){
        rohstoffe[rohstoff] --;
        $('#'+rohstoff+' .circle--num').html(rohstoffe[rohstoff])

        let index = karten.indexOf(rohstoff);
        karten.splice(index, 1);
    }
}

function randomEntwicklung() {
    let entwicklung = entwicklungskarten.random();

    let index = entwicklungskarten.indexOf(entwicklung);
    entwicklungskarten.splice(index, 1);

    addEntwicklung(entwicklung);

    if(entwicklung == 'siegpunkt') {
        addSiegpunkt();
    }
}

function pullEntwicklung() {
    buttonPressedFeedback('pullentwicklung');

    randomEntwicklung();
}

function buyEntwicklung() {
    let missing = false;

    if(rohstoffe['erz'] < 1){ missing = true; }
    if(rohstoffe['getreide'] < 1){ missing = true; }
    if(rohstoffe['schaf'] < 1){ missing = true; }

    if(missing) {
        alert('Dir fehlen Rohstoffe!');
    }else{
        buttonPressedFeedback('buyentwicklung');

        removeRohstoff('erz');
        removeRohstoff('getreide');
        removeRohstoff('schaf');

        randomEntwicklung();
    }
}

function addEntwicklung(entwicklung) {
    entwicklungen[entwicklung] ++;
    $('#'+entwicklung+' .circle--num').html(entwicklungen[entwicklung]);
}

function removeEntwicklung(entwicklung) {
    if(entwicklungen[entwicklung] > 0){
        entwicklungen[entwicklung] --;
        $('#'+entwicklung+' .circle--num').html(entwicklungen[entwicklung]);
        if(entwicklung == 'ritter'){
            ritter ++;
            $('#'+entwicklung+' .circle--played').html(ritter);
            if(ritter >= 3){
                alert('Hat kein anderer Spieler bereits '+ritter+' oder mehr Ritter ausgespielt, so erhälst du die Rittermacht. \n\n2 Siegpunkte!');
            }
        }
    }
}

function rauber() {
    buttonPressedFeedback('rauber');

    let karte = karten.random();
    
    let name = karte.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    alert(name + '\n\n(Wird automatisch abgezogen)');

    removeRohstoff(karte);
}

function adjustEntwicklungen(entwicklung) {
    let id = 'adjust' + entwicklung;
    buttonPressedFeedback(id);

    let index = entwicklungskarten.indexOf(entwicklung);
    entwicklungskarten.splice(index, 1);
}

function rollDice(){
    buttonPressedFeedback('rolldice');

    let val1 = Math.floor(Math.random() * 6);
    let val2 = Math.floor(Math.random() * 6);

    $('#dice1').html("&#x268" + val1 + "; ");
    $('#dice2').html("&#x268" + val2 + "; ");
}

function buttonPressedFeedback(id){
    $('#'+id).addClass('button--feedback');
    setTimeout(function(){
        $('#'+id).removeClass('button--feedback');
    }, 1500)
}

function buyStraße() {
    if(figuren['straße'] >= 1){
        let missing = false;
    
        if(rohstoffe['holz'] < 1){ missing = true; }
        if(rohstoffe['lehm'] < 1){ missing = true; }
    
        if(missing) {
            alert('Dir fehlen Rohstoffe!');
        }else{
            buttonPressedFeedback('buyStraße');

            removeRohstoff('holz');
            removeRohstoff('lehm');

            removeFigur('straße');
        }
    }
}

function buySiedlung() {
    if(figuren['siedlung'] >= 1){
        let missing = false;
    
        if(rohstoffe['holz'] < 1){ missing = true; }
        if(rohstoffe['lehm'] < 1){ missing = true; }
        if(rohstoffe['getreide'] < 1){ missing = true; }
        if(rohstoffe['schaf'] < 1){ missing = true; }
    
        if(missing) {
            alert('Dir fehlen Rohstoffe!');
        }else{
            buttonPressedFeedback('buySiedlung');

            removeRohstoff('holz');
            removeRohstoff('lehm');
            removeRohstoff('getreide');
            removeRohstoff('schaf');

            removeFigur('siedlung');

            addSiegpunkt();
        }
    }
}

function buyStadt() {
    if(figuren['stadt'] >= 1){
        let missing = false;
    
        if(rohstoffe['getreide'] < 2){ missing = true; }
        if(rohstoffe['erz'] < 3){ missing = true; }
    
        if(missing) {
            alert('Dir fehlen Rohstoffe!');
        }else{
            buttonPressedFeedback('buyStadt');

            removeRohstoff('getreide');
            removeRohstoff('getreide');
            removeRohstoff('erz');
            removeRohstoff('erz');
            removeRohstoff('erz');

            removeFigur('stadt');
            addFigur('siedlung');

            addSiegpunkt();
        }
    }
}

function addFigur(figur) {
    figuren[figur] ++;
    $('#'+figur+' .card__num').html(figuren[figur]);
}

function removeFigur(figur) {
    if(figuren[figur] > 0){
        figuren[figur] --;
        $('#'+figur+' .card__num').html(figuren[figur]);
    }
}

function addSiegpunkt() {
    siegpunkte ++;
    $('#siegpunkte').html(siegpunkte);
}