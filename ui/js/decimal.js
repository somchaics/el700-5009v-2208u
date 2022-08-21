
        
        function decimal_format(value, dec) {
            var num = parseFloat(value);
            if (dec == 0) {
              //  var d = value.indexOf('.');
                var str = num.toString().split(".");
                str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return str.join(".");
               // return d == -1 ? str.join(".") : str.join(".")+ ".";
            }

            return num.toFixed(dec).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

        $(function () {
            var len = null;
  
            $(".decimal").on("keypress blur", function (event) {
 
                var dc = this.placeholder;
                var dl = dc.indexOf('.');
                var sl = dc.split('.');
                len = dl == -1 ? 0 : sl[1].length;
        
                var d = this.value.indexOf('.');

                if (d != -1) { //ให้หลัง จุด มีแค่ len ตัว
                    var s = this.value.split('.');
                    if (s[1].length > len -1 && this.selectionStart > d) {
                        event.preventDefault();
                    }
                }

                if (event.keyCode == 46) {
                    if (len == 0) return false;
                    var s = this.value.split('.');
                    this.value = s[0] + ".";
                    this.value = this.value.replace(/[^0-9\.+\d{2}]/g, '');
                    event.preventDefault();
                }

                if ((event.which != 46 || d != -1) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }

            });

            $(".decimal").on("keyup blur", function (event) {
        
                if (event.keyCode == 27) {
                    this.value = '';
                    this.value = this.value.replace(/[^0-9\.+\d{2}]/g, '');
                    return false;
                }
               
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                   // $(this).blur();
                }

            });

            $(".decimal").on("focus", function (event) {
                if (this.value == 0) this.value = '';
                this.value = this.value.replace(/[^0-9\.]/g, '');
            });

            $(".decimal").on("blur", function (event) {
                if (this.value.trim().length == 0) this.value = "0";
                $(this).val(decimal_format(this.value, len));
            });

       });
