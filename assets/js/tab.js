$(document).ready(function() {
    $(".tab-group > .tabs > *").click(function () {
        var tab = $(this);

        if (tab.hasClass("active")) {
            return;
        }

        var tabs = tab.parent();
        var tabGroup = tabs.parent();
        var index = tabs.children().index(tab);

        tabs.children().removeClass("active");
        tab.addClass("active");

        var tabContents = tabGroup.find(".tab-contents");

        tabContents.children().removeClass("active");
        tabContents.children().eq(index).addClass("active");
    });
});