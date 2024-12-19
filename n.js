// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }

// Function to load categories from API
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then(res => res.json())
      .then(data => displayCategories(data.categories))
      .catch(error => console.log("Error loading categories:", error));
  }
  
  // Function to load videos from API
  const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then(res => res.json())
      .then(data => displayVideos(data.videos))
      .catch(error => console.log("Error loading videos:", error));
  }
  
  // Function to convert seconds to hours, minutes, and seconds
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    // Format the time in HH:MM:SS
    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    return formattedTime;
  }
  
  // Function to display videos on the page
  const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = ''; // Clear previous content
  
    videos.forEach((video) => {
      const card = document.createElement("div");
      card.classList = "card shadow-xl";
  
      const { category_id, video_id, authors, thumbnail, title, others } = video;
  
      // Convert posted_date (in seconds) to HH:MM:SS format
      const formattedPostedDate = formatTime(others.posted_date);
  
      card.innerHTML = `
        <figure class="h-[200px] relative">
          <img src=${thumbnail} alt="Video Thumbnail" class="h-full w-full object-cover" />
          <span class="absolute right-2 bottom-2 bg-slate-50 p-1 rounded-md">${formattedPostedDate}</span>
        </figure>
        <div class="px-1 py-2 flex gap-4">
          <div>
            <img class="h-10 w-10 rounded-full object-cover" src=${authors[0].profile_picture} />  
          </div>
          <div>
            <h2 class="font-bold">${title}</h2>
            <div class="flex items-center gap-3">
              <p>${authors[0].profile_name}</p>
              ${authors[0].verified ? `<img class="w-5" src='https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png' alt="Verified Icon"/>` : ''}
            </div>
          </div>
        </div>
      `;
  
      videosContainer.appendChild(card);
    });
  }
  
  // Function to display categories on the page
  const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = ''; // Clear previous content
  
    categories.forEach(item => {
      const button = document.createElement('button');
      button.classList = "btn";
      button.innerText = item.category;
      categoriesContainer.appendChild(button);
    });
  }
  
  // Load data when the page loads
  loadCategories();
  loadVideos();
  