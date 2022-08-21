
(function (window, $) {
       var checkbox = function (el, options) {
           this.el = el; //id : '#id-cbx'
           this.$el = $(el); //attr :  $('#id-cbx')
            this.options = options;
        };
    
        checkbox.prototype = {
            //default variable
            defaults: {
                checked: false
            },

            init: function () {
                this.config = $.extend({
                    // eventname: 'customEvent'
                }, this.defaults, this.options);

                this.checked = this.config.checked;

                //let root = document.documentElement;
                //root.style.setProperty('(--wnl-width', this.width);
                //root.style.setProperty('--wnl-height', this.height);

                var ele = document.getElementById(this.$el.attr('id'))
                this.id = ele.id + 'cbx'; //for change
                this.label = ele.innerText;
                ele.innerText = ''; //clear

                this.int_checkbox();
                return this;
            },

            change: function (e) {

            },

            set_value: function (value) {
                var ele = document.getElementById(this.id);
                ele.checked = value;
            },
            get_value: function () {
                var ele = document.getElementById(this.id);
                this.checked = ele.checked;
                return this.checked;
            },

            int_checkbox: function () {
                let cnode = '<input class="wnl-checkbox" id="' + this.id +
                    '" type="checkbox" />' +
                    '<label for="' + this.id + '">' + this.label + '</label>';

                $(cnode).appendTo(this.$el);
                this.set_value(this.checked);
            }

        }
       
    $.fn.checkbox = function (option) {
         var arg = arguments,
         options = typeof option == 'object' && option;

         var obj = $(this),
               data = obj.data('checkbox');

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
            if (!data) obj.data('checkbox', (data = new checkbox(this, options)).init());

         });
        
    };

    window.checkbox = checkbox;

}) (window, jQuery);

