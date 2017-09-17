function Page_Splash_Show(){
    var page = $(".page.page-splash");
    var logo = page.find("img");
    logo.show();
    logo.css("animation", "StartupLogo 500ms linear 1");
    setTimeout(function () {
        if (localStorage.getItem("authcode") != null) {
            SwapPage(pages.qrcode);
        }
        else if (localStorage.getItem("server") != null) {
            SwapPage(pages.authenticate);
        }
        else {
            SwapPage(pages.server);
        }
        setTimeout(function () {
            logo.css("animation", "none");
            logo.hide();
        }, 1000);
    }, 1500);
}

function Page_Splash_Init() {

}