//creating a class 
const util = require ("util");
const fs = require ("fs");
const uuidv1 = require ("uuid/v1");//this will be used to give each user an id

const readFileasync = util.promisify(fs.readFile);
const writeFileasync = util.promisify(fs.writeFile);

//creating a class for notes
class Notes {
    //creating methods 
    read(){
      return readFileasync("db/db.json", "utf8") 
    }
    write(note){//write to the same file reading
        return writeFileasync ("db/db.json",JSON.stringify(note));
    }
    getNotes(){
        return this.read().then(notes => {
            let addednotes;

            try {
                addednotes = [].concat(JSON.parse(notes));//if we can get all our notes then we push all of them to the notes array
            }catch (err) {
                addednotes = [];
            }
            return addednotes
        })
    }
    addNote (note) {
        const { title, text } = note; //deconstruction of note since it is made up of title and text 
        const newNote = {title, text, id:uuidv1()}//new note has a new title, text and id that is given to it upon creation 

        return this.getNotes().then(notes => [...notes, newNote])//spread operator- takes all the existing notes and adds the new one into them
        .then(updatedNotes => this.write(updatedNotes))
        .then(()=> newNote); //this is returning the new note
    }
    removeNote (id){
        return this.getNotes().then(notes => notes.filter(note=> note.id !== id))//fitering our notes, and if the id of the note is not equal to the id it stays, but if it is equal then the note is deleted
        .then(filternotes=> this.write(filternotes));
    }
};

module.exports = new Notes();
