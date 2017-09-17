function Page_QRCode_Show() {
    var page = $(".page.page-qrcode");
    QRScanner.scan(scanResponse);
    QRScanner.show();
    page.css("background-color", "transparent");
    setTimeout(function () {
        page.find("#MenuButton, #Manual, #Border").fadeTo(500, 0.7);
    }, 500);

    var menuOpen = false;
    var menuAnimation = false;
    page.find("#MenuButton").click(function () {
        if (!menuAnimation) {
            menuAnimation = true;
            $(this).toggleClass("open");
            page.find("#Manual").fadeTo(500, !menuOpen ? 0 : 0.7);
            page.find("#Menu").fadeTo(500, menuOpen ? 0 : 0.7, function () {
                menuAnimation = false;
            });
            menuOpen = !menuOpen;
        }
    });
    page.find("#Menu #Balance").click(function () {
        SwapPage(pages.balance);
    });
    page.find("#Menu #Reset").click(function () {
        localStorage.clear();
        location.reload(true);
        setTimeout(function () {
            QRScanner.destroy();
        }, 3000);
    });

    function scanResponse(err, text) {
        if (!err) {
            if (text.indexOf("foo-fridge:") == 0) {
                Toast("QR-Code wird verifiziert...", 250, -1);
                $.ajax({
                    method: "POST",
                    url: "http://" + localStorage.getItem("server") + "/api/qrcode.php",
                    data: {
                        fridgeidentifier: text.split(":")[1]
                    },
                    success: function (result) {
                        if (result != "") {
                            setTimeout(function () {
                                var json = JSON.parse(result);
                                pages.repository.init(json);
                                SwapPage(pages.repository);
                                setTimeout(function () { QRScanner.destroy(); }, 3000);
                            }, 750);
                        }
                        else {
                            Error(false);
                        }
                    },
                    error: function () {
                        Error(false);
                    }
                });
            }
            else {
                Error(true);
            }
        } else {
            console.log(err);
            Error(true);
        }
    }

    function Toast(message, fadeInTime, displayTime, fadeOutTime, after) {
        var toast = page.find("#Toast");
        toast.text(message);
        toast.fadeTo(fadeInTime, 0.7, function () {
            if (displayTime != -1) {
                setTimeout(function () {
                    toast.fadeOut(fadeOutTime, function () {
                        if (after != undefined) {
                            after();
                        }
                    });
                }, displayTime);
            }
        });
    }

    function Error(fadeIn) {
        setTimeout(function () {
            Toast("QR-Code ungültig!", fadeIn ? 250 : 1, 1500, 250, function () {
                QRScanner.scan(scanResponse);
            });
        }, fadeIn ? 1 : 500);
    }
}

function Page_QRCode_Init() {
    var page = pages.qrcode;
}