var balanceData;

function Page_Balance_Show() {
    
}

function Page_Balance_Init() {
    setTimeout(function () {
        if (balanceData == undefined &&
            localStorage.getItem("authcode") != null &&
            localStorage.getItem("server") != null) {
            RefreshBalance(Render);
        }
        else {
            Render();
        }

        function Render() {
            var page = pages.balance;

            var titlebar = page.dom.find("#TitleBar");
            titlebar.find("#Cost").text("Aktuelle Kosten: " + balanceData.summe.toFixed(2).replace(".", ",") + "€");
            titlebar.find("#Coins").text("Übrige Mate-Coins: " + balanceData.matecoins);

            var list = page.dom.find("#List");
            list.find(".history:not(.example)").remove();
            var example = page.dom.find(".example");
            var clone = example.clone();
            clone.removeClass("example");

            $.each(balanceData.items, function (index, history) {
                var template = clone.clone();
                template.find("#Name").text(history.name);
                template.find("#Price").text(parseFloat(history.price).toFixed(2).replace(".", ",") + "€");
                list.append(template);
            });
        }
    }, 10);
}

function RefreshBalance(after) {
    $.ajax({
        method: "POST",
        url: "http://" + localStorage.getItem("server") + "/api/balance.php",
        data: {
            authcode: localStorage.getItem("authcode")
        },
        success: function (result) {
            balanceData = JSON.parse(result)
            if (after != undefined) {
                after();
            }
        }
    });
}