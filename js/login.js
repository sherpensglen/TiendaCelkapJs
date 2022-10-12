
// login tienda de electronicos CELKAP 

let formulario = document.querySelector("#login");

let  usuariosRegistrados=[];

if(isAuthRu){    
  const Us = JSON.parse(localStorage.getItem("RegisterUsers"));
  for(const us of Us){
     const nUs = new Usuario(us.username,us.password,us.firstname,us.lastname,us.conectado,us.carrito); 
     usuariosRegistrados.push(nUs);
  }
}

let login=(event)=>{
  event.preventDefault();
  let Username = formulario.username.value;
  let Password = formulario.password.value;
  let Conectado = formulario.conectado.checked;
  if(Username==""|| Password==""){
    swal("Llena los campos correcatmente!","", "error")
    .then(() => {
      event.stopPropagation();
    });
  }else{
      if(!isAuthRu){    
        swal("Error!", "Por favor crea una cuenta!", "error", {
          button: "Aceptar!",
        });
      }else{       
          let existing = usuariosRegistrados.find(item => item.username === Username && Password === item.password);
          if(existing){
            existing.conectado=Conectado;
            const token = generateToken(Username,Password,existing.firstname,existing.lastname,existing.conectado,existing.carrito);
            localStorage.setItem("token", token); 
            window.location.href = "../index.html";  
          }else{
            swal("Error al ingresar la cuenta!", "Por favor ingresa tu cuenta correctamente!", "error", {
              button: "Aceptar!",
            });
          }
        }
      }
  }


