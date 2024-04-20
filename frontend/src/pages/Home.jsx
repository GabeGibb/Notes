import { useEffect } from 'react';
export default function Home() {

    useEffect(() => {
        document.title = "Notes App"
    });

    return (
        <div data-theme="light" className="h-screen flex flex-col">
            <div className="m-auto text-center">
                <img src="home_cat.png" className="m-auto h-1/2" alt="splash"></img>
                <h1 className="text-4xl mb-6">Welcome to memotrail</h1>
                <h2 className="text-base font-Poppins mb-14">leave a piece of your heart wherever you go</h2>
                <button className="btn rounded-full bg-light-green w-72">
                    <p className="font-Poppins text-white text-base">start your journey</p>
                </button>
            </div>
        </div>
    )
}