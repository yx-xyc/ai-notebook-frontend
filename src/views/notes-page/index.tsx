// src/NotebookPage.tsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container } from '@mui/material';
import { fetchNotesInNotebook } from 'utils/noteServices'; // Make sure to create this service
import NotesCard from './NotesCard';
import { useParams } from 'react-router-dom';

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
    // const notebookId = 'b824e352-88cc-4886-bd16-963b40c1d609';
    // const userId = 'aa1456c9-ed8f-4615-8fc8-1d8050f01867';
    // notebookId = 'afc457b0-90a9-439d-8591-d4d7264bec0a';
    // userId = 'f9a6072a-2e06-4f14-a1ff-3fd4096c799f';
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
    )    );
};

export default NotesPage;
