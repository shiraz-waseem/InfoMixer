import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout"
import "../styles/jokesstyles.modules.css"
import img from "./images/EmojiLaughing.png"
import styled from "styled-components"

const JokesBody = styled.body`
    background-color: #fab22e;
    font-family: "Rubik", sans-serif;
    min-height: 100vh;

`

const Randomjokes = () => {
    const [joke, setJoke] = useState("Click on button to hear a joke");
    // useEffect(() => {
    //     generateJokes();
    // }, []);



    const generateJokes = async () => {
        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    accept: "application/json",
                }
            })

            const data = await response.json();
            setJoke(data.joke)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <>
            <JokesBody>
                <Layout title={"Jokes Time"}>

                    <div className='container'>
                        <h3 className='h3'>Are you sad? Let me share some best jokes with you</h3>
                        <img src={img} className='imgHaha' alt="" />
                        <div id="joke" className="joke">

                            {/* Click on button to hear a joke */}
                            {joke}
                        </div>
                        <button id="jokebtn" className="btn" onClick={generateJokes}>Next Joke</button>
                    </div>

                </Layout>
            </JokesBody>
        </>
    )
}

export default Randomjokes



