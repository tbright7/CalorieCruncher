import React from 'react';
import NutritionWidget from './NutritionWidget.jsx';

class MealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    fetchNutritionWidget(id) {
        // var req = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${this.state.calories}&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        // var req = `https://api.spoonacular.com/recipes/complexSearch?minCarbs=${(this.state.carbs/3)-30}&maxCarbs=${(this.state.carbs/3)+30}&minFat=${(this.state.fat/3)-10}&maxFat=${(this.state.fat/3)+10}&minProtein=${(this.state.protein)-20}&maxProtein=${(this.state.protein/3)+30}&maxCalories=${(this.state.calories/3)+300}&number=3&apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        var req = `https://api.spoonacular.com/recipes/${id}/nutritionWidget?apiKey=32a96cb976764a9689a12cbc67d0ab2c`
        axios.get(req)
            .then(({ data }) => {
                this.setState({
                    nutritionWidget: data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        return (
            <div>
                Today's Meals:
                {this.props.mealPlan !== undefined &&
                    <div>
                        <div className="meals">
                            {this.props.mealPlan.results.map((meal) => (
                                <div id="mealImage" key={meal.id}>
                                    <img src={meal.image} height="190.3" width="190.3" />
                                    <div id="mealInfo">
                                        <a href={meal.sourceUrl}>
                                            <div> {meal.title} </div>
                                        </a>
                                        <div> Total calories: {Math.round(meal.nutrition.nutrients[0].amount)}  </div>
                                        <div> Protien: {Math.round(meal.nutrition.nutrients[1].amount)} Grams </div>
                                        <div> Carbs: {Math.round(meal.nutrition.nutrients[3].amount)} Grams</div>
                                        <div> Fat: {Math.round(meal.nutrition.nutrients[2].amount)} Grams</div>
                                        <div> Prep time: {meal.readyInMinutes} minutes</div>
                                        {/* <NutritionWidget id={meal.id} /> */}
                                        <div> </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default MealPlan;