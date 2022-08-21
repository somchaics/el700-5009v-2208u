

function currency_format(value) {
    var num = parseFloat(value);
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

$(function () {

    $(".currency").on("keypress blur", function (event) {
        var d = this.value.indexOf('.');

        if (d != -1) { //ให้หลัง จุด มีแค่ 2 ตัว
            var s = this.value.split('.');
            if (s[1].length > 1 && this.selectionStart > d) {
                event.preventDefault();
            }
        }

        if (event.keyCode == 46) {
            var s = this.value.split('.');
            this.value = s[0] + ".";
            this.value = this.value.replace(/[^0-9\.+\d{2}]/g, '');
            event.preventDefault();
        }

        if ((event.which != 46 || d != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }

    });

    $(".currency").on("keyup blur", function (event) {
        if (event.keyCode == 27) {
            this.value = '';
            this.value = this.value.replace(/[^0-9\.+\d{2}]/g, '');
            return false;
        }

        if (event.keyCode == 13) {
            $(this).blur();
        }
    });

    $(".currency").on("focus", function (event) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $(".currency").on("blur", function (event) {
        if (this.value.trim().length == 0) this.value = "0";
        $(this).val(currency_format(this.value));
    });

});
