import React from 'react';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activitylevel: 1.25,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSelectChange(event) {
        this.setState({
            activitylevel: event.target.value
        }, () => { console.log(this.state.activitylevel) })
    }
    handleClick() {
        if (this.state.hasOwnProperty('username') && this.state.hasOwnProperty('age') && this.state.hasOwnProperty('weight') && this.state.hasOwnProperty('goalweight') && this.state.hasOwnProperty('age') && this.state.hasOwnProperty('gender') && this.state.hasOwnProperty('activitylevel')) {
            this.props.adduser(this.state)
        } else {
            alert('All fields must be filled in')
        }
    }
    render() {
        return (
            <div>
                <div>
                    {this.props.fields.map((field) =>
                        <div id={field.name} key={field.name}>
                            <input
                                className="fieldInput"
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                onChange={this.handleChange} />
                        </div>)}
                    <div id="activitylevel" > 
                            <select onChange={this.handleSelectChange} className="fieldInput">
                            {this.props.activityLevels.map((activityLevel) => (
                                <option key={activityLevel.value} name='activitylevel' value={activityLevel.value}>{activityLevel.level}</option>
                            ))}
                        </select>
                    </div>
                    <div id="gender">
                        <input type='radio'
                            name='gender'
                            value={5}
                            onChange={this.handleChange}
                            
                        />Male
                        <input
                            type='radio'
                            name='gender'
                            value={-161}
                            onChange={this.handleChange}
                        />Female
                    </div>
                </div>
                <button id="button" onClick={this.handleClick}>Create a profile</button>
            </div>
        )
    }
}

export default AddUser;