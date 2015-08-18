/**
 * Created by tello on 10.08.15.
 */
(function($){
	$.widget( "axs.cookieControl", {
		options: {
			position: "top", //Valid values: top and bottom
			cookie: {
				name: 'axs-cookie-control',
				expires: 30,
				path: '/'
			},
			autoAccept: false,
			analyticsOnly: false, //Generic or analytics mode
			messages: {
				buttons: {
					accept: "Accept Cookies",
					decline: "Decline Cookies"
				},
				normal: {
					analytics: 'We use cookies, just to track visits to our website, we store no personal details.',
					"generic": 'We use cookies on this website, you can read about them <a href="http://en.wikipedia.org/wiki/HTTP_cookie">here</a>.'
				},
				autoAccept: {
					analytics: 'We use cookies, just to track visits to our website, we store no personal details. Using the website you consent the use of cookies.',
					"generic": 'We use cookies on this website, you can read about them <a href="http://en.wikipedia.org/wiki/HTTP_cookie">here</a>. Using the website you consent the use of cookies.'
				}
			},
			buttons: {
				accept: true,
				decline: true
			}
		},
		_create: function(){
			this._creating = true;

			this.data = {};

			this._dom = this._initDOM();

			//setup other listeners
			this._on(
				this.element,
				{
					'cookiecontrolchangedposition': '_positionChanged',
					'cookiecontrolchangedcookie': '_cookieChanged',
					'cookiecontrolchangedautoaccept': '_autoAcceptChanged',
					'cookiecontrolchangedanalyticsonly': '_analyticsOnlyChanged',
					'cookiecontrolchangedmessages': '_messagesChanged',
					'cookiecontrolchangedbuttons': '_buttonsChanged'
				}
			);

			//Set initial settings
			this._setOptions(this.options, true);
			this._creating = false;
		},
		_initDOM: function(){
			this.element.addClass('axs-cookie-control');

			//Set the content
			var wrapper = $('<div class="axs-cookie-control-wrapper"></div>');
			var textWrapper = $('<div class="axs-cookie-control-text-wrapper"></div>');

			var acceptButton = $('<button type="button" class="axs-cookie-control-accept-button"></button>');
			var declineButton = $('<button type="button" class="axs-cookie-control-decline-button"></button>');
			var buttons = $('<div class="axs-cookie-control-buttons"></div>');
			buttons.append(declineButton, acceptButton);

			wrapper.append(textWrapper, '&nbsp;', buttons);
			this.element.append(wrapper);

			var widget = this;
			$(document.body).on('click', function(event){
				widget._onClick.apply(widget, [event]);
			});
			$(window).on('scroll', function(event){
				widget._onScroll.apply(widget, [event]);
			});

			this._on(acceptButton, {
				click: function(event){
					widget.setStatus.apply(widget, [true]);

					event.preventDefault();
					event.stopPropagation();
				}
			});

			this._on(declineButton, {
				click: function(event){
					widget.setStatus.apply(widget, [false]);

					event.preventDefault();
					event.stopPropagation();
				}
			});

			return {
				wrapper: wrapper,
				textWrapper: textWrapper,
				buttons: buttons,
				acceptButton: acceptButton,
				declineButton: declineButton
			};
		},
		_setOptions: function( options, force) {
			force = (force === true);

			var widget = this;

			$.each( options, function( key, value ) {
				var exists = widget.options.hasOwnProperty(key);
				var beforeValue;
				if (exists){
					beforeValue = widget.options[key];
				} else {
					beforeValue = undefined;
				}

				if (force || !widget._equals(beforeValue, value)){
					widget._setOption( key, value );

					widget._trigger( "changed" + key, null, {
						before: beforeValue,
						after: value,
						creating: this._creating
					});
				}
			});
		},
		isAutoAcceptEnabled: function(){
			return this.options.autoAccept === true || this.options.autoAccept.scroll === true || this.options.autoAccept.click === true;
		},
		_updateText: function(){
			var textArray = undefined;
			if (this.isAutoAcceptEnabled()) {
				textArray = this.options.messages.autoAccept;
			} else {
				textArray = this.options.messages.normal;
			}

			var text = undefined;
			if (this.options.analyticsOnly) {
				text = textArray.analytics;
			} else {
				text = textArray.generic;
			}

			this._dom.textWrapper.empty();
			this._dom.textWrapper.append(text);
		},
		_updateButtons: function(){
			var acceptButton = this._dom.acceptButton;
			acceptButton.empty();
			acceptButton.append(this.options.messages.buttons.accept);
			acceptButton.toggle(this.options.buttons.accept);

			var declineButton = this._dom.declineButton;
			declineButton.empty();
			declineButton.append(this.options.messages.buttons.decline);
			declineButton.toggle(this.options.buttons.decline);
		},
		_onScroll: function(){
			if ((this.options.autoAccept === true || this.options.autoAccept.scroll === true) && this.getStatus() == undefined) {
				this.setStatus(true);
			}
		},
		_onClick: function(){
			if ((this.options.autoAccept === true || this.options.autoAccept.scroll === true) && this.getStatus() == undefined) {
				this.setStatus(true);
			}
		},
		_autoAcceptChanged: function(){
			this._updateText();
		},
		_analyticsOnlyChanged: function(){
			this._updateText();
		},
		_messagesChanged: function(){
			this._updateButtons();
			this._updateText();
		},
		_buttonsChanged: function(){
			this._updateButtons();
		},
		_positionChanged: function(event, data){
			if (data.after == "top") {
				this.element.removeClass("bottom");
			} else {
				this.element.addClass("bottom");
			}
		},
		_cookieChanged: function(event, values){
			var beforeStatus = this.getStatus(values.before.name);
			$.removeCookie(values.before.name, {path: values.before.path});

			this.setStatus(beforeStatus);
		},
		_setStatusIfChanged: function(status){
			var currStatus = this.getStatus();
			if (status !== currStatus) {
				this.setStatus(status);
			}
		},
		_setStatusImpl: function(status){
			if (status === undefined) {
				$.removeCookie(this.options.cookie.name, {
					path: this.options.cookie.path
				});
			} else {
				$.cookie(this.options.cookie.name, status, {
					expires: this.options.cookie.expires,
					path: this.options.cookie.path
				});
			}
		},
		setStatus: function(status){
			if(status === null) {
				status = undefined; //Options don't want to pass undefined status
			}

			var statusBefore = this.getStatus();
			this._setStatusImpl(status);
			if (statusBefore != status) {
				this._updateWidgetStatus(status, statusBefore);
			}
		},
		getStatus: function(cookieName){
			if (cookieName === undefined) {
				cookieName = this.options.cookie.name;
			}

			var status = $.cookie(cookieName);

			if (status === 'true') {
				return true;
			} else if(status === 'false') {
				return false;
			} else {
				return status;
			}
		},
		_updateWidgetStatus: function(status, oldStatus){

			if(status === oldStatus) {
				return;
			}

			if (status == undefined) {
				this.element.removeClass("hidden");
				this._trigger(
					"changedstatus",
					null,
					{
						before: oldStatus,
						after: status,
						creating: this._creating
					}
				);
			} else {
				this.element.addClass("hidden");

				if (status == true) {
					this._trigger(
						"changedstatus",
						null,
						{
							before: oldStatus,
							after: status,
							creating: this._creating
						}
					);
				} else {
					this._trigger(
						"changedstatus",
						null,
						{
							before: oldStatus,
							after: status,
							creating: this._creating
						}
					);
				}
			}
		},
		_equals: function(x, y){
			//Copied from here.... http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
			if ( x === y ) return true;
			// if both x and y are null or undefined and exactly the same

			if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
			// if they are not strictly equal, they both need to be Objects

			if ( x.constructor !== y.constructor ) return false;
			// they must have the exact same prototype chain, the closest we can do is
			// test there constructor.

			for ( var p in x ) {
				if ( ! x.hasOwnProperty( p ) ) continue;
				// other properties were tested using x.constructor === y.constructor

				if ( ! y.hasOwnProperty( p ) ) return false;
				// allows to compare x[ p ] and y[ p ] when set to undefined

				if ( x[ p ] === y[ p ] ) continue;
				// if they have the same strict value or identity then they are equal

				if ( typeof( x[ p ] ) !== "object" ) return false;
				// Numbers, Strings, Functions, Booleans must be strictly equal

				if ( ! this._equals( x[ p ],  y[ p ] ) ) return false;
				// Objects and Arrays must be tested recursively
			}

			for ( p in y ) {
				if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
				// allows x[ p ] to be set to undefined
			}
			return true;
		},
		_destroy: function() {
			this.element.empty();

			this.element.removeClass('top bottom axs-cookie-control hidden');
		}
	});
})(jQuery);