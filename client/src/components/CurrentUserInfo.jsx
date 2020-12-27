import React from 'react';
import WeightGraph from './WeightGraph.jsx';


class CurrentUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.calculateCalories = this.calculateCalories.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    calculateCalories(user) {
        var genderAdjuster = parseInt(this.props.currentUser.gender)
        var weight = this.props.currentUser.weight
        var goalWeight = this.props.currentUser.goal_weight
        var adjustCalorieToGoal = goalWeight / weight
        var BMR = Math.round(((4.536 * weight) + (15.88 * this.props.currentUser.height) - (5 * this.props.currentUser.age) + genderAdjuster) * this.props.currentUser.activity_level)

        return Math.round(BMR * adjustCalorieToGoal)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick(user, state) {
        if (this.state.hasOwnProperty('updatedWeight')) {
            this.props.updateCurrentUserWeight(user, state)
        } else {
            alert('weight must be filled in')
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => { this.props.setCurrentUser() }}>return to user selection</button>
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
                    <button onClick={() => { this.handleClick(this.props.currentUser, this.state) }}> update your weight </button>
                </div>
                {this.props.currentUserWeight &&
                    <div>
                        <WeightGraph currentUserWeight={this.props.currentUserWeight} />
                    </div>
                }
            </div>
        )
    }
}

export default CurrentUserInfo;