
// Clases Principales

class Usuario{
  constructor(username,password,firstname,lastname,conectado,carrito=[]){   
    this.username= username;
    this.password= password;
    this.conectado=conectado;
    this.firstname=firstname;
    this.lastname=lastname;
    this.carrito=carrito;
  }
}

//funciones para administrar la  session


let existToken =()=>{
  return (localStorage.getItem("token") !== null || sessionStorage.getItem("token" !== null)) ? true : false;
}
const isAuth = existToken();

let generateToken = (username, password,firstname,lastname, conectado,carrito=[])=>{
  const us = new Usuario(username,password,firstname,lastname,conectado,carrito);
  return JSON.stringify(us);
}

let logout =()=>{
  if(isAuth){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
  }else{
    alert("No hay cuenta");
  }
}

//funciones para la administracion de usuarios

let generateUserdb=(username, password,firstname,lastname, conectado,carrito=[])=>{
  const us = new Usuario(username,password,firstname,lastname,conectado,carrito);
  usuariosRegistrados.push(us);
  return JSON.stringify(usuariosRegistrados);
}

let existRegUsers=()=>{
  return (localStorage.getItem("RegisterUsers") !== null) ? true :false; 
 }

 const isAuthRu = existRegUsers();
 
let existUser=(Username)=>{
   for(const us of usuariosRegistrados){
      return (Username == us.username)? true :false;
   }
 }

 //administracion del carrito

let saveshopcar=()=>{
  const token = JSON.parse(localStorage.getItem("token"));
  const usersdb = JSON.parse(localStorage.getItem("RegisterUsers"));
   for(const udb of usersdb){
      if(udb.username == token.username){
         udb.carrito = token.carrito;
       }
     }
    return JSON.stringify(usersdb);
 }

 let carritoEmpty=(arr)=>{
  return (arr.length === 0) ?true :false;
 }

 let pillUpdate=()=>{
  const pillCounter = document.querySelector("#pillCounter");
  const token = JSON.parse(localStorage.getItem("token"));
  const carritosize=token.carrito.length;
  pillCounter.innerHTML=carritosize;
 }