import { useEffect } from 'react';
export default function Home() {

    useEffect(() => {
        document.title = "Notes App"
    });

    return (
        <div data-theme="light" className="h-screen flex flex-col">
            <div className="m-auto text-center">
                <img src="hampter.jpg" className="m-auto" alt="splash"></img>
                <h1 className="Patrick_Hand_SC">Welcome to memotrail</h1>
                <h2>leave a piece of your heart wherever you go</h2>
                <div className="flex flex-col space-y-2 m-auto">
                    <button className="btn rounded-full">start your journey</button>
                </div>

            </div>
        </div>
    )
}