import React, { Component } from 'react'
import createFormGrabber from 'react-form-grabber'

var FormGrabber1=createFormGrabber();
var FormGrabber2=createFormGrabber();

export default class Example2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            username_in_field_1:"",
            animals_in_field_1:[],
            username_in_field_2:"",
            animals_in_field_2:[]
        };
    }
    handleSubmit=(event) => {
        // Differently,seperately.
        // When different form controls are wrapped in different FormGrabber component
        // , data in different form are injected into the FormGrabber seperately , 
        // even they got some "name" conflict.
        FormGrabber1.grab();
        FormGrabber2.grab();
        
        this.setState({
            username_in_field_1:FormGrabber1.get("username"),
            animals_in_field_1:FormGrabber1.getAll("animals"),
            username_in_field_2:FormGrabber2.get("username"),
            animals_in_field_2:FormGrabber2.getAll("animals")
        });
        event.preventDefault();
    }
    
    render() {
        const {username_in_field_1,animals_in_field_1,username_in_field_2,animals_in_field_2}=this.state;
        return (
            <div className="example-2">
                <h2>Example 2:</h2>
                <FormGrabber1>
                    <h4>field 1:</h4>
                    <div className="field-1" style={{"borderBottom":"thick dotted grey"}}>
                        <div className="form-group">
                            <label htmlFor="username-field-1" className="col-sm-2 control-label">Username</label>
                            <div className="col-sm-10">
                                <input name="username" type="text" className="form-control" id="username-field-1" placeholder="username in field-1"/>
                                <small id="usernameResult" className="form-text text-muted">Username is "{username_in_field_1}"</small>
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
                                <small id="checkboxResult" className="form-text text-muted">[{animals_in_field_1.join(",")}] is checked</small>
                            </div>
                            </div>
                        </div>
                    </div>
                </FormGrabber1>
                <FormGrabber2>
                    <h4>field 2:</h4>
                    <div className="field-2">
                        <div className="form-group">
                            <label htmlFor="username-field-2" className="col-sm-2 control-label">Username</label>
                            <div className="col-sm-10">
                                <input name="username" type="text" className="form-control" id="username-field-2" placeholder="username in field-2"/>
                                <small id="usernameResult" className="form-text text-muted">Username is "{username_in_field_2}"</small>
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
                                <small id="checkboxResult" className="form-text text-muted">[{animals_in_field_2.join(",")}] is checked</small>
                            </div>
                            </div>
                        </div>
                    </div>
                </FormGrabber2>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
