const cardId = document.getElementById('main-section')

let cartData = []



const loadData = () => {

// if(loading){
//         const addDiv = document.createElement("div")
//         cardId.innerHTML = "";
//         addDiv.innerHTML=`<span class="loading loading-bars loading-lg"></span>`
//         console.log(addDiv)
//         cardId.append(addDiv)
//       }else{
//         console.log('addDiv')
//       }

    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) =>res.json())
    .then((json) => {
      displayCart(json.plants)
    })
}

const loading = (status,id1, id2)=>{
  if(status === true){
    document.getElementById(id1).classList.remove("hidden")
    document.getElementById(id2).classList.add("hidden")
    // document.getElementById('main-hidden').classList.remove("hidden")
    // document.getElementById('main-section').classList.add("hidden")
  } else{
    document.getElementById(id2).classList.remove("hidden")
    document.getElementById(id1).classList.add("hidden")
    // document.getElementById('main-section').classList.remove("hidden")
    // document.getElementById('main-hidden').classList.add("hidden")
  }
}



const displayCart = (data) =>{
  loading(true, "main-hidden", "main-section")
    cardId.innerHTML = "";
    
    for (let user of data){
        const addDiv = document.createElement("div")



      addDiv.innerHTML = `
          <div class="card bg-base-100 shadow-sm">
            <figure class="border-10 rounded-3xl border-white max-h-[200px]  bg-[#EDEDED]">
              <img class="rounded-xl"
                src=${user.image}
                alt="Tree" />
            </figure>
            <div class="p-5 space-y-3 text-left">
              <h2 class="card-title" onclick="my_modal_4.showModal()">
              <span onclick="showModals(${user.id})">${user.name}</span>
                
              </h2>
              <p>${user.description}</p>
              <div class="justify-between flex items-center">
                <span class="px-3 py-1 rounded-3xl bg-[#CFF0DC] text-[14px] font-medium text-[#15803D]" >${user.category}</span>
                <span class="text-[14px] font-semibold">৳ ${user.price}</span>
              </div>
              <div class="card-actions justify-center w-full">
                <button onclick="addToCartBtn('${user.id}', '${user.name}', '${user.price}')" class="btn w-full bg-[#15803D] rounded-3xl text-white">Add to Cart</button>
              </div>
            </div>
          </div>
      `;
         
        cardId.append(addDiv);
        
        // console.log(data)
        
    }
    loading(false, "main-hidden", "main-section")

}



const categoriesBtns = document.getElementById('catetories-btn')


const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) =>res.json())
    .then((json) => {
      // categories(json.categories)
      loading(true, "left-side-hidden", "left-side")
  categoriesBtns.innerHTML=''
// console.log(btns)
  for(let btn of json.categories){
      let categoriesDiv = document.createElement('div')
      categoriesDiv.innerHTML = `<button id="category-btn${btn.id}" onclick="categoriesBtn(${btn.id})" class=" all-trees text-left p-[9px] w-full rounded-md text-gray-900 ">${btn.category_name
}</button>`

    // categoriesDiv.classList.add("active")

      categoriesBtns.appendChild(categoriesDiv)
      loading(false, "left-side-hidden", "left-side")

  }

    })
}






const categoriesBtn =(id) =>{

   const allCategoriesBtn = document.querySelectorAll(".all-trees")
   
for(let bt of allCategoriesBtn){
  bt.classList.remove('active')
}
const allCategoriesIdBtn = document.querySelectorAll(`#category-btn${id}`)
allCategoriesIdBtn[0].classList.add("active")






 fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) =>res.json())
    .then((json) => jsonFunc(json.plants))


    // cardId.innerHTML=''

  const jsonFunc = (data)=>{
    loading(true, "main-hidden", "main-section")
    
     cardId.innerHTML=''
    for (let user of data){



      const addDiv = document.createElement("div")
      
      addDiv.innerHTML = `
          <div class="card bg-base-100 shadow-sm">
            <figure class="border-10 rounded-3xl border-white  max-h-[200px] bg-[#EDEDED]">
              <img class="rounded-xl"
                src=${user.image}
                alt="Tree" />
            </figure>
            <div class="p-5 space-y-3 text-left">
              <h2 class="card-title" onclick="my_modal_4.showModal()">
              <span onclick="showModals(${user.id})">${user.name}</span>
                
              </h2>
              <p>${user.description}</p>
              <div class="justify-between flex items-center">
                <span class="px-3 py-1 rounded-3xl bg-[#CFF0DC] text-[14px] font-medium text-[#15803D]" >${user.category}</span>
                <span class="text-[14px] font-semibold">৳ ${user.price}</span>
              </div>
              <div class="card-actions justify-center w-full">
                <button onclick="addToCartBtn('${user.id}', '${user.name}', '${user.price}')" class="btn w-full bg-[#15803D] rounded-3xl text-white">Add to Cart</button>
              </div>
            </div>
          </div>
      `;

      
      cardId.append(addDiv);
      loading(false, "main-hidden", "main-section")

  }
}
}


   const allCart = document.getElementById("all-cart")
   const totalPrice = document.getElementById("total-price")
   let subTotal = 0

const addToCartBtn = (id, name, price)=>{
  //  subTotal += parseFloat(price) 

  let cardadd = {
          treeName: name,
          price: price,
          id: id
        }

       cartData.push(cardadd)

      allCart.innerHTML=""
      subTotal=0
   for(let cart of cartData){
    const cartDiv = document.createElement("div")
    subTotal += parseFloat(cart.price)
    
    cartDiv.innerHTML = `<div class="bg-[#CFF0DC] p-3 flex justify-between items-center m-2 rounded-lg">
                      <div>
                        <h1>${cart.treeName}</h1>
                        <p>৳<span> ${cart.price}</span> x 1</p>
                      </div>
                      <div><i class="fa-solid fa-xmark" onclick="cancelCart('${cart.id}')" ></i></div>
                    </div>`
        allCart.append(cartDiv) 
   }
  //  console.log(subTotal)
   totalPrice.innerHTML= subTotal
  }


const cancelCart =(id)=>{
  const updateCartData = cartData.filter(obj => obj.id !== id) 
  cartData = updateCartData

        allCart.innerHTML=""
              subTotal=0

   for(let cart of cartData){
    const cartDiv = document.createElement("div")
    subTotal += parseFloat(cart.price)

    cartDiv.innerHTML = `<div class="bg-[#CFF0DC] p-3 flex justify-between items-center m-2 rounded-lg">
                      <div>
                        <h1>${cart.treeName}</h1>
                        <p>৳<span> ${cart.price}</span> x 1</p>
                      </div>
                      <div><i class="fa-solid fa-xmark" onclick="cancelCart('${cart.id}')" ></i></div>
                    </div>`
        allCart.append(cartDiv) 
   }
//  console.log(subTotal)
 totalPrice.innerHTML= subTotal
}












const modelBoxId = document.getElementById('modal-box')

const showModals = (id) =>{
  // console.log(id)
   fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) =>res.json())
    .then((json) => modelBox(json.plants))

    modelBoxId.innerHTML=""

    const modelBox =(data)=>{
      const addDiv = document.createElement("div")
console.log(data)

      addDiv.innerHTML = `<div class=" space-y-5">
        <h3 class="text-lg font-bold ">${data.name}</h3>
        <div class="rounded-3xl overflow-hidden max-h-[400px]"><img id="showModalsImg" class="rounded-2xl w-full max-h-[420px]"  src="${data.image}"></div>
        <p class="text-lg font-bold">Category:<span class="text-[16px] font-normal"> ${data.category}</span></p>
        <p class="text-lg font-bold">Price:<span class="text-[16px] font-normal"> ${data.price}</span></p>
        <p class="text-lg font-bold">Description:<span class="text-[16px] font-normal"> ${data.description}</span></p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    
    `


      modelBoxId.append(addDiv)
    }

}







loadCategories()

loadData()