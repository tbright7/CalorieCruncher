import React from 'react';

class MealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        return (
            <div>
                {this.props.mealPlan !== undefined &&
                    <div>
                        <ul className="meals">
                            {this.props.mealPlan.meals.map((meal) => (
                                <li key={meal.id}>
                                    <a href={meal.sourceUrl}>
                                        <div> {meal.title} </div>
                                    </a>
                                    <div> Preperation Time: {meal.readyInMinutes} minutes</div>
                                    <div> Servings: {meal.servings} </div>
                                </li>
                            ))}
                        </ul>
                        <div> Total Calories: {this.props.mealPlan.nutrients.calories} </div>
                        <div> Grams of protein: {this.props.mealPlan.nutrients.protein} </div>
                        <div> Grams of carbs: {this.props.mealPlan.nutrients.carbohydrates} </div>
                        <div> Grams of fat: {this.props.mealPlan.nutrients.fat} </div>

                    </div>
                }
            </div>
        )
    }
}

export default MealPlan;