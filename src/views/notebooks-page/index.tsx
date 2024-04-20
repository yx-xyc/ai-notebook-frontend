// src/NotebookPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNotebooksGivenUser } from 'utils/noteServices'; // Make sure to create this service
import NotebooksCard from './NotebooksCard';

interface Notebook {
    id: string;
    title: string;
    category: string;
    createdAt: number;
    updatedAt: number;
}

const NotebooksPage: React.FC = () => {
    const [notebooks, setNotebooks] = useState<Notebook[]>([]);
    let { userId } = useParams();

    userId = '123e4567-e89b-12d3-a456-426614174000';
    useEffect(() => {
        if (!userId) return;
        // This function should call the API and return the list of notes
        fetchNotebooksGivenUser(userId)
            .then(notebooks => setNotebooks(notebooks))
            .catch(console.error);
    }, [userId]);
    return (
        userId ? (
                    <NotebooksCard userId={userId} notebooks={notebooks} />
            ) : (
                // Render an alternative component or null if userId or notebookId is not valid
                <div>Invalid User ID</div>
            )    
        );
};

export default NotebooksPage;
