
// login tienda de electronicos CELKAP 

let formulario = document.querySelector("#contact");

let  usuariosRegistrados=[];

if(isAuthRu){    
  const Us = JSON.parse(localStorage.getItem("RegisterUsers"));
  for(const us of Us){
     const nUs = new Usuario(us.username,us.password,us.firstname,us.lastname,us.conectado,us.carrito); 
     usuariosRegistrados.push(nUs);
  }
}

let Contact=(event)=>{
  let Firstname=formulario.firstname.value;
  let Lastname= formulario.lastname.value;
  let Username = formulario.username.value;
  let PhoneNumber = formulario.phonenumber.value;
  let Subject = formulario.subject.value;

  if(Firstname ==""||Lastname =="" ||Username ==""|| PhoneNumber ==""|| Subject ==""){
     event.preventDefault();
    swal("No se envio correctamente!","Llena todos los campos","error", {
      button: "Aceptar",
    });    
  }
}

let success=()=>{
     swal({
        title: "se ah enviado correctamente!",
        text: "te contactaremos en brevedad.",
      })
      .then((value) => {
        if (value) {
          document.forms['contact'].submit();
        }        
      });
}


if(isAuth){    
  const menu = document.querySelector("#UserMenu");
  const logout = document.querySelector("#logout");
  const acceder = document.querySelector("#acceder");
  const registrarse = document.querySelector("#registrarse");
  const token = JSON.parse(localStorage.getItem("token"));
  menu.innerHTML= "Bienvenido:"+ token.firstname;
  pillUpdate();
  logout.classList.remove("visually-hidden");
  acceder.classList.add("visually-hidden");
  registrarse.classList.add("visually-hidden");
}