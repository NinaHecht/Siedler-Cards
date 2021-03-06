<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <?php
        $version = '';
        $mode = 'Dark';

        if (isset($_GET['version'])) {
            if($_GET['version'] === 'standard'){
                echo '<title>Siedler von Catan Standard bis 4 Spieler</title>';
                $version = '4 Spieler';
            } else if($_GET['version'] === 'extended'){
                echo '<title>Siedler von Catan Standard 5-6 Spieler</title>';
                $version = '5-6 Spieler';
            }
        }
        ?>

        <link rel="stylesheet" href="../res/styles.css">

        <?php 
        if (isset($_GET['mode'])) {
            if($_GET['mode'] === 'light'){
                echo '<link rel="stylesheet" href="../res/light.css">';
                $mode = 'Light';
            }
        }
        ?>

    </head>
    <body>
        <div class="content">
            <h1>Deine Karten</h1>
            <div class="cards">
                <div id="holz" class="card" style="background-image: url(../res/img/holz-min.jpg);">
                    <div class="desc">Holz</div>
                    <div class="circle circle--num">0</div>
                    <div onClick="addRohstoff('holz')" class="circle circle--add">+</div>
                    <div onClick="removeRohstoff('holz')" class="circle circle--remove">-</div>
                </div>
                <div id="lehm" class="card" style="background-image: url(../res/img/lehm-min.jpg);">
                    <div class="desc">Lehm</div>
                    <div class="circle circle--num">0</div>
                    <div onClick="addRohstoff('lehm')" class="circle circle--add">+</div>
                    <div onClick="removeRohstoff('lehm')" class="circle circle--remove">-</div>
                </div>
                <div id="getreide" class="card" style="background-image: url(../res/img/getreide-min.jpg);">
                    <div class="desc">Getreide</div>
                    <div class="circle circle--num">0</div>
                    <div onClick="addRohstoff('getreide')" class="circle circle--add">+</div>
                    <div onClick="removeRohstoff('getreide')" class="circle circle--remove">-</div>
                </div>
                <div id="erz" class="card" style="background-image: url(../res/img/erz-min.jpg);">
                    <div class="desc">Erz</div>
                    <div class="circle circle--num">0</div>
                    <div onClick="addRohstoff('erz')" class="circle circle--add">+</div>
                    <div onClick="removeRohstoff('erz')" class="circle circle--remove">-</div>
                </div>
                <div id="schaf" class="card" style="background-image: url(../res/img/schaf-min.jpg);">
                    <div class="desc">Schaf</div>
                    <div class="circle circle--num">0</div>
                    <div onClick="addRohstoff('schaf')" class="circle circle--add">+</div>
                    <div onClick="removeRohstoff('schaf')" class="circle circle--remove">-</div>
                </div>
            </div>

            <div class="dices">
                <div id="dice1" class="dice">&#x2685;</div>
                <button id="rolldice" onClick="rollDice()">Würfeln</button>
                <div id="dice2" class="dice">&#x2685;</div>
            </div>

            <div class="cards">
                <div id="straße" class="card card--big">
                    <div class="card__desc">Straße</div>
                    <button id="buyStraße" onClick="buyStraße()" class="button button--full-width">Kaufen</button>
                    <div class="card__image">
                        <div class="circle card__num">13</div>
                        <img src="../res/img/straße-min.png"/>
                    </div>
                    
                    <div class="costs">
                        <img class="cost" src="../res/img/holz-min.png">
                        <img class="cost" src="../res/img/lehm-min.png">
                    </div>
                </div>
                <div id="siedlung" class="card card--big">
                    <div class="card__desc">Siedlung </div>
                    <button id="buySiedlung" onClick="buySiedlung()" class="button button--full-width">Kaufen</button>
                    <div class="card__image">
                        <div class="circle card__num">3</div>
                        <img src="../res/img/siedlung-min.png"/>
                    </div>
                   
                    <div class="costs">
                        <img class="cost" src="../res/img/holz-min.png">
                        <img class="cost" src="../res/img/lehm-min.png">
                        <img class="cost" src="../res/img/getreide-min.png">
                        <img class="cost" src="../res/img/schaf-min.png">
                    </div>
                </div>
                <div id="stadt" class="card card--big">
                    <div class="card__desc">Stadt</div>
                    <button id="buyStadt" onClick="buyStadt()" class="button button--full-width">Kaufen</button>
                    <div class="card__image">
                        <div class="circle card__num">4</div>
                        <img src="../res/img/stadt-min.png"/>
                    </div>
                    
                    <div class="costs">
                        <img class="cost" src="../res/img/stein-min.png">
                        <img class="cost" src="../res/img/stein-min.png">
                        <img class="cost" src="../res/img/stein-min.png"><br>
                        <img class="cost" src="../res/img/schaf-min.png">
                        <img class="cost" src="../res/img/schaf-min.png">
                    </div>
                </div>
            </div>

            <h2>Deine Siegpunkte: <span id="siegpunkte">2</span></h2>

            <h2>Räuber</h2>
            <button id="rauber" onClick="rauber()">Zufällige Rohstoffkarte ziehen</button>

            <h2>Entwicklungskarten</h2>

            <div class="button-group">
                <button id="pullentwicklung" onClick="pullEntwicklung()">Entwicklungskarte ziehen</button>
                <button id="buyentwicklung" onClick="buyEntwicklung()">Entwicklungskarte kaufen &nbsp;
                    <img class="button__cost" src="../res/img/getreide-min.png">
                    <img class="button__cost" src="../res/img/schaf-min.png">
                    <img class="button__cost" src="../res/img/stein-min.png">
                </button>
            </div>

            <div class="cards">
                <div id="ritter" class="card" style="background-image: url(../res/img/ritter-min.jpg);">
                    <div class="circle circle--num">0</div>
                    <div class="circle circle--small circle--played">0</div>
                    <div onClick="removeEntwicklung('ritter')" class="circle circle--remove">-</div>
                </div>
                <div id="siegpunkt" class="card" style="background-image: url(../res/img/siegpunkt-min.jpg);">
                    <div class="circle circle--num">0</div>
                    <div onClick="removeEntwicklung('siegpunkt')" class="circle circle--remove">-</div>
                </div>
                <div id="monopol" class="card" style="background-image: url(../res/img/monopol-min.jpg);">
                    <div class="circle circle--num">0</div>
                    <div onClick="removeEntwicklung('monopol')()" class="circle circle--remove">-</div>
                </div>
                <div id="straßenbau" class="card" style="background-image: url(../res/img/strasenbau-min.jpg);">
                    <div class="circle circle--num">0</div>
                    <div onClick="removeEntwicklung('straßenbau')" class="circle circle--remove">-</div>
                </div>
                <div id="erfindung" class="card" style="background-image: url(../res/img/erfindung-min.jpg);">
                    <div class="circle circle--num">0</div>
                    <div onClick="removeEntwicklung('erfindung')" class="circle circle--remove">-</div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="adjustritter" onClick="adjustEntwicklungen('ritter')">Ritter entfernen</button>
                <button id="adjustsiegpunkt" onClick="adjustEntwicklungen('siegpunkt')">Siegpunkt entfernen</button>
                <button id="adjustmonopol" onClick="adjustEntwicklungen('monopol')">Monopol entfernen</button>
                <button id="adjuststraßenbau" onClick="adjustEntwicklungen('straßenbau')">Straßenbau entfernen</button>
                <button id="adjusterfindung" onClick="adjustEntwicklungen('erfindung')">Erfindung entfernen</button>
            </div>

        </div>
        <footer>
            <span><?php echo '(Standard > ' . $version . ' > ' . $mode . ' Mode)' ?></span>
        </footer>
    </body>


    <script>
        <?php 
        if (isset($_GET['version'])) {
            if($_GET['version'] === 'standard'){
                echo 'var entwicklungskarten = ["ritter", "siegpunkt", "erfindung", "siegpunkt", "ritter", "ritter", "siegpunkt", "ritter", "ritter", "siegpunkt", "erfindung", "ritter", "straßenbau", "ritter", "ritter", "ritter", "straßenbau", "monopol", "ritter", "monopol", "ritter", "ritter", "ritter", "ritter", "siegpunkt"];';
            } else if($_GET['version'] === 'extended'){
                echo 'let entwicklungskarten = ["ritter", "siegpunkt", "erfindung", "ritter", "ritter", "erfindung", "siegpunkt", "ritter", "monopol", "ritter", "ritter", "siegpunkt", "ritter", "ritter", "straßenbau", "ritter", "ritter", "siegpunkt", "erfindung", "ritter", "straßenbau", "ritter", "ritter", "ritter", "straßenbau", "ritter", "monopol", "ritter", "monopol", "ritter", "ritter", "ritter", "ritter", "siegpunkt"];';
            }
        }
        ?>
    </script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="../res/script.js"></script>
    
</html>