
// main tienda de electronicos CELKAP 

class ProductoMain{
  constructor(id,idProd,nombre,precio,img,caption){
    this.id=id;
    this.idProd=idProd;
    this.nombre = nombre;
    this.precio = precio;
    this.qty = 1;
    this.img=img;
    this.caption=caption;
  }
}

class Gadgets{
  constructor(id,img,alt,caption,price,color,marca){
    this.id=id;
    this.img = img;
    this.alt = alt;
    this.caption=caption;
    this.price = price;
    this.color = color;
    this.marca = marca;
  }
}

let añadirCarrito=(event)=>{
  event.preventDefault();
  if(isAuth){  
    const token = JSON.parse(localStorage.getItem("token"));
    const User= new Usuario(token.username,token.password,token.firstname,token.lastname,token.conectado,token.carrito);
    const btn = event.target;
    const id = btn.id.split("_")[1];
    const img =document.querySelector("#figure_"+id+" img").getAttribute('src');
    const caption =document.querySelector("#figure_"+id+" img").getAttribute('alt');
    const nombre =document.querySelector("#figure_"+id+" figcaption").innerHTML;
    const precio = parseInt(document.querySelector("#figure_"+id+" p.price").innerHTML.split("$")[1].split(",")[0]);

    let allprod = User.carrito;
    let counter;
    carEmpty= carritoEmpty(allprod); 
    if(carEmpty){
      counter=1;
    }else{
      counter=allprod.length+1; 
    }  
    let existing = allprod.find(item => item.idProd === id);
    let foundIndex = allprod.findIndex(item => item.idProd === id);
      if(existing){
            allprod[foundIndex].qty++;
            const UpdateCrr= generateToken(User.username,User.password,User.firstname,User.lastname,User.conectado,allprod);
            localStorage.setItem("token",UpdateCrr);      
            const Usersdb=saveshopcar(); 
            localStorage.setItem("RegisterUsers",Usersdb); 
            pillUpdate();
            swal("se ah agregado un producto con exito!","ya disponible en tu carrito","success", {
                      button: "Aceptar",
                    });
                              
          }else{
              const prod = new ProductoMain(counter,id,nombre,precio,img,caption);
              User.carrito.push(prod);
              const UpdateCrr= generateToken(User.username,User.password,User.firstname,User.lastname,User.conectado,User.carrito);
              localStorage.setItem("token",UpdateCrr);      
              const Usersdb=saveshopcar(); 
              localStorage.setItem("RegisterUsers",Usersdb);  
              counter++;
              pillUpdate();
              swal("se ah agregado un producto con exito!","ya disponible en tu carrito","success", {
                button: "Aceptar",
              });
              }  
      }else{
          swal("fallo en agregar!","Ingrese su cuenta para poder comprar","error", {
            button: "Aceptar",
          });
      }
   }     



const prodData = async()=>{ 
const array = await fetchData();
array.forEach(prod =>{
  const newprod = document.createElement("figure");
  newprod.setAttribute('id','figure_'+prod.id);
  document.querySelector("#GadgetsSection").append(newprod);
  newprod.innerHTML = `<img src="${prod.img}" alt="${prod.alt}">
            <figcaption>${prod.caption}</figcaption>
            <p class="price">${"$"}${prod.price}${",00"}</p>
            <a id="btn_${prod.id}" href="..usuario/carrito.html" class="btn" onclick="añadirCarrito(event)">Añadir al carrito</a>`;

    })
}

const filterData = async()=>{   
  const array = await fetchData();
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  const Range = document.querySelector("#customRange2").value;
  let rangeValue;
  if(Range==0){
    rangeValue=400;
  }else if(Range==1){
    rangeValue=600;
  }else if(Range==2){
    rangeValue=800;
  }else if(Range==3){
    rangeValue=1000;
  }else if(Range==4){
    rangeValue=1500;
  }else if(Range==5){
    rangeValue=15000;
  }else{
    rangeValue=0;
  }
  const rango = document.querySelector("#rango");
  rango.innerHTML="Rango mayor a $"+rangeValue;
  let filterRangeValue = array.filter((prod) => prod.price>=rangeValue);
  const MarcaCheck=[];
  const ColorCheck=[];
  let filterType;
  let filterValue;  
  for (const ckb of checkboxes){
       filterType= ckb.value.split("_")[0];
       filterValue= ckb.value.split("_")[1];
       if(filterType=="Marca"){
         MarcaCheck.push(filterValue)
       }else if(filterType=="Color"){
        ColorCheck.push(filterValue)
       }
  } 
  let filterarray;
  if(ColorCheck.length===0 && MarcaCheck.length===0){
    filterarray=filterRangeValue;
  }else if(ColorCheck.length===0){
    filterarray = filterRangeValue.filter((prod) => MarcaCheck.includes(prod.marca));
  }else if(MarcaCheck.length===0){
    filterarray = filterRangeValue.filter((prod) => ColorCheck.includes(prod.color));
  }else{
    filterarray = filterRangeValue.filter((prod) => MarcaCheck.includes(prod.marca) && ColorCheck.includes(prod.color));   
  }

  const GadgetsSection = document.querySelector("#GadgetsSection");
  GadgetsSection.innerHTML=" ";
  filterarray.forEach(prod =>{
    const newprod = document.createElement("figure");
    newprod.setAttribute('id','figure_'+prod.id);
    GadgetsSection.append(newprod);
    newprod.innerHTML = `<img src="${prod.img}" alt="${prod.alt}">
              <figcaption>${prod.caption}</figcaption>
              <p class="price">${"$"}${prod.price}${",00"}</p>
              <a id="btn_${prod.id}" href="..usuario/carrito.html" class="btn" onclick="añadirCarrito(event)">Añadir al carrito</a>`;
  
      })
}

const fetchData = async() => {
    const response = await fetch("json/Gadgets.json").catch((error) => {
      console.log(error);
    })
    const data = await response.json();
    const gadgets = [];
    data.forEach((prod) =>{
     gadgets.push(new Gadgets(prod.id,prod.img,prod.alt,prod.caption,prod.price,prod.color,prod.marca));
    })
    return gadgets;
}

prodData();

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