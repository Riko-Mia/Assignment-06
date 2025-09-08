



const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) =>res.json())
    .then((json) => displayCart(json.plants))
}



const displayCart = (data) =>{
    const cardId = document.getElementById('main-section')
    cardId.innerHTML = "";
    
    for (let user of data){
        const addDiv = document.createElement("div")
        addDiv.classList.add('main-section', 'grid', 'grid-cols-3', 'gap-4')
        
        addDiv.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
              <figure class="border-10 rounded-xl border-white w-full min-h-[200px] bg-[#EDEDED]">
                <img class="rounded-xl w"
                  src=${user.image}
                  alt="Tree" />
              </figure>
              <div class="p-5 space-y-3 text-left">
                <h2 class="card-title ">
                  ${user.name}
                </h2>
                <p>${user.description}</p>
                <div class="justify-between flex items-center">
                  <span class="px-3 py-1 rounded-3xl bg-[#CFF0DC] text-[14px] font-medium text-[#15803D]" >${user.category}</span>
                  <span class="text-[14px] font-semibold">৳ ${user.price}</span>
                </div>
                <div class="card-actions justify-center w-full">
                  <button class="btn w-full bg-[#15803D] rounded-3xl text-white">Add to Cart</button>
                </div>
              </div>
            </div>
        `;
        
        console.log(data)
        cardId.append(addDiv);
        
        // console.log(data)
    }

}


loadData()