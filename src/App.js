import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./design.css";
import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const App = (props) => {
  const { buttonLabel, className } = props;
  const openPopUp = () => {
    setModal(true);
  };

  const [title, setTitle] = useState("");

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const post = () => {
    const newTodo = { title, id: data.length + 1, completed: false };
    setModal(false);
    setData([...data, newTodo]);
    console.log(newTodo);
  };
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  const [data, setData] = useState([]);
  const columns = [
    {
      Header: "Button",
      Cell: (row) => (
        <Button onClick={() => deleteTodo(row.original)} color="danger">
          Delete
        </Button>
      ),
    },
    {
      Header: "ID",
      accessor: "id", // String-based value accessors!
    },
    {
      Header: "Title",
      accessor: "title",
    },

    {
      Header: "Completed",
      accessor: "completed",
      Cell: (row) => (
        <div>
          {row.original.completed ? (
            <Badge color="success">Success</Badge>
          ) : (
            <Badge color="warning">In Progress</Badge>
          )}
        </div>
      ),
    },
  ];
  const deleteTodo = (todo) => {
    setData(data.filter((x) => x.id !== todo.id));
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="add-todo">
            <div>Todo Table</div>
            <Button onClick={openPopUp} color="warning">
              Add Todo
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <ReactTable filterable={true} data={data} columns={columns} />
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Todo Ekleme</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Title</Label>
                  <Input
                    type="name"
                    name="email"
                    id="exampleEmail"
                    placeholder="Add Todo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}></Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={post}>
            Add Todo
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
