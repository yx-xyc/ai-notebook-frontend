// src/NotePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import NoteEditor from '../components/NoteEditor';
import { fetchNote, generateInsight, generateSummary } from '../services/NoteService'; // Ensure this is the correct path to your service

interface Note {
    id: string; // Assuming your note object might have an id
    title: string;
    content: string;
}

const NotePage: React.FC = () => {
    const [note, setNote] = useState<Note>({ id: '', title: '', content: '' });
    const { noteId, userId } = useParams(); // Ensure you have imported useParams from react-router-dom
    const [result, setResult] = useState('');

    useEffect(() => {
        if (!noteId) return;
        fetchNote(noteId).then(setNote).catch(console.error);
    }, [noteId]);

    const handleGenerateInsight = async () => {
        try {
            const insightResult = await generateInsight(note.id);
            setResult(insightResult);
        } catch (error) {
            console.error('Error generating insight:', error);
            setResult('Error generating insight.');
        }
    };

    const handleGenerateSummary = async () => {
        try {
            const summaryResult = await generateSummary(note.id);
            setResult(summaryResult);
        } catch (error) {
            console.error('Error generating summary:', error);
            setResult('Error generating summary.');
        }
    };

    return (
        <Container className="container"   sx={{ 
            maxWidth: 'none', // This removes the max-width restriction
            // If you want a specific max-width, you can set it like so:
            // maxWidth: { sm: '100%', md: '1200px', lg: '1400px', xl: '1600px' }
        }}>
            <Typography variant="h2" component="h1" gutterBottom id="noteTitle">{note.title || 'Note Title'}</Typography>
            {noteId && userId && <NoteEditor initialContent={note.content} noteId={note.id} userId={userId} />}
            <Box>
                <Button variant="contained" color="primary" onClick={handleGenerateInsight}>
                    Generate Insight
                </Button>
                <Button variant="contained" color="primary" onClick={handleGenerateSummary}>
                    Generate Summary
                </Button>
                {result && (
                    <Box sx={{ mt: 2, color: typeof result === 'string' ? 'text.primary' : 'error.main' }}>
                        <Typography variant="body1">
                            {typeof result === 'string' ? result : 'The fetched data is not in text format.'}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default NotePage;