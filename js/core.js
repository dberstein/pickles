$(document).ready(function()
{
	// Apply the validator if available
	if (jQuery().validate)
	{
		$('form').validate();
	}

	// Catches forms being submitted
	$('form.ajax input[type=submit], form.ajax .submit').live('click', function()
	{
		// Grabs the form
		var form = $(this).parents('form').get();

		// Removes any messages
		$('.ajax-form-error, .ajax-form-message, label.error', form).fadeOut('normal', function(){ $(this).remove(); });

		// Checks that it's valid
		if (typeof $(form).valid == 'undefined' || $(form).valid() == true)
		{
			// Sets the buttons, inputs and textareas to READONLY
			$('button, input, textarea', form).attr('readonly', 'readonly');

			// Forces the cursor to be waiting
			document.body.style.cursor = 'wait';

			// Copies any CKEditor data to the same named form element (it's a hack!)
			if (typeof(CKEDITOR) != 'undefined')
			{
				if (typeof(CKEDITOR.instances) != 'undefined')
				{
					for (var instance in CKEDITOR.instances)
					{
						var data = CKEDITOR.instances[instance].getData();

						if (data != '')
						{
							$('#' + instance).val(data);
						}
					}
				}
			}

			var method = $(form).attr('method') == '' ? 'GET' : $(form).attr('method');
			var action = $(form).attr('action');

			if (action == '')
			{
				injectMessage(form, 'Form element lacks action attribute', 'error');

				// Removes READONLY status
				$('button, input, textarea', form).attr('readonly', '');

				// Returns the cursor to normal... but is anyone really normal?
				document.body.style.cursor = 'default';
			}
			else
			{
				$.ajax({
					'type':     method,
					'url':      action,
					'data':     $(form).serialize(),
					'dataType': 'json',

					'success': function(data, textStatus, XMLHttpRequest)
					{
						if (data.status != 'success' && typeof(data.message) != 'undefined')
						{
							injectMessage(form, data.message, 'error');
						}
						else if (data.status == 'success')
						{
							$('input[type=text]', form).val('');
							$('select',           form).val('');
							$('textarea',         form).val('');

							if (typeof(data.message) != 'undefined')
							{
								injectMessage(form, data.message, 'message');
							}

							if (typeof(data.url) != 'undefined')
							{
								parent.location.href = data.url;
							}
						}
						else
						{
							injectMessage(form, data, 'error');
						}

						if (typeof(data.callback) != 'undefined')
						{
							window[data.callback](data);
						}

						// Removes READONLY status
						$('button, input, textarea', form).attr('readonly', '');

						// Returns the cursor to normal... but is anyone really normal?
						document.body.style.cursor = 'default';
					},

					'error': function(XMLHttpRequest, textStatus, errorThrown)
					{
						injectMessage(form, errorThrown, 'error');

						// Removes READONLY status
						$('button, input, textarea', form).attr('readonly', '');

						// Returns the cursor to normal... but is anyone really normal?
						document.body.style.cursor = 'default';
					}
				});
			}
		}
		else
		{
			return false;
		}
	});

	// Forces forms to return false on submit
	$('form.ajax').submit(function(){ return false; });

	// Automatically applies zebra stripes to tables
	$('table tr:even td').addClass('even');
	$('table tr:odd td').addClass('odd');
});

// Injects a div before the passed element
function injectMessage(element, message, type, duration)
{
	if (typeof type == 'undefined')
	{
		var type = 'error';
	}

	switch (type)
	{
		case 'error':
			var color = '#800';
			break;

		case 'message':
			var color = '#080';
			break;

		default:
			var color = '#000';
			break;
	}

	var class_name = 'ajax-form-' + type;
	var style      = 'display:none;color:' + color;

	$('.' + class_name, element).remove();
	$(element).prepend('<div class="' + class_name + '" style="' + style + '" generated="true">' + message + '</div>');
	$('.' + class_name, element).fadeIn();

	if (typeof duration != 'undefined')
	{
		$('.' + class_name, element).delay(duration).fadeOut();
	}

	return $('.' + class_name, element);
}

// Automatically tab to next element when max length is reached
function autoTab(element)
{
	if ($(element).val().length >= $(element).attr('maxlength'))
	{
		$(element).next().focus();
	}
}

// Disable Enter Key
function disableEnterKey(e)
{
	var key;

	if(window.event)
	{
		key = window.event.keyCode; // IE
	}
	else
	{
		key = e.which; // Firefox
	}

	return (key != 13);
}

// Truncate a string and optionally create a roll over
function truncate(string, length, hover)
{
	if (string.length > length)
	{
		if (hover == true)
		{
			string = '<span title="' + string + '" style="cursor:help">' + string.substring(0, length) + '...</span>';
		}
		else
		{
			string = string.substring(0, length) + '...';
		}
	}

	return string;
}
