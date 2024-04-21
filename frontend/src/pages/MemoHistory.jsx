import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/history.css'
export default function MemoHistory() {

    useEffect(() => {
        document.title = "Notes App"
    });

    const notesList = [
        { id: 1, views: 0, date: '4/20/24', message: 'Here is a message...', iconSrc: 'img/dumb_dog.PNG' },
        { id: 2, views: 10, date: '4/19/24', message: 'Another message...', iconSrc: 'img/shiba_stuck.PNG' },

    ];

    return (
        <div data-theme="light" className="h-screen">
            <div className="notesTop">
                <div className="exitDiv">
                    <button className='exitButton'></button>
                </div>

                <h1 className="notesTitle">YOUR MEMOS</h1>
            </div>
            <div className="notes">
                <img className="notesTape" src="img/tape.png" alt="tape" />
                <ul className="notesList">
                    {notesList.map((note, index) => (
                        <React.Fragment key={note.id}>
                            <Link to={`/history/${note.id}`} className="notesItem">
                                <img className="noteIcon" src={note.iconSrc} alt="note icon" />
                                <div className="noteContent">
                                    <div className="noteData">
                                        <span>{note.views} views</span>
                                        <span>{note.date}</span>
                                    </div>
                                    <div className="noteMessage">
                                        <p>{note.message}</p>
                                    </div>
                                </div>
                            </Link>
                            {index !== notesList.length - 1 && <hr className="notesDivider" />}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    )
}