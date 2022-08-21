
$(document).on('keypress', 'input,select', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        var $next = $('[tabIndex=' + (+this.tabIndex + 1) + ']');
        if (!$next.length) {
            $next = $('[tabIndex=1]');
        }
        $next.focus().click();  
    }
});
