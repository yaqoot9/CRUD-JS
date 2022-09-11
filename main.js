//creat
var CourseName=document.getElementById("CourseName");
var CourseCategory=document.getElementById("CourseCategory");
var CoursePrice=document.getElementById("CoursePrice");
var CourseDescription=document.getElementById("CourseDescriptuin");
var addbtn=document.getElementById("click");
var Courses;
var CurrentIndex;
var nameAlert=document.getElementById("nameAlert");
var DeleteAll=document.getElementById("deleteAll");
if(localStorage.getItem("CourseList")==null){
    Courses=[];
}
else{ 
Courses=JSON.parse(localStorage.getItem("CourseList"));
displycourse();
}

addbtn.onclick=function (){
    if(addbtn.innerHTML=="Add course"){
        addcourse();
    }

else{ UpdatCourse();
addbtn.innerHTML="Add course"}
//read 
displycourse();
//clear
clear();
}

function addcourse(){

    var course={
        Name:CourseName.value,
        Cat:CourseCategory.value,
        Price:CoursePrice.value,
        desc:CourseDescription.value
        };
    Courses.push(course);
        localStorage.setItem("CourseList",JSON.stringify(Courses));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Course Add Sucssefully!',
            showConfirmButton: false,
            timer: 2500
          })

}

function displycourse(){
    var result=""
    for(var i=0;i<Courses.length;i++){
        result += 
       ` <tr>   
        <td>${i}</td>
        <td>${Courses[i].Name}</td>
        <td>${Courses[i].Cat}</td>
        <td>${Courses[i].Price}</td>
        <td>${Courses[i].desc}</td>
        <td> <button class="btn btn-outline-info" onclick="getCourse(${i})"> Update</button></td>
        <td> <button onclick="deleteCourse(${i})" class="btn btn-outline-danger"> Delete</button></td>
        </tr>`;
    
   
   
       }
data.innerHTML=result;


}


function clear(){
    CourseName.value="";
    CourseCategory.value="";
    CoursePrice.value="";
    CourseDescription.value="";
    
}


function deleteCourse(index){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            
Courses.splice(index,1); 
localStorage.setItem("CourseList",JSON.stringify(Courses));
displycourse();

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })



}

//Delete All

DeleteAll.onclick=function deletefun(){

localStorage.removeItem("CourseList");
Courses=[];
document.getElementById("data").innerHTML=" ";

}

//Search

function search(e){
    var result=""
 
    for(var i=0;i<Courses.length;i++){
        if(Courses[i].Name.includes(e)){
        result += 
       ` <tr>   
        <td>${i}</td>
        <td>${Courses[i].Name}</td>
        <td>${Courses[i].Cat}</td>
        <td>${Courses[i].Price}</td>
        <td>${Courses[i].desc}</td>
        <td> <button class="btn btn-outline-info"> Update</button></td>
        <td> <button onclick="deleteCourse(${i})" class="btn btn-outline-danger"> Delete</button></td>
        </tr>`;
    
   
        }
        data.innerHTML=result;

       }

}

function getCourse(index){
    var course=Courses[index];
    CourseName.value=course.Name;
    CourseCategory.value=course.Cat;
    CoursePrice.value=course.Price;
    CourseDescription.value=course.desc;
    addbtn.innerHTML="UpdatCourse";
    CurrentIndex=index;
}

function UpdatCourse(){
    var course={
        Name:CourseName.value,
        Cat:CourseCategory.value,
        Price:CoursePrice.value,
        desc:CourseDescription.value
        };
Courses[CurrentIndex].Name=course.Name;
Courses[CurrentIndex].Cat=course.Cat;
Courses[CurrentIndex]. Price=course. Price;
Courses[CurrentIndex]. desc=course.desc;

localStorage.setItem("CourseList",JSON.stringify(Courses));
}


CourseName.onkeyup=function(){
var PatternName=/^[A-Z][a-z]{2,8}$/;
if(PatternName.test(CourseName.value))
{
    addbtn.removeAttribute("disabled");
    CourseName.classList.add("is-valid")
    CourseName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
}
else{
    addbtn.setAttribute("disabled","disabled")
    CourseName.classList.replace('is-valid','is-invalid');
    nameAlert.classList.add("d-block");
    nameAlert.classList.remove("d-none");
}

}