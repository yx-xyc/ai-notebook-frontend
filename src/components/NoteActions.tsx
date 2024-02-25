// src/components/NoteActions.tsx
import React, { useState } from 'react';

interface NoteActionsProps {
    noteId: string; // Assuming you will pass noteId as a prop
}

const NoteActions: React.FC<NoteActionsProps> = ({ noteId }) => {
    const [result, setResult] = useState('');

    const generateInsight = () => {
        fetch(`http://localhost:8080/note/${noteId}/genInsight`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setResult(data);
            })
            .catch(error => console.error('Error generating insight:', error));
    };

    const generateSummary = () => {
        fetch(`http://localhost:8080/note/${noteId}/genSummary`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setResult(data);
            })
            .catch(error => console.error('Error generating summary:', error));
    };

    return (
        <div>
            <button className="button" onClick={generateInsight}>Generate Insight</button>
            <button className="button" onClick={generateSummary}>Generate Summary</button>
            {result && (
                <div id="sidebar" style={{ color: typeof result === 'string' ? 'black' : 'red' }}>
                    {typeof result === 'string' ? result : 'The fetched data is not in text format.'}
                </div>
            )}
        </div>
    );
};

export default NoteActions;
