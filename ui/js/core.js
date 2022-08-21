
var theme_value = ["", "blue", "black", "dark", "darkness", "light" ,"green", "pink"];

function new_theme(value) {
    if (!value) return '';
    
    for (let i = 0; i < theme_value.length; i++) {
        if (theme_value[i].toUpperCase()==value.toUpperCase()) {
            if (value == "")
                return '';
            else
                return "-" + value;
        }
    }
    return '';
}

function new_scrollbar(value) {
    if (!value) return '';
    var v = '';
    switch (value) {
        case 'dark':
        case 'black':
        case 'blue': v = value; break;
        case 'darkness': v = 'black'; break;
     }
    return v+ '-scrollbar';
}


function showNotification(title, msg, icon, url) {
    const notification = new Notification(title, {
        body: msg,
        icon: icon
    });
    notification.onclick = (e) => {
        if (url) window.location.href = url;
    }
}

function notify(title, msg, icon, url) {
    console.log(Notification.permission);
    if (Notification.permission == "granted") {
        showNotification(title, msg, icon, url);
    } else {
        if (Notification.permission != "denied") {
            Notification.requestPermission().then(permission => {
                if (permission == "granted") {
                    showNotification(title, msg, icon, url);
                }
            });
        }
    }
}



