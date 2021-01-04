import React from 'react';
import WeightGraph from './WeightGraph.jsx';
import CaloriePieChart from './CaloriePieChart.jsx';
import MealPlan from './MealPlan.jsx';
import axios from 'axios';

class CurrentUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: this.calculateCalories(this.props.currentUser),
            protein: this.calculateGramsOfProtien(this.props.currentUser, this.calculateCalories(this.props.currentUser)),
            fat: this.calculateCaloriesFromFat(this.props.currentUser, this.calculateCalories(this.props.currentUser)),
            carbs: this.calculateCaloriesFromCarbs(this.calculateCalories(this.props.currentUser), this.calculateGramsOfProtien(this.props.currentUser, this.calculateCalories(this.props.currentUser)), this.calculateCaloriesFromFat(this.props.currentUser, this.calculateCalories(this.props.currentUser)))
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.fetchMealPlan = this.fetchMealPlan.bind(this);
    }
    componentDidMount() {
        this.fetchMealPlan()
    }
    fetchMealPlan() {
        // var req = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${this.state.calories}&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        // var req = `https://api.spoonacular.com/recipes/complexSearch?minCarbs=${(this.state.carbs/3)-30}&maxCarbs=${(this.state.carbs/3)+30}&minFat=${(this.state.fat/3)-10}&maxFat=${(this.state.fat/3)+10}&minProtein=${(this.state.protein)-20}&maxProtein=${(this.state.protein/3)+30}&maxCalories=${(this.state.calories/3)+300}&number=3&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        var req = `https://api.spoonacular.com/recipes/complexSearch?&maxFat=${(this.state.fat / 3) + 15}&minProtein=${(this.state.protein / 3) - 15}&minCalories=${(this.state.calories / 3) - 200}&addRecipeNutrition=true&number=3&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        axios.get(req)
            .then(({ data }) => {
                this.setState({
                    mealPlan: data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    calculateCalories(user) {
        var genderAdjuster = parseInt(user.gender);
        var adjustCalorieToGoal = user.goalweight / user.weight;
        var BMR = ((4.536 * user.weight) + (15.88 * user.height) - (5 * user.age) + genderAdjuster) * user.activitylevel;
        return Math.round(BMR * adjustCalorieToGoal);
    }
    calculateGramsOfProtien(user, calories) {
        var caloriesInOneGramOfProtein = 4
        var gramsOfProtein = user.weight
        if (user.weight > user.goalweight) {
            gramsOfProtein = calories * .4 / caloriesInOneGramOfProtein
        }
        if (user.weight === user.goalweight) {
            gramsOfProtein = calories * .25 / caloriesInOneGramOfProtein
        }
        return Math.round(gramsOfProtein);
    }
    calculateCaloriesFromFat(user, calories) {
        var caloriesFromFat = (calories) * .3
        var caloriesInOneGramOfFat = 9
        if (user.weight > user.goalweight) {
            caloriesFromFat = (calories) * .2
        }
        return Math.round(caloriesFromFat / caloriesInOneGramOfFat);
    }
    calculateCaloriesFromCarbs(calories, protein, fat) {
        var caloriesInOneGramOfProtein = 4;
        var caloriesInOneGramOfFat = 9
        var caloriesInOneGramOfCarbs = 4
        var totalCalories = calories
        var carbs = totalCalories - (protein * caloriesInOneGramOfProtein) - (fat * caloriesInOneGramOfFat)
        return Math.round(carbs / caloriesInOneGramOfCarbs);
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
                <div id="showUsers">
                    <button id="showUsers" onClick={() => { this.props.setCurrentUser() }}>Return to user selection</button>
                </div>
                <div id="userInfo">
                    <div>
                        Welcome {this.props.currentUser.username},
                </div>
                    <div>
                        Your last recorded weight was {this.props.currentUser.weight}lbs.
                </div>
                    <div>
                        Your goal weight is {this.props.currentUser.goalweight}lbs.
                </div>
                    <div>
                        Your daily caloric goal is  {this.state.calories}.
                </div>
                    <div>
                        <input 
                        name='updatedWeight' 
                        className="fieldInput"
                        type="number" 
                        placeholder='Current weight' 
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <button id="button" 
                        onClick={() => { this.handleClick(this.props.currentUser, this.state) }}> 
                        Update weight</button>
                    </div>
                </div>
                {this.props.currentUserWeight &&
                    <div id="lineGraph">
                        <WeightGraph currentUser={this.props.currentUser} currentUserWeight={this.props.currentUserWeight} />
                    </div>
                }
                <div id="pieChart">
                    <CaloriePieChart carbs={this.state.carbs} fat={this.state.fat} calories={this.state.calories} protein={this.state.protein} currentUser={this.props.currentUser} />
                </div>
                <div id="mealPlan">
                    <MealPlan mealPlan={this.state.mealPlan} />
                </div>
            </div>
        )
    }
}

export default CurrentUserInfo;