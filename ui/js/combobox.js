
(function (window, $) {
       var combobox = function (el, options) {
           this.el = el; //id : this.el.id
           this.$el = $(el); //attr :  this.$el.attr('id')
           this.options = options;
        };
    
        combobox.prototype = {
            //default variable
            defaults: {
               
            },

            init: function () {
                this.config = $.extend({
                    // eventname: 'customEvent'

                }, this.defaults, this.options);
               
                this.id = this.el.id + 'combobox'; //for change
                this.data = this.config.data;
                this.focus_open = this.config.focus_open;
                this.height = this.config.height;
                this.width = this.config.width;
                this.theme = new_theme(this.config.theme);
                this.radius = this.config.radius;

                this.int_combobox();
                return this;
            },
                      
            int_combobox: function () {
                var theme = this.theme;
                var index = document.getElementsByClassName("combobox" + theme).length;
                var enter_blur = this.config.enter_blur;
                
                var ele = document.getElementById(this.$el.attr('id'));
                ele.parentNode.classList.add(new_scrollbar(this.config.theme));
                var w = parseInt(ele.parentNode.style.width);
              
                if (w < 150) w = 150;
                ele.parentNode.style.width = w + 'px';
                ele.style.width = w-30 + 'px';

                if (this.radius) ele.parentNode.style.borderRadius = '0 25px 25px 0';
                ele.parentNode.classList.add("combobox" + theme);
                ele.parentNode.setAttribute("id", this.el.id + "combobox");
                let cnode = '<span></span>';
                $(cnode).appendTo(ele.parentNode);
              
                var a = document.createElement("div");
                a.setAttribute("id", this.el.id + "combobox-list");
                a.setAttribute("class", "combobox-items" + theme);
                a.setAttribute('style', 'width:' + this.width + '%; ' + 'height:' + this.height + 'px;');
                ele.parentNode.appendChild(a);
              
                var arr = this.data;
                var currentFocus = -1;
                var idc = this.el.id;
                var focus_open = this.focus_open;
               
                add_data();

                function add_data() {
                    for (i = 0; i < arr.length; i++) {
                        var b = document.createElement("div");
                        b.innerHTML = arr[i];
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                        b.addEventListener("click", function (e) {
                            var val = this.getElementsByTagName("input")[0].value;
                            ele.value = val;
                            ele["data-content"] = val;
                           
                            $(".combobox-items" + theme)[index].classList.toggle("combobox-show" + theme);
                            var x = document.getElementById(idc + "combobox-list");
                            if (x) {
                                x = x.getElementsByTagName("div");

                                for (var i = 0; i < x.length; i++) {
                                    if (x[i].innerText == val) {
                                        currentFocus = i;
                                    }
                                    x[i].classList.remove("combobox-active" + theme);
                                }
                            }
                            this.classList.add("combobox-active" + theme);
              
                        });
                        a.appendChild(b);
                    }
                };
                             
                var si = "#" + ele.parentNode.id+ " span";
                $(si).on('click', function (e) {
                    var t = $(".combobox-items" + theme)[index].classList.toggle("combobox-show" + theme);
                    if (t) $(".combobox" + theme+ " input" )[index].focus();
                });

                $("#" + this.el.id).on("keydown", function (e) {
                    var x = document.getElementById(this.id + "combobox-list");
                  
                    if (x) x = x.getElementsByTagName("div");           
                    if (e.keyCode == 27) {
                        this.value = '';
                    }
                    if (e.keyCode == 40) {
                        currentFocus++;
                        addActive(x);

                        if (currentFocus <= x.length)
                            x[currentFocus].scrollIntoViewIfNeeded(false);

                    } else if (e.keyCode == 38) { //up
                        currentFocus--;
                        addActive(x);

                        if (currentFocus >= 0)
                            x[currentFocus].scrollIntoViewIfNeeded(false);

                    } else if (e.keyCode == 13) {
                        e.preventDefault();
                        if (currentFocus >=0) {
                            if (x) x[currentFocus].click();
                            if (enter_blur) this.blur();
                        }
                    }
                });

                function addActive (x) {
                    if (!x) return false;
                    removeActive(x);
                    if (currentFocus >= x.length) currentFocus = x.length - 1;
                    if (currentFocus < 0) currentFocus = 0;
                    x[currentFocus].classList.add("combobox-active" + theme);
                };

                function removeActive(x) {
                    for (var i = 0; i < x.length; i++) {
                        x[i].classList.remove("combobox-active" + theme);
                    }
                };

                $("#" + this.el.id).on("input", function (e) {
                     search(this.value);
                });

                function search(value) {
                    var x = document.getElementById(idc + "combobox-list");
                    if (!x) return false;
                    x = x.getElementsByTagName("div");
                    removeActive(x);
                   
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                            currentFocus = i;
                            x[currentFocus].classList.add("combobox-active" + theme);
                            x[currentFocus].scrollIntoViewIfNeeded(false);
                            break;
                        }
                    }
                };

                $("#" + this.el.id).on("focus", function (e) {
                    removeAll();
                    if (!focus_open) return false;
                    var t = $(".combobox-items" + theme)[index].classList.toggle("combobox-show" + theme);
                    if (!t) $(".combobox-items" + theme)[index].classList.toggle("combobox-show" + theme);
                });

                function removeAll() {
                    for (let j = 0; j < theme_value.length; j++) {
                        var th = theme_value[j] == "" ? "" : "-" + theme_value[j];
                      
                        var dropdowns = document.getElementsByClassName("combobox-items" + th);
                        for (var i = 0; i < dropdowns.length; i++) {
                            dropdowns[i].classList.remove('combobox-show' + th);
                        }
                    }
                };

                window.onclick = function (event) {
                    var is_close = false;
                    for (let j = 0; j < theme_value.length; j++) {
                        var th = theme_value[j] == "" ? "" : "-" + theme_value[j];

                        if (!event.target.matches('.combobox' + th) &&
                            !event.target.matches('input') &&
                            !event.target.matches('span') &&
                            !event.target.matches('.combobox-items' + th)) {

                            is_close = true;
                        }
                    }

                    if (is_close) removeAll();
                };

            },

            get_value: function () {
                var ele = document.getElementById(this.el.id)["data-content"];
                return ele;
            },
            set_value: function (value) {
                var ele = document.getElementById(this.el.id);
                ele.value = value;
                el["data-content"] = value;
            },

        }
       
    $.fn.combobox = function (option) {
         var arg = arguments,
         options = typeof option == 'object' && option;

         var obj = $(this),
               data = obj.data('combobox');

         //get set
         if (typeof option === 'string') {
            if (arg.length > 1) { //set
                var a = Array.prototype.slice.call(arg, 1);
                data[option](a);
            }
            else { //get
                return data[option]();
            }
         }

         //initial
        return this.each(function () {
            if (!data) obj.data('combobox', (data = new combobox(this, options)).init());

         });
        
    };

    window.combobox = combobox;

})(window, jQuery);




