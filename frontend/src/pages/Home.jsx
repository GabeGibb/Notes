import { useEffect } from 'react';
import {SparkleLeft, SparkleRight} from '../components/Icons';
export default function Home() {

    useEffect(() => {
        document.title = "Notes App"
    });

    return (
        <div data-theme="light" className="h-screen w-screen flex flex-col">
            <div className="m-auto text-center">
                <img src="home_cat.png" className="m-auto w-64" alt="splash"></img>
                <h1 className="text-2xl font-Poppins">welcome to</h1>
                <div className="inline-flex items-center">
                    <SparkleLeft></SparkleLeft>
                    <h1 className="text-6xl mb-6 mx-2 text-light-green">memotrail</h1>
                    <SparkleRight className="align-middle"></SparkleRight>
                </div>
                <h2 className="text-base font-Poppins mb-14">leave a piece of your heart wherever you go</h2>
                <button className="btn border-0 rounded-full bg-light-green w-72 shadow-custom" onClick={() => window.location.href = '/login'}>
                    <p className="font-Poppins text-white text-sm font-medium">start your journey</p>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-14" width="25" height="11" viewBox="0 0 32 11" fill="none">
                    <circle cx="5.5" cy="5.42078" r="5" fill="#FFD9D9"/>
                    <circle cx="26.5" cy="5.42078" r="5" fill="#D9D9D9"/>
                </svg>
            </div>
        </div>
    )
}