import React from 'react';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userToUpdate.id,
            username: this.props.userToUpdate.username,
            age: this.props.userToUpdate.age,
            weight: this.props.userToUpdate.weight,
            goal_weight: this.props.userToUpdate.goal_weight,
            height: this.props.userToUpdate.height,
            gender: this.props.userToUpdate.gender,
            activity_level: this.props.userToUpdate.activity_level

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => { console.log(this.state) })
    }
    handleClick() {
        this.props.updateUser(this.state)
        this.props.updateProfile()
    }

    render() {
        return (
            <div>
                {this.props.userToUpdate !== null &&
                    <div>
                        <div>
                            <input name='username' type='text' placeholder={this.props.userToUpdate.username} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input name='age' type="number" placeholder={this.props.userToUpdate.age} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input name='weight' type="number" placeholder={this.props.userToUpdate.weight} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input name='goal_weight' type="number" placeholder={this.props.userToUpdate.goal_weight} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input name='height' type="number" placeholder={this.props.userToUpdate.height} min={36} max={99} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type='radio' name='gender' value={5} onChange={this.handleChange} />Male
                    <input type='radio' name='gender' value={-161} onChange={this.handleChange} />Female
                    </div>
                        <div>
                            <input type='radio' name='activity_level' value={1.25} onChange={this.handleChange} />No excercise
                    <input type='radio' name='activity_level' value={1.375} onChange={this.handleChange} />Light excercise
                    <input type='radio' name='activity_level' value={1.55} onChange={this.handleChange} />Moderately active
                    <input type='radio' name='activity_level' value={1.725} onChange={this.handleChange} />Very active
                    <input type='radio' name='activity_level' value={1.9} onChange={this.handleChange} />Extremely active
                    </div>
                    </div>
                }
                <button onClick={this.handleClick}>Update User</button>
            </div>
        )
    }
}

export default UpdateUser;