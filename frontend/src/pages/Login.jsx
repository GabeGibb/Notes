import {BackArrow} from '../components/Icons';
export default function Login() {


    return (
        <div data-theme="light" className="h-screen w-screen flex flex-col">
            <div className="ml-4 mt-6">
                <BackArrow></BackArrow>
            </div>
            <div className="m-auto text-center">
                <h1 className="text-4xl mb-3.5 leading-10">FIRST...</h1>
                <img src="login_duck.png" className="m-auto w-56 mb-19" alt="splash"></img>
                <h2 className="text-4xl mb-14">What should we call you?</h2>
                <button className="btn border-0 rounded-full bg-light-green w-72 shadow-custom" onClick={() => window.location.href = '/login'}>
                    <p className="font-Poppins text-white text-sm font-medium">start your journey</p>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-14" width="25" height="11" viewBox="0 0 32 11" fill="none">
                    <circle cx="5.5" cy="5.42078" r="5" fill="#D9D9D9"/>
                    <circle cx="26.5" cy="5.42078" r="5" fill="#FFD9D9"/>
                </svg>
            </div>
        </div>
    )
}