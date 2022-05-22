$().ready(function() {
	$("form.confirmCart").validate({
		rules: {
			"email": {
				required: true,
			},
			"address": {
				required: true,
			},
		}
	});
	$("form.changeCart input[type='number']").focus(() => {
		$("form.changeCart input[type='hidden'].btn").attr("type", "submit");
	})
});