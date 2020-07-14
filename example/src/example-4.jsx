import React, { Component } from 'react'
import { Form,Button } from "react-bootstrap";
import createFormGrabber from 'react-form-grabber'

var FormGrabber=createFormGrabber();

export default class Example4 extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            animals:[]
        };
    }
    handleSubmit=(event) => {
        // No need to collect data yourself.Just one line to collect data and put it in 'FormGrabber'.
        FormGrabber.grab();
        // Get data in 'FormGrabber' so easily , just like this:
        // FormGrabber.get("the attribute 'name' of form control")
        this.setState({
            username:FormGrabber.get("username"),
            password:FormGrabber.get("password"),
            animals:FormGrabber.getAll("animals")
        });
        event.preventDefault();
    }
    
    render() {
        const {username,password,animals}=this.state;
        return (
            <FormGrabber>
                <div className="example-4">
                    <h2>Example 4: work with react-bootstrap</h2>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" type="text"/>
                            <Form.Text className="text-muted">
                                Username is "{username}"
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password"/>
                            <Form.Text className="text-muted">
                                Password is "{password}"
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="checkbox">
                            <Form.Check name="animals" value="dog" type="checkbox" label="Dog" inline/>
                            <Form.Check name="animals" value="cat" type="checkbox" label="Cat" inline/>
                            <Form.Check name="animals" value="bird" type="checkbox" label="Bird" inline/>
                            <Form.Text className="text-muted">
                                [{animals.join(",")}] is checked
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={this.handleSubmit} variant="primary" type="button">
                            Submit
                        </Button>
                    </Form>
                </div>
            </FormGrabber>
        )
    }
}
