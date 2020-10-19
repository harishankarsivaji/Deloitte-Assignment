import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon, Button, Dropdown, Checkbox, Grid} from "semantic-ui-react";
import { Link } from "react-router-dom";

var endpoint = "http://localhost:8080/todo";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      items: [],
      checked: false
    };
  }

  componentDidMount() {
    this.getTask();
  }

  onSubmit = () => {
    let title = {
      title: this.state.title,
      description: this.state.description
    };
    if (title) {
      axios
        .post(
          endpoint + "/create",title,
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
              this.setState({checked: true}); 
            } 
            return (
              <Card key={item.id} color={color} fluid>
                <Grid columns={12}>
                  <Grid.Column width={2}>
                    <Checkbox
                      style={{margin:"30px 30px 30px 30px"}}
                      checked={this.state.checked}/>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Card.Content>
                      <Card.Header textAlign="left">
                        <div style={{ wordWrap: "break-word", margin: "10px 0px 0px 20px"}}><strong>Type : </strong>{item.title}</div>
                        <div style={{ wordWrap: "break-word", margin: "10px 0px 0px 20px"}}><strong >Description : </strong>{item.description}</div>
                      </Card.Header>
                      <Card.Content extra textAlign="right">
                      <Card.Content textAlign="left">
                        <div style={{ wordWrap: "break-word", margin: "10px 0px 0px 20px"}}><strong>Last Update : </strong>{item.lastUpdateTime}</div>
                      </Card.Content>
                        <Button icon
                          labelPosition='right'
                          color="green"
                          onClick={() => this.updateTask(item.id)}>
                          <Icon name ="check"/>
                          <span>Done</span>
                        </Button>
                        <Button icon
                          labelPosition='right'
                          color="red"
                          onClick={() => this.deleteTask(item.id)}>
                          <Icon name ="delete"/>
                          <span>Delete</span>
                        </Button>
                      </Card.Content>
                    </Card.Content>
                    </Grid.Column>
                </Grid>
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
    this.setState((prevState) => ({ checked: !prevState.checked }))
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

  onChange = (e, data) => {
    this.setState({
      description: data.value
    });
  };
  onDropChange = (e, data) => {
    this.setState({
      title: data.value
    });
  }

  logout = () => {
    localStorage.clear("token");
    this.setState({navigate :true });
  };

  render() {
    const { title } = this.state;
    const type =[
      {
        key: 'Work',
        text: 'Work',
        value: 'Work',
      },
      {
        key: 'Personal',
        text: 'Personal',
        value: 'Personal',
      }
    ]
     return (
      <div>
        <div className="row">
          <Header className="header" as="h1" >
            TO DO LIST
          </Header>
          <Link to= "/"> <Button floated="right"> Log Out </Button></Link>
        </div>
        <div className="row" margin="10px">
          <Form>
            <Input
              type="text"
              name="title"
              onChange={this.onChange}
              fluid
              placeholder="Description"
            />
            <Dropdown
              button
              className='icon'
              fluid
              // labeled
              options={type}
              value={title}
              onChange={this.onDropChange}
              type="text"
              name="description"
              placeholder="Select Type"
            />
            <Button 
            floated="left"
            color="green"
            onClick={() => this.onSubmit()}>
              Add Task
          </Button>
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
