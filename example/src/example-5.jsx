import React, { Component } from 'react'
import createGrabber from 'react-form-grabber'

var FormGrabber=createGrabber();

export default class Example5 extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            animals:[]
        };
    }
    handleSubmit=(event) => {
        // Collect data in form and put it in FormGrabber.
        FormGrabber.grab();
        // Get data in FormGrabber.
        var username=FormGrabber.get("username");
        var password=FormGrabber.get("password");
        var animals=FormGrabber.getAll("animals");
        // Modify the data.The modification will not apply on form controls.
        if (username) FormGrabber.set("username",username+"_modified");
        if (password) FormGrabber.set("password",password+"_modified");
        if (animals) FormGrabber.setAll("animals",animals.map(animal=>animal+"_modified"));
        
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
                <div className="example-5">
                    <h2>Example 5:do modification before post</h2>
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
