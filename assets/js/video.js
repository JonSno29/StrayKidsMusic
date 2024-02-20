fetch(
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCb3BgkDN-QVBc-HoW7XdPbA&maxResults=AIzaSyDwuWzHnd40oj3HKj8ITCFZjMa5J125JiU"
)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log(data);
    let videos = data.items;
    let videoContainer = document.querySelector(".youtube-container");
    for (videos of videos) {
      videoContainer.innerHTML += `
            <img src="${videos.snippet.thumbnails.large.url}"/>
            `;
    }
  });  

  