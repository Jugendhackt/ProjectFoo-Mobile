function Page_Authenticate_Show() {
    var page = $(".page.page-authenticate");
}

function Page_Authenticate_Init() {
    var page = pages.authenticate;
    var authInput = page.dom.find("#AuthCode");
    var authSubmit = page.dom.find("#SubmitAuthCode");
    var authResult = page.dom.find("#AuthCodeResult");
    authSubmit.click(function () {
        $.ajax({
            method: "POST",
            url: "http://" + localStorage.getItem("server") + "/api/authenticate.php",
            data: {
                authcode: authInput.val()
            },
            success: function (result) {
                if (result != "") {
                    result = JSON.parse(result);
                    authResult.text("Hallo " + result.firstname + "! :)");
                    authResult.css("color", "#008800");
                    setTimeout(function () {
                        SwapPage(pages.splash)
                    }, 1750);
                    localStorage.setItem("authcode", authInput.val());
                    authResult.fadeIn(250);
                }
                else {
                    Error();
                }
            },
            error: Error
        });
    });

    function Error() {
        authResult.text("Authentifizierung fehlgeschlagen. :(");
        authResult.css("color", "#880000");
        authResult.fadeIn(250, function () {
            setTimeout(function () {
                authResult.fadeOut(250);
            }, 1000);
        });
    }
}