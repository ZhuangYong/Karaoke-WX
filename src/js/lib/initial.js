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
        if (wh < ww) {
            remSize = wh / 14;
        } else {
            if (ww >= 768) {
                remSize = ww / 14;
            } else {
                remSize = ww / 10;
            }
        }
        document.documentElement.style.fontSize = remSize + "px";
        HYAPP.APP_W = appw;
        HYAPP.APP_H = apph;
    }

    setSize();

    // window.addEventListener('resize', setSize);
    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(setSize, 300);
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
})();
window.HYAPP = HYAPP;
