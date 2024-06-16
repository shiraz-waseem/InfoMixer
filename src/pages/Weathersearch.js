import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"
import "../styles/weatherSearch.modules.css"
import styled from 'styled-components';

const WeatherBody = styled.body`
    font-family: "Jost", sans-serif;
    /* background-image: url("./images/weather1.jpg"); */
    background: linear-gradient(#83e3db, #3c7071);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100vw;
    min-height: 100vh;

    > span {
    width: 100vw;
    text-align: center;
    color: grey;
  }

`




const Weathersearch = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('')

    // fat arrow is lia use kia kyon ke async use krna
    useEffect(() => {
        const fetchApi = async () => {
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=29c8280543952c24edd74c2ec4655619`
            // const response = await fetch(url)  // fetch api promise return krrha huta in future mein api sy data mila ga ya nahi mil gya tw fullfilled warna unfulfil waisay mila ga is lia await likh dia
            // // console.log(response)

            // const resJson = await response.json();
            // // console.log(resJson)
            // // Jo data mil rha wo humein store krna ha ab
            // setCity(resJson.main)

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=29c8280543952c24edd74c2ec4655619`, {
                    headers: {
                        accept: "application/json",
                    }
                })
                const resJson = await response.json();
                // console.log(resJson)
                // Jo data mil rha wo humein store krna ha ab
                setCity(resJson.main)
            } catch (e) {
                console.log(e)
            }
        }


        fetchApi();

        // search pass kia begair new city ki new value nahi derha tha
    }, [search])

    return (
        <>
            <WeatherBody>
                <Layout title={"Weather Update"}>
                    <div className="box">
                        <div className="inputData">
                            <input type='search'
                                placeholder="Enter a city name"
                                className="inputField"
                                onChange={(event) => {
                                    setSearch(event.target.value)
                                }}
                                value={search}
                            ></input>
                        </div>

                        {!city ? (<p className="errorMsg">No Data Found</p>) : (
                            <div>
                                <div className="info">
                                    <h2 className="location">
                                        <i id='weathercon' className="fa-solid fa-street-view"></i>{search}
                                    </h2>
                                    <h1 className="temp">{city.temp}°Cel</h1>
                                    <h3 className="tempmin_max">Min: {city.temp_min}°Cel | Max: {city.temp_max}°Cel</h3>
                                </div>

                                <div className="wave -one"></div>
                                <div className="wave -two"></div>
                                <div className="wave -three"></div>
                            </div>
                        )}

                    </div>
                </Layout>
            </WeatherBody>
        </>
    )
}

export default Weathersearch