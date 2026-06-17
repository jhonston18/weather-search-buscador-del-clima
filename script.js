
const seachInput = document.getElementById('seach-input')
const buttonSearch = document.getElementById('buttonSearch')
const titleCard = document.getElementById('titulo-card')
const imageCard = document.getElementById('image-weather-card')
const temperature = document.getElementById('temperature-card')
const temperatureMax = document.getElementById('temperature-max')
const temperatureMin = document.getElementById('temperature-min')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity-card')
const coords = document.getElementById('coord')
const description = document.getElementById('descripcion-card')
const cardWeather = document.querySelector('.card-weather')
const errorCont = document.getElementById('error-cont')
const h3Error = document.getElementById('error-h3')



async function searchWeather(city) {

    try {

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY_WEATHER}&units=metric&lang=en`);
        const data = await res.json()
        // console.log("datos: ", data)
        if (data.cod == 404) return mostrarError(data.message)

        return data

    } catch (err) {
        mostrarError(err)
    }


}

async function handlerclick() {
    h3Error.textContent = ''
    cardWeather.style.display = "none"


    const city = seachInput.value.trim()

    if (!city) return mostrarError("Ingrese una ciudad Valida")

    const data = await searchWeather(city)

    if (!data) return
    mostrarclima(data)
}

buttonSearch.addEventListener('click', handlerclick)

function mostrarclima(data) {
    cardWeather.style.display = "block";



    titleCard.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${data.main.temp}`;
    temperatureMax.textContent = `${data.main.temp_max}`
    temperatureMin.textContent = `${data.main.temp_min}`
    humidity.textContent = `${data.main.humidity}`;
    pressure.textContent = `${data.main.pressure}`;
    coords.textContent = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`
    description.textContent = `${data.weather[0].description}`;

    const iconCode = data.weather[0].icon
    imageCard.src = `https://openweathermap.org/img/wn/${iconCode}.png`

    imageCard.style.fontSize = "40px"

}

function mostrarError(err) {
    h3Error.style.display = "block"
    h3Error.textContent = `A ocurrido un error: ${err}`
}



