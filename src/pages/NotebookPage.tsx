// src/NotebookPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { fetchNotesInNotebook } from '../services/NoteService'; // Make sure to create this service

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

const NotebookPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const { notebookId, userId } = useParams();

    useEffect(() => {
        if (!notebookId) return;
        // This function should call the API and return the list of notes
        fetchNotesInNotebook(notebookId)
            .then(notes => setNotes(notes))
            .catch(console.error);
    }, [notebookId]);

    return (
        <Container sx={{ maxWidth: 'lg' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Notebook: {notebookId}
            </Typography>
            <List>
                {notes.map((note) => (
                    <ListItem key={note.id} component={Link} to={`/users/${userId}/notes/${note.id}`}>
                        <ListItemText primary={note.title} secondary={`Updated at: ${new Date(note.updatedAt).toLocaleString()}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default NotebookPage;
