# react-form-grabber

> Automatically collect data in form and make it an instance of 'FormData'.

## Intro

The purpose of this component is to cut down works in dealing with data in form.It automatically collects data in form and makes it an instance  of 'FormData'.

Motivation: People who have experience on the original type 'FormData' know that its constructor got a talent of creating an instance directly from a form.That's good.What I was facing is that I had to meet the requirements of displaying the data before posting. MDN showed that it had a method 'get' to get the value from a 'FormData' object.Surprisingly the method 'get' didn't work in Safari 10,which is in a mac made in 2016.Making an app can not run in a 4 years old equipment?That's unbearable.So I made this.Data will not go directly from the form to the 'FormData' object.Instead it goes through a 'FormData-like' cache.What does 'FormData-like' mean?It means the api of the cache looks like what is in 'FormData'.After displaying the data or doing some modification on it,calling method 'toFormData' makes you achieve the 'FormData' object at the end.
## Hightlights
- Light weight
- Be compatible with most browsers,even IE 10
- No extra html element will be added
- Easy to use
## Install

```bash
npm install --save react-form-grabber
```

## Usage
Examples below are just for demonstration.So I cut off some unimportant things to make it easier to tell you the key of the usage.The runnable version is in the [src](https://github.com/hzy-anyway/react-form-grabber) code.
### Example 1:
No need to collect data yourself,one line instead:<br>
"FormGrabber.grab();"<br>
Get data in form so easily , just like this:<br>
FormGrabber.get("the attribute 'name' of form control");
```js
import React, { Component } from 'react'
// What import here is a 'creater',not a Component as usual.
import createFormGrabber from 'react-form-grabber'
// Now this is a Component created by the 'creater'.
var FormGrabber=createFormGrabber();

export default class Example1 extends Component {
    handleSubmit=(event) => {
        // No need to collect data yourself.Just one line to collect data and put it in 'FormGrabber'.
        FormGrabber.grab();
        // Get data in 'FormGrabber' so easily , just like this:
        // FormGrabber.get("the attribute 'name' of form control")
        console.log("username: ",FormGrabber.get("username"));
        console.log("password: ",FormGrabber.get("password"));
        console.log("animals: ",FormGrabber.getAll("animals"));
    }
    
    render() {
        return (
            <FormGrabber>
                <form>
                  <input name="username" type="text"/>
                  <input name="password" type="text"/>
                  <div>
                    <input name="animals" value="dog" type="checkbox"/>
                    <input name="animals" value="cat" type="checkbox"/>
                    <input name="animals" value="bird" type="checkbox"/>
                  </div>
                  <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>
            </FormGrabber>
        )
    }
}

```
### Example 2:
Differently,seperately.<br>
When different form controls are wrapped in different FormGrabber components, data in different forms are injected into the FormGrabber seperately , even they got some "name" conflict.
```js
import React, { Component } from 'react'
import createFormGrabber from 'react-form-grabber'

var FormGrabber1=createFormGrabber();
var FormGrabber2=createFormGrabber();

export default class Example2 extends Component {
    handleSubmit=(event) => {
        FormGrabber1.grab();
        FormGrabber2.grab();
        // data in field 1
        console.log("username in field 1: ",FormGrabber1.get("username"));
        console.log("password in field 1: ",FormGrabber1.get("password"));
        console.log("animals in field 1: ",FormGrabber1.getAll("animals"));
        // data in field 2
        console.log("username in field 2: ",FormGrabber2.get("username"));
        console.log("password in field 2: ",FormGrabber2.get("password"));
        console.log("animals in field 2: ",FormGrabber2.getAll("animals"));
    }
    
    render() {
        return (
            <div class="example-2">
                <FormGrabber1>
                    <h2>Field 1:</h2>
                    <input name="username" type="text"/>
                    <input name="password" type="text"/>
                    <div>
                        <input name="animals" value="dog" type="checkbox"/>
                        <input name="animals" value="cat" type="checkbox"/>
                        <input name="animals" value="bird" type="checkbox"/>
                    </div>
                </FormGrabber1>
                <FormGrabber2>
                    <h2>Field 2:</h2>
                    <input name="username" type="text"/>
                    <input name="password" type="text"/>
                    <div>
                        <input name="animals" value="dog" type="checkbox"/>
                        <input name="animals" value="cat" type="checkbox"/>
                        <input name="animals" value="bird" type="checkbox"/>
                    </div>
                </FormGrabber2>
                <button onClick={this.handleSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

```
### Example 3:
Call method 'toFormData' to get an 'FormData' object before posting it in axios as params.
```js
import React, { Component } from 'react'
import axios from 'axios'

import createFormGrabber from 'react-form-grabber'

var FormGrabber=createFormGrabber();

export default class Example3 extends Component {
    handleSubmit=(event) => {
        const your_url="...";
        FormGrabber.grab();
        axios.post(your_url,FormGrabber.toFormData());

        /* also */
        // axios.get(your_url+"?"+FormGrabber.toURLSearchParams().toString());

        // axios.post(your_url,FormGrabber.toCommonObject()); //'Content-type' is 'application/json'

        // axios.post(your_url,FormGrabber.toURLSearchParams()); //'Content-type' is 'application/x-www-form-urlencoded'
    }
    
    render() {
        return (
            <FormGrabber>
                <form>
                  <input name="username" type="text"/>
                  <input name="password" type="text"/>
                  <div>
                    <input name="animals" value="dog" type="checkbox"/>
                    <input name="animals" value="cat" type="checkbox"/>
                    <input name="animals" value="bird" type="checkbox"/>
                  </div>
                  <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>
            </FormGrabber>
        )
    }
}

```
### Example 4:
It works well with 'react-bootstrap'.<br>
Actually it works well with all kinds of UI Components.<br>
Just wrap it,anything.
```js
import React, { Component } from 'react'
import { Form,Button } from "react-bootstrap";

import createFormGrabber from 'react-form-grabber'

var FormGrabber=createFormGrabber();

export default class Example4 extends Component {
    handleSubmit=(event) => {
        FormGrabber.grab();
        console.log("username: ",FormGrabber.get("username"));
        console.log("password: ",FormGrabber.get("password"));
        console.log("animals: ",FormGrabber.getAll("animals"));
    }
    
    render() {
        return (
            <FormGrabber>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password"/>
                    </Form.Group>
                    <Form.Group controlId="checkbox">
                        <Form.Check name="animals" value="dog" type="checkbox" label="Dog"/>
                        <Form.Check name="animals" value="cat" type="checkbox" label="Cat"/>
                        <Form.Check name="animals" value="bird" type="checkbox" label="Bird"/>
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </FormGrabber>
        )
    }
}

```
### Example 5:
Do some modification on the data.
```js
import React, { Component } from 'react'
// What import here is a 'creater',not a Component as usual.
import createFormGrabber from 'react-form-grabber'
// Now this is a Component created by the 'creater'.
var FormGrabber=createFormGrabber();

export default class Example5 extends Component {
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
        return (
            <FormGrabber>
                <form>
                  <input name="username" type="text"/>
                  <input name="password" type="text"/>
                  <div>
                    <input name="animals" value="dog" type="checkbox"/>
                    <input name="animals" value="cat" type="checkbox"/>
                    <input name="animals" value="bird" type="checkbox"/>
                  </div>
                  <button onClick={this.handleSubmit} type="submit">Submit</button>
                </form>
            </FormGrabber>
        )
    }
}

```
##  API
### The API of FormGrabber is compatible with the type 'FormData'
#### FormGrabber.grab():
Collect or recollect data.
#### FormGrabber.get(key):
Returns the first value associated with a given key.
#### FormGrabber.getAll(key):
Returns an array of all the values associated with a given key.
#### FormGrabber.set(key,value):
Sets the first value associated with a given key.
#### FormGrabber.setAll(key,Array values):
Sets an array of all the values associated with a given key.
#### FormGrabber.append(key,value):
Appends a new value onto an existing key, or adds the key if it does not already exist.
#### FormGrabber.entries():
Returns an iterator allowing to go through all key/value pairs contained in this object.
#### FormGrabber.delete(key):
Deletes a key/value pair from a FormGrabber object.
#### FormGrabber.has(key):
Returns a boolean stating whether a FormGrabber object contains a certain key.
#### FormGrabber.keys():
Returns an iterator allowing to go through all keys of the key/value pairs contained in FormGrabber.
#### FormGrabber.values():
Returns an iterator allowing to go through all values  contained in FormGrabber.
#### FormGrabber.toFormData():
Returns a 'FormData' object based on data in FormGrabber.
#### FormGrabber.toCommonObject():
Returns a common object based on data in FormGrabber.When there are duplicated values in a key,choose the first as the value.
#### FormGrabber.toURLSearchParams():
Returns a 'URLSearchParams' object based on data in FormGrabber.Not work in IE.
## Attention
Make sure the form control got its critical attributes below,or it will throw an error.Especially the attribute 'name',FormGrabber use it to identify form controls.
```html
<input>: name
<input type="radio">: name,value
<input type="checkbox">: name,value
<textarea>: name
<select>: name
<option>: value
```
## Browser compatibility
| Chrome | Edge | Firefox | Internet Explorer | Opera | Safari | Android Webview | Chrome for Android | Firefox for Android | Opera for Android | Safari on iOS | Samsung Internet |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 7 | 12 | 4 | 10 | 12 | 5 | 37 | 18 | 4 | 12 | 5 | 1.0 |


## License

MIT © huo ziyun
