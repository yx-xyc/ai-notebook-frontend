// src/NotebookPage.tsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import { fetchNotesInNotebook } from 'utils/noteServices'; // Make sure to create this service
import NotesCard from './NotesCard';

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

const NotebookPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    // const { notebookId, userId } = useParams();
    const notebookId = 'b824e352-88cc-4886-bd16-963b40c1d609';
    const userId = 'aa1456c9-ed8f-4615-8fc8-1d8050f01867';

    useEffect(() => {
        if (!notebookId) return;
        // This function should call the API and return the list of notes
        fetchNotesInNotebook(notebookId)
            .then(notes => setNotes(notes))
            .catch(console.error);
        console.log(notes);
    }, [notebookId, notes]);

    return (
        <Container sx={{ maxWidth: 'lg' }}>
            <NotesCard userId={userId} notebook={notebookId} notes={notes}/>
        </Container>
    );
};

export default NotebookPage;
