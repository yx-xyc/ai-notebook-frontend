import axios from 'axios';

const noteServices = axios.create({ baseURL: import.meta.env.VITE_APP_BACKEND || 'http://localhost:3010/' });

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

interface Notebook {
    id: string;
    title: string;
    category: string;
    createdAt: number;
    updatedAt: number;
}

// Function to fetch a single note
export const fetchNote = async (noteId: string): Promise<Note> => {
    try {
        const response = await noteServices.get<Note>(`/note-api/note/${noteId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error fetching note: ${error.response.statusText}`);
        } else {
        throw new Error(`Error fetching note: ${error}`);
        }
    }
};

// Function to fetch notes in a specific notebook
export const fetchNotesInNotebook = async (notebookId: string): Promise<Note[]> => {
    try {
        const response = await noteServices.get<Note[]>(`/note-api/notebook/${notebookId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error fetching notes in notebook: ${error.response.statusText}`);
        } else {
        throw new Error(`Error fetching notes in notebook: ${error}`);
    }
}
}

export const fetchNotebooksGivenUser = async (userId: string): Promise<Notebook[]> => {
    try {
        const response = await noteServices.get<Notebook[]>(`/notebook-api/user/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error fetching notebooks: ${error.response.statusText}`);
        } else {
        throw new Error(`Error fetching notebooks: ${error}`);
        }
    }
}

// Function to generate insight for a note
export const generateInsight = async (noteId: string): Promise<string> => {
    try {
        const response = await noteServices.get<string>(`/note/${noteId}/insight`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error generating insight: ${error.response.statusText}`);
        } else {
        throw new Error(`Error generating insight: ${error}`);
        }
    }
};

// Function to generate a summary for a note
export const generateSummary = async (noteId: string): Promise<string> => {
    try {
        const response = await noteServices.get<string>(`/note/${noteId}/summary`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error generating summary: ${error.response.statusText}`);
        } else {
        throw new Error(`Error generating summary: ${error}`);
        }
    }
};