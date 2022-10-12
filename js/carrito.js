
// Avance de proyecto tienda de electronicos CELKAP 

class Producto {
  constructor(id,idProd,nombre,precio,qty,img,caption) {
    this.id=id;
    this.idProd=idProd;
    this.nombre = nombre;
    this.precio = precio;
    this.qty = qty;
    this.img=img;
    this.caption=caption;
  }
  agregarIva(){
    let iva = this.precio * .16;
    this.precioIva = iva + this.precio;
    return this.precioIva;
  }
  sumaTotal(){
    let total = this.precio*this.qty;
   return total;
  }
  sumaIvaTotal(){
    let totalIva = this.precioIva*this.qty;
   return totalIva;
  }
}


const carritocards= document.querySelector("#carritocards");
let actualizarProductos=()=>{ 
 carritocards.innerHTML = " ";
  let precioFInalIva=0;
  let precioFInal=0;
    for (const pr of allProducts) { 
        const card = document.createElement("div");
        carritocards.append(card);
        pr.agregarIva();
        precioFInal+= pr.sumaTotal();
        precioFInalIva += pr.sumaIvaTotal();
        card.innerHTML=
        `<div class="row g-0">
          <div class="col-md-3">
          <img src="../${pr.img}" class="img-fluid rounded-start" alt="${pr.caption}">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">Producto:${pr.nombre}</h5>
            <p class="card-text">Precio(IVA):$${pr.precio},00</p>
            <p class="card-text">Cantidad</p>
            <div class="dropdown pb-3">
                           <button id="btn_"${pr.id} type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                            <span data-bind="label">${pr.qty}</span> &nbsp; <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">1</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">2</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">3</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">4</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">5</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">6</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">7</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">8</a></li>
                                    <li><aid="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">9</a></li>
                                    <li><a id="prod_${pr.id}" class="dropdown-item" onclick="changeQty(event)">10</a></li>
                            </ul>
                         </div>
                         <button id="btn_${pr.id}" type="button" class="btn btn-danger" onclick="quitarProducto(event)"> Quitar producto</button>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div> `;
        card.classList.add("card","mb-3","w-100");
        card.setAttribute('id','card_'+pr.id);
    }
  let sumTotal=document.querySelector("#Total");
  sumTotal.innerHTML =  "Precio Total:$"+ parseInt(precioFInal); 
  let sumTotalIva=document.querySelector("#TotalIva");
  sumTotalIva.innerHTML =  "$"+ parseInt(precioFInalIva); 
}

let quitarProducto =(event)=>{
  const btn = event.target;
  const id = btn.id.split("_")[1];
  allProducts = allProducts.filter((prod) => prod.id != id);
  const UpdateCrr= generateToken(User.username,User.password,User.firstname,User.lastname,User.conectado,allProducts);
  localStorage.setItem("token",UpdateCrr);      
  const Usersdb=saveshopcar(); 
  localStorage.setItem("RegisterUsers",Usersdb);  
  pillUpdate();
  actualizarProductos();
}

let changeQty=(event)=>{
  const select = event.target;
  const id = select.id.split("_")[1];
  const qty = parseInt(select.innerHTML);
  let index = allProducts.findIndex(item => item.id == id);
  allProducts[index].qty=qty;
  const UpdateCrr= generateToken(User.username,User.password,User.firstname,User.lastname,User.conectado,allProducts);
  localStorage.setItem("token",UpdateCrr);      
  const Usersdb=saveshopcar(); 
  localStorage.setItem("RegisterUsers",Usersdb);  
  actualizarProductos();
  }
  
  let pagoTotal=()=>{ 
    carEmpty= carritoEmpty(allProducts); 
    if(carEmpty || !isAuth){
      const offcanvas = document.querySelector("#offcanvasRight");
      offcanvas.innerHTML="";
    }else{
      const tableProd = document.querySelector("#productsTable tbody");
      const nombrePago = document.querySelector("#nombrePago");
      const correoPago = document.querySelector("#correoPago");
      nombrePago.innerHTML=token.firstname+" "+token.lastname;
      correoPago.innerHTML=token.username;
      tableProd.innerHTML = " ";
      let precioFInal=0;
        for (const pr of allProducts) { 
            const tr = document.createElement("tr");
            tableProd.append(tr);
            pr.agregarIva();
            precioFInal+= pr.sumaIvaTotal();
            tr.innerHTML=` <th scope="row">${pr.id}</th>
            <td>${pr.nombre}</td>
            <td>${pr.qty}</td>
            <td>${"$"}${pr.precioIva}</td>
            `;
        }
      let sumTotal=document.querySelector("#offcanvasTotal");
      sumTotal.innerHTML =  "$"+ parseInt(precioFInal); 
    }
  }

  let pagar=()=>{
    allProducts=[];
    const UpdateCrr= generateToken(User.username,User.password,User.firstname,User.lastname,User.conectado,allProducts);
    localStorage.setItem("token",UpdateCrr);      
    const Usersdb=saveshopcar(); 
    localStorage.setItem("RegisterUsers",Usersdb);  
    pillUpdate();
    swal("se ha completado el pago con exito!","","success", {
      button: "Aceptar",
    });
    const offcanvas = document.querySelector("#offcanvasRight");
    offcanvas.innerHTML="";
    actualizarProductos();
  }

let allProducts = [];
let allprod=[];
const token = JSON.parse(localStorage.getItem("token"));
let User;
if(isAuth){    
  User=new Usuario(token.username,token.password,token.firstname,token.lastname,token.conectado,token.carrito);
   const menu = document.querySelector("#UserMenu");
   const logout = document.querySelector("#logout");
   const acceder = document.querySelector("#acceder");
   const registrarse = document.querySelector("#registrarse");
   pillUpdate();
   menu.innerHTML= "Bienvenido:"+ token.firstname;
   logout.classList.remove("visually-hidden");
   acceder.classList.add("visually-hidden");
   registrarse.classList.add("visually-hidden");
    for(const cr of User.carrito){ 
        const crUs= new Producto(cr.id,cr.idProd,cr.nombre,cr.precio,cr.qty,cr.img,cr.caption);
        allProducts.push(crUs);
    }
   actualizarProductos();
 }
