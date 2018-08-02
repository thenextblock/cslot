/* global $*/
/* global createjs*/

var Utils = {};
Utils.generateRandomInt = function(min, max){
    return min + Math.floor(Math.random() * (max - min + 1));
};

Utils.round = function(num) {
  return parseFloat(num.toFixed(2));
};

var Bootloader = function(game) {
    var _this = this;
    _this.game = game;
    _this.manifest = [{
        id: 'bg_menu',
        src: 'assets/images/bg_menu.jpg'
    }, {
        id: 'progress_bar',
        src: 'assets/images/progress_bar.png'
    }];
    
    _this.onFileLoadingError = function(event) {
        console.log('Error: ', '[' + event.data.id + ' : ' + event.data.src + ']');
        alert('Error: ', '[' + event.data.id + ' : ' + event.data.src + ']');
    };
    
    _this.onFilesLoaded = function() {
        console.log("Completed Booting Files!");
        _this.game.moveToPreloadStage();
    };
    
    _this.onLoaderProgress = function(event) {
        var progress = Math.round(event.loaded * 100);
        console.log('Progress: ', progress);
    };
    
    _this.init = function() {
        console.log('Entering Booting Stage!');
        _this.bootloader = new createjs.LoadQueue(false);
        _this.bootloader.on('complete', _this.onFilesLoaded);
        _this.bootloader.on('progress', _this.onLoaderProgress);
        _this.bootloader.on('error', _this.onFileLoadingError);
        _this.bootloader.loadManifest(_this.manifest);
    };
    
    _this.init();
};

var Preloader = function(game, bootloader) {
    var _this = this;
    _this.game = game;
    _this.bootloader = bootloader;
    
    _this.manifest = [{
        id: 'audio_icon',
        src: 'assets/images/audio_icon.png'
    }, {
        id: 'bet_but',
        src: 'assets/images/bet_but.png'
    }, {
        id: 'bg_game',
        src: 'assets/images/bg_game.jpg'
    }, {
        id: 'but_coin_bg',
        src: 'assets/images/but_coin_bg.png'
    }, {
        id: 'but_credits',
        src: 'assets/images/but_credits.png'
    }, {
        id: 'but_exit',
        src: 'assets/images/but_exit.png'
    }, {
        id: 'but_fullscreen',
        src: 'assets/images/but_fullscreen.png'
    }, {
        id: 'but_info_bg',
        src: 'assets/images/but_info_bg.png'
    }, {
        id: 'but_lines_bg',
        src: 'assets/images/but_lines_bg.png'
    }, {
        id: 'but_maxbet_bg',
        src: 'assets/images/but_maxbet_bg.png'
    }, {
        id: 'but_play_bg',
        src: 'assets/images/but_play_bg.png'
    }, {
        id: 'but_spin_bg',
        src: 'assets/images/but_spin_bg.png'
    }, {
        id: 'mask_slot',
        src: 'assets/images/mask_slot.png'
    }, {
        id: 'msg_box',
        src: 'assets/images/msg_box.png'
    }, {
        id: 'paytable',
        src: 'assets/images/paytable.jpg'
    }, {
        id: 'win_frame_anim',
        src: 'assets/images/win_frame_anim.png'
    }, {
        id: 'press_but',
        src: 'assets/audio/press_but.mp3'
    }, {
        id: 'reel_stop',
        src: 'assets/audio/reel_stop.mp3'
    }, {
        id: 'reels',
        src: 'assets/audio/reels.mp3'
    }, {
        id: 'start_reel',
        src: 'assets/audio/start_reel.mp3'
    }, {
        id: 'win',
        src: 'assets/audio/win.mp3'
    }];
    
    _this.addFilesToManifest = function() {
        for(var i = 1; i <= 20; i++) {
            _this.manifest.push({
                id: 'payline_' + i,
                src: 'assets/images/payline_' + i + '.png'
            });
        }
        for(var i = 1; i <= 8; i++) {
            _this.manifest.push({
                id: 'symbol_' + i,
                src: 'assets/images/symbol_' + i + '.png'
            }, {
                id: 'symbol_' + i + '_anim',
                src: 'assets/images/symbol_' + i + '_anim.png'
            });
        }
    };
    
    _this.init = function() {
        console.log("Starting Preloading Stage!");
        _this.addFilesToManifest();
        _this.preloadStageContainer = new createjs.Container();
        _this.game.getStage().addChild(_this.preloadStageContainer);
        _this.drawBackground();
        _this.drawProgressBar();
        _this.preloader = new createjs.LoadQueue(false);
        _this.preloader.installPlugin(createjs.Sound);
        _this.preloader.on('complete', _this.onFilesLoaded);
        _this.preloader.on('progress', _this.onLoaderProgress);
        _this.preloader.on('error', _this.onError);
        _this.preloader.loadManifest(_this.manifest);
    };
    
    _this.drawBackground = function() {
        var backgroundImage = _this.bootloader.getResult("bg_menu");
	    _this.background = new createjs.Shape();
	    _this.background.graphics.beginBitmapFill(backgroundImage)
	         .drawRect(0, 0, backgroundImage.width, backgroundImage.height);
	    _this.preloadStageContainer.addChild(_this.background);
    };
    
    _this.drawProgressBar = function() {
        _this.progressBarContainer = new createjs.Container();
        _this.progressBarText = new createjs.Text('0%', '20px Arial', '#ffffff');
        _this.progressBarImage = _this.bootloader.getResult("progress_bar");
	    _this.progressBar = new createjs.Shape();
	    _this.progressBar.graphics.beginBitmapFill(_this.progressBarImage)
	         .drawRect(0, 0, 0, _this.progressBarImage.height);
	    _this.progressBarContainer.x = _this.game.getStage().canvas.width/2 - _this.progressBarImage.width/2;
	    _this.progressBarContainer.y = (_this.game.getStage().canvas.height/10) * 7;
	    _this.progressBarText.x = _this.progressBarImage.width/2 - 13;
        _this.progressBarText.y = -10;
	    _this.progressBarContainer.addChild(_this.progressBarText, _this.progressBar);
	    _this.preloadStageContainer.addChild(_this.progressBarContainer);
    };
    
    _this.redrawPrograssBar = function(percent) {
         _this.progressBar.graphics.beginBitmapFill(_this.progressBarImage)
	         .drawRect(0, 0, Math.floor((_this.progressBarImage.width/100)*percent), _this.progressBarImage.height);
	     _this.progressBarText.text = percent+'%';
    };
    
    _this.drawPlayButton = function() {
        _this.playButtonContainer = new createjs.Container();
        _this.playButtonText = new createjs.Text('Play!', '40px Arial', '#ffffff');
        _this.playButtonImage = _this.preloader.getResult("but_play_bg");
	    _this.playButton = new createjs.Shape();
	    _this.playButton.graphics.beginBitmapFill(_this.playButtonImage)
	         .drawRect(0, 0, _this.playButtonImage.width, _this.playButtonImage.height);
	    _this.playButtonListener = _this.playButtonContainer.on('mousedown', _this.onPlayButtonMouseDown, null);      
	    _this.playButtonListener = _this.playButtonContainer.on('pressup', _this.onPlayButtonMouseUp, null);      
	    _this.playButtonContainer.x = _this.game.getStage().canvas.width/2 - _this.playButtonImage.width/2;
        _this.playButtonContainer.y = (_this.game.getStage().canvas.height/3) * 2;
        _this.playButtonText.x = _this.playButtonImage.width/2 - 40;
        _this.playButtonText.y = 25;
        _this.playButtonContainer.cursor = 'pointer';
        _this.playButtonContainer.addChild(_this.playButton);
        _this.playButtonContainer.addChild(_this.playButtonText);
        _this.game.getStage().enableMouseOver();
        _this.preloadStageContainer.addChild(_this.playButtonContainer);
    };
    
    _this.onPlayButtonMouseDown = function() {
        _this.playButtonContainer.scaleX = 0.9;
        _this.playButtonContainer.scaleY = 0.9;
         _this.playButtonContainer.x = _this.game.getStage().canvas.width/2 - (_this.playButtonImage.width*0.9)/2;
    };
    
    _this.onPlayButtonMouseUp = function() {
        _this.playButtonContainer.scaleX = 1;
        _this.playButtonContainer.scaleY = 1;
        _this.playButtonContainer.x = _this.game.getStage().canvas.width/2 - _this.playButtonImage.width/2;
        createjs.Sound.play('press_but');
        _this.hide();
        _this.game.moveToGameStage();
    };
    
    _this.show = function() {
        _this.preloadStageContainer.visible = true;
    };
    
    _this.hide = function() {
        _this.preloadStageContainer.visible = false;
    };
    
    _this.onError = function(event) {
        console.log('Error: ', '[' + event.data.id + ' : ' + event.data.src + ']');
        alert('Error: ', '[' + event.data.id + ' : ' + event.data.src + ']');
    };
    
    _this.onFilesLoaded = function() {
        console.log("Completed Booting Files!");
        setTimeout(function(){
            _this.drawPlayButton();
            _this.progressBarContainer.visible = false;
        }, 500);
    };
    
    _this.onLoaderProgress = function(event) {
        var progress = Math.round(event.loaded * 100);
        console.log('Progress: ', progress);
        _this.redrawPrograssBar(progress);
    };
    
    _this.init();
};

var WinManager = function() {
    var _this = this;
        _this.paylinePatterns = [
            [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],//1t
            [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],//2t
            [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],//3t
            [[0, 0], [1, 1], [2, 2], [1, 3], [0, 4]],//4t
            [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]],//5t
            [[1, 0], [0, 1], [0, 2], [0, 3], [1, 4]],//6t
            [[1, 0], [2, 1], [2, 2], [2, 3], [1, 4]],//7t
            [[0, 0], [0, 1], [1, 2], [2, 3], [2, 4]],//8t
            [[2, 0], [2, 1], [1, 2], [0, 3], [0, 4]],//9t
            [[1, 0], [2, 1], [1, 2], [0, 3], [1, 4]],//10t
            [[2, 0], [0, 1], [1, 2], [2, 3], [1, 4]],//11t
            [[0, 0], [1, 1], [1, 2], [1, 3], [0, 4]],//12t
            [[2, 0], [1, 1], [1, 2], [1, 3], [2, 4]],//13t
            [[0, 0], [1, 1], [0, 2], [1, 3], [0, 4]],//14t
            [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]],//15t
            [[1, 0], [1, 1], [0, 2], [1, 3], [1, 4]],//16t
            [[1, 0], [1, 1], [2, 2], [1, 3], [1, 4]],//17t
            [[0, 0], [0, 1], [2, 2], [0, 3], [0, 4]],//18t
            [[2, 0], [2, 1], [0, 2], [2, 3], [2, 4]],//19t
            [[0, 0], [2, 1], [2, 2], [2, 3], [0, 4]]//20t
        ];
        _this.symbolPayments = [
            {5: 200, 4: 150, 3: 100}, //cherry
            {5: 150, 4: 100, 3: 50}, //msxali
            {5: 100, 4: 50, 3: 25, 2: 10}, //watermelone
            {5: 100, 4: 50, 3: 25, 2: 10}, //peach
            {5: 50, 4: 25, 3: 15, 2: 5}, //k
            {5: 35, 4: 20, 3: 10, 2: 2}, //q
            {5: 15, 4: 10, 3: 5, 2: 1}, //j
        ];
    
    _this.getRepsForSym = function(sym) {
        return Object.keys(_this.symbolPayments[sym]).reduce(function(acc, el) { acc.push(parseInt(el)); return acc; }, []);
    };
    
    _this.getPaymentsForSym = function(sym) {
        return _this.symbolPayments[sym];
    };
    
    _this.getLineSyms = function(line) {
        var syms = [];
        _this.paylinePatterns[line-1].forEach(function(el, index) {
            syms.push(_this.win[el[0]][el[1]]);
        });
        return syms;
    };

    _this.checkWin = function(lines) {
        var win = [];
        for(var i = 1; i <= lines; i++) {
            var lineSymbols = _this.getLineSyms(i);
            console.log("line " + i +" symbols", lineSymbols);
            var winningSymbol = null;
            var count = 0;
            for(var j = 0; j < lineSymbols.length; j++) {
                if(winningSymbol == null) {
                    count++;
                    if(lineSymbols[j] == 7){
                        continue;
                    }else{
                        winningSymbol = lineSymbols[j];
                        continue;
                    }
                } else {
                    if(winningSymbol == lineSymbols[j] || lineSymbols[j] == 7) {
                        count++;
                        continue;
                    } else {
                        var reps = _this.getRepsForSym(winningSymbol);
                        for(var r = reps.length - 1; r >= 0; r--){
                            if(reps[r] <= count) {
                                win.push({
                                   line: i,
                                   symbol: winningSymbol,
                                   reps: count,
                                   win: _this.getPaymentsForSym(winningSymbol)[count],
                                   positions: _this.paylinePatterns[i-1].slice(0, count)
                                });
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        return win;
    };
    
    _this.getColumn = function(matrix, index) {
        var col = [];
        for(var i = 0; i < matrix.length; i++) {
            col.push(matrix[i][index]);
        }
        return col;
    };
    
    _this.generateWin = function(reels, cells) {
        _this.win = [];
        for(var i = 0; i < cells; i++){
            _this.win[i] = [];
            for(var j = 0; j < reels; j++){
                _this.win[i][j] = Utils.generateRandomInt(0, 7);
            }
        }
        return _this.win;
    };
};

var Reel = function(cfg) {
    cfg = cfg || {};
    var _this = this;
    _this.spinSpeed = cfg.spinSpeed;
    _this.stopSpeed = cfg.stopSpeed;
    _this.state = Reel.States.Stoped;
    _this.cellCount = cfg.cellCount;
    _this.columnX = cfg.columnX;
    _this.columnY = cfg.columnY;
    _this.columnWidth = cfg.columnWidth;
    _this.columnHeight = cfg.columnHeight;
    _this.cellWidth = cfg.cellWidth;
    _this.cellHeight = cfg.cellHeight;
    _this.spriteSheets = cfg.spriteSheets;
    _this.frameSpriteSheet = cfg.frameSpriteSheet;
    _this.onSpinEndCb = cfg.onSpinEndCb;
    _this.displayBoom = true;
    _this.container = cfg.container;
    _this.frames = [];
    _this.currentWinCellIndex = 0;
    _this.init = function() {
        console.log('Creating Reel!');
        _this.drawInitialSprites();
        _this.hiddingPoint = _this.generateCellY(_this.columnHeight);
    };
    
    _this.getRandomSpriteSheet = function() {
        return _this.spriteSheets[Utils.generateRandomInt(0,(_this.spriteSheets.length-1))];
    };
    
    _this.addRandomCell = function(x, y) {
        console.log('Adding new sprite:', x, y);
        var sprite = new createjs.Sprite(_this.getRandomSpriteSheet(), _this.state == Reel.States.Spining ? 'spining' : 'iddle');
        sprite.x = x;
        sprite.y = y;
        _this.cells.push(sprite);
        _this.container.addChild(sprite);
    };
    
    _this.addRandomCellOnTop = function(paused) {
        console.log('Adding sprite on Top:');
        _this.addRandomCell(_this.generateCellX(), _this.generateCellY(-_this.cellHeight));
    };
    
    _this.generateCellX = function() {
        return _this.columnX - ((_this.columnWidth - _this.cellWidth)/2);
    };
    
    _this.generateCellY = function(indexInColumn) {
        return _this.columnY + indexInColumn;
    };
    
    _this.drawInitialSprites = function() {
        _this.cells = [];
        for(var i = _this.cellCount; i >= 0; i--){
            _this.addRandomCell(_this.generateCellX(), _this.generateCellY(_this.cellHeight*i));
        }
    };
    
    _this.onSpriteTweenEnd = function(sprite) {
        sprite.y = _this.generateCellY(-_this.cellHeight);
        sprite.spriteSheet = _this.getRandomSpriteSheet();
        sprite.gotoAndPlay('spining');
        _this.cells.shift();
        _this.cells.push(sprite);
    };
    
    _this.updateSpining = function() {
        if(_this.cells[0].y >= _this.generateCellY(_this.columnHeight)){
                _this.onSpriteTweenEnd(_this.cells[0]);
        }
        for(var i = 0; i < _this.cells.length; i++)
            _this.cells[i].y += _this.spinSpeed;
    };
    
    _this.updateDisplayWin = function() {
        if(_this.cells[0].y >= _this.hiddingPoint){
            if(_this.currentWinCellIndex >= _this.cellCount){
                createjs.Sound.play('reel_stop');
                _this.state = Reel.States.Stoped;
                _this.currentWinCellIndex = 0;
                if(_this.onSpinEndCb)
                    _this.onSpinEndCb.call();
                return;
            }
            var sprite = _this.cells[0];
            sprite.y = _this.generateCellY(-_this.cellHeight);
            var indx = _this.currentWinCellIndex++;
            sprite.spriteSheet = _this.spriteSheets[_this.win[indx]];
            sprite.gotoAndPlay('iddle');
            _this.cells.shift();
            _this.cells.push(sprite);
        }
        for(var i = 0; i < _this.cells.length; i++)
            _this.cells[i].y += _this.stopSpeed;
    };
    
    _this.updateStartingSpin = function() {
        if(_this.cells[0].y <= _this.generateCellY(_this.columnHeight) - _this.stopSpeed*4) {
            _this.state = Reel.States.Spining;
        }
        for(var i = 0; i < _this.cells.length; i++)
            _this.cells[i].y -= _this.stopSpeed;
    };
    
    _this.spin = function(startStop) {
        _this.cells.forEach(function(sprite){
            sprite.gotoAndPlay(startStop ? 'spining' : 'iddle');
        });
        _this.state = startStop ? Reel.States.StartingSpin : Reel.States.DisplayingWin;
        _this.removeBooms();
    };
    
    _this.removeBooms = function() {
        _this.frames.forEach(function(sprite) {
            _this.container.removeChild(sprite);
        });
        _this.frames = [];
    };
    
    _this.tick = function(event) {
        switch(_this.state) {
            case Reel.States.Spining:
                _this.updateSpining();
                return;
            case Reel.States.DisplayingWin:
                _this.updateDisplayWin();
                return;
            case Reel.States.StartingSpin:
                _this.updateStartingSpin();
                return;
            case Reel.States.Stoped:
                return;
        }
    };
    
    _this.showWin = function(win) {
        _this.win = win;
        _this.state = Reel.States.DisplayingWin;
    };
    
    _this.boom = function(i = Utils.generateRandomInt(1, 3)) {
        if(!_this.displayBoom)
            return;
        _this.cells[i].gotoAndPlay('boom');
        var frame = new createjs.Sprite(_this.frameSpriteSheet, 'boom');
        frame.x = _this.cells[i].x;
        frame.y = _this.cells[i].y;
        _this.container.addChild(frame);
        _this.frames.push(frame);
    };
    
    _this.init();
};

Reel.States = {
    Stoped: 2,
    Spining: 3,
    DisplayingWin: 4,
    StartingSpin: 5
};

var GameStage = function(game, preloader) {
    var _this = this;
    _this.game = game;
    _this.preloader = preloader;
    _this.reelsCount = 5;
    _this.cellCount = 3;
    _this.reelSpiningInterval = 250;
    _this.reelSpiningTime = 2500;
    _this.lines = 1;
    _this.paylineHideInterval = 2000;
    _this.coins = 0.05;
    _this.bet = 0.05;
    _this.balance = 100;
    _this.init = function() {
        console.log("Starting Game Stage");
        _this.wm = new WinManager();
        _this.gameStageContainer = new createjs.Container();
        _this.game.getStage().addChild(_this.gameStageContainer);
        _this.drawBackground();
        _this.reelContainer = new createjs.Container();
        _this.gameStageContainer.addChild(_this.reelContainer);
        _this.drawMainMask();
        _this.addPayLines();
        _this.addReels();
        _this.addSpinButton();
        _this.addLinesBtn();
        _this.addMaxBetBtn();
        _this.addCoinBtn();
        _this.addBalanceText();
        _this.setBalance(_this.balance);
        _this.gui = new dat.GUI();
        _this.gui.add(_this, 'reelSpiningInterval', 0, 5000);
        _this.gui.add(_this, 'reelSpiningTime', 0, 5000);
        _this.gui.add(_this, 'paylineHideInterval', 0, 10000);
        _this.gui.add(_this, 'lines', 1, 20, 1);
        _this.gui.add(_this, 'setPayline');
        _this.gui.add(_this.reels[0], 'displayBoom');
        _this.gui.add(_this.reels[1], 'displayBoom');
        _this.gui.add(_this.reels[2], 'displayBoom');
        _this.gui.add(_this.reels[3], 'displayBoom');
        _this.gui.add(_this.reels[4], 'displayBoom');
        _this.addPayLineButtons();
    };
    
    _this.addPayLineButtons = function() {
        _this.plineBtns = [];
        _this.plineBtnsContainer = new createjs.Container();
        var spritesheet = _this.getPlineButtonSpriteSheet();
        for(var i = 0; i < 20; i++) {
            _this.plineBtns.push(new createjs.Sprite(spritesheet, 'disabled'));
            _this.plineBtnsContainer.addChild(_this.plineBtns[i]);
            _this.plineBtns[i].cursor = 'pointer';
            _this.plineBtns[i].on('click', _this.setPayline.bind(null, i));
        }
        [4, 2, 20, 16, 10, 1, 11, 17, 3, 5].forEach(function(item, index) {
            _this.plineBtns[item-1].x = 319;
            _this.plineBtns[item-1].y = 84 + index*32 + index*11;
        });
        [14, 12, 9, 18, 6, 7, 19, 8, 13, 15].forEach(function(item, index) {
            _this.plineBtns[item-1].x = 1130;
            _this.plineBtns[item-1].y = 84 + index*32 + index*11;
        });
        _this.gameStageContainer.addChild(_this.plineBtnsContainer);
    };
    
    _this.hidePaylines = function(){
        _this.paylines.forEach(function(pl) {
            pl.visible = false;
        });
        _this.plineBtns.forEach(function(btn) {
           btn.gotoAndPlay('disabled');
        });
    };
    
    _this.showPayLine = function(line) {
        line = line - 1;
        _this.paylines[line].visible = true;
    };
    
    _this.setPayline = function(index) {
        if(index == undefined)
            index = _this.lines-1;
        createjs.Sound.play('press_but');
        _this.setLines(index + 1);
        _this.setCoins(_this.coins);
        for(var i = 0; i <= index; i++){
            _this.plineBtns[i].gotoAndPlay('active');
            _this.paylines[i].visible = true;
        }
        for(i = index + 1; i < 20; i++)
            _this.plineBtns[i].gotoAndPlay('disabled');
        clearTimeout(_this.paylineHideTimeoutId);
        _this.paylineHideTimeoutId = setTimeout(_this.hidePaylines, _this.paylineHideInterval);
    };
    
    _this.setLines = function(lines){
        _this.hidePaylines();
        _this.lines = lines;
        _this.linesText.text = lines;
    };
    
    _this.getPlineButtonSpriteSheet = function() {
        return new createjs.SpriteSheet({
            images: [_this.preloader.getResult('bet_but')],
            frames: { width: 50, height: 32, count: 2 },
            animations: {
                active: 0,
                disabled: 1
            }
        });
    };
    
    _this.getFrameSpriteSheet = function() {
        return new createjs.SpriteSheet({
            images: [_this.preloader.getResult('win_frame_anim')],
            frames: { width: 140, height: 140, count: 20 },
            animations: {
                boom: [0, 19, 'boom', 0.6]
            }
        });
    };
    
    _this.getSymbolsSpriteSheets = function() {
        var spriteSheets = [];
        for(var i = 1; i <= 8; i++) {
            spriteSheets.push(new createjs.SpriteSheet({
                images: [_this.preloader.getResult('symbol_' + i), _this.preloader.getResult('symbol_' + i + '_anim')],
                frames: { width: 140, height: 140, count: 17 },
                animations: {
                    iddle: 0,
                    spining: 1,
                    boom: [2, 16, 'boom', 0.6]
                }
            }));
        }
        return spriteSheets;
    };
    
    _this.addPayLines = function() {
        _this.paylinesContainer = new createjs.Container();
        _this.gameStageContainer.addChild(_this.paylinesContainer);
        _this.paylines = [];
        for(var i = 0; i < 20; i++){
            var paylineImg = _this.preloader.getResult('payline_' + (i+1));
    	    var payline = new createjs.Shape();
    	    payline.graphics.beginBitmapFill(paylineImg)
    	         .drawRect(0, 0, paylineImg.width, paylineImg.height);
    	    _this.paylines.push(payline);
    	    _this.paylines[i].visible = false;
    	    _this.paylinesContainer.addChild(payline);
        }
    };
    
    _this.addSpinButton = function() {
        _this.spinButtonImg = _this.preloader.getResult('but_spin_bg');
        _this.spinButton = new createjs.Shape();
        _this.spinButtonContainer = new createjs.Container();
        _this.spinButtonContainer.x = 1026;
        _this.spinButtonContainer.y = 540;
        _this.spinButtonContainer.cursor = 'pointer';
        _this.spinButtonContainer.on('click', _this.onSpinButtonClicked);
        _this.spinButton.graphics.beginBitmapFill(_this.spinButtonImg).drawRect(0, 0, _this.spinButtonImg.width, _this.spinButtonImg.height);
        _this.spinButtonText = new createjs.Text('Spin', '50px Arial', '#ffffff');
        _this.spinButtonText.x = (_this.spinButtonImg.width - 100)/2;
        _this.spinButtonText.y = 20;
        _this.winText = new createjs.Text('', '25px Arial', '#FFD700');
        _this.winText.x = 31;
        _this.winText.y = -20;
        _this.spinButtonContainer.addChild(_this.spinButton, _this.spinButtonText, _this.winText);
        _this.gameStageContainer.addChild(_this.spinButtonContainer);
        _this.spinButtonContainer.enabled = true;
    };
    
    _this.setWin = function(win) {
        _this.winText.text = 'WIN: '+ Utils.round(win);
    };
    
    _this.setSpinButtonEnabled = function(enabled) {
        _this.spinButtonContainer.enabled = enabled;
    };
    
    _this.onSpinButtonClicked = function() {
        if(!_this.spinButtonContainer.enabled)
            return;
        createjs.Sound.play('press_but');
        if(_this.bet > _this.balance){
            alert("You have not enough money on ballance!");
            return;
        }
        _this.wm.generateWin(_this.reelsCount, _this.cellCount);
        _this.win = _this.wm.checkWin(_this.lines);
        _this.balance = _this.balance - _this.bet;
        _this.setBalance(_this.balance);
        _this.hidePaylines();
        _this.setLinesButtonEnabled(false);
        _this.setSpinButtonEnabled(false);
        _this.setMaxBetButtonEnabled(false);
        _this.setCoinButtonEnabled(false);
        _this.spinReel(0);
    };
    
    _this.addLinesBtn = function() {
        var img = _this.preloader.getResult('but_lines_bg');
        _this.linesButton = new createjs.Shape();
        _this.linesButtonContainer = new createjs.Container();
        _this.linesButtonContainer.x = 435;
        _this.linesButtonContainer.y = 540;
        _this.linesButtonContainer.cursor = 'pointer';
        _this.linesButtonContainer.on('click', _this.onLinesButtonClicked);
        _this.linesButton.graphics.beginBitmapFill(img).drawRect(0, 0, img.width, img.height);
        _this.linesButtonText = new createjs.Text('Lines', '50px Arial', '#ffffff');
        _this.linesButtonText.x = (img.width - 130)/2;
        _this.linesButtonText.y = 20;
        _this.linesText = new createjs.Text(_this.lines, '25px Arial', '#ffffff');
        _this.linesText.x = img.width/2 - 10;
        _this.linesText.y = -20;
        _this.linesButtonContainer.addChild(_this.linesButton, _this.linesButtonText, _this.linesText);
        _this.gameStageContainer.addChild(_this.linesButtonContainer);
        _this.linesButtonContainer.enabled = true;
    };
    
    _this.addBalanceText = function() {
        _this.balanceText = new createjs.Text('Lines', '35px Arial', '#ffffff');
        _this.balanceText.x = 325;
        _this.balanceText.y = 18;
        _this.gameStageContainer.addChild(_this.balanceText);
    };
    
    _this.setBalance = function(ballance) {
        _this.balanceText.text = Utils.round(ballance);
    };
    
    _this.addCoinBtn = function() {
        var img = _this.preloader.getResult('but_coin_bg');
        _this.coinButton = new createjs.Shape();
        _this.coinButtonContainer = new createjs.Container();
        _this.coinButtonContainer.x = 620;
        _this.coinButtonContainer.y = 540;
        _this.coinButtonContainer.cursor = 'pointer';
        _this.coinButtonContainer.on('click', _this.onCoinButtonClicked);
        _this.coinButton.graphics.beginBitmapFill(img).drawRect(0, 0, img.width, img.height);
        _this.coinButtonText = new createjs.Text('Coin', '50px Arial', '#ffffff');
        _this.coinButtonText.x = (img.width - 130)/2;
        _this.coinButtonText.y = 20;
        _this.coinText = new createjs.Text(_this.coins, '25px Arial', '#ffffff');
        _this.coinText.x = 67;
        _this.coinText.y = -20;
        _this.coinButtonContainer.addChild(_this.coinButton, _this.coinButtonText, _this.coinText);
        _this.gameStageContainer.addChild(_this.coinButtonContainer);
        _this.coinButtonContainer.enabled = true;
    };
    
    _this.onCoinButtonClicked = function() {
        if(!_this.coinButtonContainer.enabled)
            return;
        createjs.Sound.play('press_but');
        _this.coins=Utils.round(_this.coins + 0.05);
        if(_this.coins > 0.5)
            _this.coins = 0.05;
        _this.setCoins(_this.coins);
    };
    
    _this.setCoinButtonEnabled = function(enabled) {
        _this.coinButtonContainer.enabled = enabled;
    };
    
    
    _this.addMaxBetBtn = function() {
        var img = _this.preloader.getResult('but_maxbet_bg');
        _this.maxBetButton = new createjs.Shape();
        _this.maxBetButtonContainer = new createjs.Container();
        _this.maxBetButtonContainer.x = 805;
        _this.maxBetButtonContainer.y = 540;
        _this.maxBetButtonContainer.cursor = 'pointer';
        _this.maxBetButtonContainer.on('click', _this.onMaxBetButtonClicked);
        _this.maxBetButton.graphics.beginBitmapFill(img).drawRect(0, 0, img.width, img.height);
        _this.maxBetButtonText = new createjs.Text('MaxBet', '40px Arial', '#ffffff');
        _this.maxBetButtonText.x = (img.width - 130)/2;
        _this.maxBetButtonText.y = 20;
        _this.maxBetText = new createjs.Text('BET: ' + _this.bet, '25px Arial', '#ffffff');
        _this.maxBetText.x = 57;
        _this.maxBetText.y = -20;
        _this.maxBetButtonContainer.addChild(_this.maxBetButton, _this.maxBetButtonText, _this.maxBetText);
        _this.gameStageContainer.addChild(_this.maxBetButtonContainer);
        _this.maxBetButtonContainer.enabled = true;
    };
    
    _this.onMaxBetButtonClicked = function() {
        if(!_this.maxBetButtonContainer.enabled)
            return;
        _this.setLines(20);
        _this.setCoins(0.5);
        _this.onSpinButtonClicked();
    };
    
    _this.setMaxBetButtonEnabled = function(enabled) {
        _this.maxBetButtonContainer.enabled = enabled;
    };
    
    _this.setMaxBetText = function(num) {
        _this.maxBetText.text = 'BET: '+ Utils.round(num);
    };
    
    _this.setCoins = function(coins) {
        _this.coins = coins;
        _this.coinText.text = Utils.round(_this.coins);
        _this.setMaxBetText(_this.coins * _this.lines);
        _this.bet = _this.coins * _this.lines;
    };
    
    _this.setLinesButtonEnabled = function(enabled) {
        _this.linesButtonContainer.enabled = enabled;
    };
    
    _this.onLinesButtonClicked = function() {
        if(!_this.linesButtonContainer.enabled)
            return;
        if(_this.lines == 20)
            _this.lines = 1;
        else
            _this.lines++;
        _this.setPayline(_this.lines - 1);
    };
    
    _this.spinReel = function(i) {
        _this.reels[i].spin(true);
        createjs.Sound.play('start_reel');
        if(i < (_this.reelsCount - 1))
            setTimeout(_this.spinReel.bind(null, ++i), _this.reelSpiningInterval);
        else{
            createjs.Sound.play('reels', 'none', 0, 0, 0, 1, 0, null, _this.reelSpiningTime);
            setTimeout(_this.showWin.bind(null, 0), _this.reelSpiningTime);
        }
    };
    
    _this.showWin = function(i) {
        _this.reels[i].showWin(_this.wm.getColumn(_this.wm.win, i).reverse());
        if(i < (_this.reelsCount - 1))
            setTimeout(_this.showWin.bind(null, ++i), 300);
    };
    
    _this.showPreloadStage = function() {
        _this.hide();
        _this.game.showPreloadStage();
    };

    _this.drawMainMask = function() {
        _this.mainMaskImage = _this.preloader.getResult("mask_slot");
	    _this.mainMask = new createjs.Shape();
	    _this.mainMask.graphics.beginBitmapFill(_this.mainMaskImage)
	         .drawRect(0, 0, _this.mainMaskImage.width, _this.mainMaskImage.height);
	    _this.gameStageContainer.addChild(_this.mainMask);
    };
    
    _this.drawBackground = function() {
        var backgroundImage = _this.preloader.getResult("bg_game");
	    _this.background = new createjs.Shape();
	    _this.background.graphics.beginBitmapFill(backgroundImage)
	         .drawRect(0, 0, backgroundImage.width, backgroundImage.height);
	    _this.gameStageContainer.addChild(_this.background);
    };
    
    _this.show = function() {
        _this.gameStageContainer.visible = true;
    };
    
    _this.hide = function() {
        _this.gameStageContainer.visible = false;
    };
    
    _this.addReels = function() {
        _this.reels = [];
        for(var i = 0; i < _this.reelsCount; i++){
            _this.reels[i] = new Reel({
                container: _this.reelContainer,
                cellCount: _this.cellCount,
                columnX: 380 + i*10 + 140*i,
                columnY: 84,
                columnWidth: 140,
                columnHeight: 420,
                cellWidth: 140,
                cellHeight: 140,
                spriteSheets: _this.getSymbolsSpriteSheets(),
                frameSpriteSheet: _this.getFrameSpriteSheet(),
                spinSpeed: 70,
                stopSpeed: 35
            });
            _this.game.addTickListener(_this.reels[i].tick);
        }
        _this.reels[_this.reelsCount-1].onSpinEndCb = _this.onSpinEnd;
    };
    
    _this.onSpinEnd = function(){
        console.log(_this.win);
        _this.setSpinButtonEnabled(true);
        _this.setLinesButtonEnabled(true);
        _this.setMaxBetButtonEnabled(true);
        _this.setCoinButtonEnabled(true);
        var winSum = 0;
        for(var i = 0; i < _this.win.length; i++) {
            winSum += (_this.bet / _this.lines) * _this.win[i].win;
            _this.showPayLine(_this.win[i].line);
            for(var j = 0; j < _this.win[i].positions.length; j++) {
                _this.reels[_this.win[i].positions[j][1]].boom(3 - _this.win[i].positions[j][0]);
            }
        }
        if(_this.win.length){
            createjs.Sound.play('win');
        }
        _this.balance += winSum;
        _this.setBalance(_this.balance);
        _this.setWin(winSum);
        _this.debugWiningArray();
    };
    
    _this.debugWiningArray = function() {
      if(!_this.winDebugContainer){
        _this.winDebugContainer = new createjs.Container();
        _this.winDebugContainer.x = 2;
        _this.winDebugContainer.y = 70;
        _this.gameStageContainer.addChild(_this.winDebugContainer);
      }
      _this.winDebugContainer.removeAllChildren();
      _this.win.forEach(function(win, index){
          var text = new createjs.Text(index+' -> ხაზი:'+win.line+'   გამეორება:'+win.reps+'\r\n მოგება:'+win.win+'x   სიმბოლო:'+win.symbol, '25px Arial bold', '#000000');
          _this.winDebugContainer.addChild(text);
          text.y = index*60;
      });
    };
    
    _this.init();
};

var Game = function() {
    var _this = this;
    _this.Stages = {};
    
    _this.Stages.Bootloader = new Bootloader(_this);
    
    _this.getStage = function() {
        return _this.stage;
    };
    
    _this.addTickListener = function(cb) {
      	createjs.Ticker.addEventListener("tick", cb);
    };
    
    _this.onTick = function() {
        _this.getStage().update();
    };
    
    _this.setupTicker = function() {
        createjs.Ticker.setFPS(30);
        _this.addTickListener(_this.onTick);
    };
    
    _this.moveToPreloadStage = function() {
        if(_this.Stages.GameStage)
            _this.Stages.GameStage.hide();
        if(_this.Stages.Preloader)
            _this.Stages.Preloader.show();
        else
            _this.Stages.Preloader = new Preloader(_this, _this.Stages.Bootloader.bootloader);
    };
    
    _this.moveToGameStage = function() {
        if(_this.Stages.Preloader)
            _this.Stages.Preloader.hide();
        if(_this.Stages.GameStage)
            _this.Stages.GameStage.show();
        else
            _this.Stages.GameStage = new GameStage(_this, _this.Stages.Preloader.preloader);
    };
    
    _this.setupCanvas = function() {
        _this.stage = new createjs.Stage("gameCanvas");
        _this.setupTicker();
    };
    
    _this.setupCanvas();
};

var game;

$(document).ready(function() {
    game = new Game();
});