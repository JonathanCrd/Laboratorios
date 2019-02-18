/*Funcion para cargar los campus en el select*/
function getFields(){
	$.ajax({
		url: "data/grammys.json",
		type: "GET",
		dataType: "json",

		success: function(data){
			console.log(data);
			let new_html= " ";
			fields = data.fields;
			for (var i = 0; i < data.fields.length; i++) {
				new_html += `
				<option value="${data.fields[i].field_id}">
					${data.fields[i].field}
				</option>
				`
			}

			$("#category_types").append(new_html);
		},
		error: function(error_msg){
			console.error(error_msg)
		}
	});
}



var fields;

getFields();