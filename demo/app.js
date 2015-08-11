(function(){
	"use strict";

	$(document).on('ready', function(){
		var element = $("#cookieControl");
		element.cookieControl({
			autoAccept: true
		});


		//Buttons
		$("#posTopBtn").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'position', 'top');
		});

		$("#posBottomBtn").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'position', 'bottom');
		});

		$("#statusDefBtn").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('setStatus', undefined);
		});

		$("#statusAcceptedBtn").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('setStatus', true);
		});

		$("#statusDeclinedBtn").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('setStatus', false);
		});

		$("#autoAcceptEnable").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'autoAccept', true);
		});

		$("#autoAcceptDisable").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'autoAccept', false);
		});

		$("#analyticsModeEnable").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'analyticsOnly', true);
		});

		$("#analyticsModeDisable").on('click', function(event){
			event.stopPropagation();

			element.cookieControl('option', 'analyticsOnly', false);
		});

		//Events (Logs to the console)
		element.on('cookiecontrolchangedposition', function(event, values){
			console.log("Position changed");
			console.log("From: " + values.before);
			console.log("To: " + values.after);
		});

		//Works but at the moment can't be triggered from the UI
		element.on('cookiecontrolchangedcookie', function(event, values){
			console.log("Cookie changed");
			console.log("From:");
			console.log(values.before);
			console.log("To:" );
			console.log(values.after);
		});

		element.on('cookiecontrolchangedautoaccept', function(event, values){
			console.log("Auto accept changed");
			console.log("From:");
			console.log(values.before);
			console.log("To:" );
			console.log(values.after);
		});

		element.on('cookiecontrolchangedanalyticsonly', function(event, values){
			console.log("Analytics mode changed");
			console.log("From: " + ((values.before)?'Enabled':'Disabled'));
			console.log("To: " + ((values.after)?'Enabled':'Disabled'));
		});

		//Works but at the moment can't be triggered from the UI
		element.on('cookiecontrolchangedmessages', function(event, values){
			console.log("Messages changed");
			console.log("From:");
			console.log(values.before);
			console.log("To:" );
			console.log(values.after);
		});

		//Works but at the moment can't be triggered from the UI
		element.on('cookiecontrolchangedbuttons', function(event, values){
			console.log("Buttons changed");
			console.log("From:");
			console.log(values.before);
			console.log("To:" );
			console.log(values.after);
		});
	});
})();