// src/components/NoteEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { StompService } from '../services/websocketService';
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
        // Track keypresses
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

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = event.target.value;
        setContent(newContent);
        debouncedSaveNote(newContent);
    };
    const debouncedSaveNote = useCallback(
        debounce((newContent: string) => {
            stompService.saveNote(newContent, noteId);
        }, 1000),
        [noteId, stompService] // Recreate the debounced function if noteId changes
    );

    return (
        <textarea
        id="noteContent"
        value={content}
        onChange={handleContentChange}
        />
    );
};

export default NoteEditor;
