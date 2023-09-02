import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "../App";
import { v4 as uuid } from "uuid";

type NoteFormProps = {
  onSubmit: (e: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

function NoteForm({ onSubmit, onAddTag, availableTags, title = "", tags = [], markdown = "" }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSumbit(e: FormEvent) {
    e.preventDefault();
    
    onSubmit({
      title: titleRef.current!.value,
      tags: selectedTags,
      markdown: markdownRef.current!.value,
    });

    navigate("/");
  }

  return (
    <Form onSubmit={handleSumbit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter title"
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                placeholder="Enter tags"
                onCreateOption={(label) => {
                  const newTag = { id: uuid(), label };
                  onAddTag(newTag);
                  setSelectedTags((tags) => [...tags, newTag]);
                }}
                options={availableTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label,
                }))}
                value={selectedTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({ id: tag.value, label: tag.label }))
                  )
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            placeholder="Enter text"
            required
            ref={markdownRef}
            defaultValue={markdown}
          />
        </Form.Group>

        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
