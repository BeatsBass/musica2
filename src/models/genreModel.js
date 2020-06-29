const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    idGenre: 'String',
    title: 'String',
    contents: []
  },
  {
    timestamps: true
  }
);

module.exports = model("Genre", NoteSchema);