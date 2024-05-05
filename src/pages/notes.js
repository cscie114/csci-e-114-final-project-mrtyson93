import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const NotesPage = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('');
  const [isNewNoteDisabled, setIsNewNoteDisabled] = useState(true);
  const [currentUser, setCurrentUser] = useState('');

  // When a logout is selected, clear local storage and navigate to home page
  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.href = '/';
  };  

  // API Call to retrieve notes for a specific user
  const fetchNotes = async () => {
    try {
      const username = localStorage.getItem("notesUsername")
      const response = await fetch('https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/' + username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // API Call to add a note for a specific user
  const addNote = async () => {
    try {
      const response = await fetch('https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/' + currentUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ "note": newNote }),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      
      await response.json();
      // Retrieve and set notes again
      fetchNotes();
      // Reset new note field
      setNewNote('');
      setIsNewNoteDisabled(true);
    } catch (error) {
      alert('Error adding note:', error);
    }
  };

    // API Call to delete a note for a specific user
    const deleteNote = async (id) => {
      try {
        const response = await fetch('https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/' + currentUser + "/" + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } 
        
        await response.json();
        // Retrieve and set notes again
        fetchNotes();
      } catch (error) {
        alert('Error deleting note:', error);
      }
    };
  
  // Basically just want to disable new note button if there's nothing in the field  
  const handleNoteChange = (event) => {
    const value = event.target.value;
    setNewNote(value);
    setIsNewNoteDisabled(value.trim() === '');  
  };

  // On page load, get the notes for the current user
  useEffect(() => {
    setCurrentUser(localStorage.getItem("notesUsername"));
    fetchNotes();
  }, []);

  return (
    <Layout pageTitle={currentUser + "'s Notes"}>
    <div>
      <TextField
          id="addnote-input"
          label="New Note"
          value={newNote}
          onChange={handleNoteChange}
          variant="filled" />
      <Button 
        variant="contained"
        id="newnote-button"
        disabled={isNewNoteDisabled}
        sx={{ ml: 4 }} 
        onClick={addNote}>
          Add Note
      </Button>
      <br></br><br></br>
      {/* Loop through notes and display message, as well as delete button */}
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <h3>
                {note.note}
                <Button 
                  variant="contained"
                  id="deletenote-button"
                  sx={{ ml: 4 }}
                  onClick={() => deleteNote(note.id)}
                  >
                    Delete Note
                </Button>
              </h3>

            </li>
          )
        })}
      </ul>
      <Button 
        variant="contained"
        id="logout-button"
        onClick={handleLogoutClick}>
          Logout
      </Button>
    </div>
  </Layout>
  )
}

export default NotesPage

export const Head = () => <title>Notes Page</title>
