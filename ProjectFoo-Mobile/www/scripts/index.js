//$(document).ready(InitApp);

var pages = {
    splash: {
        dom: $(".page.page-splash"),
        show: Page_Splash_Show,
        init: Page_Splash_Init
    },
    server: {
        dom: $(".page.page-server"),
        show: Page_Server_Show,
        init: Page_Server_Init
    },
    authenticate: {
        dom: $(".page.page-authenticate"),
        show: Page_Authenticate_Show,
        init: Page_Authenticate_Init
    },
    qrcode: {
        dom: $(".page.page-qrcode"),
        show: Page_QRCode_Show,
        init: Page_QRCode_Init
    },
    repository: {
        dom: $(".page.page-repository"),
        show: Page_Repository_Show,
        init: Page_Repository_Init
    },
    balance: {
        dom: $(".page.page-balance"),
        show: Page_Balance_Show,
        init: Page_Balance_Init
    }
};
var currentPage = pages.splash;
var currentZIndex = 0;
function SwapPage(page) {
    page.dom.css("z-index", ++currentZIndex);
    page.dom.fadeIn(500, function () {
        page.show();
        currentPage.dom.hide();
        currentPage = page;
    });
}

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        document.addEventListener('pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        window.plugins.headerColor.tint("#c2122f");
        StatusBar.backgroundColorByHexString("#c2122f");
        InitApp();
    };
    

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function InitApp() {
    pages.server.init();
    pages.authenticate.init();
    pages.qrcode.init();
    pages.balance.init();
    setTimeout(function () {
        pages.splash.show();
    }, 1000)
}
