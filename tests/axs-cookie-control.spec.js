/**
 * Created by Adrian Tello on 10.08.15.
 */
describe("axs-cookie-control plugin should", function() {
	var widgetElement;

	beforeEach(function() {
		widgetElement = $("<div></div>");
		widgetElement.cookieControl();
	});

	it("become the expected structure and classes when initialized", function() {
		expect(widgetElement.hasClass('axs-cookie-control')).toBe(true);

		var wrapper = widgetElement.children();
		expect(wrapper.hasClass('axs-cookie-control-wrapper')).toBe(true);

		//Validate that has 2 children (text-wrapper and buttons-div...)
		var children = wrapper.children();
		expect(children.length).toBe(2);

		var textWrapper = $(children[0]);
		expect(textWrapper.hasClass('axs-cookie-control-text-wrapper')).toBe(true);
		expect(textWrapper.text().length).not.toBe(0);

		var buttonsDiv = $(children[1]);
		expect(buttonsDiv.hasClass('axs-cookie-control-buttons')).toBe(true);

		var buttons = buttonsDiv.children();
		expect(buttons.length).toBe(2);

		var declineButton = $(buttons[0]);
		expect(declineButton.hasClass('axs-cookie-control-decline-button')).toBe(true);
		expect(declineButton.text().length).not.toBe(0);

		var acceptButton = $(buttons[1]);
		expect(acceptButton.hasClass('axs-cookie-control-accept-button')).toBe(true);
		expect(acceptButton.text().length).not.toBe(0);
	});
});