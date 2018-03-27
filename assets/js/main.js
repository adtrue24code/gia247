$(document).ready(function() {
    setupClock();
    setupMenu();
});

function setupFormExchange() {
    $(document).on('click', '.form-exchange .exchange-btn', function(){
        var exchangeBtn = $(this);
        var prev = exchangeBtn.prev();
        var next = exchangeBtn.next();

        exchangeBtn.before(next);
        exchangeBtn.after(prev);
    });

    $(document).on('keyup paste', '.form-exchange input', function(){
        var input = $(this).val().trim();
        var this_price = $(this).attr("data-price");
        var that = $(this).parent().siblings(".input-group").find("input");
        var that_price = that.attr("data-price");
        var result_element = $(this).closest(".form-exchange").find(".result");

        if (input == "") {
            that.val("");
            result_element.removeClass("show");
            return;
        }

        var output = input * that_price / this_price;
        output = numeral(output).format('0,0.[0000000]');

        if (output == "NaN") {
            output = "0";
        }

        var result_text = input + " " + $(this).attr("data-symbol") + " = " + output + " " + that.attr("data-symbol");

        result_element.text(result_text);
        result_element.addClass("show");
        that.val(output);
    });
}

function setupClock() {
    setInterval(function () {
        var ct = new Date();
        var m = ct.getMonth() + 1;
        if (m < 10) {
            m = '0' + m;
        }
        var d = ct.getDate();
        if (d < 10) {
            d = '0' + d;
        }
        var h = ct.getHours();
        if (h < 10) {
            h = '0' + h;
        }
        var s = ct.getSeconds();
        if (s < 10) {
            s = '0' + s;
        }
        var mi = ct.getMinutes();
        if (mi < 10) {
            mi = '0' + mi;
        }
        document.getElementById("currentTime").innerHTML = h + ':' + mi + ':' + s + ' | ' + d + '/' + m + '/' + ct.getFullYear();
    }, 500);
}

function setupMenu() {
    $(".menu-toggle").click(function () {
        $(".menu").toggle();
    });

    $(".menu i.fa-caret-down").click(function () {
        $(this).closest("li").find(".sub-menu .group").toggle();
        return false;
    });
}

function getPara(url, name) {
    url = url + ""; // convert to string
    var array = url.split(/\?|&/);
    var i = 0;
    for (i = 1; i < array.length; i++) {
        if (array[i].split('=')[0].toLowerCase() == name.toLowerCase()) return array[i].split('=')[1];
    }
    return '';
}

function getParaCurr(name) {
    var url = document.location;
    return getPara(url, name);
}

function setPara(url, name, value) {
    url = url + ""; // convert to string
    var check = false;
    var isFirst = true;
    var ret = "";
    var array = url.split(/\?|&/);
    ret = ret + array[0];
    var i = 0;
    for (i = 1; i < array.length; i++) {
        var N = array[i].split('=')[0];
        var V = array[i].split('=')[1];
        if (N == name) {
            V = value;
            check = true;
        }
        ret = isFirst ? ret + "?" + N + "=" + V : ret + "&" + N + "=" + V;
        isFirst = false;
    }
    if (!check) ret = isFirst ? ret + "?" + name + "=" + value : ret + "&" + name + "=" + value;
    return ret;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}