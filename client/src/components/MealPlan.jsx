import React from 'react';
import NutritionWidget from './NutritionWidget.jsx';

class MealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    fetchNutritionWidget(id) {
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
            <div id="mealPlan">
                <div className="info">
                    Today's Meals:
                </div>
                {this.props.mealPlan !== undefined &&
                    <div >
                        {this.props.mealPlan.results.map((meal) => (
                            <div id="mealImage" key={meal.id}>
                                <img src={meal.image} height="185.4" width="190.3" />
                                <div id="mealInfo">
                                    <a href={meal.sourceUrl}>
                                        <div id="mealTitle"> {meal.title} </div>
                                    </a>
                                    <div className='mealItem'> Total calories: {Math.round(meal.nutrition.nutrients[0].amount)}  </div>
                                    <div className='mealItem'> Protein: {Math.round(meal.nutrition.nutrients[1].amount)} Grams </div>
                                    <div className='mealItem'> Carbs: {Math.round(meal.nutrition.nutrients[3].amount)} Grams</div>
                                    <div className='mealItem'> Fat: {Math.round(meal.nutrition.nutrients[2].amount)} Grams</div>
                                    <div className='mealItem'> Prep time: {meal.readyInMinutes} minutes</div>
                                    {/* <NutritionWidget id={meal.id} /> */}
                                    <div> </div>

                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default MealPlan;