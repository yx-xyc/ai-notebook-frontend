// src/components/NoteActions.tsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface NoteActionsProps {
    noteId: string; // Assuming you will pass noteId as a prop
}

const NoteActions: React.FC<NoteActionsProps> = ({ noteId }) => {
    const [result, setResult] = useState('');

    const generateInsight = () => {
        fetch(`http://localhost:8080/note/${noteId}/insight`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setResult(data);
            })
            .catch(error => console.error('Error generating insight:', error));
    };

    const generateSummary = () => {
        fetch(`http://localhost:8080/note/${noteId}/summary`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setResult(data);
            })
            .catch(error => console.error('Error generating summary:', error));
    };

    return (
        <Box>
        <Button variant="contained" color="primary" onClick={generateInsight}>
            Generate Insight
        </Button>
        <Button variant="contained" color="primary" onClick={generateSummary}>
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
    );
};

export default NoteActions;
