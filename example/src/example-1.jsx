import React, { Component } from 'react'
import createFormGrabber from 'react-form-grabber'

var FormGrabber=createFormGrabber();

export default class Example1 extends Component {
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
                <div className="example-1">
                    <h2>Example 1:</h2>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="username-1" className="col-sm-2 control-label">Username</label>
                            <div className="col-sm-10">
                                <input name="username" type="text" className="form-control" id="username-1"/>
                                <small id="usernameResult" className="form-text text-muted">Username is "{username}"</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-1" className="col-sm-2 control-label">Password</label>
                            <div className="col-sm-10">
                                <input name="password" type="password" className="form-control" id="password-1"/>
                                <small id="passwordResult" className="form-text text-muted">Password is "{password}"</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input name="animals" value="dog" type="checkbox"/> Dog
                                </label>
                                <label>
                                    <input name="animals" value="cat" type="checkbox"/> Cat
                                </label>
                                <label>
                                    <input name="animals" value="bird" type="checkbox"/> Bird
                                </label>
                                <small id="checkboxResult" className="form-text text-muted">[{animals.join(",")}] is checked</small>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </FormGrabber>
        )
    }
}
