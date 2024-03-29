import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/Header';
import Error from './components/Error'
import Form from './components/Form';
import Weather from './components/Weather';
import Footer from './components/Footer';

import './App.css';

function App() {

    const [ queryWeather, setQueryWeather ] = useState( {} );
    const [weather, setWeather] = useState( {} );

    useEffect( () => {
        if ( Object.entries( queryWeather ).length > 0 ) {
            const getWeatherData = async () => {
                let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${ queryWeather.city },${ queryWeather.country }&appid=447a0a328f23d03a2f0f5df3918cf3a0&units=imperial`;
                let res = await fetch( apiUrl );
                let data = await res.json();
                setWeather( data );
            };
            getWeatherData();
        }
    }, [ queryWeather ] );

    useEffect(() => {
        if ( Object.entries( weather ).length > 0 ) {
            if ( weather.cod !== '404' ) {
                let weatherImg = document.querySelector( '#weather-img-container' );
                weatherImg.classList.forEach( classL => {
                    if ( classL !== 'weather-img' && classL !== 'shadow' ) {
                        weatherImg.classList.remove( classL );
                    }
                } );
                let classList = weather.weather[0].main.toLowerCase();
                classList = classList.replace(/\s/g,'');
                weatherImg.classList.add( classList );
            }
        }
    }, [ weather ]);

    let weatherElement;
    if ( Object.entries( weather ).length > 0 ) {
        if ( weather.cod === '404' ) {
            weatherElement = ( <Error message={ weather.message } /> );
        } else {
            weatherElement = ( <Weather weather={ weather } /> ) ;
        }
    }     
    
  return (
    <Fragment>
        <main className="d-flex flex-column align-items-center p-0">
            <Header title={ 'Weather App' } />
            <div className="d-flex align-items-center justify-content-start flex-column pt-5">
                <div className="my-4">
                    <Form setQueryWeather={ setQueryWeather } />
                </div>
                <div className="my-4">
                    { weatherElement }
                </div>
            </div>
            <Footer />
        </main>
    </Fragment>
  );
}

export default App;
