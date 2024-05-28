// src/components/NoteEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box } from '@mui/material';
import { StompService } from 'utils/WebSocket';
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
        // const trackMouseClick = (event: MouseEvent) => {
        //     const mouseClickData = {
        //         pageX: event.pageX,
        //         pageY: event.pageY,
        //         targetId: (event.target as Element).id,
        //     };
        //     stompService.send(`/app/track-mouse-click/${userId}/${noteId}`, JSON.stringify(mouseClickData));
        // };
        // const trackKeypress = (event: { key: any; }) => {
        //     const keypressData = {
        //         key: event.key,
        //     };
        //     stompService.send(`/app/track-keystroke/${userId}/${noteId}`, JSON.stringify(keypressData));
        // };
        // document.addEventListener('click', trackMouseClick);
        // document.addEventListener('keypress', trackKeypress);
        // // Cleanup event listeners when the component unmounts
        // return () => {
        //     document.removeEventListener('click', trackMouseClick);
        //     document.removeEventListener('keypress', trackKeypress);
        //     stompService.disconnect();
        // };
    }, []);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const debouncedSaveNote = debounce((newContent: string) => {
            stompService.saveNote(newContent, noteId);
        }, 1000);

    const handleContentChange = useCallback((newContent: string | undefined) => {
        if (typeof newContent === 'string') {
            setContent(newContent);
            debouncedSaveNote(newContent);
        }
    }, [debouncedSaveNote]);

    return (
        <Box data-color-mode="light" > 
            <MDEditor
                value={content}
                onChange={handleContentChange}
                style={
                    {
                        // height: '100%',
                        minHeight: 'calc(100vh - 300px)'
                    }
                }
            />
            {/* Read only View below */}
            {/* <MDEditor.Markdown source={content} /> */}
        </Box>
    );
};

export default NoteEditor;