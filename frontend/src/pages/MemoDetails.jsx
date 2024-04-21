import React, { memo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/memodetails.css'
import '../styles/history.css'

export default function MemoDetails() {
    const [memoDetails, setMemoDetails] = React.useState(null);

    useEffect(() => {
        if (memoDetails === null) {
            document.title = "Notes App"
            getMemoDetails();
        }
    });

    async function getMemoDetails() {
        // Fetch the memo details from the server
        const id = window.location.pathname.split('/')[2];
        const response = await fetch(`http://127.0.0.1:5000/notes/${id}`);
        const data = await response.json();
        let memo = {};
        let message = data.message;
        memo.id = message.id;
        memo.date = '4/21/24';
        memo.views = 10;
        memo.message = message.content;
        memo.iconSrc = 'img/dumb_dog.PNG';
        
        setMemoDetails(memo);
    }

    if (memoDetails === null) {
        return <div>Loading...</div>;

    }
    const userName = localStorage.getItem("username");

    return (
        <div data-theme="light" className="h-screen">
            {/* <p>ID: {id}</p> */}
            {/* Display other details of the memo */}

            <div className="notesTop">

                <div className="exitDiv">
                    <button className='exitButton' onClick={() => window.location.href = "/history"}></button>
                </div>

                {/* <div className="exitDiv">
                    <button className='exitButton'></button>
                </div> */}

                <h1 className="notesTitle">YOUR MEMO</h1>
            </div>

            <div className="notes">
                <img className="notesTape" src="/img/tape.png" alt="tape" />
                <div className="notesList">
                    <div className="detailsData">
                        <span>{memoDetails.views} views</span>
                        <span>{memoDetails.date}</span>
                    </div>
                    <hr className='notesDivider' />
                    <img className="detailsIcon" src={"/" + memoDetails.iconSrc} alt="note icon" />
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
