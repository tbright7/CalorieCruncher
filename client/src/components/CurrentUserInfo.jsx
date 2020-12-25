import React from 'react';

class CurrentUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.calculateCalories = this.calculateCalories.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    calculateCalories(user) {
        var goal = 1
        if (this.props.currentUser.weight>this.props.currentUser.goal_weight){
            goal = .9
        }
        if (this.props.currentUser.weight<this.props.currentUser.goal_weight){
            goal = 1.1
        }
        if (this.props.currentUser.gender == -161) {
            var calories = Math.round(((4.536 * this.props.currentUser.weight) + (15.88 * this.props.currentUser.height) - (5 * this.props.currentUser.age) - 161) * this.props.currentUser.activity_level)
        } else {
            var calories = Math.round(((4.536 * this.props.currentUser.weight) + (15.88 * this.props.currentUser.height) - (5 * this.props.currentUser.age) + this.props.currentUser.gender) * this.props.currentUser.activity_level)
        }
        return Math.round(calories*goal)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    Welcome {this.props.currentUser.username}
                </div>
                <div>
                    Your last recorded weight was {this.props.currentUser.weight}lbs
                </div>
                <div>
                    Your goal weight is {this.props.currentUser.goal_weight}lbs
                </div>
                <div>
                    Your daily caloric goal is  {this.calculateCalories(this.props.currentUser)}
                </div>
                <div>
                    <input name='updatedWeight' type="number" placeholder='weight' onChange={this.handleChange} />
                </div>
                <div>
                    <button onClick={() => {this.props.updateCurrentUserWeight(this.props.currentUser, this.state)}}> update your weight </button>
                </div>
            </div>
        )
    }
}

export default CurrentUserInfo;