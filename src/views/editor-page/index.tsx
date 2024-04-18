import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import NoteEditor from './NoteEditor';
import { fetchNote } from 'utils/noteServices';

interface Note {
    id: string; 
    title: string;
    content: string;
}

const EditorPage: React.FC = () => {
    const [note, setNote] = useState<Note>({ id: '', title: '', content: '' });
    const { noteId, userId } = useParams();
    // const noteId = '1a85331e-c4e6-4c2b-8b66-375310cdb9f0';
    // const userId = '123e4567-e89b-12d3-a456-426614174000';
    useEffect(() => {
        if (!noteId) return;
        fetchNote(noteId).then(setNote).catch(console.error);
    }, [noteId]);

    return (
        <MainCard title={note.title }>
            {noteId && userId && <NoteEditor initialContent={note.content} noteId={note.id} userId={userId} />}
        </MainCard>    
    );
};

export default EditorPage;