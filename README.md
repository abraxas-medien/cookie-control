#README
======

##What is cookie-control?
It's a jquery ui plugin written to allow following the cookie policy.

##Installing
  1. Get a release using bower (recommended) or download it from the <a href="https://github.com/abraxas-medien/cookie-control/releases">releases page</a>.
  2. Include the dependencies: **<a href="http://jquery.com/download/">jquery</a>**, **<a href="https://github.com/carhartl/jquery-cookie/releases">jquery cookie</a>** and **<a href="https://jqueryui.com/download/">jquery ui</a>** (Only the widget component is mandatory).
  3. Include the **dist/axs-cookie-control.min.js** and **dist/axs-cookie-control.min.css**
  
###With bower
```sh
bower install axs-cookie-control -S
```

##Usage
```javascript
(function($){
    $(document).ready(function(){
        var myElement = $("#cookieDiv");
        myElement.cookieControl();
    });
})(jQuery);
```

##Examples (Source code)
 - [Demo](demo/index.html)


##API

###Methods

####Create new instance
```javascript
$(myElement).cookieControl();
```

####Create new instance with the given settings
```javascript
var settings = {
  position: 'bottom'
};

$(myElement).cookieControl(settings);
```

####Destroy the instance and restore the dom
```javascript
instance.destroy();
```

####Change any options
```javascript
instance.options({
    position: 'top'
});
```

###Events
####cookiecontrolchangedstatus
```javascript
$("#cookieDiv").on('cookiecontrolchangedstatus', function(event, values){
    console.log("Status changed");
    console.log("From:");
    console.log(values.before);
    console.log("To:" );
    console.log(values.after);
});
```

####cookiecontrolchangedposition
```javascript
$("#cookieDiv").on('cookiecontrolchangedposition', function(event, values){
    console.log("Position changed");
    console.log("From: " + values.before);
    console.log("To: " + values.after);
});
```

####cookiecontrolchangedcookie
```javascript
$("#cookieDiv").on('cookiecontrolchangedcookie', function(event, values){
    console.log("Cookie changed");
    console.log("From:");
    console.log(values.before);
    console.log("To:" );
    console.log(values.after);
});
```

####cookiecontrolchangedautoaccept
```javascript
$("#cookieDiv").on('cookiecontrolchangedautoaccept', function(event, values){
    console.log("Auto accept changed");
    console.log("From:");
    console.log(values.before);
    console.log("To:" );
    console.log(values.after);
});
```

####cookiecontrolchangedanalyticsonly
```javascript
$("#cookieDiv").on('cookiecontrolchangedanalyticsonly', function(event, values){
    console.log("Analytics mode changed");
    console.log("From: " + ((values.before)?'Enabled':'Disabled'));
    console.log("To: " + ((values.after)?'Enabled':'Disabled'));
});
```

####cookiecontrolchangedmessages
```javascript
$("#cookieDiv").on('cookiecontrolchangedmessages', function(event, values){
    console.log("Messages changed");
    console.log("From:");
    console.log(values.before);
    console.log("To:" );
    console.log(values.after);
});
```

####cookiecontrolchangedbuttons
```javascript
$("#cookieDiv").on('cookiecontrolchangedbuttons', function(event, values){
    console.log("Buttons changed");
    console.log("From:");
    console.log(values.before);
    console.log("To:" );
    console.log(values.after);
});
```

##Options (with default values)
```javascript
{
    position: "top", //Valid values: top and bottom
    cookie: {
        name: 'axs-cookie-control',
        expires: 30, //Days to expire the cookie
        path: '/'
    },
    autoAccept: false, //Can be {scroll: true, click: true} to specify when it should be auto accepted.
    analyticsOnly: false, //Generic or analytics mode (For showing the texts)
    messages: {
        buttons: {
            accept: "Accept Cookies", //Text for the accept cookies button
            decline: "Decline Cookies" //Text for the decline cookies button
        },
        normal: { //Texts used when the auto accept mode is disabled
            analytics: 'We use cookies, just to track visits to our website, we store no personal details.',
            "generic": 'We use cookies on this website, you can read about them <a href="http://en.wikipedia.org/wiki/HTTP_cookie">here</a>.'
        },
        autoAccept: { //Texts used when the auto accept mode is enabled
            analytics: 'We use cookies, just to track visits to our website, we store no personal details. Using the website you consent the use of cookies.',
            "generic": 'We use cookies on this website, you can read about them <a href="http://en.wikipedia.org/wiki/HTTP_cookie">here</a>. Using the website you consent the use of cookies.'
        }
    },
    buttons: {
        accept: true, //Show the accept button?
        decline: true //Show the decline button'
    }
}
```

##Credits
Baked by Adrian Tello <a href="http://www.abraxas-medien.de">(Abraxas-Medien)</a>