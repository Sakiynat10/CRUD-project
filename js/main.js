const filterGroupSelect = document.querySelector('.filter-group-select');
const groupSelect = document.querySelector('.group-select');
const typeOptionSelect = document.querySelector(".typeoption-select-filter");
const teachersRow = document.querySelector(".teachers-row");
const teacherForm = document.querySelector(".teacher-form");
const studentModal = document.querySelector("#student-modal");
const confirmModal = document.querySelector("#confirm-modal");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const saveTeacherBtn = document.querySelector(".save-teacher-btn");
const addBtn = document.querySelector(".add-btn");
const searchInput = document.querySelector(".search-input")

const teacherFormElement = teacherForm.elements;


const teachersJSON = localStorage.getItem(TEACHERS);
let selectedTeacher = null;

let search = "";

const teachers = JSON.parse( teachersJSON ) || 
[
    {
        firstName: "Asilbek", 
        lastName: "Xoliyorov" , 
        address: "Qashqadaryo" , 
        birthDate: "12.04.2002" , 
        position: "ReactJs Developer",
        TypePosition: "middle",
        Salary: "1200",
        isMarried: true,
    } , 
    {
        firstName: "Anvar", 
        lastName: "Hidirov" , 
        address: "Samarqand" , 
        birthDate: "15.06.2003" , 
        position: "Go Developer",
        TypePosition: "senior",
        Salary: "2100",
        isMarried: false,
    }
];

filterGroupSelect.innerHTML = `<option selected value="all">All</option>`;

positionGroups.map(gr => {
    const option = `<option value="${gr}">${gr}</option>`;
    filterGroupSelect.innerHTML += option;
    groupSelect.innerHTML += option;
})

typePositionGroups.map((gr) => {
    typeOptionSelect.innerHTML += `<option value="${gr}">${gr}</option>`
})

function getTeachersRow({firstName , lastName , address , birthDate , position , TypePosition , Salary , isMarried} ,i){
    return `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${address}</td>
            <td>${birthDate}</td>
            <td>${position}</td>
            <td>${TypePosition}</td>
            <td>${"$" + Salary}</td>
            <td>${isMarried ? "HA" : "Yo'q"}</td>
            <td class="text-end">
                <button class="mr-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#student-modal" onclick="editTeacher(${i})">Edit</button>
                <button type="button" class="mr-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm-modal" onclick="deleteTeacher(${i})">Delete</button>
            </td>
        </tr>
    `
}

function getTeachers(){
    //2
    let results = teachers.filter((teacher) => teacher.firstName.toLowerCase().includes(search) || teacher.lastName.toLowerCase().includes(search) )
    
    teachersRow.innerHTML = "";
    //3
    results.map((teacher , i) => {
        teachersRow.innerHTML += getTeachersRow( teacher , i );
    })
}

getTeachers();

teacherForm.addEventListener("submit" , function(e) {
    e.preventDefault();
    const firstName = teacherFormElement.firstName.value;
    const lastName = teacherFormElement.lastName.value;
    const address = teacherFormElement.address.value;
    const birthDate = teacherFormElement.birthDate.value;
    const position = teacherFormElement.position.value;
    const TypePosition = teacherFormElement.TypePosition.value;
    const Salary = teacherFormElement.Salary.value;
    const isMarried = teacherFormElement.isMarried.checked;

    const teacher = {
        firstName,
        lastName,
        address,
        birthDate,
        position,
        TypePosition,
        Salary,
        isMarried
    }

    if(this.checkValidity()){
        bootstrap.Modal.getInstance( studentModal ).hide();
        if(selectedTeacher === null){
            teachers.push( teacher );
        }  else{
            teachers[selectedTeacher] = teacher;
        }
        getTeachers();
        localStorage.setItem(TEACHERS , JSON.stringify(teachers));
    }else{
        this.classList.add("was-validated");
    }
    this.reset();
})

function deleteTeacher(i){
    selectedTeacher = i;
    //  const checkDelete = window.confirm("Do you want to delete this?");
    //  if(checkDelete){
    //     teachers.splice(i , 1);
    //     getTeachers();
    //  }
}



yesBtn.addEventListener('click' , ()=>{
    teachers.splice(selectedTeacher , 1);
    bootstrap.Modal.getInstance( confirmModal ).hide();
    getTeachers();
    localStorage.setItem(TEACHERS , JSON.stringify( teachers ))
});

noBtn.addEventListener('click' , () => {
    bootstrap.Modal.getInstance( confirmModal ).hide();
});


function editTeacher(i){
    const {firstName , lastName , address , birthDate , position , TypePosition , Salary , isMarried} = teachers [i];
    teacherFormElement.firstName.value = firstName;
    teacherFormElement.lastName.value = lastName;
    teacherFormElement.address.value = address;
    teacherFormElement.birthDate.value = birthDate;
    teacherFormElement.position.value = position;
    teacherFormElement.TypePosition.value = TypePosition;
    teacherFormElement.Salary.value = Salary;
    teacherFormElement.isMarried.checked = isMarried;

    selectedTeacher = i;
    saveTeacherBtn.innerHTML = "Save student";
}

addBtn.addEventListener('click' , () => {
    selectedTeacher = null;
    teacherForm.reset();
    saveTeacherBtn.innerHTML = "Add student";
})

// filterGroupSelect.addEventListener('change' , function() {
//      group = this.value;
//      getTeachers();
// })

searchInput.addEventListener("keyup" , function(){
    //1
    search = this.value.trim().toLowerCase();
    getTeachers();
})