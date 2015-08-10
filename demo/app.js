(function(){
	"use strict";

	$(document).on('ready', function(){
		var cookieControl = $("#cookieControl");
		cookieControl.cookieControl({
			autoAccept: true
		});


		//Buttons
		$("#posTopBtn").on('click', function(event){
			event.stopPropagation();

			cookieControl.cookieControl('option', 'position', 'top');
		});

		$("#posBottomBtn").on('click', function(event){
			event.stopPropagation();

			cookieControl.cookieControl('option', 'position', 'bottom');
		});

		$("#statusDefBtn").on('click', function(event){
			event.stopPropagation();

			cookieControl.cookieControl('setStatus', null);
		});

		$("#statusAcceptedBtn").on('click', function(event){
			event.stopPropagation();

			cookieControl.cookieControl('setStatus', true);
		});

		$("#statusDeclinedBtn").on('click', function(event){
			event.stopPropagation();

			cookieControl.cookieControl('setStatus', false);
		});
	});
})();