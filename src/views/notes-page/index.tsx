// src/NotebookPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNotesInNotebook } from 'utils/noteServices'; // Make sure to create this service
import NotesCard from './NotesCard';

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    let { notebookId, userId } = useParams();
    useEffect(() => {
        if (!notebookId) return;
        // This function should call the API and return the list of notes
        fetchNotesInNotebook(notebookId)
            .then(notes => setNotes(notes))
            .catch(console.error);
    }, [notebookId]);
    return (
        userId && notebookId ? (
                    <NotesCard userId={userId} notebookId={notebookId} notes={notes} />
            ) : (
                // Render an alternative component or null if userId or notebookId is not valid
                <div>Invalid User ID or Notebook ID</div>
            )    
    );
};

export default NotesPage;
