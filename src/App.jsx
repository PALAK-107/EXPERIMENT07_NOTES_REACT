import { useState } from 'react';
import './App.css';
function App() {
// 1. STATE (React's Memory)
// 'notes' holds our list of notes. 'setNotes' is the function we use to update that list.
const [notes, setNotes] = useState([]);
// These hold what the user is currently typing in the input boxes.
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
// If we are editing an existing note, we save its ID here. Otherwise, it stays 'null'.
const [editId, setEditId] = useState(null);
// 2. THE 'CREATE' AND 'UPDATE' LOGIC
// This runs when you click the "Save" or "Add" button
const handleSubmit = (e) => {
e.preventDefault(); // Stops the page from reloading (SPA behavior!)
if (title === '' || content === '') return; // Don't save empty notes
if (editId !== null) {
// UPDATE: Find the note with the matching ID and change its text
setNotes(
notes.map((note) =>
note.id === editId ? { ...note, title: title, content: content } : note
)
);
setEditId(null); // Clear the editing memory
} else {
// CREATE: Make a brand new note object and add it to our list
const newNote = {
id: Date.now(), // Use the current time to generate a unique ID

title: title,
content: content,
};
setNotes([...notes, newNote]);
}
// Clear the typing boxes after saving
setTitle('');
setContent('');
};
// 3. THE 'DELETE' LOGIC
// Filters out the note we want to delete, keeping only the rest
const handleDelete = (idToRemove) => {
setNotes(notes.filter((note) => note.id !== idToRemove));
};
// 4. PREPARE TO EDIT
// Puts the selected note's text back into the typing boxes
const handleEdit = (note) => {
setEditId(note.id);
setTitle(note.title);
setContent(note.content);
};
// 5. WHAT THE USER SEES (HTML-like syntax called JSX)
return (
<div className="container">
<h1>My Notes App</h1>
{/* The Form for typing notes */}
<form onSubmit={handleSubmit} className="note-form">
<input
type="text"
placeholder="Note Title"
value={title}
onChange={(e) => setTitle(e.target.value)} // Updates memory as you type
/>
<textarea
placeholder="Write your note here..."
value={content}
onChange={(e) => setContent(e.target.value)} // Updates memory as you type

rows="4"
/>
<button type="submit">
{editId !== null ? 'Update Note' : 'Add Note'}
</button>
</form>
{/* Displaying the Notes (The 'READ' logic) */}
<div className="notes-list">
{notes.length === 0 ? (
<p>No notes yet. Add one above!</p>
) : (
notes.map((note) => (
<div key={note.id} className="note-card">
<h3>{note.title}</h3>
<p>{note.content}</p>
<button onClick={() => handleEdit(note)}>Edit</button>
<button onClick={() => handleDelete(note.id)}>Delete</button>
</div>
))
)}
</div>
</div>
);
}
export default App;