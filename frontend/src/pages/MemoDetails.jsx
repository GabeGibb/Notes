import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/memodetails.css'
import '../styles/history.css'

export default function MemoDetails() {
    const { id } = useParams();

    // Use the id to fetch and display the details of the memo
    const memoDetails =
        { id: 1, views: 0, date: '4/20/24', message: 'Here is a message...', iconSrc: 'img/dumb_dog.PNG' };

    const userName = "Temp Username";

    return (
        <div data-theme="light" className="h-screen">

            {/* <p>ID: {id}</p> */}
            {/* Display other details of the memo */}

            <div className="notesTop">
                <div className="exitDiv">
                    <button className='exitButton'></button>
                </div>

                <h1 className="notesTitle">YOUR MEMO</h1>
            </div>

            <div className="notes">
                <img className="notesTape" src=" ../../public/img/tape.png" alt="tape" />
                <div className="notesList">
                    <div className="detailsData">
                        <span>{memoDetails.views} views</span>
                        <span>{memoDetails.date}</span>
                    </div>
                    <hr className='notesDivider' />
                    <img className="detailsIcon" src={"../../public/" + memoDetails.iconSrc} alt="note icon" />
                    <hr className='notesDivider' />
                    <div id="detailsMessage" className='detailsMessage'>
                        <span>{memoDetails.message}</span>
                    </div>
                    {/* <span className='detailsUser'>{userName}</span> */}

                    <div className='detailsUser'>
                        <span>-{userName}</span>
                    </div>
                </div>

            </div>



        </div >


    );
}
