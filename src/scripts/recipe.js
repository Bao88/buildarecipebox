import React from 'react';
import ReactDOM from 'react-dom';
import "../css/recipe.css";

class Ingredient extends React.Component {

    render(){
        return (
            <p>{this.props.name}</p>
        );
    }
}
class Recipe extends React.Component {
    render() {
        return (
            <div className="recipe">
                <button className="but">{this.props.name}</button>
                <h3 className="hideI">Ingredients
                    <Ingredient name="Carrot"/>
                </h3>

            </div>
        );
    }
}

export default Recipe;