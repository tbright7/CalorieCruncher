import React from 'react';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick() {
        if (this.state.hasOwnProperty('username') && this.state.hasOwnProperty('age') && this.state.hasOwnProperty('weight') && this.state.hasOwnProperty('goal_weight')&& this.state.hasOwnProperty('age') && this.state.hasOwnProperty('gender') && this.state.hasOwnProperty('activity_level')) {
            this.props.adduser(this.state)
        } else {
            alert('all fields must be filled in')
        }
    }


    render() {
        return (
            <div>
                <div>
                    <div>
                    <input name='username' type='text' placeholder='username' onChange={this.handleChange} />
                    </div>
                    <div>
                    <input name='age' type="number" placeholder='age' onChange={this.handleChange} />
                    </div>
                    <div>
                    <input name='weight' type="number" placeholder='weight' onChange={this.handleChange} />
                    </div>
                    <div>
                    <input name='goal_weight' type="number" placeholder='goal weight' onChange={this.handleChange} />
                    </div>
                    <div>
                    <input name='height' type="number" placeholder='height in inches' min ={36} max ={99}  onChange={this.handleChange} />
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
                <button onClick={this.handleClick}>Add User</button>
            </div>
        )
    }
}

export default AddUser;