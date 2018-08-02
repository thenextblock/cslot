var Game = {};
Game.States = {};

Game.States.Boot = {
    preload: function() {
        console.log('Preloading Booting Stage!');
        this.load.image('preloaderBar', 'assets/images/loading_bar.png');
    },
    create: function() {
        console.log('Completed Booting Stage! Switching To Preloader!');
        this.state.start('Preloader');
    }
};

Game.States.Preloader = {
    loadingTextStyle: { font: '65px Arial', fill: '#22A7F0', align: 'center' },
    PRELOADBAR_WIDTH: 600,
    addLoadingText: function() {
        this.loadingTextObject = this.add.text(this.world.centerX, this.world.centerY-60, '-', this.loadingTextStyle);
        this.loadingTextObject.anchor.set(0.5);
        this.load.onFileComplete.add((function(){
            this.loadingTextObject.text = this.load.progress + '%';
        }).bind(this), this);
    },
    addLoadingBar: function() {
        this.loadingBarObject = this.add.sprite((this.game.width - this.PRELOADBAR_WIDTH) / 2, this.world.centerY, 'preloaderBar');
        this.loadingBarObject.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.loadingBarObject);
    },
    create: function() {
        console.log('Completed Preloading Stage!');
        this.state.start('Game');
    },
    preload: function() {
        console.log('Preloading Stage!');
        this.addLoadingText();
        this.addLoadingBar();
        /*this.load.audio('spin-button-audio', 'assets/audio/spin-button.ogg');
        this.load.audio('stop-button-audio', 'assets/audio/stop-button.ogg');
        this.load.audio('game-theme-audio', 'assets/audio/theme-tune.ogg');*/
        this.load.image('bell', 'assets/images/bell.png');
        this.load.image('cherry', 'assets/images/cherry.png');
        this.load.image('orange', 'assets/images/orange.png');
        this.load.image('plum', 'assets/images/plum.png');
        this.load.image('seven', 'assets/images/seven.png');
        this.load.spritesheet('button', 'assets/images/button.png', 193, 71);
        this.load.image('background', 'assets/images/background.png');
    }
};

var Cell = function() {
    this.gameObject = null;
    this.tween = null;
};

var Column = function(game, layer, cellCount, columnX, columnY, columnWidth, columnHeight, cellWidth, cellHeight, sprites) {
    this.speed = 1000;
    this.cells = new Array(cellCount);
    for(var i = 0; i < cellCount; i++) {
        var cell = new Cell();
        cell.gameObject = game.add.sprite(columnX + (columnWidth - cellWidth)/2, (columnY - cellHeight), sprites[i]);
        layer.add(cell.gameObject);
        this.cells[i] = cell;
        cell.tween = game.add.tween(cell.gameObject);
        cell.tween.to({ y: columnY + columnHeight + cellHeight }, this.speed,  Phaser.Easing.Linear.None, false, 0, -1).to({ y: (columnY - cellHeight) }, -1,  Phaser.Easing.Linear.None, false, 0, -1);
        cell.tween.yoyo(false, -1);
    }
    var that = this;
    this.startSpin = function() {
        that.cells.forEach(function (cell, index) {
            if(cell.tween.isPaused)
                cell.tween.resume();
            else{
                if(index < cellCount - 1)
                    cell.tween.onStart.add(function() { 
                        setTimeout(function() { 
                            that.cells[index+1].tween.start();
                        }, (that.speed * cellHeight + 10) / ((columnY + columnHeight + cellHeight) - (columnY - cellHeight))); 
                    });
                if(index == 0)
                    cell.tween.start();
            }
        });
    };
    
    this.stopSpin = function() {
        that.cells.forEach(function (cell) {
            if(cell.tween.isRunning)
                cell.tween.pause();
        })
    };
};

Game.States.Game = {
    loadingTextStyle: { font: '30px Arial', fill: '#ffffff', align: 'center' },
    spining: false,
    cells: ['bell', 'cherry', 'orange', 'plum', 'seven'],
    create: function() {
        this.firstLayer = this.add.group();
        this.firstColumn = new Column(this, this.firstLayer, this.cells.length, 125, 20, 150, 400, 100, 100, this.cells);
        this.secondColumn = new Column(this, this.firstLayer, this.cells.length, 325, 20, 150, 400, 100, 100, this.cells);
        this.thirdColumn = new Column(this, this.firstLayer, this.cells.length, 525, 20, 150, 400, 100, 100, this.cells);
        
        this.secondLayer = this.add.group();
        this.thirdLayer = this.add.group();
        this.backgroundObject = this.thirdLayer.create(0, 0, 'background');
        this.handleSpinButtonClick();
        this.spinButton = this.make.button(this.world.centerX - 95, this.world.centerY + 200, 'button', this.handleSpinButtonClick, this, 2, 1, 0);
        this.thirdLayer.add(this.spinButton);
        
    },
    handleSpinButtonClick: function() {
        console.log("spining start");
        if(this.spining){
            this.firstColumn.stopSpin();
            this.secondColumn.stopSpin();
            this.thirdColumn.stopSpin();
            this.spining = false;
        }else{
            this.firstColumn.startSpin();
            this.secondColumn.startSpin();
            this.thirdColumn.startSpin();
            this.spining = true;
        }
    }
};

var app = {
    phaser: null,
    initialize: function() {
        this.phaser = new Phaser.Game(800, 600, Phaser.AUTO, '');
        this.phaser.state.add('Boot', Game.States.Boot);
        this.phaser.state.add('Preloader', Game.States.Preloader);
        this.phaser.state.add('Game', Game.States.Game);
        this.bindEvents();
    },
    bindEvents: function() {
        $(document).ready(this.onDeviceReady(this.phaser));
    },
    onDeviceReady: function(phaser) {
        return function() {
            phaser.state.start('Boot');
        };
    }
};

app.initialize();
