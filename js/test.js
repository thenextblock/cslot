var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1,
    s_bIsIphone = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        e = b.documentElement;
    if (void 0 === window["inner" + a]) a = e["client" + a];
    else if (window["inner" + a] != e["client" + a]) {
        var f = b.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var g = b.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + c + ":" + e["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        f.appendChild(g);
        e.insertBefore(f, b.head);
        a = 7 == g["offset" + a] ? e["client" + a] : window["inner" + a];
        e.removeChild(f)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            e = CANVAS_WIDTH * b,
            b = CANVAS_HEIGHT * b,
            f;
        b < a ? (f = a - b, b += f, e += CANVAS_WIDTH / CANVAS_HEIGHT * f) : e < c && (f = c - e, e += f, b += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        f = a / 2 - b / 2;
        var g = c / 2 - e / 2,
            d = CANVAS_WIDTH / e;
        if (g * d < -EDGEBOARD_X || f * d < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
            c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), e = CANVAS_WIDTH * b, b *= CANVAS_HEIGHT, f = (a - b) / 2, g = (c - e) / 2, d = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * g * d;
        s_iOffsetY = -1 * f * d;
        0 <= f && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * e, s_oStage.canvas.height = 2 * b, canvas.style.width = e + "px", canvas.style.height = b + "px", a = Math.min(e / CANVAS_WIDTH,
            b / CANVAS_HEIGHT), s_iScaleFactor = 2 * a, s_oStage.scaleX = s_oStage.scaleY = 2 * a) : s_bMobile && !1 === isIOS() ? ($("#canvas").css("width", e + "px"), $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = e, s_oStage.canvas.height = b, s_iScaleFactor = Math.min(e / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > f ? $("#canvas").css("top", f + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px")
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function inIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}

function createBitmap(a, c, b) {
    var e = new createjs.Bitmap(a),
        f = new createjs.Shape;
    c && b ? f.graphics.beginFill("#fff").drawRect(0, 0, c, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    e.hitArea = f;
    return e
}

function createSprite(a, c, b, e, f, g) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -e, f, g);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function shuffle(a) {
    for (var c = a.length, b, e; 0 !== c;) e = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[e], a[e] = b;
    return a
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "",
        b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 === a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? createjs.Sound.play(a, {
        loop: b,
        volume: c
    }) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}

function setVolume(a, c) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) a.volume = c
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.setMute(c)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var e = c[b].split("=");
        if (e[0] == a) return e[1]
    }
}
(function() {
    function a(a) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function CSpriteLibrary() {
    var a, c, b, e, f, g;
    this.init = function(d, k, l) {
        b = c = 0;
        e = d;
        f = k;
        g = l;
        a = {}
    };
    this.addSprite = function(d, b) {
        a.hasOwnProperty(d) || (a[d] = {
            szPath: b,
            oSprite: new Image
        }, c++)
    };
    this.getSprite = function(d) {
        return a.hasOwnProperty(d) ? a[d].oSprite : null
    };
    this._onSpritesLoaded = function() {
        f.call(g)
    };
    this._onSpriteLoaded = function() {
        e.call(g);
        ++b === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var d in a) a[d].oSprite.oSpriteLibrary = this, a[d].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[d].oSprite.src = a[d].szPath
    };
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1500,
    CANVAS_HEIGHT = 640,
    EDGEBOARD_X = 300,
    EDGEBOARD_Y = 0,
    FPS_TIME = 1E3 / 24,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "arialbold",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    GAME_STATE_IDLE = 0,
    GAME_STATE_SPINNING = 1,
    GAME_STATE_SHOW_ALL_WIN = 2,
    GAME_STATE_SHOW_WIN = 3,
    REEL_STATE_START = 0,
    REEL_STATE_MOVING = 1,
    REEL_STATE_STOP = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    REEL_OFFSET_X = 380,
    REEL_OFFSET_Y = 84,
    NUM_REELS = 5,
    NUM_ROWS = 3,
    NUM_SYMBOLS = 8,
    WILD_SYMBOL =
    8,
    NUM_PAYLINES = 20,
    SYMBOL_SIZE = 140,
    SPACE_BETWEEN_SYMBOLS = 10,
    MAX_FRAMES_REEL_EASE = 16,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
    REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET = .05,
    MAX_BET = .5,
    TOTAL_MONEY, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, PAYTABLE_VALUES, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS;

function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
            var c = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_SIZE,
                    height: SYMBOL_SIZE,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(c)
        }
    };
    this._initPaylines = function() {
        s_aPaylineCombo = [
            [{
                row: 1,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 1,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 1,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 1,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 1,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 1,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 1,
                col: 0
            }, {
                row: 1,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 1,
                col: 3
            }, {
                row: 1,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 0,
                col: 3
            }, {
                row: 0,
                col: 4
            }],
            [{
                row: 2,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 0,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 2,
                col: 4
            }],
            [{
                row: 0,
                col: 0
            }, {
                row: 2,
                col: 1
            }, {
                row: 2,
                col: 2
            }, {
                row: 2,
                col: 3
            }, {
                row: 0,
                col: 4
            }]
        ]
    };
    this._initSymbolWin = function() {
        s_aSymbolWin = [];
        s_aSymbolWin[0] = PAYTABLE_VALUES[0];
        s_aSymbolWin[1] = PAYTABLE_VALUES[1];
        s_aSymbolWin[2] = PAYTABLE_VALUES[2];
        s_aSymbolWin[3] = PAYTABLE_VALUES[3];
        s_aSymbolWin[4] = PAYTABLE_VALUES[4];
        s_aSymbolWin[5] = PAYTABLE_VALUES[5];
        s_aSymbolWin[6] = PAYTABLE_VALUES[6]
    };
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        var a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[1] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0,
                    1
                ],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(a)
    };
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(1);
        for (a = 0; 2 > a; a++) s_aRandSymbols.push(2);
        for (a = 0; 3 > a; a++) s_aRandSymbols.push(3);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(4);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(6);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(7);
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(8)
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HELP_WILD = "THIS SIMBOL IS A JOLLY WHICH CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
    var a, c, b, e, f, g;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        g = new createjs.Container;
        s_oStage.addChild(g)
    };
    this.unload = function() {
        g.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var d = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        g.addChild(d);
        d = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(d);
        e.x = CANVAS_WIDTH / 2 - d.width / 2;
        e.y = CANVAS_HEIGHT - 170;
        g.addChild(e);
        a = d.width;
        c = d.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, 1, c);
        g.addChild(f);
        e.mask = f;
        b = new createjs.Text("", "30px " + FONT_GAME, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT - 125;
        b.shadow = new createjs.Shadow("#000", 2, 2, 2);
        b.textBaseline =
            "alphabetic";
        b.textAlign = "center";
        g.addChild(b)
    };
    this.refreshLoader = function(d) {
        b.text = d + "%";
        f.graphics.clear();
        d = Math.floor(d * a / 100);
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, d, c)
    };
    this._init()
}

function CMain(a) {
    var c, b = 0,
        e = 0,
        f = STATE_LOADING,
        g, d, k;
    this.initContainer = function() {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        d = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        d.refreshLoader(Math.floor(b / e * 100));
        b === e && (new CSlotSettings, d.unload(), this.gotoMenu())
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded,
            this)), createjs.Sound.registerSound("./sounds/press_but.ogg", "press_but"), createjs.Sound.registerSound("./sounds/win.ogg", "win"), createjs.Sound.registerSound("./sounds/reels.ogg", "reels"), createjs.Sound.registerSound("./sounds/reel_stop.ogg", "reel_stop", 6), createjs.Sound.registerSound("./sounds/start_reel.ogg", "start_reel", 6)) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/press_but.mp3",
            "press_but"), createjs.Sound.registerSound("./sounds/win.mp3", "win"), createjs.Sound.registerSound("./sounds/reels.mp3", "reels"), createjs.Sound.registerSound("./sounds/reel_stop.mp3", "reel_stop", 6), createjs.Sound.registerSound("./sounds/start_reel.mp3", "start_reel", 6)), e += 5)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits",
            "./sprites/but_credits.png");
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) s_oSpriteLibrary.addSprite("symbol_" + a, "./sprites/symbol_" + a + ".png"), s_oSpriteLibrary.addSprite("symbol_" + a + "_anim", "./sprites/symbol_" + a + "_anim.png");
        for (a = 1; a < NUM_PAYLINES + 1; a++) s_oSpriteLibrary.addSprite("payline_" + a, "./sprites/payline_" + a + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        d.refreshLoader(Math.floor(b / e * 100));
        b === e && (new CSlotSettings, d.unload(), this.gotoMenu())
    };
    this._onAllImagesLoaded = function() {};
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(g);
        f = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        createjs.Sound.setMute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && createjs.Sound.setMute(!1)
    };
    this._update =
        function(a) {
            if (!1 !== c) {
                var d = (new Date).getTime();
                s_iTimeElaps = d - s_iPrevTime;
                s_iCntTime += s_iTimeElaps;
                s_iCntFps++;
                s_iPrevTime = d;
                1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
                f === STATE_GAME && k.update();
                s_oStage.update(a)
            }
        };
    s_oMain = this;
    g = a;
    PAYTABLE_VALUES = [];
    for (var l = 0; 7 > l; l++) PAYTABLE_VALUES[l] = a["paytable_symbol_" + (l + 1)];
    ENABLE_FULLSCREEN = g.fullscreen;
    ENABLE_CHECK_ORIENTATION = g.check_orientation;
    SHOW_CREDITS = g.show_credits;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary;

function CTextButton(a, c, b, e, f, g, d) {
    var k, l, h, p, u, n, t, q, w;
    this._init = function(a, d, b, c, e, f, g) {
        k = !1;
        p = [];
        u = [];
        w = createBitmap(b);
        l = b.width;
        h = b.height;
        var v = Math.ceil(g / 20);
        t = new createjs.Text(c, g + "px " + e, "#000000");
        t.textAlign = "center";
        var r = t.getBounds();
        t.x = b.width / 2 + v;
        t.y = (b.height - r.height) / 2 + v;
        q = new createjs.Text(c, g + "px " + e, f);
        q.textAlign = "center";
        r = q.getBounds();
        q.x = b.width / 2;
        q.y = (b.height - r.height) / 2;
        n = new createjs.Container;
        n.x = a;
        n.y = d;
        n.regX = b.width / 2;
        n.regY = b.height / 2;
        n.addChild(w, t, q);
        s_bMobile ||
            (n.cursor = "pointer");
        s_oStage.addChild(n);
        this._initListener()
    };
    this.unload = function() {
        n.off("mousedown");
        n.off("pressup");
        s_oStage.removeChild(n)
    };
    this.setVisible = function(a) {
        n.visible = a
    };
    this.enable = function() {
        k = !1;
        w.filters = [];
        w.cache(0, 0, l, h)
    };
    this.disable = function() {
        k = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        w.filters = [new createjs.ColorMatrixFilter(a)];
        w.cache(0, 0, l, h)
    };
    this._initListener = function() {
        oParent = this;
        n.on("mousedown", this.buttonDown);
        n.on("pressup",
            this.buttonRelease)
    };
    this.addEventListener = function(a, d, b) {
        p[a] = d;
        u[a] = b
    };
    this.buttonRelease = function() {
        k || (playSound("press_but", .3, 0), n.scaleX = 1, n.scaleY = 1, p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(u[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        k || (n.scaleX = .9, n.scaleY = .9, p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, d) {
        n.x = a;
        n.y = d
    };
    this.changeText = function(a) {
        q.text = a;
        t.text = a
    };
    this.setX = function(a) {
        n.x = a
    };
    this.setY = function(a) {
        n.y = a
    };
    this.getButtonImage = function() {
        return n
    };
    this.getX = function() {
        return n.x
    };
    this.getY = function() {
        return n.y
    };
    this._init(a, c, b, e, f, g, d);
    return this
}

function CGfxButton(a, c, b) {
    var e, f, g = [],
        d;
    this._init = function(a, b, h) {
        e = [];
        f = [];
        d = createBitmap(h);
        d.x = a;
        d.y = b;
        d.regX = h.width / 2;
        d.regY = h.height / 2;
        s_bMobile || (d.cursor = "pointer");
        s_oStage.addChild(d);
        this._initListener()
    };
    this.unload = function() {
        d.off("mousedown", this.buttonDown);
        d.off("pressup", this.buttonRelease);
        s_oStage.removeChild(d)
    };
    this.setVisible = function(a) {
        d.visible = a
    };
    this._initListener = function() {
        d.on("mousedown", this.buttonDown);
        d.on("pressup", this.buttonRelease)
    };
    this.addEventListener =
        function(a, d, b) {
            e[a] = d;
            f[a] = b
        };
    this.addEventListenerWithParams = function(a, d, b, c) {
        e[a] = d;
        f[a] = b;
        g = c
    };
    this.buttonRelease = function() {
        playSound("win", .3, 0);
        d.scaleX = 1;
        d.scaleY = 1;
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(f[ON_MOUSE_UP], g)
    };
    this.buttonDown = function() {
        d.scaleX = .9;
        d.scaleY = .9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN], g)
    };
    this.setPosition = function(a, b) {
        d.x = a;
        d.y = b
    };
    this.setX = function(a) {
        d.x = a
    };
    this.setY = function(a) {
        d.y = a
    };
    this.getButtonImage = function() {
        return d
    };
    this.getX = function() {
        return d.x
    };
    this.getY = function() {
        return d.y
    };
    this._init(a, c, b);
    return this
}

function CToggle(a, c, b, e, f) {
    var g, d, k, l, h, p, u;
    this._init = function(a, b, c, h, e) {
        u = void 0 !== e ? e : s_oStage;
        d = [];
        k = [];
        e = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        g = h;
        l = createSprite(e, "state_" + g, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        l.x = a;
        l.y = b;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        u.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", h);
        l.off("pressup", p);
        u.removeChild(l)
    };
    this._initListener = function() {
        h = l.on("mousedown", this.buttonDown);
        p = l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        d[a] = b;
        k[a] = c
    };
    this.setCursorType = function(a) {
        l.cursor = a
    };
    this.setActive = function(a) {
        g = a;
        l.gotoAndStop("state_" + g)
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but");
        g = !g;
        l.gotoAndStop("state_" + g);
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(k[ON_MOUSE_UP], g)
    };
    this.buttonDown = function() {
        l.scaleX =
            .9;
        l.scaleY = .9;
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, d) {
        l.x = a;
        l.y = d
    };
    this._init(a, c, b, e, f)
}

function CBetBut(a, c, b) {
    var e, f, g, d = [],
        k;
    this._init = function(a, d, b) {
        e = !1;
        f = [];
        g = [];
        b = s_oSpriteLibrary.getSprite("bet_but");
        var c = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        k = createSprite(c, "on", 0, 0, b.width / 2, b.height);
        k.stop();
        k.x = a;
        k.y = d;
        k.regX = b.width / 2;
        k.regY = b.height / 2;
        s_oStage.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        s_oStage.removeChild(k)
    };
    this.disable = function(a) {
        e = a
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this.setOn = function() {
        k.gotoAndStop("on")
    };
    this.setOff = function() {
        k.gotoAndStop("off")
    };
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, d, b) {
        f[a] = d;
        g[a] = b
    };
    this.addEventListenerWithParams = function(a, b, c, e) {
        f[a] = b;
        g[a] = c;
        d = e
    };
    this.buttonRelease = function() {
        f[ON_MOUSE_UP] && !1 === e && (playSound("press_but", 1, 0), f[ON_MOUSE_UP].call(g[ON_MOUSE_UP], d))
    };
    this.buttonDown = function() {
        f[ON_MOUSE_DOWN] && !1 === e && f[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], d)
    };
    this.setPosition = function(a, d) {
        k.x = a;
        k.y = d
    };
    this.setX = function(a) {
        k.x = a
    };
    this.setY = function(a) {
        k.y = a
    };
    this.getButtonImage = function() {
        return k
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    this._init(a, c, b)
}

function CMenu() {
    var a, c, b, e, f, g, d = null,
        k = null,
        l, h, p, u, n, t;
    this._init = function() {
        l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(l);
        var q = s_oSpriteLibrary.getSprite("but_bg");
        h = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, q, TEXT_PLAY, FONT_GAME, "#ffffff", 40);
        h.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q = s_oSpriteLibrary.getSprite("audio_icon"), f = CANVAS_WIDTH - q.width / 4 - 10, g = q.height / 2 + 10, p = new CToggle(f, g, q, s_bAudioActive),
            p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (q = s_oSpriteLibrary.getSprite("but_credits"), a = q.height / 2 + 10, c = q.height / 2 + 10, u = new CGfxButton(a, c, q, s_oStage), u.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), b = a + q.width + 10, e = c) : (b = q.height / 2 + 10, e = q.height / 2 + 10);
        var q = window.document,
            w = q.documentElement;
        d = w.requestFullscreen || w.mozRequestFullScreen || w.webkitRequestFullScreen || w.msRequestFullscreen;
        k = q.exitFullscreen || q.mozCancelFullScreen || q.webkitExitFullscreen ||
            q.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (d = !1);
        d && !1 === inIframe() && (q = s_oSpriteLibrary.getSprite("but_fullscreen"), n = new CToggle(b, e, q, s_bFullscreen, s_oStage), n.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        t = new createjs.Shape;
        t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(t);
        createjs.Tween.get(t).to({
            alpha: 0
        }, 400).call(function() {
            t.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        h.unload();
        h = null;
        if (!1 ===
            DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), p = null;
        SHOW_CREDITS && u.unload();
        d && !1 === inIframe() && n.unload();
        s_oStage.removeChild(l);
        l = null;
        s_oStage.removeChild(t);
        s_oMenu = t = null
    };
    this.refreshButtonPos = function(h, k) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || p.setPosition(f - h, k + g);
        SHOW_CREDITS && u.setPosition(a + h, c + k);
        d && !1 === inIframe() && n.setPosition(b + h, e + k)
    };
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? (k.call(window.document), s_bFullscreen = !1) : (d.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var c = !1,
        b, e, f, g, d, k, l, h, p, u, n, t, q, w, x, v, A, y, C, B, D, E, r, z = null;
    this._init = function() {
        b = GAME_STATE_IDLE;
        t = g = e = 0;
        A = [0, 1, 2, 3, 4];
        f = A[0];
        d = NUM_PAYLINES;
        u = TOTAL_MONEY;
        h = MIN_BET;
        p = h * d;
        s_oTweenController = new CTweenController;
        D = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(D);
        this._initReels();
        E = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(E);
        r = new CInterface(h, p, u);
        this._initStaticSymbols();
        z = new CPayTablePanel;
        u < p && r.disableSpin();
        c = !0
    };
    this.unload = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.stop();
        r.unload();
        z.unload();
        for (var a = 0; a < w.length; a++) w[a].unload();
        for (a = 0; a < NUM_ROWS; a++)
            for (var d = 0; d < NUM_REELS; d++) x[a][d].unload();
        s_oStage.removeAllChildren()
    };
    this._initReels = function() {
        var a = REEL_OFFSET_X,
            d = REEL_OFFSET_Y,
            b = 0;
        w = [];
        for (var c = 0; c < NUM_REELS; c++) w[c] = new CReelColumn(c, a, d, b), w[c + NUM_REELS] = new CReelColumn(c + NUM_REELS, a, d + SYMBOL_SIZE * NUM_ROWS, b), a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS, b += REEL_DELAY
    };
    this._initStaticSymbols = function() {
        var a = REEL_OFFSET_X,
            d = REEL_OFFSET_Y;
        x = [];
        for (var b = 0; b < NUM_ROWS; b++) {
            x[b] = [];
            for (var c = 0; c < NUM_REELS; c++) {
                var e = new CStaticSymbolCell(b, c, a, d);
                x[b][c] = e;
                a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            a = REEL_OFFSET_X;
            d += SYMBOL_SIZE
        }
    };
    this.generateFinalSymbols = function() {
        y = [];
        for (var a = 0; a < NUM_ROWS; a++) {
            y[a] = [];
            for (var b = 0; b < NUM_REELS; b++) y[a][b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
        }
        v = [];
        for (a = n = 0; a < d; a++) {
            var b = s_aPaylineCombo[a],
                c = [],
                e = y[b[0].row][b[0].col],
                h = 1,
                g = 1;
            for (c.push({
                    row: b[0].row,
                    col: b[0].col,
                    value: y[b[0].row][b[0].col]
                }); e === WILD_SYMBOL && g < NUM_REELS;) h++, e = y[b[g].row][b[g].col], c.push({
                row: b[g].row,
                col: b[g].col,
                value: y[b[g].row][b[g].col]
            }), g++;
            for (; g < b.length; g++)
                if (y[b[g].row][b[g].col] === e || y[b[g].row][b[g].col] === WILD_SYMBOL) h++, c.push({
                    row: b[g].row,
                    col: b[g].col,
                    value: y[b[g].row][b[g].col]
                });
                else break;
            0 < s_aSymbolWin[e - 1][h - 1] && (n += s_aSymbolWin[e - 1][h - 1], v.push({
                line: a + 1,
                amount: s_aSymbolWin[e - 1][h - 1],
                num_win: h,
                value: e,
                list: c
            }))
        }
        return 0 <
            v.length ? !0 : !1
    };
    this._generateRandSymbols = function() {
        for (var a = [], b = 0; b < NUM_ROWS; b++) a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return a
    };
    this.reelArrived = function(a, b) {
        if (e > MIN_REEL_LOOPS)
            if (f === b) {
                if (!1 === w[a].isReadyToStop()) {
                    var d = a;
                    a < NUM_REELS ? (d += NUM_REELS, w[d].setReadyToStop(), w[a].restart([y[0][a], y[1][a], y[2][a]], !0)) : (d -= NUM_REELS, w[d].setReadyToStop(), w[a].restart([y[0][d], y[1][d], y[2][d]], !0))
                }
            } else w[a].restart(this._generateRandSymbols(), !1);
        else w[a].restart(this._generateRandSymbols(), !1), 0 === a && e++
    };
    this.stopNextReel = function() {
        g++;
        0 === g % 2 && (playSound("reel_stop", 1, 0), f = A[g / 2], g === 2 * NUM_REELS && this._endReelAnimation())
    };
    this._endReelAnimation = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || C.stop();
        r.disableBetBut(!1);
        g = e = 0;
        f = A[0];
        if (0 < v.length) {
            for (var a = 0; a < v.length; a++) {
                z.highlightCombo(v[a].value, v[a].num_win);
                r.showLine(v[a].line);
                for (var d = v[a].list, c = 0; c < d.length; c++) x[d[c].row][d[c].col].show(d[c].value)
            }
            n *= h;
            u += n;
            SLOT_CASH -= n;
            0 < n && (r.refreshMoney(u), r.refreshWinText(n));
            k = 0;
            b = GAME_STATE_SHOW_ALL_WIN;
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) B = playSound("win", .3, 0)
        } else b = GAME_STATE_IDLE;
        r.enableGuiButtons();
        u < p && r.disableSpin();
        t++;
        t === q && (t = 0, $(s_oMain).trigger("show_interlevel_ad"));
        $(s_oMain).trigger("save_score", u)
    };
    this.hidePayTable = function() {
        z.hide()
    };
    this._showWin = function() {
        var a;
        if (0 < l) {
            stopSound(B);
            a = v[l - 1].line;
            r.hideLine(a);
            a = v[l - 1].list;
            for (var b = 0; b < a.length; b++) x[a[b].row][a[b].col].stopAnim()
        }
        l === v.length && (l = 0);
        a = v[l].line;
        r.showLine(a);
        a = v[l].list;
        for (b = 0; b < a.length; b++) x[a[b].row][a[b].col].show(a[b].value);
        l++
    };
    this._hideAllWins = function() {
        for (var a = 0; a < v.length; a++)
            for (var d = v[a].list, c = 0; c < d.length; c++) x[d[c].row][d[c].col].stopAnim();
        r.hideAllLines();
        l = k = 0;
        k = TIME_SHOW_WIN;
        b = GAME_STATE_SHOW_WIN
    };
    this.activateLines = function(a) {
        d = a;
        this.removeWinShowing();
        p = a = h * d;
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > u ? r.disableSpin() : r.enableSpin()
    };
    this.addLine = function() {
        d === NUM_PAYLINES ? d = 1 : d++;
        var a = h * d;
        p = a;
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > u ? r.disableSpin() : r.enableSpin()
    };
    this.changeCoinBet = function() {
        var a = Math.floor(100 * (h + .05)) / 100;
        a > MAX_BET ? (h = MIN_BET, p = h * d, r.refreshBet(h), r.refreshTotalBet(p), a = p) : (a *= d, h += .05, h = Math.floor(100 * h) / 100, p = a, r.refreshBet(h), r.refreshTotalBet(p));
        a > u ? r.disableSpin() : r.enableSpin()
    };
    this.onMaxBet = function() {
        var a = MAX_BET;
        d = NUM_PAYLINES;
        a *= d;
        h = MAX_BET;
        p = a;
        r.refreshBet(h);
        r.refreshTotalBet(p);
        r.refreshNumLines(d);
        a > u ? r.disableSpin() : (r.enableSpin(), this.onSpin())
    };
    this.removeWinShowing = function() {
        z.resetHighlightCombo();
        r.resetWin();
        for (var a = 0; a < NUM_ROWS; a++)
            for (var d = 0; d < NUM_REELS; d++) x[a][d].hide();
        for (a = 0; a < w.length; a++) w[a].activate();
        b = GAME_STATE_IDLE
    };
    this.onSpin = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) B && stopSound(B), C = playSound("reels", 1, 0);
        r.disableBetBut(!0);
        this.removeWinShowing();
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
        for (var a = 0; a < s_aSymbolWin.length; a++)
            for (var d = s_aSymbolWin[a], c = 0; c < d.length; c++) 0 !== d[c] && d[c] < MIN_WIN && (MIN_WIN = d[c]);
        MIN_WIN *= h;
        u -= p;
        r.refreshMoney(u);
        SLOT_CASH +=
            p;
        $(s_oMain).trigger("bet_placed", {
            bet: h,
            tot_bet: p
        });
        if (SLOT_CASH < MIN_WIN) {
            do a = this.generateFinalSymbols(); while (!0 === a)
        } else if (Math.floor(101 * Math.random()) > WIN_OCCURRENCE) {
            do a = this.generateFinalSymbols(); while (!0 === a)
        } else {
            do a = this.generateFinalSymbols(); while (!1 === a || n * h > SLOT_CASH)
        }
        r.hideAllLines();
        r.disableGuiButtons();
        b = GAME_STATE_SPINNING
    };
    this._printSymbol = function() {
        for (var a = 0; a < NUM_ROWS; a++)
            for (var b = 0; b < NUM_REELS; b++) trace("_aFinalSymbolCombo[" + a + "][" + b + "]: " + y[a][b])
    };
    this.onInfoClicked =
        function() {
            b !== GAME_STATE_SPINNING && (z.isVisible() ? z.hide() : z.show())
        };
    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", u);
        s_oMain.gotoMenu()
    };
    this.getState = function() {
        return b
    };
    this.update = function() {
        if (!1 !== c) switch (b) {
            case GAME_STATE_SPINNING:
                for (var a = 0; a < w.length; a++) w[a].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                k += s_iTimeElaps;
                k > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                k += s_iTimeElaps, k > TIME_SHOW_WIN && (k =
                    0, this._showWin())
        }
    };
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    MIN_REEL_LOOPS = a.min_reel_loop;
    REEL_DELAY = a.reel_delay;
    TIME_SHOW_WIN = a.time_show_win;
    TIME_SHOW_ALL_WINS = a.time_show_all_wins;
    TOTAL_MONEY = a.money;
    SLOT_CASH = a.slot_cash;
    q = a.ad_show_counter;
    this._init()
}
var s_oGame, s_oTweenController;

function CReelColumn(a, c, b, e) {
    var f, g, d, k, l, h, p, u, n, t, q, w, x, v;
    this._init = function(a, b, c, e) {
        d = g = f = !1;
        p = 0;
        k = a;
        h = e;
        l = k < NUM_REELS ? k : k - NUM_REELS;
        n = 0;
        t = MAX_FRAMES_REEL_EASE;
        u = REEL_STATE_START;
        q = c;
        w = q + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(b, c)
    };
    this.initContainer = function(a, b) {
        v = new createjs.Container;
        v.x = a;
        v.y = b;
        var d = 0;
        x = [];
        for (var c = 0; c < NUM_ROWS; c++) {
            var e = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            e.stop();
            e.x = 0;
            e.y = d;
            v.addChild(e);
            x[c] = e;
            d += SYMBOL_SIZE
        }
        s_oStage.addChild(v)
    };
    this.unload = function() {
        s_oStage.removeChild(v)
    };
    this.activate = function() {
        q = v.y;
        w = q + SYMBOL_SIZE * NUM_ROWS;
        f = !0
    };
    this._setSymbol = function(a) {
        v.removeAllChildren();
        for (var b = 0, d = 0; d < a.length; d++) {
            var c = new createjs.Sprite(s_aSymbolData[a[d]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            c.stop();
            c.x = 0;
            c.y = b;
            v.addChild(c);
            x[d] = c;
            b += SYMBOL_SIZE
        }
    };
    this.restart = function(a, b) {
        v.y = q = REEL_START_Y;
        w = q + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(a);
        if (g = b) {
            n = 0;
            t = MAX_FRAMES_REEL_EASE;
            u = REEL_STATE_STOP;
            for (var c = 0; c < NUM_ROWS; c++) x[c].gotoAndStop("static");
            d = !0
        } else
            for (c = 0; c < NUM_ROWS; c++) x[c].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        n = 0;
        t = MAX_FRAMES_REEL_EASE;
        u = REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return g
    };
    this._updateStart = function() {
        0 === n && k < NUM_REELS && playSound("start_reel", .3, 0);
        n++;
        n > t && (n = 0, t /= 2, u++, q = v.y, w = q + SYMBOL_SIZE * NUM_ROWS);
        var a = s_oTweenController.easeInBack(n, 0, 1, t),
            a = s_oTweenController.tweenValue(q, w, a);
        v.y = a
    };
    this._updateMoving =
        function() {
            n++;
            n > t && (n = 0, q = v.y, w = q + SYMBOL_SIZE * NUM_ROWS);
            var a = s_oTweenController.easeLinear(n, 0, 1, t),
                a = s_oTweenController.tweenValue(q, w, a);
            v.y = a
        };
    this._updateStopping = function() {
        n++;
        if (n >= t) f = !1, n = 0, t = MAX_FRAMES_REEL_EASE, u = REEL_STATE_START, p = 0, g = !1, d && (d = !1, v.y = REEL_OFFSET_Y), s_oGame.stopNextReel();
        else {
            var a = s_oTweenController.easeOutCubic(n, 0, 1, t),
                a = s_oTweenController.tweenValue(q, w, a);
            v.y = a
        }
    };
    this.update = function() {
        if (!1 !== f && (p++, p > h)) switch (!1 === g && v.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(k,
            l), u) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
        }
    };
    this._init(a, c, b, e)
}

function CInterface(a, c, b) {
    var e, f, g, d, k, l, h, p, u, n, t, q, w, x, v, A = null,
        y = null,
        C, B, D, E, r, z;
    this._init = function(a, b, c) {
        var m = s_oSpriteLibrary.getSprite("but_exit");
        g = CANVAS_WIDTH - m.width / 2 - 2;
        d = m.height / 2 + 2;
        u = new CGfxButton(g, d, m, !0);
        u.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (k = u.getX() - m.width, l = m.height / 2 + 2, w = new CToggle(k, l, s_oSpriteLibrary.getSprite("audio_icon"), s_bAudioActive), w.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), e = k - m.width, f =
            l) : (e = u.getX() - m.width, f = m.height / 2 + 2);
        var m = window.document,
            F = m.documentElement;
        A = F.requestFullscreen || F.mozRequestFullScreen || F.webkitRequestFullScreen || F.msRequestFullscreen;
        y = m.exitFullscreen || m.mozCancelFullScreen || m.webkitExitFullscreen || m.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && !1 === inIframe() && (m = s_oSpriteLibrary.getSprite("but_fullscreen"), z = new CToggle(e, f, m, s_bFullscreen, s_oStage), z.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        m = s_oSpriteLibrary.getSprite("spin_but");
        n = new CTextButton(1026 + m.width / 2, 595, m, TEXT_SPIN, FONT_GAME, "#ffffff", 30);
        n.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        m = s_oSpriteLibrary.getSprite("info_but");
        t = new CTextButton(296 + m.width / 2, 595, m, TEXT_INFO, FONT_GAME, "#ffffff", 30);
        t.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        m = s_oSpriteLibrary.getSprite("but_lines_bg");
        q = new CTextButton(436 + m.width / 2, 595, m, TEXT_LINES, FONT_GAME, "#ffffff", 30);
        q.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        m = s_oSpriteLibrary.getSprite("coin_but");
        x = new CTextButton(620 +
            m.width / 2, 595, m, TEXT_COIN, FONT_GAME, "#ffffff", 30);
        x.addEventListener(ON_MOUSE_UP, this._onBet, this);
        m = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        v = new CTextButton(805 + m.width / 2, 595, m, TEXT_MAX_BET, FONT_GAME, "#ffffff", 30);
        v.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        B = new createjs.Text(TEXT_MONEY + "\n" + c.toFixed(2) + TEXT_CURRENCY, "24px " + FONT_GAME, "#ffde00");
        B.x = 408;
        B.y = 14;
        B.textAlign = "center";
        s_oStage.addChild(B);
        E = new createjs.Text(NUM_PAYLINES, "30px " + FONT_GAME, "#ffffff");
        E.x = 530;
        E.y = CANVAS_HEIGHT -
            96;
        E.textAlign = "center";
        E.textBaseline = "alphabetic";
        s_oStage.addChild(E);
        C = new createjs.Text(a.toFixed(2), "30px " + FONT_GAME, "#ffffff");
        C.x = 712;
        C.y = CANVAS_HEIGHT - 96;
        C.textAlign = "center";
        C.textBaseline = "alphabetic";
        s_oStage.addChild(C);
        D = new createjs.Text(TEXT_BET + ": " + b.toFixed(2), "30px " + FONT_GAME, "#ffffff");
        D.x = 918;
        D.y = CANVAS_HEIGHT - 96;
        D.textAlign = "center";
        D.textBaseline = "alphabetic";
        s_oStage.addChild(D);
        r = new createjs.Text("", "24px " + FONT_GAME, "#ffde00");
        r.x = 1116;
        r.y = CANVAS_HEIGHT - 96;
        r.textAlign =
            "center";
        r.textBaseline = "alphabetic";
        s_oStage.addChild(r);
        m = s_oSpriteLibrary.getSprite("bet_but");
        h = [];
        a = m.height / 2;
        b = 84 + a;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        h[3] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        h[1] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        h[19] = c;
        b += 43;
        c = new CBetBut(319 +
            m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        h[15] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        h[9] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        h[0] = c;
        b += 44;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        h[10] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b,
            m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        h[16] = c;
        b += 43;
        c = new CBetBut(319 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        h[2] = c;
        c = new CBetBut(319 + m.width / 2, b + 43, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        h[4] = c;
        b = 84 + a;
        c = new CBetBut(1130 + m.width / 2, b, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        h[13] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 12);
        h[11] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        h[8] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        h[17] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        h[5] = c;
        b += 44;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked,
            this, 7);
        h[6] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        h[18] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        h[7] = c;
        b += 43;
        c = new CBetBut(1130 + m.width / 2, b, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        h[12] = c;
        c = new CBetBut(1130 + m.width / 2, b + 43, m, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        h[14] =
            c;
        p = [];
        for (m = 0; m < NUM_PAYLINES; m++) a = createBitmap(s_oSpriteLibrary.getSprite("payline_" + (m + 1))), a.visible = !1, s_oStage.addChild(a), p[m] = a;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        u.unload();
        u = null;
        n.unload();
        n = null;
        t.unload();
        t = null;
        q.unload();
        q = null;
        x.unload();
        x = null;
        v.unload();
        v = null;
        !1 === DISABLE_SOUND_MOBILE && (w.unload(), w = null);
        A && !1 === inIframe() && z.unload();
        for (var a = 0; a < NUM_PAYLINES; a++) h[a].unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(a, b) {
        u.setPosition(g -
            a, b + d);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || w.setPosition(k - a, b + l);
        A && !1 === inIframe() && z.setPosition(e - a, f + b)
    };
    this.refreshMoney = function(a) {
        B.text = TEXT_MONEY + "\n" + a.toFixed(2) + TEXT_CURRENCY
    };
    this.refreshBet = function(a) {
        C.text = a.toFixed(2)
    };
    this.refreshTotalBet = function(a) {
        D.text = TEXT_BET + ": " + a.toFixed(2)
    };
    this.refreshNumLines = function(a) {
        E.text = a;
        for (var b = 0; b < NUM_PAYLINES; b++) b < a ? (h[b].setOn(), p[b].visible = !0) : h[b].setOff();
        setTimeout(function() {
            for (var a = 0; a < NUM_PAYLINES; a++) p[a].visible = !1
        }, 1E3)
    };
    this.resetWin = function() {
        r.text = " "
    };
    this.refreshWinText = function(a) {
        r.text = TEXT_WIN + " " + a.toFixed(2) + TEXT_CURRENCY
    };
    this.showLine = function(a) {
        p[a - 1].visible = !0
    };
    this.hideLine = function(a) {
        p[a - 1].visible = !1
    };
    this.hideAllLines = function() {
        for (var a = 0; a < NUM_PAYLINES; a++) p[a].visible = !1
    };
    this.disableBetBut = function(a) {
        for (var b = 0; b < NUM_PAYLINES; b++) h[b].disable(a)
    };
    this.enableGuiButtons = function() {
        n.enable();
        v.enable();
        x.enable();
        q.enable();
        t.enable()
    };
    this.enableSpin = function() {
        n.enable();
        v.enable()
    };
    this.disableSpin = function() {
        n.disable();
        v.disable()
    };
    this.disableGuiButtons = function() {
        n.disable();
        v.disable();
        x.disable();
        q.disable();
        t.disable()
    };
    this._onBetLineClicked = function(a) {
        this.refreshNumLines(a);
        s_oGame.activateLines(a)
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._onSpin = function() {
        s_oGame.onSpin()
    };
    this._onAddLine = function() {
        s_oGame.addLine()
    };
    this._onInfo = function() {
        s_oGame.onInfoClicked()
    };
    this._onBet = function() {
        s_oGame.changeCoinBet()
    };
    this._onMaxBet = function() {
        s_oGame.onMaxBet()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? (y.call(window.document), s_bFullscreen = !1) : (A.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    s_oInterface = this;
    this._init(a, c, b);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, c, b, e, f;
    this._init = function() {
        f = new createjs.Container;
        e = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
        f.addChild(e);
        this._createPayouts();
        b = new createjs.Text(TEXT_HELP_WILD, "26px " + FONT_GAME, "#ffff00");
        b.textAlign = "center";
        b.lineWidth = 450;
        b.x = 986;
        b.y = 480;
        f.addChild(b);
        f.visible = !1;
        s_oStage.addChild(f);
        var a = this;
        f.on("pressup", function() {
            a._onExit()
        })
    };
    this.unload = function() {
        var b = this;
        f.off("pressup", function() {
            b._onExit()
        });
        s_oStage.removeChild(f);
        for (var d =
                0; d < a.length; d++) f.removeChild(a[d]);
        for (d = 0; d < c.length; d++) f.removeChild(c[d])
    };
    this._createPayouts = function() {
        a = [];
        c = [];
        for (var b = [{
                x: 450,
                y: 122
            }, {
                x: 450,
                y: 302
            }, {
                x: 450,
                y: 486
            }, {
                x: 780,
                y: 122
            }, {
                x: 780,
                y: 302
            }, {
                x: 1100,
                y: 122
            }, {
                x: 1100,
                y: 302
            }], d = 0, e = 0; e < s_aSymbolWin.length; e++) {
            for (var l = [], h = 0; h < s_aSymbolWin[e].length; h++) l[h] = s_aSymbolWin[e][h];
            do h = l.indexOf(0), -1 !== h && l.splice(h, 1); while (-1 !== h);
            h = l.length;
            if (0 !== h) {
                var p = 30;
                4 === h && (p = 22);
                var u = b[d].y;
                a[e] = [];
                c[e] = [];
                for (var n = 0; n < h; n++) {
                    var t = new createjs.Text("X" +
                        (5 - n), "25px " + FONT_GAME, "#ffffff");
                    t.textAlign = "center";
                    t.x = b[d].x;
                    t.y = u;
                    t.textBaseline = "alphabetic";
                    f.addChild(t);
                    a[e][n] = t;
                    var q = new createjs.Text(l[h - n - 1], "25px " + FONT_GAME, "#ffff00");
                    q.textAlign = "center";
                    q.x = t.x + 50;
                    q.y = t.y;
                    q.textBaseline = "alphabetic";
                    f.addChild(q);
                    c[e][n] = q;
                    u += p
                }
                d++
            }
        }
    };
    this.show = function() {
        f.visible = !0
    };
    this.hide = function() {
        f.visible = !1
    };
    this.resetHighlightCombo = function() {
        for (var b = 0; b < a.length; b++)
            for (var d = 0; d < a[b].length; d++) a[b][d].color = "#ffffff", c[b][d].color = "#ffff00",
                createjs.Tween.removeTweens(c[b][d]), c[b][d].alpha = 1
    };
    this.highlightCombo = function(a, b) {
        c[a - 1][NUM_REELS - b].color = "#ff0000";
        this.tweenAlpha(c[a - 1][NUM_REELS - b], 0)
    };
    this.tweenAlpha = function(a, b) {
        var c = this;
        createjs.Tween.get(a).to({
            alpha: b
        }, 200).call(function() {
            1 === b ? c.tweenAlpha(a, 0) : c.tweenAlpha(a, 1)
        })
    };
    this._onExit = function() {
        s_oGame.hidePayTable()
    };
    this.isVisible = function() {
        return f.visible
    };
    this._init()
}

function CStaticSymbolCell(a, c, b, e) {
    var f = -1,
        g, d, k, l;
    this._init = function(a, b, c, e) {
        l = new createjs.Container;
        l.visible = !1;
        d = [];
        for (a = 0; a < NUM_SYMBOLS; a++) b = createSprite(s_aSymbolAnims[a], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE), b.stop(), b.x = c, b.y = e, b.on("animationend", this._onAnimEnded, null, !1, {
            index: a
        }), l.addChild(b), d[a] = b, d[a].visible = !1;
        a = {
            framerate: 60,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1,
                    19
                ]
            }
        };
        a = new createjs.SpriteSheet(a);
        k = new createjs.Sprite(a, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        k.stop();
        k.x = c;
        k.y = e;
        l.addChild(k);
        s_oStage.addChild(l)
    };
    this.unload = function() {
        s_oStage.removeChild(l)
    };
    this.hide = function() {
        -1 < f && (k.gotoAndStop("static"), k.visible = !1, d[f].gotoAndPlay("static"), l.visible = !1)
    };
    this.show = function(a) {
        k.gotoAndPlay("anim");
        k.visible = !0;
        for (var b = 0; b < NUM_SYMBOLS; b++) d[b].visible = b + 1 === a ? !0 : !1;
        d[a - 1].gotoAndPlay("anim");
        f = a - 1;
        g = d[a - 1].spriteSheet.getNumFrames();
        l.visible = !0
    };
    this._onAnimEnded = function(a, b) {
        d[b.index].currentFrame !== g && (d[b.index].stop(), setTimeout(function() {
            d[b.index].gotoAndPlay(1)
        }, 100))
    };
    this.stopAnim = function() {
        d[f].gotoAndStop("static");
        d[f].visible = !1;
        k.gotoAndStop("static");
        k.visible = !1
    };
    this._init(a, c, b, e)
}

function CTweenController() {
    this.tweenValue = function(a, c, b) {
        return a + b * (c - a)
    };
    this.easeLinear = function(a, c, b, e) {
        return b * a / e + c
    };
    this.easeInCubic = function(a, c, b, e) {
        e = (a /= e) * a * a;
        return c + b * e
    };
    this.easeBackInQuart = function(a, c, b, e) {
        e = (a /= e) * a;
        return c + b * (2 * e * e + 2 * e * a + -3 * e)
    };
    this.easeInBack = function(a, c, b, e) {
        return b * (a /= e) * a * (2.70158 * a - 1.70158) + c
    };
    this.easeOutCubic = function(a, c, b, e) {
        return b * ((a = a / e - 1) * a * a + 1) + c
    }
}

function CCreditsPanel() {
    var a, c, b, e, f, g, d, k, l, h;
    this._init = function() {
        h = new createjs.Container;
        h.alpha = 0;
        s_oStage.addChild(h);
        var p = new createjs.Shape;
        p.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(p);
        c = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        h.addChild(c);
        d = new createjs.Shape;
        d.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = .01;
        d.on("click", this._onLogoButRelease);
        h.addChild(d);
        p = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 390;
        e = new CGfxButton(a, 185, p, h);
        e.addEventListener(ON_MOUSE_UP, this.unload, this);
        g = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#000");
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = CANVAS_WIDTH / 2;
        g.y = 270;
        g.outline = 3;
        h.addChild(g);
        f = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#fff");
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.x = CANVAS_WIDTH / 2;
        f.y = 270;
        h.addChild(f);
        p = s_oSpriteLibrary.getSprite("logo_ctl");
        b = createBitmap(p);
        b.regX = p.width /
            2;
        b.regY = p.height / 2;
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2;
        h.addChild(b);
        l = new createjs.Text("www.codethislab.com", "34px " + FONT_GAME, "#000");
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = CANVAS_WIDTH / 2;
        l.y = 395;
        l.outline = 3;
        h.addChild(l);
        k = new createjs.Text("www.codethislab.com", "34px " + FONT_GAME, "#fff");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 395;
        h.addChild(k);
        createjs.Tween.get(h).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, b) {};
    this.unload = function() {
        d.off("click", this._onLogoButRelease);
        e.unload();
        e = null;
        s_oStage.removeChild(h)
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
    };
    this._init()
};