import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";

type NoteListProps = {
  notes: Note[];
  availableTags: Tag[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

function NoteList({ notes, availableTags, onUpdateTag, onDeleteTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTagsModalOpen, setEditTagsModalOpen] = useState<boolean>(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          note.tags.some((tag) => selectedTags.includes(tag)))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <Stack gap={4}>
            <h1>Notes</h1>
            <p>Click on a note to view it.</p>
          </Stack>
        </Col>
        <Col>
          <Stack gap={2} direction="horizontal" className="justify-content-end">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="secondary" onClick={() => setEditTagsModalOpen(true)}> Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={title}
                onChange={() => setTitle(title)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                placeholder="Enter tags"
                options={availableTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label,
                }))}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({ id: tag.value, label: tag.label }))
                  )
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>

      <EditTagsModal availableTags={availableTags} show={editTagsModalOpen} handleClose={() => setEditTagsModalOpen(false)} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />
    </>
  );
}



export default NoteList;
