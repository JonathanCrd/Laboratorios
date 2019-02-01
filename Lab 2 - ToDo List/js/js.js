/*Enter listener for enter key*/
f = document.getElementById("newitem");
f.addEventListener('keyup',function(e){
	if(e.keyCode == 13)
	{
		addElement();
	}
})

let actualValue = 5;

/*Function to add element to list*/
function addElement() {
	/*Check if is in not blank*/
	if(document.getElementById('newitem').value != ""){
		/*Create the elements that are gonna be used*/
		var newList = document.createElement("li");
		var newInput = document.createElement("input");
		var newSpan = document.createElement("span");
		var newDelete = document.createElement("span");

		/*Configure the Checkbox*/
		newInput.type = "checkbox";
		newInput.name = "todo";
		newInput.setAttribute("onClick", "doneElement(this)");
		newInput.value = actualValue + 1;
		actualValue = actualValue +1;
		newDelete.textContent = "Delete";
		newDelete.classList.add("delete");
		newDelete.setAttribute("onClick", "deleteElement(this)");

		/*Get the text*/
		newSpan.textContent = document.getElementById('newitem').value;

		/*Append the Span and Input to the list element*/
		newList.appendChild(newInput);
		newList.appendChild(newSpan);
		newList.appendChild(newDelete);

		/*Append the new list element into the actual list at the top*/
		document.getElementById("toDo").insertBefore(newList, document.getElementById("toDo").childNodes[0]);

		/*Reset the textfield to blank*/
		document.getElementById('newitem').value = "";
	}
}

/*Function to check the element*/
function doneElement(element){
	/*Verify if is already done*/
	var bDone = element.parentElement.getElementsByTagName("span")[0].classList.length;
	if(bDone == 0){
		/*Not done*/

		/*Create the new element that is going to be append at the end*/
		var newList = document.createElement("li");
		var newInput = document.createElement("input");
		var newSpan = document.createElement("span");

		newInput.type = "checkbox";
		newInput.name = "todo";
		newInput.setAttribute("onClick", "doneElement(this)");
		newInput.value = element.value;
		newInput.checked = true; /*Now the checkbox is checked*/
		newSpan.textContent = element.parentElement.getElementsByTagName("span")[0].textContent;
		newSpan.classList.add("done"); /*Add the class done*/

		newList.appendChild(newInput);
		newList.appendChild(newSpan);

		document.getElementById("toDo").appendChild(newList);
	}
	else{
		/*Undone the element*/

		/*Create the new element that is going to be append at the end*/
		var newList = document.createElement("li");
		var newInput = document.createElement("input");
		var newSpan = document.createElement("span");

		newInput.type = "checkbox";
		newInput.name = "todo";
		newInput.setAttribute("onClick", "doneElement(this)");
		newInput.value = element.value;
		newSpan.textContent = element.parentElement.getElementsByTagName("span")[0].textContent;

		newList.appendChild(newInput);
		newList.appendChild(newSpan);

		document.getElementById("toDo").insertBefore(newList, document.getElementById("toDo").childNodes[0]);

	}

	/*Remove the current element*/
	element.parentNode.remove(element.parentElement);
	element.parentNode.removeChild(element);
}

function moveToEnd(element){


	return this;
}

function deleteElement(element){
	element.parentNode.remove(element.parentElement);
}