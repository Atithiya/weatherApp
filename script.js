let city = "Tokyo"; //let = เปลี่ยนค่าตามชื่อเมืองที่เราค้น
const apiKey = "416dae4d005ae7a35a63428f04492705"; //ใช้ค่าคงที่ > copy api key ของเรามาใส่เป็น string
const form = document.getElementById("form");
const search = document.getElementById("search");

function setData() {
  showWeather();
}
// async เพื่อบอกว่ารอให้ fetch url มาก่อนแล้วค่อยทำงานพร้อมกัน รอฉันด้วยนะ
async function showWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // fetch ดึงข้อมูลจาก url
    const response = await fetch(url);
    const data = await response.json();
    showDataToUI(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function showDataToUI(data) {
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const weather = document.getElementById("weather");
  const status = document.getElementById("status");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  city.innerText = data.name;
  state.innerText = data.sys.country;
  weather.children[0].innerHTML =
    calculate(parseInt(data.main.temp)) + " &deg C"; //แปลงเป็นparseInt
  weather.children[1].innerHTML =
    "max : " +
    calculate(parseInt(data.main.temp_max)) +
    "&deg C" +
    " min : " +
    calculate(parseInt(data.main.temp_min)) +
    "&deg C";
  // Status บอกว่าสภาพอากาศในเมือง.. เป็นอย่างไร
  status.innerText = data.weather[0].description; //เข้าถึงweather[สมาชิกตัวที่0].เข้าถึงdescription
  humidity.innerText = "Humidity : " + data.main.humidity;
  wind.innerText = "Wind Speed : " + data.wind.speed;
}
function calculate(k) {
  return k - 273;
}
function calldataAPI(e) {
  e.preventDefault();
  console.log(search.value);
  city = search.value;
  showWeather();
}

form.addEventListener("submit", calldataAPI);
setData();
