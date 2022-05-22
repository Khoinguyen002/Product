$().ready(function() {
	$("form").validate({
		rules: {
			"username": {
				required: true,
			},
			"password": {
				required: true,
			},
			"passwordConfirmation": {
				required: true,
				validateConfirmPassword: "input[name=password]"
			}
		},
		// required field needed, if no required field, no effect message
		messages: {
			passwordConfirmation: {
				required: "Please provide a password!",
				validateConfirmPassword: "Password does not match!"
			},
		}
	});
	$.validator.addMethod("validateConfirmPassword", function (value, element, param3) {
		return this.optional(element) || $(param3).val() === value
	});
});