import React from 'react';
import WeightGraph from './WeightGraph.jsx';
import CaloriePieChart from './CaloriePieChart.jsx';
import MealPlan from './MealPlan.jsx';
import axios from 'axios';

class CurrentUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: this.calculateCalories(this.props.currentUser)
        }
        this.calculateCalories = this.calculateCalories.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.fetchMealPlan = this.fetchMealPlan.bind(this);
    }
    fetchMealPlan() {
        var req = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${this.state.calories}&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        axios.get(req)
            .then(({ data }) => {
                this.setState({
                    mealPlan: data
                }, () => {console.log(this.state.mealPlan)})
            })
            .catch((error) => {
                console.log(error)
            });
    }
    componentDidMount() {
        this.fetchMealPlan()
    }

    calculateCalories(user) {
        var genderAdjuster = parseInt(user.gender);
        var adjustCalorieToGoal = user.goalweight / user.weight;
        var BMR = ((4.536 * user.weight) + (15.88 * user.height) - (5 * user.age) + genderAdjuster) * user.activitylevel;
        return Math.round(BMR * adjustCalorieToGoal);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleClick(user, state) {
        if (this.state.hasOwnProperty('updatedWeight')) {
            this.props.updateCurrentUserWeight(user, state);
        } else {
            alert('weight must be filled in');
        }
    }
    updateProfile() {
        this.setState({
            updateProfile: true
        });
    }

    render() {
        return (
            <div>
                <button onClick={() => { this.props.setCurrentUser() }}>Return to user selection</button>
                <div>
                    Welcome {this.props.currentUser.username}
                </div>
                <div>
                    Your last recorded weight was {this.props.currentUser.weight}lbs
                </div>
                <div>
                    Your goal weight is {this.props.currentUser.goalweight}lbs
                </div>
                <div>
                    Your daily caloric goal is  {this.state.calories}
                </div>
                <div>
                    <input name='updatedWeight' type="number" placeholder='Current weight' onChange={this.handleChange} />
                </div>
                <div>
                    <button onClick={() => { this.handleClick(this.props.currentUser, this.state) }}> Update your weight </button>
                </div>
                {this.props.currentUserWeight &&
                    <div>
                        <WeightGraph currentUserWeight={this.props.currentUserWeight} />
                    </div>
                }
                <div>
                    <CaloriePieChart calories={this.state.calories} currentUser={this.props.currentUser} />
                </div>
                <div>
                    <MealPlan mealPlan = {this.state.mealPlan} />
                </div>
            </div>
        )
    }
}

export default CurrentUserInfo;