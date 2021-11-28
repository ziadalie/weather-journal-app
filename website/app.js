/* Global Variables */

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* Integrating OpenWeatherMap API */

// Personal API key
const apiKey = '7eeeedba4664e91a391fe1aa03393610';

// Assigning a variable for the generate button
const btn = document.getElementById('generate');
      
async function getWeather(url) {
    const res = await fetch(url);
    const response = await res.json();
    return Promise.resolve(response);
}

// Function for updating UI
async function updateUI(){
    const response =  await fetch("/getData", {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    const data = await response.json();
    // Updating the temperature property
    document.getElementById('temp').innerHTML = Math.round(data.temp) + ' degrees';
    
    // Updating the feelings property
    document.getElementById('content').innerHTML = data.content;
    
    // Updating the date property
    document.getElementById('date').innerHTML = data.date;
    
    }
    // Generate button click event using asynchronous JavaScript
    btn.addEventListener('click', async listenning => {
    const zipCode = document.getElementById('zip').value;
    // Api call by zip code
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    
    
    await getWeather(url, zipCode).then( data =>{
    
    const tempValue = data.main.temp;
    
    const feelings = document.getElementById('feelings').value;
    
    let d = new Date();
    
    let newDate = months[d.getMonth()]+'.'+ d.getDate()+'.'+ d.getFullYear();
    
    fetch('/addData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },       
        body: JSON.stringify({
            date: newDate,
            temp: tempValue,
            content: feelings,
        }),
    
    })
    }).then(async () =>{
    
    await updateUI();
    });
});
