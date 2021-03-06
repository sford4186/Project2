//Script for the candidates -- student/recent grad to find a recruiter
$(document).ready(() => {

  // function to get the user's email address that is registered

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  //function to render all recruiter data by calling the /api/findrecruiter route
  $.get("/api/findrecruiter").then(data => {

    for (var i = 0; i < data.length; i++) {

      if (data[i].userType === "recruiter") {
        console.log(data[i])
        $(".container").append(`
              
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${data[i].firstName} ${data[i].lastName}</h5>
                  <p class="card-text">${data[i].email}</p>
                  <p class="card-text">${data[i].phone}</p>     
                  <img src="${data[i].imgUrl}" id="cardImg" alt="alternatetext">                 
                  <a href="mailto:${data[i].email}" class="btn btn-primary">Let's Connect!</a>
                </div>
              </div>
              `)
      }
    }

  })

})
