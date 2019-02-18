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

//FUNCTIONS TO GET THE INFO FOR EACH CATEGORY

function getInfoNominees(nominees, winner_id){
	var new_html = "";

	for (var i = 0; i < nominees.length; i++){
		if(winner_id == i)
		{
			ifWinner = "winner";
			new_html += `<li class="winner">${nominees[i].nominee} 
						<span class="winner_msg">WINNER!</span></li>
						<p class="artist">${nominees[i].artist}</p>
						`
		}else{
			new_html += `<li>${nominees[i].nominee}</li>
						<p class="artist">${nominees[i].artist}</p>
						`
		}

		if(nominees[i].info != ""){
			new_html += `<p class="nomineeInfo">${nominees[i].info}</p>`
		}
	}

	return new_html;
}


function getInfoCategories(categories){
	var new_html = "";

	for (var i = 0; i < categories.length; i++) {
		new_html += `
			<div class="category">
			<img src="./img/grammy.png" width="50px"></img>
			<h3>${categories[i].category_name} </h3>
			<p> ${categories[i].description}</p>
			<ul>${getInfoNominees(categories[i].nominees, categories[i].winner_id)}</ul>
			</div>
			`
	}
	return new_html;
}

function getInfoField(selectedField){
	var new_html = "";
	new_html += `<h2>${selectedField.field}</h2>`;
	
	if(selectedField.description != null){
		new_html += `
			<p class="description">
			${selectedField.description}
			</p>
			`
	}

	new_html+= getInfoCategories(selectedField.categories);
	$("#nominees_section").empty();
	$("#nominees_section").append(new_html);
	
}
////////

//Desencadenador de buscar la info para el field seleccionado
$("#category_types").on('change', function(event){
	let selected = $(this).val();
	//Buscar por el valor seleccionado entre todos los Fields
	for (var i = 0; i < fields.length; i++) {
		if(fields[i].field_id == selected){
			getInfoField(fields[i]);
		}
	}
})

var fields;
getFields();