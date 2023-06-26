let ulElement = document.getElementById("ulelement");
let buttonElement = document.getElementById("onAdd");
let saveButtonElement = document.getElementById("saveButton");

/*let array = [{
        text: "Learn HTML",
        uniqueNo: 1
    }, {
        text: "Learn CSS",
        uniqueNo: 2
    },

    {
        text: "Learn Javascript",
        uniqueNo: 3

    }
]; */

function saving() {
    let getting = localStorage.getItem("setting");
    let parsing = JSON.parse(getting);

    if (parsing === null) {

        return [];
    } else {
        return parsing;
    }
}

let array = saving(); //this is having the whole list of array because we saved it and we are calling it from the local storage.


saveButtonElement.onclick = function() {
    localStorage.setItem("setting", JSON.stringify(array));

};


function statusChange(checkBoxId, labelId, todoId) {
    let checkBoxIdElement = document.getElementById(checkBoxId); //should not be in quotes
    console.log(checkBoxIdElement.checked);

    let labelElementt = document.getElementById(labelId);

    if (checkBoxIdElement.checked === true) {
        labelElementt.classList.add("checked");
    } else {
        labelElementt.classList.remove("checked");
    }
    //labelElementt.classList.toggle("checked");


    let indexing = array.findIndex(function(i) {
        let id = "todo" + i.uniqueNo;
        if (id === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let object = array[indexing];
    console.log(object);
    if (object.isChecked === true) {
        object.isChecked = false;
    } else {
        object.isChecked = true;
    }
}

function todo(i) {
    let checkBoxId = "checkbox" + i.uniqueNo;
    let labelId = "label" + i.uniqueNo;
    let todoId = "todo" + i.uniqueNo;

    let liElement = document.createElement("li");
    liElement.classList.add("d-flex", "flex-row", "li-element");
    liElement.id = todoId;
    ulElement.appendChild(liElement);
    console.log(ulElement.outerHTML);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.classList.add("input-element");
    liElement.appendChild(inputElement);
    inputElement.checked = i.isChecked;
    inputElement.onclick = function() {
        statusChange(checkBoxId, labelId, todoId);
    };

    let containerElement = document.createElement("div");
    containerElement.classList.add("hightlight", "d-flex", "flex-row", "containerr");
    liElement.appendChild(containerElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.textContent = i.text;
    labelElement.classList.add("labelling");
    labelElement.id = labelId;
    containerElement.appendChild(labelElement);
    if (i.isChecked === true) {
        labelElement.classList.add("checked");
    }

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    containerElement.appendChild(deleteContainer);

    function deletingIcon(todoId) {
        let todoElement = document.getElementById(todoId); //this shouldn't be in quotes because it's an variable it is not meant to be quotes.

        ulElement.removeChild(todoElement);


        let index = array.findIndex(function(j) {
            let id = "todo" + j.uniqueNo;
            if (id === todoId) {
                return true;
            } else {
                return false;
            }
        });
        array.splice(index, 1);
    }

    let iElement = document.createElement("li");
    iElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(iElement);
    iElement.onclick = function() {
        deletingIcon(todoId);
    };
}

function onAddingTodo() {

    let counting = array.length;
    let counting_plus_one = counting + 1;
    let inputElement = document.getElementById("firstInput");
    let inputValue = inputElement.value;
    if (inputElement.value === "") {
        alert("Please Enter the valid Input");
        return;
    }

    let newArray = {
        text: inputValue,
        uniqueNo: counting_plus_one,
        isChecked: false
    };

    array.push(newArray);
    console.log(array);


    todo(newArray); //we need to give the new todoo otherwise it will throw error
    inputElement.value = "";


}


buttonElement.onclick = function() {
    onAddingTodo();
};

for (let i of array) {
    todo(i);
}