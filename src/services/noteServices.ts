interface Note {
    id: string;
    title: string;
    content: string;
}

export const fetchNote = async (noteId: string): Promise<Note> => {
    const response = await fetch(`http://localhost:8080/notes/${noteId}`);
    if (!response.ok) {
        throw new Error(`Error fetching note: ${response.statusText}`);
    }
    return await response.json();
};

export const generateInsight = async (noteId: string): Promise<string> => {
    const response = await fetch(`http://localhost:8080/note/${noteId}/genInsight`);
    if (!response.ok) {
        throw new Error(`Error generating insight: ${response.statusText}`);
    }
    return await response.text();
};

export const generateSummary = async (noteId: string): Promise<string> => {
    const response = await fetch(`http://localhost:8080/note/${noteId}/genSummary`);
    if (!response.ok) {
        throw new Error(`Error generating summary: ${response.statusText}`);
    }
    return await response.text();
};