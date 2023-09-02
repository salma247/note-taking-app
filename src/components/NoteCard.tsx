import { Link } from "react-router-dom";
import { Tag } from "../App";
import { Badge, Card, Stack } from "react-bootstrap";
import styles from "./NoteList.module.css";

type NoteCardProps = {
  title: string;
  tags: Tag[];
  id: string;
};

function NoteCard({ title, tags, id }: NoteCardProps) {
  return (
    <Card as={Link} to={`/${id}`} className={`${styles.card} text-decoration-none text-reset h-100`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <Card.Title className="mb-0">{title}</Card.Title>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
