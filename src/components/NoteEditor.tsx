// src/components/NoteEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Box from '@mui/material/Box';
import { StompService } from '../services/WebsocketService';
import { debounce } from 'lodash';

interface NoteEditorProps {
    initialContent: string;
    noteId: string;
    userId: string;
}

const stompService = new StompService();

const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, noteId, userId }) => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        stompService.connect();
        const trackMouseClick = (event: MouseEvent) => {
            const mouseClickData = {
                pageX: event.pageX,
                pageY: event.pageY,
                targetId: (event.target as Element).id,
            };
            stompService.send(`/app/track-mouse-click/${userId}/${noteId}`, JSON.stringify(mouseClickData));
        };
        const trackKeypress = (event: { key: any; }) => {
            const keypressData = {
                key: event.key,
            };
            stompService.send(`/app/track-keystroke/${userId}/${noteId}`, JSON.stringify(keypressData));
        };
        document.addEventListener('click', trackMouseClick);
        document.addEventListener('keypress', trackKeypress);
        // Cleanup event listeners when the component unmounts
        return () => {
            document.removeEventListener('click', trackMouseClick);
            document.removeEventListener('keypress', trackKeypress);
            stompService.disconnect();
        };
    }, []);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const debouncedSaveNote = useCallback(
        debounce((newContent: string) => {
            stompService.saveNote(newContent, noteId);
        }, 1000),
        [noteId, stompService] // Recreate the debounced function if noteId changes
    );

    const handleContentChange = useCallback((newContent: string | undefined) => {
        if (typeof newContent === 'string') {
            setContent(newContent);
            debouncedSaveNote(newContent);
        }
    }, [debouncedSaveNote]);

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '80vh', // Set the height to full viewport height
            mx: 'auto', // This centers the editor horizontally if it has a max-width
            width: '100%', // Set the width to full width
            maxWidth: 1200, // Optional: Constrain the max width for larger screens
        }}> {/* Using MUI Box for styling */}
            <MDEditor
                value={content}
                onChange={handleContentChange}
                style={{ 
                    flexGrow: 1, // Allows the editor to grow and fill the vertical space
                    minHeight: 0, // Important for flex children to grow correctly in Firefox
                }}
            />
        </Box>
    );
};

export default NoteEditor;