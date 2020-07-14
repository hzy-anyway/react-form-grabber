import React, { Component } from 'react'

function createFormGrabber() {
    createFormGrabber.count++;
    return class FormGrabber extends Component {
        constructor(props) {
            super(props);
        }

        static id=createFormGrabber.count;
        static data={};

        static append=(name,value) => {
            if (!this.data[name]) this.data[name]=[];
            this.data[name].push(value);
        }
        static get=(name) => {
            if (!this.data[name]) return undefined;
            return this.data[name][0];
        }
        static getAll=(name) => {
            if (!this.data[name]) return [];
            return this.data[name];
        }
        static set=(name,value) => {
            if (!this.data[name]) {
                this.append(name,value);
            } else {
                this.data[name][0]=value;
            }
        }
        static setAll=(name,values) => {
            this.data[name]=values;
        }
        static delete=(name) => {
            delete this.data[name];
        }
        static has=(name) => {
            if (!this.data[name]) return false;
            return true;
        }
        static keys=() => {
            return Object.keys(this.data);
        }
        static walk=(action) => {
            var result=[];
            for (let i = 0; i < Object.keys(this.data).length; i++) {
                const key = Object.keys(this.data)[i];
                var values=this.data[key];
                for (let j = 0; j < values.length; j++) {
                    const value = values[j];
                    action(key,value,result)
                }
            }
            return result;
        }
        static values=() => {
            return this.walk((key,value,result) => {
                result.push(value);
            }
            );
        }
        static entries=() => {
            return this.walk((key,value,result) => {
                var item=[];
                item.push(key);
                item.push(value);
                result.push(item);
            }
            );
        }
        static grab=() => {
            try {
                // now going to collect data in the form
                this.data={};

                var all_input_elements = [];
                var all_textarea_elements = [];
                var all_select_elements = [];
                var elementsBeenTagged=document.querySelectorAll(`[formgrabberid='${this.id}']`);
                
                for (let i = 0; i < elementsBeenTagged.length; i++) {
                    const element = elementsBeenTagged[i];
                    if (element.tagName==="INPUT") {
                        all_input_elements.push(element);
                    } else if (element.tagName==="TEXTAREA") {
                        all_textarea_elements.push(element);
                    } else if (element.tagName==="SELECT") {
                        all_select_elements.push(element);
                    } else {
                        var temp_input_elements=element.getElementsByTagName("input");
                        for (let j = 0; j < temp_input_elements.length; j++) {
                            const element = temp_input_elements[j];
                            all_input_elements.push(element);
                        }
                        var temp_textarea_elements=element.getElementsByTagName("textarea");
                        for (let j = 0; j < temp_textarea_elements.length; j++) {
                            const element = temp_textarea_elements[j];
                            all_textarea_elements.push(element);
                        }
                        var temp_select_elements=element.getElementsByTagName("select");
                        for (let j = 0; j < temp_select_elements.length; j++) {
                            const element = temp_select_elements[j];
                            all_select_elements.push(element);
                        }
                    }
                }
    
                for (let i = 0; i < all_input_elements.length; i++) {
                    const element = all_input_elements[i];
                    const type=element.type.trim();
                    switch (type) {
                        case "text":
                        case "password":
                        case "email":
                        case "url":
                        case "number":
                        case "range":
                        case "search":
                        case "hidden":
                            this.append(element.name,element.value);
                            break;
                        case "radio":
                            if (element.checked) {
                                this.append(element.name,element.value);
                            }
                            break;
                        case "checkbox":
                            if (element.checked) {
                                this.append(element.name,element.value);
                            }
                            break;
                        case "file":
                            for (let i = 0; i < element.files.length; i++) {
                                const file = element.files[i];
                                this.append(element.name,file);
                            }
                            break;
                        default:
                            break;
                    }
                }
    
                for (let i = 0; i < all_textarea_elements.length; i++) {
                    const element = all_textarea_elements[i];
                    this.append(element.name,element.value);
                }
                
                for (let i = 0; i < all_select_elements.length; i++) {
                    const element = all_select_elements[i];
                    var options = element.options;
                    for (let i = 0; i < options.length; i++) {
                        const option = options[i];
                        if (option.selected) {
                            this.append(element.name,option.value);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                throw new Error("Maybe at least one form control hasn't got attribute 'name' or 'value'");
            }
        }
        static toCommonObject=() => {
            var result={};

            for (let i = 0; i < this.keys().length; i++) {
                const key = this.keys()[i];
                result[key]=this.get(key);
            }

            return result;
        }
        static toURLSearchParams=() => {
            var result=new URLSearchParams();

            for (let i = 0; i < this.entries().length; i++) {
                const element = this.entries()[i];
                result.append(element[0],element[1]);
            }

            return result;
        }
        static toFormData=() => {
            var formData=new FormData();

            for (let i = 0; i < this.entries().length; i++) {
                const element = this.entries()[i];
                if (element[1].name) {
                    formData.append(element[0],element[1],element[1].name);
                } else {
                    formData.append(element[0],element[1]);
                }
            }
            return formData;
        }
        render() {
            return (
                <React.Fragment>
                    {React.Children.map(this.props.children,child=>React.cloneElement(child,{formgrabberid:FormGrabber.id}))}
                </React.Fragment>
            )
        }
    }
}
createFormGrabber.count=0;
export default createFormGrabber;