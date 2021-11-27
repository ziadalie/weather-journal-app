/* Global Variables */

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* Integrating OpenWeatherMap API */

// Personal API key
const apiKey = '7eeeedba4664e91a391fe1aa03393610';

// Assigning a variable for the generate button
const btn = document.getElementById('generate');

// Generate button click event using asynchronous JavaScript
btn.addEventListener('click', async listenning => {
    // Getting zip code value
    const zipCode = document.getElementById('zip').value;
    
    // Api call by zip code
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    
    // Requesting weather data using fetch api
    const res = await fetch(url);
    const response = await res.json();
    
    // Getting temperature value
    const tempValue = response.main.temp;
    // Updating the temperature property
    document.getElementById('temp').innerHTML = tempValue;
    
    // Getting feelings value
    const feelings = document.getElementById('feelings').value;
    // Updating the feelings property
    document.getElementById('content').innerHTML = feelings;

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = months[d.getMonth()]+'.'+ d.getDate()+'.'+ d.getFullYear();
    // Updating the date property
    document.getElementById('date').innerHTML = newDate;
    
    // Sending a request to addData route using fetch
    await fetch('/addData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },       
        body: JSON.stringify({
            date: newDate,
            temp: tempValue,
            content: feelings
        }),
      });
});


