import React from 'react';
import axios from 'axios';

class NutritionWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.fetchNutritionWidget(this.props.id)
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
            <div>
                {this.state.nutritionWidget}
            </div>
        )
    }
}

export default NutritionWidget;