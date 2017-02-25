//create listener for submit button: listen for form submit
document.getElementById('myForm').addEventListener('submit', saveCourse);
//perform submit when saveCourse

//save Courses
function saveCourse(e){
  //Get form values
  //var courseSemester = document.getElementById('SemesterSelect');
  //console.log(courseSemester);
  var courseSemester=saveSemester();
  var courseName =document.getElementById('courseName').value;
  var courseURL =document.getElementById('courseURL').value;


  //create course object

  var course = {
    semester: courseSemester,
    name: courseName,
    url: courseURL
  }

  /*
    //Local storage Test - HOW IT WORKS
    //How we're storing info generated from this app -
    //can see how it works by pushing F12 and then checking under application -> local storage
    //- only stores strings, have to parse it through json to get it ut
    localStorage.setItem('test','Hello Friend'); //adding item to storage
    console.log(localStorage.getItem('test')); //printing it out, "Hello Friend"
    localStorage.removeItem('test'); //removing it
    console.log(localStorage.getItem('test')); //now shows null, "null"
  */

  //Test if courses array exists
      if(localStorage.getItem('courses') === null){ //if null we need to initalize it
          //Initialize array
          var courses = []; //courses array
          //Add to array
          courses.push(course);
          //Save to local storage - makes a string JSON array
          localStorage.setItem('courses', JSON.stringify(courses)); //json.strinigy makes it into a string
      }else{ //if we have courses already
          //Get courses from localstorage
          var courses = JSON.parse(localStorage.getItem('courses')); //change it from a string (restoring it)
          //Add course to array
          courses.push(course);
          //re-set back to localStorage
          localStorage.setItem('courses', JSON.stringify(courses));
      }

      fetchCourses();

      //Prevents form from submitting to the webpage
      e.preventDefault();
}



function saveSemester(courseSemester)
{
    var courseSemester = document.getElementById('SemesterSelect').value;
    console.log(courseSemester);
    return courseSemester;
}





function deleteCourse(url){
//Get course
var courses = JSON.parse(localStorage.getItem('courses'));

//loop thru courses
for(var i=0; i<courses.length;i++){
  if(courses[i].url == url){
    //remove from array
    courses.splice(i, 1);
    }
  }
  localStorage.setItem('courses', JSON.stringify(courses));

  //refetch courses - refresh the list effectively
  fetchCourses();
}

//Fetch courses
// Fetch bookmarks
function fetchCourses(){
  // Get bookmarks from localStorage
  var courses = JSON.parse(localStorage.getItem('courses'));
  console.log(courses);

  // Get output id
  var coursesResults = document.getElementById('coursesResults'); //HTML ID IMPORTANT FOR innerHTML

  // Build output
  coursesResults.innerHTML = ''; //puts stuff into place of whatever html id

  for(var i = 0; i < courses.length; i++){
    var semester = courses[i].semester;
    var name = courses[i].name;
    var url = courses[i].url;

    //here we're appending to it - appending html onto it
    coursesResults.innerHTML += '<div class="well">'+
                                  '<a class="btn btn-default">'+semester+'</a>'+
                                  '<h2>'+name+ '</h2> '+
                                  ' <h2>'+url +'</h2> '+
                                  ' <a onclick="deleteCourse(\''+url+'\')" class="btn btn-danger" href="#">X</a> ' +
                                  '</h2>'+
                                  '</div>';

  }

}


function myFunction() {
    alert("Page is loaded");
    coursesResults.innerHTML = 'HELLO';
}
