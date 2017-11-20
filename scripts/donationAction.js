var formData;

function setFormEvent() {
	$('#donationForm').on('submit', function(e) {
		e.preventDefault();
		
		formData = collectFormInfo(this);
		console.log(formData)
	});	
}

//returns an object with form data
function collectFormInfo(form) {
	var formData = {}
	
	//grab all form elements
	var rawFormData
	$(form).each(function() {
		rawFormData = $(this).find(':input');
	});
	
	//grab all key/value pairs
	for(var i = 0; i < rawFormData.length; i++) {	
	var currentEl = rawFormData[i]
		//ignore submit and reset buttons
		if($(currentEl).attr('type') != 'submit' && $(currentEl).attr('type') != 'reset') {	
			formData[$(rawFormData[i]).attr('name')] = $(rawFormData[i]).val();
		}
	}
	
	var dataText = '';
	for(var i in formData) {
		dataText += i + ': ' + formData[i] + '\n';
	}
	console.log(dataText);
	alert(dataText);
	return formData
}

$(function(){setFormEvent()});