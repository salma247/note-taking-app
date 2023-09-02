import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";
import { useNote } from "../components/NoteLayout";

type EditNoteProps = {
  onSubmit: (id : string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  console.log(note);
  
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditNote;
