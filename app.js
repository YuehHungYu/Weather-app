const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherBox=document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');
const error=document.querySelector('.not-found');


search.addEventListener('click',()=>{

  const ApiKey='cff8abd09d99fff54281f23926fb4bfe';
  const city=document.querySelector('.search-box input').value;
  if(city==='')
    return;
  

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`).then(response=>response.json()).then(
    json=>{
      if(json.cod==='404'){
        container.style.height='400px';
        weatherBox.style.display='none';
        weatherDetails.style.display='none';
        error.style.display='block';
        error.classList.add('In');
        return;
      }

      error.style.display='none';
      error.classList.remove('In');
      const image=document.querySelector('.weather-box img');
      const temp=document.querySelector('.weather-box .temp');
      const desc=document.querySelector('.weather-box .desc');
      const humidity=document.querySelector('.weather-details .humidity span');
      const wind=document.querySelector('.weather-details .wind span');

      switch(json.weather[0].main){
        case 'Clear':
          image.src='imgs/sun.png';
          break;
        case 'Clouds':
          image.src='imgs/cloud.png';
          break;
        case 'Rain':
          image.src='imgs/rain.png';
          break;
        case 'Snow':
          image.src='imgs/snow.png';
          break;
        default:
          image.src='';
      }
      temp.innerHTML=`${parseInt(json.main.temp)}<span>°C<span>`;
      desc.innerHTML=`${json.weather[0].description}`;
      humidity.innerHTML=`${parseInt(json.main.humidity)}%`;
      wind.innerHTML=`${parseInt(json.wind.speed)}Km/Hr`;
      weatherBox.style.display='';
      weatherDetails.style.display='';
      weatherBox.classList.add('In');
      weatherDetails.classList.add('In');
      container.style.height='600px';
    });

});