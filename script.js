

let divMap = `
<div id="map"></div>
`;

document.querySelector(".map-content").insertAdjacentHTML("beforeend", divMap);


const showTheMap = (lat, lng) => {

  var map = L.map('map').setView([lat, lng], 10);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
    .bindPopup('Location viewed here.')
    .openPopup();



}


const showContent = (ip, city, country, timezone, isp) => {
  document.querySelector(".showWrapper").innerHTML = "";

  let div = `
    <div class="showLocation-div">
        <div class="show-content">
          <h2>IP Address</h2>
          <p>${ip}</p>
        </div>
        <div class="show-content">
          <h2>Location</h2>
          <p>${city}, ${country}</p>
        </div>
        <div class="show-content">
          <h2>Timezone</h2>
          <p>${timezone}</p>
        </div>
        <div class="show-content">
          <h2>ISP</h2>
          <p>${isp}</p>
        </div>
      </div>
    `;


  document.querySelector(".showWrapper").insertAdjacentHTML("beforeend", div);

}


const getApi = async (ipDomain) => {
  const url = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_wM5lu8oM60uVnc7Kb3MHVorUdIlnu&ipAddress&domain=${ipDomain}`);
  const data = await url.json();
  showTheMap(data.location.lat.toFixed(2), data.location.lng.toFixed(2));
  showContent(data.ip, data.location.city, data.location.country, data.location.timezone, data.isp);
  // console.log(data);



}

getApi("");


document.querySelector(".send").addEventListener("click", function () {
  document.querySelector(".map-content").innerHTML = "";
  // console.log(document.querySelector(".ss-input").value);

  let divMap = `
<div id="map"></div>
`;

  document.querySelector(".map-content").insertAdjacentHTML("beforeend", divMap);

  getApi(document.querySelector(".ss-input").value)

  document.querySelector(".ss-input").value = "";
});


document.querySelector(".ss-input").addEventListener("keypress", function (e) {
  // console.log(e.key);

  if (e.key === "Enter" && document.querySelector(".ss-input").value !== "") {
    document.querySelector(".map-content").innerHTML = "";
    console.log(document.querySelector(".ss-input").value);

    let divMap = `
  <div id="map"></div>
  `;

    document.querySelector(".map-content").insertAdjacentHTML("beforeend", divMap);

    getApi(document.querySelector(".ss-input").value)

    document.querySelector(".ss-input").value = "";
  }

});




