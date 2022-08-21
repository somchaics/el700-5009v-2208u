
(function (window, $) {
       var radio = function (el, options) {
           this.el = el; //id : '#id-cbx'
           this.$el = $(el); //attr :  $('#id-cbx')
            this.options = options;
        };
    
        radio.prototype = {
            //default variable
            defaults: {
                checked: false
            },

            init: function () {
                this.config = $.extend({
                    // eventname: 'customEvent'
                }, this.defaults, this.options);

                this.checked = this.config.checked;
                this.group = this.config.group;

                if (this.config.color) {
                    let root = document.documentElement;
                    root.style.setProperty('--wnl-radio-backgroud', this.config.color);
                   //root.style.setProperty('--wnl-height', this.height);
                }

                var ele = document.getElementById(this.$el.attr('id'))
                this.idc = ele.id + 'rdo'; //for change
                this.label = ele.innerText;
                ele.innerText = ''; //clear

                this.int_radio();
              
                return this;
            },

            change: function (e) {

            },

            set_value: function (value) {
                var ele = document.getElementById(this.idc);
                ele.checked = value;
            },
            get_value: function () {
                var ele = document.getElementById(this.idc);
                this.checked = ele.checked;
                return this.checked;
            },

            int_radio: function () {
                   let cnode = '<input  class="radio" id="' + this.idc +
                     '" type="radio"  name = "' + this.group  +  '" />' +
                    '<label for="' + this.idc + '">' + this.label + '</label>';

                $(cnode).appendTo(this.$el);
                this.set_value(this.checked);

            }
        }
       
    $.fn.radio = function (option) {
         var arg = arguments,
         options = typeof option == 'object' && option;

         var obj = $(this),
               data = obj.data('radio');

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
             if (!data) obj.data('radio', (data = new radio(this, options)).init());

         });
        
    };

    window.radio = radio;

}) (window, jQuery);

