var  objPeople = [
  {
    username:"Jeff",
    password:"FL2000"
  },

  {
    username:"JP",
    password:"FL2000"
  },

  {
    username:"Gus",
    password:"FL2000"
  },

  {
    username:"Sila",
    password:"FL2000"
  },

  {
    username:"Jeff",
    password:"FL2000"
  }
]

function getInfo() {
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value

  for(i=0; i < objPeople.length; i++) {
    if(username == objPeople[i].username && password == objPeople[i].password) {
      console.log(username + "is logged in!!!")
      return

    }

    else {
      console.log ("incorrect username or password")
    
    }

  }

  
  

}
