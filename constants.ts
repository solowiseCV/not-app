const constants = {
    DATABASE_URI: process.env.DATABASE_URI  || 'mongodb://localhost:27017/notes_db',

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
        NOT_FOUND: "Note not found"
    }
};

export default constants;