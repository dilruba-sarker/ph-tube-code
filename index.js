// fetch, load, show data by category
// load category

const loadCategories = ()=>{
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
.then(res=> res.json())
.then(data=> displayCategories(data.categories))
.catch(error =>console.log("error is",error))
}
// load videos
const loadVideos = ()=>{
fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
.then(res=> res.json())
.then(data=>displayVideos(data.videos))
.catch(error =>console.log("error is",error))
}
// display vedios

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
const removeAllActive = ()=>{
    const buttons =document.getElementsByClassName("category-btn")
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}

const disPlayMatchCategory=(category_id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
    .then(res=> res.json())
    .then(data=>{
        const activeBtn= document.getElementById(`btn-${category_id}`)
        // prothom sob active remove korbo pore add korbo
        removeAllActive ()
        // active btn 
        activeBtn.classList.add("active")
        console.log(activeBtn);
        displayVideos(data.category)
    })
    .catch(error =>console.log("error is",error))

   
   
}

  const convertTime = (secs)=>{
    
    const hours = Math.floor(secs / (60 * 60));
    const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  const formattedTime= `${hours}h ${minutes}m ${seconds}`
  return formattedTime
  }

  const loadDetails=(video_id)=>{
console.log(video_id);
fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
.then(res=> res.json())
.then(data=>displayModal(data.video))
.catch(error =>console.log("error is",error))

  }
const displayModal=(data)=>{
  
const modalContainer = document.getElementById("modal-container")
modalContainer.innerHTML=
`
<dialog id="my_modal_2" class="modal">
  <div class="modal-box">
  
  <img src=${data.thumbnail}/>
    <h3 class="text-lg font-bold">${data.title}</h3>
    <p class="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
`
my_modal_2.showModal()

}

const displayVideos =(videos)=>{
   
const vediosContainer =document.getElementById("vedios-container")
vediosContainer.innerText= ' '
if(videos.length===0){
    vediosContainer.classList.remove("grid")
vediosContainer.innerHTML=`
<div class=" min-h-screen flex flex-col gap-5 justify-center items-center">
<img src="asset/Icon.png"/>
<h2>No data found</h2>
</div>
`

return
}else{
    vediosContainer.classList.add("grid")
}

videos.forEach((video)=>{
   const card=document.createElement("div")
   card.classList="card shadow-xl"
   const {category_id,video_id,authors, thumbnail,title,others}= video
 // Convert posted_date (in seconds) to HH:MM:SS format
//  const formattedPostedDate = formatTime(others.posted_date);

card.innerHTML=
`
<figure class=" h-[200px] relative">
    <img
      src=${thumbnail}
      alt="Shoes"
      class=" h-full w-full object-cover" />
      ${others?.posted_date?.length===0 ? " ": `<span class="absolute right-2 bottom-2 bg-slate-50" >${convertTime(others.posted_date)}</span>` }
       
  </figure>
  <div class="px-1 py-2 flex gap-4 ">
   <div><img class="h-10 w-10 rounded-full object-cover" src=${authors[0].profile_picture}/>  </div>
   <div>
   <h2 class="font-bold">${title}</h2>
   <div class=" flex items-center gap-3">
   <p>${authors[0].profile_name }</p>

<div>

${authors[0].verified ? `<img class="w-5 " src='https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png'/>`: " "}
</div>


  
   </div>

   <p> <button onClick="loadDetails('${video.video_id}')" class=" btn btn-sm btn-error">Details</button></p>
   </div>
    
  </div>
  </div>
`

   vediosContainer.append(card) 
})
}

// display category

const displayCategories = (categories) =>{
 
 const categoriesContainer =document.getElementById("categories-container")
    categories.forEach(item => {
     
    //    create btn
    const buttonContainer=document.createElement('div')
    buttonContainer.innerHTML=
    ` <button class="btn category-btn" id="btn-${item.category_id}"
     onClick="disPlayMatchCategory(${item.category_id})" >${item.category}</button>`
    categoriesContainer.append(buttonContainer)
    });
}


loadCategories()
loadVideos()
