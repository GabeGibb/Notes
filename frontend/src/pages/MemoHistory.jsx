import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/history.css'
export default function MemoHistory() {
    const [notesList, setNotesList] = React.useState(null);

    useEffect(() => {
        if (notesList === null) {
            document.title = "Notes App"
            getMemoDetails();
        }
    });

    async function getMemoDetails() {
        // Fetch the memo details from the server
        let item = localStorage.getItem('user_id');
        console.log(item)
        const response = await fetch(`http://127.0.0.1:5000/users/${item}`);
        const data = await response.json();
        let details = []
        for (let i = 0; i < data.messages.length; i++) {
            let memo = {};
            memo.id = data.messages[i].id;
            let date = new Date(data.messages[i].date);
            let formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
            memo.date = formattedDate;

            memo.views = data.messages[i].views;
            memo.message = data.messages[i].content;
            memo.iconSrc = data.messages[i].imgname;

            details.push(memo);
        }
        setNotesList(details);
        console.log(data.messages);
        return data;
    }

    if (notesList === null) {
        return <div>Loading...</div>;
    }

    if (notesList.length === 0) {
        return (
            <div data-theme="light" className="h-screen">
                <div className="notesTop">
                    <div className="exitDiv">
                        <button className='exitButton' onClick={() => window.location.href = "/explore.html"}></button>
                    </div>

                    <h1 className="notesTitle">YOUR MEMOS</h1>
                </div>
                <div className="notes">
                    <img className="notesTape" src="img/tape.png" alt="tape" />
                    <ul className="notesList">
                        <li className='notesItem'>
                            <div className="emptyMessage">
                                <p>You have not made any memos yet.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div data-theme="light" className="h-screen">
            <div className="notesTop">
                <div className="exitDiv">
                    <button className='exitButton' onClick={() => window.location.href = "/explore.html"}></button>
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