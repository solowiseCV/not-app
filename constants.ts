const constants = {
    DATABASE_URI: process.env.DATABASE_URI || 'mongodb://localhost:27017/notes_db',

    DATABASES: {
       NOTE: "note",
    },

    NOTE_TYPES:{
        USER: "user",
        AGENT: "agent",
    },


    MESSAGES:{
        FETCHED: "Notes fetched successfully",
        UPDATED: "Notes updated successfully",
        ERROR: "Resource error",
        CREATED: "Notes created successfully",
        DELETED: "Notes deleted successfully",
      CATEGORY_NOT_FOUND: "No notes found in this category",
       NOTE_UPDATED: "Note updated successfully",
        NOT_FOUND: "Note not found"
    }
};

export default constants;