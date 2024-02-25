// src/NotePage.tsx
import React, { useState, useEffect } from 'react';
import NoteEditor from '../components/NoteEditor';
import NoteActions from '../components/NoteActions';
import { fetchNote } from '../services/noteServices'; // Ensure this is the correct path to your service
import { useParams } from 'react-router-dom';

interface Note {
    id: string; // Assuming your note object might have an id
    title: string;
    content: string;
}

const NotePage: React.FC = () => {
    const [note, setNote] = useState<Note>({ id: '', title: '', content: '' });
    const { noteId, userId } = useParams(); // Ensure you have imported useParams from react-router-dom

    useEffect(() => {
        if (!noteId) return;
        fetchNote(noteId).then(setNote).catch(console.error);
    }, [noteId]);

    return (
        <div className="container">
            <h2 id="noteTitle">{note.title || 'Note Title'}</h2>
            {noteId && userId && <NoteEditor initialContent={note.content} noteId={note.id} userId={userId}/>}
            <NoteActions noteId={note.id} />
        </div>
    );
};

export default NotePage;
