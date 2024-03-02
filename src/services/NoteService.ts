import { BACKEND_BASE_URL } from '../config'
interface Note {
    id: string;
    title: string;
    content: string;
}

export const fetchNote = async (noteId: string): Promise<Note> => {
    const response = await fetch(`${BACKEND_BASE_URL}/notes/${noteId}`);
    if (!response.ok) {
        throw new Error(`Error fetching note: ${response.statusText}`);
    }
    return await response.json();
};

export const generateInsight = async (noteId: string): Promise<string> => {
    const response = await fetch(`${BACKEND_BASE_URL}/note/${noteId}/insight`);
    if (!response.ok) {
        throw new Error(`Error generating insight: ${response.statusText}`);
    }
    return await response.text();
};

export const generateSummary = async (noteId: string): Promise<string> => {
    const response = await fetch(`${BACKEND_BASE_URL}/note/${noteId}/summary`);
    if (!response.ok) {
        throw new Error(`Error generating summary: ${response.statusText}`);
    }
    return await response.text();
};