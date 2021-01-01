import React from 'react';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userToUpdate.id,
            username: this.props.userToUpdate.username,
            age: this.props.userToUpdate.age,
            weight: this.props.userToUpdate.weight,
            goalweight: this.props.userToUpdate.goalweight,
            height: this.props.userToUpdate.height,
            gender: this.props.userToUpdate.gender,
            activitylevel: 1.25,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => { console.log(this.state) })
    }
    handleSelectChange(event) {
        this.setState({
            activitylevel: event.target.value
        }, () => { console.log(this.state.activitylevel) })
    }
    handleClick() {
        this.props.updateUser(this.state)
        this.props.updateProfile()
    }

    render() {
        return (
            <div>
                Update {this.props.userToUpdate.username}'s information
                {this.props.userToUpdate !== null &&
                    <div>
                        {this.props.fields.map((field) =>
                            <div id={field.name} key={field.name}>
                                <input
                                    className="fieldInput"
                                    name={field.name}
                                    type={field.type}
                                    placeholder={this.state[field.name]}
                                    onChange={this.handleChange} />
                            </div>)}
                        <div id="activitylevel">
                            <select className="fieldInput" onChange={this.handleSelectChange} >
                                {this.props.activityLevels.map((activityLevel) => (
                                    <option key={activityLevel.value} 
                                        name='activitylevel' value={activityLevel.value}>{activityLevel.level}</option>
                                ))}
                            </select>
                        </div>
                        <div id="gender">
                            <input type='radio' name='gender' value={5} onChange={this.handleChange} />Male
                            <input type='radio' name='gender' value={-161} onChange={this.handleChange} />Female
                        </div>
                    </div>
                }
                <button id ="button" onClick={this.handleClick}>Update User</button>
                <div>
                <button id ="button" onClick={() => { this.props.updateProfile() }}> Cancel</button>
                </div>
            </div>
        )
    }
}

export default UpdateUser;