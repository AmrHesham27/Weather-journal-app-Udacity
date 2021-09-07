// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


// Base URL and API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=398c0a230da5fa8b36149aba603590d8&units=metric";


// function to fetch the API to get weather Data 
const fetchAPI = async (baseURL,newZip,apiKey) => {
    let res = await fetch(baseURL+newZip+apiKey)
    try{
      let weatherData = await res.json();
      return weatherData;
    }
    catch(error){
      console.log(error)
    }
};


// Build generateData function to attach it later to a button (Generate)
const generateData = async (e) => {
  // get the zip code and the feelings of the user from the inputs
  let newZip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  // the app can work if the user did not put input in the feelings input
  if (feelings == null){let feelings = ""};
  try {
  // fetch the API then post the data to the server
  await fetchAPI(baseURL,newZip,apiKey)
  .then(function (weatherData){
    postData("/add", 
    {date:newDate, temp:Math.round(weatherData.main.temp), content:feelings, city:weatherData.name});
    updateUI();})
  } 
  catch(error){console.log(error)}
};


// Build post function to send data to the server 
const postData = async (url='',data) => {
  try{
  let response = await fetch(url,{
    method:"POST",
    credentials:"same-origin",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
    let newData = await response.json();
    return newData;
  }
  catch(error){console.log(error)};
};

// Function to update the UI
const updateUI = async () => {
  // Fetch the server to get data , which we will use to update the api
  try{
  let requestData = await fetch("/all");
  let userData = await requestData.json();
  // Change the UI , by changing innerHTML of dom elements 
  document.getElementById("date").innerHTML = `Date : ${userData.date}`;
  document.getElementById("temp").innerHTML = `Temperature in ${userData.city} is ${userData.temp} °C`;
  document.getElementById("content").innerHTML = `I feel ${userData.content}`;
  // Reset the inputs after updating the UI
  document.getElementById("zip").value = "" ;
  document.getElementById("feelings").value = "" ;
  }
  catch(error){console.log(error)}
};

// Make Event Listener and attch it to the Generate button 
document.getElementById("generate").addEventListener("click", generateData);
