const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTg5YjJmZTBiOWQ3NWExNGQzMWMwM2EwMWViZmMxYyIsInN1YiI6IjY1OTRmM2M0YTY5OGNmNmNmMDQzYTExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zr1q2WXcxaJmGs0cx8LLGmNxmiVmKFC0PLbJbrQvG94"
  }
};
//api에서 page를 전부다 끌어오고 싶은데 주소정보 끝을 어떻게 수정해야할지 막막합니다. ==> 매우 복잡할꺼 같고 페이지가 무거워질거 같다 생각이 들었습니다.

// 기존 let을 이용해 변수를 따로 한번 선언하고 반복 시키는 템플릿 리터럴을 하였는데 이것을 map 함수를 이용하여 좀더 간단하게 만들었습니다.
fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-Us&page=1", options)
  .then((response) => response.json())
  .then((response) => {
    const movie_data = response["results"];
    const cardsBox = document.getElementById("cards-box");
    const innerHTML = movie_data
      .map(
        (movie) => `
      <div class="col" onclick="alert('영화 id : ${movie.id}')">
        <img src='https://image.tmdb.org/t/p/w300${movie.poster_path}' alt="">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>⭐ ${movie.vote_average}</p>
      </div>`
      )
      .join("");

    cardsBox.innerHTML = innerHTML;
  })
  .catch((error) => {
    console.error("Error fetching movie data:", error);
  });

//기존 코드
// let movie_data = response["results"];
// let temp_html = ``;
// movie_data.forEach((i) => {
//   let img_url = "https://image.tmdb.org/t/p/w300" + i["poster_path"];
//   let movie_title = i["title"];
//   let overview = i["overview"];
//   let vote = i["vote_average"];
//   let id = i["id"];

//   temp_html += `
//     <div class="col" onclick="alert('영화 id : ${id}')" >
//     <img src='${img_url}' alt="" >
//     <h3>${movie_title}</h3>
//      <p>${overview}</p>
//     <p>⭐ ${vote}</p>
//     </div>`;
//   document.getElementById("cards-box").innerHTML = temp_html;
// });

//검색기능인데 열심히 검색해서 만들었지만 몇몇 기능은 이해가 가지않습니다.  ==> 복잡하게 만들어서 어려웠을만 했다...

// 과제 해설 영상에서 다른분 검색기능을 해설해주시는걸 보고 너무 복잡하게 생각하고 있었다는걸 알았고
// 카드를 반복해서 생성하는 것을 from과 forEach 을 통해서 실행해주고 includes 를 이용하여
// 카드를 보여주냐 안보여주냐를 정할수 있게 구상하였습니다.
function search_btn() {
  const movie_name_input = document.getElementById("movie_name_input").value.toUpperCase();
  const card_arr = document.getElementsByClassName("col");

  Array.from(card_arr).forEach((card) => {
    const cardName = card.getElementsByTagName("h3")[0].innerText.toUpperCase();
    card.style.display = cardName.includes(movie_name_input) ? "inline-block" : "none";
  });
}

// 기존코드
// function search_btn() {
//   const movie_name_input = document.getElementById("movie_name_input").value;
//   const card_arr = document.getElementsByClassName("col");
//   const card_name_arr = [];
//   for (let i = 0; i < card_arr.length; i++) {
//     card_name_arr[i] = card_arr[i].getElementsByTagName("h3")[0].innerText;
//     card_arr[i].style = "display:none";
//   }
//   let movie_name = "";
//   for (let i = 0; i < card_name_arr.length; i++) {
//     movie_name = card_name_arr.filter((el) => el.toUpperCase().indexOf(movie_name_input.toUpperCase()) > -1)[i];
//     for (let i = 0; i < card_name_arr.length; i++) {
//       if (movie_name === card_name_arr[i]) {
//         card_arr[i].style = "display:inline-block";
//       }
//     }
//   }
// }

// 과제 해설 영상에서 다른분 검색기능을 해설해주시는걸 보고 너무 복잡하게 생각하고 있었다는걸 알았고
// 카드를 반복해서 생성하는 것을 from과 forEach 을 통해서 실행해주고 includes 를 이용하여
// 카드를 보여주냐 안보여주냐를 정할수 있게 구상하였습니다.
function search_btn() {
  const movie_name_input = document.getElementById("movie_name_input").value.toUpperCase();
  const card_arr = document.getElementsByClassName("col");

  Array.from(card_arr).forEach((card) => {
    const cardName = card.getElementsByTagName("h3")[0].innerText.toUpperCase();
    card.style.display = cardName.includes(movie_name_input) ? "inline-block" : "none";
  });
}
