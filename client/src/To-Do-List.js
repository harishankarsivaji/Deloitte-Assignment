import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon, Button} from "semantic-ui-react";

var endpoint = "http://localhost:8080/todo";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      items: [],
    };
  }

  componentDidMount() {
    this.getTask();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { title } = this.state;
    if (title) {
      axios
        .post(
          endpoint + "/create",
          {
            title
          },
          {
            headers: {
              "access-control-allow-origin" : "*",
              "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(title)
          }
        )
        .then(res => {
          this.getTask();
          this.setState({
            title: ""
          });
        });
    }
  };

  getTask = () => {
    axios.get(endpoint).then(res => {
      var data = res.data
      if (data) {
        this.setState({
          items: data.map(item => {
            let color = "yellow";

            if (item.status) {
              color = "green";
            } 
            return (
              <Card key={item.id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word", margin: "10px 0px 0px 20px"}}>{item.title}</div>
                  </Card.Header>
                  <Card.Content extra textAlign="right">
                  <Card.Content textAlign="left">
                    <div style={{ wordWrap: "break-word", margin: "10px 0px 0px 20px"}}>Last Update : {item.lastUpdateTime}</div>
                  </Card.Content>
                    <Button icon
                      labelPosition='right'
                      color="green"
                      onClick={() => this.updateTask(item.id)}>
                      <Icon name ="check"/>
                      <span>Done</span>
                    </Button>
                    {/* <Button icon
                      labelPosition='right'
                      color="yellow"
                      onClick={() => this.undoTask(item.id)}>
                      <Icon name ="undo"/>
                      <span>Undo</span>
                    </Button> */}
                    <Button icon
                      labelPosition='right'
                      color="red"
                      onClick={() => this.deleteTask(item.id)}>
                      <Icon name ="delete"/>
                      <span>Delete</span>
                    </Button>
                  </Card.Content>
                </Card.Content>
              </Card>
            );
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = id => {
    axios
      .post(endpoint + "/update/" + id, {
        headers: {
          "access-control-allow-origin" : "*",
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        this.getTask();
      });
  };

  // undoTask = id => {
  //   axios
  //     .put(endpoint + "/todo/undoTask/" + id, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       }
  //     })
  //     .then(res => {
  //       this.getTask();
  //     });
  // };

  deleteTask = id => {
    axios
      .delete(endpoint + "/delete/" + id, {
        headers: {
          "access-control-allow-origin" : "*",
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        this.getTask();
      });
  };

  deleteAll = () => {
    axios
      .delete(endpoint + "/delete", {
        headers: {
          "access-control-allow-origin" : "*",
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
        this.getTask();
      });
  };

  render() {
     return (
      <div>
        <div className="row">
          <Header className="header" as="h1" >
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
              fluid
              placeholder="Create Task"
            />
          </Form>
        </div>
        <div className="row"> 
          <Button 
            floated="right"
            color="red"
            onClick={() => this.deleteAll()}>
              Clear All
          </Button>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
