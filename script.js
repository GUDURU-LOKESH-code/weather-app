const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weather = document.getElementById("weather");
const loading = document.getElementById("loading");
const apiKey = "b638b451769df4673945f9c0f714c046"

cityInput.addEventListener("keydown",function(event) {
    if(event.key === "Enter") {
        searchBtn.click();
    }
})

searchBtn.addEventListener("click",function(){
    let city = cityInput.value.trim()
    if(city === "" ){
        alert("Please Enter city")
    }else {
        loading.innerText = "Loading...";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        searchBtn.disabled = true;
        fetch(url)
           .then(response => response.json())
           .then(data => {
                 searchBtn.disabled = false;
                 loading.innerText ="";
                 if(data.cod === "404" || data.cod ===404) {
                    cityName.innerText = "City: " 
                    humidity.innerText = "Humidity: "
                    temperature.innerText = "Temperature: " 
                    wind.innerText = "Wind: " 
                    weather.innerText = "Weather: "
                    alert("❌ City not found")
                 
                 }else {
                  cityName.innerText = "City: " + data.name;
                  humidity.innerText = "Humidity: " + data.main.humidity + "%";
                  temperature.innerText = "Temperature: " + data.main.temp + " °C";
                  wind.innerText = "Wind: " + data.wind.speed + " m/s";;
                  weather.innerHTML = `
                  Weather:
                       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                       ${data.weather[0].main}
                       `; 
                }

           })
           .catch(()=> {
              loading.innerText = "";
              searchBtn.disabled = false
              alert("Something went wrong");
            })
            .finally(()=>{
                searchBtn.disabled = false;
                loading.innerText ="";
            });

          
              
    }
    cityInput.value = "";
    cityInput.focus();
});