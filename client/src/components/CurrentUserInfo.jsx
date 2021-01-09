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
        this.bmiCalculator = this.bmiCalculator.bind(this)
    }
    componentDidMount() {
        this.fetchMealPlan()
    }
    fetchMealPlan() {
        var api = 'FILL_ME_IN'
        var req = `https://api.spoonacular.com/recipes/complexSearch?&maxFat=${(this.state.fat / 3) + 25}&minProtein=${(this.state.protein / 3) - 15}&minCalories=${(this.state.calories / 3) - 200}&addRecipeNutrition=true&number=3&apiKey=${api}`
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
    bmiCalculator() {
        var bmi = Math.round((this.props.currentUser.weight / Math.pow(this.props.currentUser.height, 2)) * 703 * 10) / 10
        if (bmi < 18.5) {
            return `Your BMI is ${bmi} which is underweight.`
        }
        if (bmi >= 18.5 && bmi < 24.9) {
            return `Your BMI is ${bmi} which is normal.`
        }
        if (bmi >= 25 && bmi < 29.9) {
            return `Your BMI is ${bmi} which is overweight.`
        }
        if (bmi >= 30) {
            return `Your BMI is ${bmi} which is obese.`
        }
    }

    render() {
        return (
            <div>
                <div id="showUsers">
                    <button id="showUsers" onClick={() => { this.props.setCurrentUser() }}>Return to home screen</button>
                </div>
                <div id="userInfo">
                    <div className="info">
                        Welcome {this.props.currentUser.username},
                    </div>
                    {this.props.currentUserWeight &&

                        <div className="info" key={this.props.currentUserWeight[this.props.currentUserWeight.length - 1].weight}>
                            Your last recorded weight was {this.props.currentUserWeight[this.props.currentUserWeight.length - 1].weight}lbs. {"\n"}
                        </div>
                    }
                    <div className="info" key={this.bmiCalculator()}>
                        {this.bmiCalculator()}
                    </div>

                    <div className="info">
                        Your goal weight is {this.props.currentUser.goalweight}lbs.
                    </div>
                    <div className="info" key={this.state.calories}>
                        Your daily caloric goal is  {this.state.calories} kcal.

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
                <div id="lineGraphWidget" key={this.props.currentUserWeight}>
                    <WeightGraph
                        currentUser={this.props.currentUser}
                        currentUserWeight={this.props.currentUserWeight} />
                </div>

                {this.props.currentUserWeight &&
                    <div id="pieChartWidget" key={this.props.currentUserWeight[this.props.currentUserWeight.length - 1].weight + 2}>
                        <CaloriePieChart
                            carbs={this.calculateCaloriesFromCarbs(this.calculateCalories(this.props.currentUser), this.calculateGramsOfProtien(this.props.currentUser, this.calculateCalories(this.props.currentUser)), this.calculateCaloriesFromFat(this.props.currentUser, this.calculateCalories(this.props.currentUser)))}
                            fat={this.calculateCaloriesFromFat(this.props.currentUser, this.calculateCalories(this.props.currentUser))}
                            calories={this.calculateCalories(this.props.currentUser)}
                            protein={this.calculateGramsOfProtien(this.props.currentUser, this.calculateCalories(this.props.currentUser))}
                            currentUser={this.props.currentUser} />
                    </div>
                }
                <div id="mealPlanWidget">
                    <MealPlan mealPlan={this.state.mealPlan} />
                </div>
            </div>
        )
    }
}

export default CurrentUserInfo;
