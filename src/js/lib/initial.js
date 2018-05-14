// app配置信息，全局变量
var HYAPP = {
};
(function () {
    var timer;

    function setSize() {
        var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var appw, apph, remSize;
        appw = ww;
        apph = wh;
        // 默认为宽度十分之一
        if (1.9 * wh < ww) {
            remSize = ww / 14 / 1.9;
        } else if (wh < ww) {
            remSize = wh / 14;
        } else {
            if (ww >= 768) {
                remSize = ww / 14;
            } else {
                remSize = ww / 10;
            }
        }
        document.documentElement.style.fontSize = remSize + "px";
        HYAPP.APP_PX = remSize;
        HYAPP.APP_W = appw;
        HYAPP.APP_H = apph;
    }

    setSize();

    // window.addEventListener('resize', setSize);
    window.addEventListener('resize', function () {
        if (window.lockResize) return;
        clearTimeout(timer);
        timer = setTimeout(setSize, 300);
    });
    window.addEventListener('orientationchange',function(e){
        if (window.lastRotate === window.orientation) return;
        clearTimeout(timer);
        timer = setTimeout(setSize, 300);
        window.lastRotate = window.orientation;
    });

    HYAPP.setSize = setSize;
    // ios无痕模式下，不允许使用localStorage，并且调用localStorage.setItem会报出异常
    function isSessionStorageNameSupported() {
        var testKey = 'test_sessionStorage', storage = window.sessionStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    function isLocalStorageNameSupported() {
        var testKey = 'test_localstorage', storage = window.localStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    HYAPP.allowSessionStorage = isSessionStorageNameSupported();
    HYAPP.allowLocalStorage = isLocalStorageNameSupported();

    var hotkey = [];
    var dieOn = false;
    window.addEventListener("touchstart", function (e) {
        var touch = ((e.touches || [])[0] || {});
        var clientX = touch.clientX;
        var clientY = touch.clientY;
        var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (clientX < 50 && clientY < 50) {
            hotkey.push(true);
            if (hotkey.length === 12) {
                if (window.sessionStorage.getItem("die")) {
                    window.sessionStorage.removeItem("die");
                } else {
                    window.sessionStorage.setItem("die", 1);
                }
            }
        } else {
            hotkey = [];
        }

        if (clientX > ww - 50 && clientY < 50) {
            // if (!window.sessionStorage.getItem("die")) return;
            // var div = document.createElement("div");
            // div.innerHTML = '<div class="die-panel"  style="position: fixed; width: 100% height: 50%; z-index: 999999;"><p class="die-title" style="margin: 0;padding: .4rem; background-color: white;border: 1px solid #e6e6e6;">&nbsp;</p><textarea id="dieTxt" style="width: 320px; height: 200px; border: 1px solid rgb(224, 224, 224); margin: 0px;"> </textarea></div>';
            // document.body.append(div);
            // var title = document.querySelector(".die-title");
            // title.addEventListener("touchstart", function(e) {
            //     if (dieOn) {
            //         dieOn = false;
            //         document.querySelector(".die-panel").style.top = 0;
            //         document.querySelector(".die-panel").style.bottom = '';
            //     } else {
            //         dieOn = true;
            //         document.querySelector(".die-panel").style.bottom = 0;
            //         document.querySelector(".die-panel").style.top = '';
            //     }
            // });
        }
    });

    if (window.sessionStorage.getItem("die")) {
        var div = document.createElement("div");
        div.innerHTML = '<div class="die-panel"  style="position: fixed; width: 100% height: 50%; z-index: 999999;"><p class="die-title" style="margin: 0;padding: .4rem; background-color: white;border: 1px solid #e6e6e6;">&nbsp;</p><textarea id="dieTxt" style="width: 320px; height: 200px; border: 1px solid rgb(224, 224, 224); margin: 0px;"> </textarea></div>';
        document.body.append(div);
        var title = document.querySelector(".die-title");
        title.addEventListener("click", function(e) {
            if (dieOn) {
                dieOn = false;
                document.querySelector(".die-panel").style.top = 0;
                document.querySelector(".die-panel").style.bottom = '';
            } else {
                dieOn = true;
                document.querySelector(".die-panel").style.bottom = 0;
                document.querySelector(".die-panel").style.top = '';
            }
        });
    }
})();
window.HYAPP = HYAPP;
