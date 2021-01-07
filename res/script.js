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

$(document).ready(function(){
    rohstoffSetup('holz');
    rohstoffSetup('lehm');
    rohstoffSetup('getreide');
    rohstoffSetup('erz');
    rohstoffSetup('schaf');

    entwicklungenSetup('ritter');
    entwicklungenSetup('siegpunkt');
    entwicklungenSetup('monopol');
    entwicklungenSetup('straßenbau');
    entwicklungenSetup('erfindung');

    figurenSetup('straße');
    figurenSetup('siedlung');
    figurenSetup('stadt');

    if(Cookies.get('ritterplayed')) { 
        ritter = Cookies.get('ritterplayed')
        $('#ritter .circle--played').html(ritter);
    }

    if(Cookies.get('siegpunkte')) { 
        siegpunkte = Cookies.get('siegpunkte')
        $('#siegpunkte').html(siegpunkte);
    }

    if(Cookies.get('entwicklungen')) {
        entwicklungskarten = Cookies.get('entwicklungen').split(',');
        console.log(entwicklungskarten);
    }
})

function figurenSetup(figur) {
    if(Cookies.get(figur)) { 
        figuren[figur] = Cookies.get(figur); 
        $('#'+figur+' .card__num').html(figuren[figur]);
    }
}

function entwicklungenSetup(entwicklung) {
    if(Cookies.get(entwicklung)) { 
        entwicklungen[entwicklung] = Cookies.get(entwicklung); 
        $('#'+entwicklung+' .circle--num').html(entwicklungen[entwicklung]);
    }
}

function rohstoffSetup(rohstoff) {
    if(Cookies.get(rohstoff)) { 
        rohstoffe[rohstoff] = Cookies.get(rohstoff); 
        $('#'+rohstoff+' .circle--num').html(rohstoffe[rohstoff]);

        for(let i = 0; i < rohstoffe[rohstoff]; i++) {
            karten.push(rohstoff);
        }
    }
}

function addRohstoff(rohstoff){
    rohstoffe[rohstoff] ++;
    $('#'+rohstoff+' .circle--num').html(rohstoffe[rohstoff]);

    karten.push(rohstoff);

    Cookies.set(rohstoff, rohstoffe[rohstoff], { expires: 1 });
}

function removeRohstoff(rohstoff){
    if(rohstoffe[rohstoff] > 0){
        rohstoffe[rohstoff] --;
        $('#'+rohstoff+' .circle--num').html(rohstoffe[rohstoff])

        let index = karten.indexOf(rohstoff);
        karten.splice(index, 1);

        Cookies.set(rohstoff, rohstoffe[rohstoff], { expires: 1 });
    }
}

function randomEntwicklung() {
    let entwicklung = entwicklungskarten.random();

    let index = entwicklungskarten.indexOf(entwicklung);
    entwicklungskarten.splice(index, 1);

    Cookies.set('entwicklungen', entwicklungskarten, { expires: 1 });

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

    Cookies.set(entwicklung, entwicklungen[entwicklung], { expires: 1 });
}

function removeEntwicklung(entwicklung) {
    if(entwicklungen[entwicklung] > 0){
        entwicklungen[entwicklung] --;
        $('#'+entwicklung+' .circle--num').html(entwicklungen[entwicklung]);

        Cookies.set(entwicklung, entwicklungen[entwicklung], { expires: 1 });

        if(entwicklung == 'ritter'){
            ritter ++;
            $('#'+entwicklung+' .circle--played').html(ritter);
            if(ritter >= 3){
                alert('Hat kein anderer Spieler bereits '+ritter+' oder mehr Ritter ausgespielt, so erhälst du die Rittermacht. \n\n2 Siegpunkte!');
            }

            Cookies.set('ritterplayed', ritter, { expires: 1 });
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

    Cookies.set('entwicklungen', entwicklungskarten, { expires: 1 });
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

    Cookies.set(figur, figuren[figur], { expires: 1 });
}

function removeFigur(figur) {
    if(figuren[figur] > 0){
        figuren[figur] --;
        $('#'+figur+' .card__num').html(figuren[figur]);

        Cookies.set(figur, figuren[figur], { expires: 1 });
    }
}

function addSiegpunkt() {
    siegpunkte ++;
    $('#siegpunkte').html(siegpunkte);

    Cookies.set('siegpunkte', siegpunkte, { expires: 1 });
}

function resetCookies() {
    Cookies.remove('holz');
    Cookies.remove('lehm');
    Cookies.remove('getreide');
    Cookies.remove('holz');
    Cookies.remove('erz');

    Cookies.remove('ritter');
    Cookies.remove('siegpunkt');
    Cookies.remove('monopol');
    Cookies.remove('straßenbau');
    Cookies.remove('erfindung');

    Cookies.remove('straße');
    Cookies.remove('siedlung');
    Cookies.remove('stadt');

    Cookies.remove('ritterplayed');
    Cookies.remove('siegpunkte');
    Cookies.remove('entwicklungen');

    location.reload();
}