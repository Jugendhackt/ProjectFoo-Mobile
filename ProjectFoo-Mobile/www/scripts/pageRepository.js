function Page_Repository_Show(){
    var page = $(".page.page-repository");
}

function Page_Repository_Init(data) {
    var page = pages.repository;

    var titlebar = page.dom.find("#TitleBar");
    titlebar.find("#Name").text(data.name);
    titlebar.find("#Location").text(data.location);

    var list = page.dom.find("#List");
    list.find(".repository:not(.example)").remove();
    var example = page.dom.find(".example");
    var clone = example.clone();
    clone.removeClass("example");

    $.each(data.repositories, function (index, repository) {
        var template = clone.clone();
        template.attr("repository", repository.id);
        template.find("#Name").text(repository.name);
        template.find("#Amount").text(repository.amount + " Stück");
        template.find("#Amount").attr("value", repository.amount);
        template.find("#Price").text(parseFloat(repository.price).toFixed(2).replace(".", ",") + "€");
        list.append(template);
        template.click(function () {
            buyprompt.find("#Dialog #Drink, #Confirmation #Drink").text(repository.name);
            buyprompt.attr("repository", repository.id);
            buyprompt.fadeIn(250);
        });
    });

    var buyprompt = $("#BuyPrompt");
    buyprompt.find(".btn#Cancel, #Background").click(function () {
        buyprompt.fadeOut(250);
    });
    buyprompt.find(".btn#Buy").click(function () {
        $.ajax({
            method: "POST",
            url: "http://" + localStorage.getItem("server") + "/api/takeout.php",
            data: {
                authcode: localStorage.getItem("authcode"),
                repositoryid: parseInt(buyprompt.attr("repository"))
            },
            success: function(result){
                if (result) {
                    RefreshBalance();
                    buyprompt.find("#Dialog").fadeOut(250);
                    buyprompt.find("#Confirmation").fadeIn(250, function () {
                        setTimeout(function () {
                            buyprompt.fadeOut(250, function () {
                                buyprompt.find("#Dialog").show();
                                buyprompt.find("#Confirmation").hide();

                                var repository = $(".repository[repository=" + buyprompt.attr("repository") + "]");
                                var amount = repository.find("#Amount");
                                amount.fadeOut(250, function () {
                                    var newAmountValue = parseInt(amount.attr("value")) - 1;
                                    amount.text(newAmountValue + " Stück");
                                    amount.attr("value", newAmountValue)
                                    amount.fadeIn(250);
                                })
                            });
                        }, 2000);
                    });      
                }
            }
        });    
    });
}