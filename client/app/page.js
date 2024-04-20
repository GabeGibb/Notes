'use client'
import {useEffect} from 'react'
export default function Home() {

  useEffect(() => {
    document.title = "Notes App"
  });

    return (
      //web
      // <div data-theme = "light" className="h-screen flex flex-col justify-center">
      //         <h1>explore your world through a new lens</h1>
      //         <h2>description blahblahblahblah</h2>
      //         <div className="inline-block">
      //             <button className="btn">
      //               Write Note
      //               {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> */}
      //               </button>
      //               <button className="btn">
      //               Explore Now
      //               {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> */}
      //               </button>
      //           </div>
      // </div>

      <div data-theme = "light" className="h-screen flex flex-col">
      <div className="m-auto text-center">
          <img src="./media/hampter.jpg" alt="splash"></img>
          <h1>every location has a story to tell.</h1>
          <h2>leave a piece of your heart wherever you go</h2>
          <div className="flex flex-col space-y-2 m-auto">
              <button className="btn rounded-full">start exploring</button>
              <button className="btn rounded-full">Explore Now</button>
          </div>
      </div>
</div>
    )
  }