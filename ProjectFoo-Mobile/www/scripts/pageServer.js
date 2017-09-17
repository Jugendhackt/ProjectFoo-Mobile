function Page_Server_Show() {
    var page = $(".page.page-server");
}

function Page_Server_Init() {
    var page = pages.server;
    var ipInput = page.dom.find("#ServerIP");
    var ipSubmit = page.dom.find("#SubmitServerIP");
    var ipResult = page.dom.find("#ServerIPResult");
    ipSubmit.click(function () {
        $.ajax({
            method: "POST",
            url: "http://" + ipInput.val() + "/api/handshake.php",
            data: {
                message: "are you there?"
            },
            success: function (result) {
                if (result == "yes") {
                    ipResult.text("Server-Verbindung hergestellt!");
                    ipResult.css("color", "#008800");
                    setTimeout(function () {
                        SwapPage(pages.authenticate)
                    }, 1750);
                    localStorage.setItem("server", ipInput.val());
                    ipResult.fadeIn(250);
                }
                else {
                    Error();
                }
            },
            error: Error
        });
    });

    function Error() {
        ipResult.text("Server-Verbindung fehlgeschlagen!");
        ipResult.css("color", "#880000");
        ipResult.fadeIn(250, function () {
            setTimeout(function () {
                ipResult.fadeOut(250);
            }, 1000);
        });
    }
}