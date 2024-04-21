import {BackArrow} from '../components/Icons';
import { useEffect, useState } from 'react';
export default function Login() {
    const [username, setUsername] = useState('');

    async function createUser(){
        const response = await fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        const data = await response.json();
        if (data.error !== undefined) {
            return;
        }
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', data.user_id);
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('user_id'));

        window.location.href = '/explore.html';
    }
    


    return (
        <div data-theme="light" className="h-screen w-screen flex flex-col">
            <div className="ml-4 mt-6" onClick={() => window.location.href = '/'}>
                <BackArrow></BackArrow>
            </div>
            <div className="m-auto text-center">
                <h1 className="text-4xl mb-3.5 leading-10">FIRST...</h1>
                <img src="login_duck.png" className="m-auto w-56 mb-19" alt="splash"></img>
                <h2 className="text-4xl mb-4">What should we call you?</h2>
                <div className="mb-12">
                    <input className="w-72 align-text-bottom text-center text-base border-b-2 border-light-green h-14" type="text" placeholder="enter your cool username..." onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <button className="btn border-0 rounded-full bg-light-green w-72 shadow-custom" onClick={() => createUser()}>
                    <p className="font-Poppins text-white text-sm font-medium">start exploring</p>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-14" width="25" height="11" viewBox="0 0 32 11" fill="none">
                    <circle cx="5.5" cy="5.42078" r="5" fill="#D9D9D9"/>
                    <circle cx="26.5" cy="5.42078" r="5" fill="#FFD9D9"/>
                </svg>
            </div>
        </div>
    )
}