import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";
import Recipe from "./scripts/recipe.js"

class RecipeForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} id="form">
                <h1>{this.props.name}</h1>
                <label>
                    <div>
                        Recipe
                    </div>
                    <input type="text" placeholder="Recipe name" onChange={this.props.addN}/>
                </label>
                <label>
                    <div>
                        Ingredients
                    </div>
                    <textarea type="text" placeholder="Ingredients separated by commas" onChange={this.props.addI}/>                    
                </label>
                <input type="submit" value="Add Recipe"/>
                <input type="button" value="Close" onClick={this.props.closeM}/>
            </form>
        );
    }
}

class RecipeBox extends React.Component {
    constructor(props){
        super(props);

        // restore data from localstorage if possible and use them
        var storage = JSON.parse(localStorage.getItem("recipe"));
        console.log(storage);
        if(storage == null) storage = [];

        this.state = {
            name: "",
            list: [],
            showform: false,
            showRecipes: storage,
            recipeForm: false,
            edit: 0
        };
    }
   

    addRecipe = (event) => {
        event.preventDefault();
        if(this.state.name.length == 0) return;

        var object = {name: this.state.name, ingr: this.state.list};
        var tmpArray = this.state.showRecipes;
        tmpArray.push(object);
        this.setState({showRecipes: tmpArray});
        
// save to localStorage
        localStorage.setItem("recipe", JSON.stringify(tmpArray));
        this.setState({name: "", ingr: []});
        // Reset the fields
        event.target.reset();
        
        console.log(tmpArray);
        console.log(this.state.showRecipes);
    }

    addName = (event) => {
        this.setState({name: event.target.value});
        // console.log(event.target.value);
    }

    addIngredients = (event) => {
        var tmpArray = event.target.value.split(",");
        // console.log(tmpArray);
        this.setState({list: tmpArray});
    }

    showForm = () => {
        this.setState({showform: true});
        document.getElementById("overlay").style.display = "block";
    }
    
    closeForm = () => {
        this.setState({showform: false});
        document.getElementById("overlay").style.display = "none";
    }

    removeRecipe = (event) => {
        var tmpArray = this.state.showRecipes;
        tmpArray.splice(event.target.id.charAt(1), 1);
        this.setState({showRecipes: tmpArray});

// update localStorage
        localStorage.setItem("recipe", JSON.stringify(tmpArray));
    }

    editIngredients = (event) => {
        this.setState({edit: event.target.id.charAt(1)});
        
        console.log(this.state.edit);
    }

    editRecipe = () => {

    }

    render(){
        return (
            <div>
                { this.state.showform ? <RecipeForm name="Add a Recipe" onSubmit={this.addRecipe} closeM = {this.closeForm} addN={this.addName} addI={this.addIngredients}/> : null}
                <div id="recipebox">   
                    {
                        this.state.showRecipes.map((rec, index) => (
                            <div className="recipe" key={index} >
                                <Recipe data={rec} />
                                <button id={"b" + index} className="recipeButton" onClick={this.removeRecipe}>Delete</button><button id={"r" + index} className="recipeButton" onClick={this.editIngredients}>Edit</button>
                                { this.state.recipeForm ? <RecipeForm name="Edit Recipe" onSubmit={this.editRecipe} closeM = {this.closeForm} addN={this.addName} addI={this.addIngredients}/> : null}
                            </div>
                        ))
                    }
                </div>
                <button className="mainButton" onClick={this.showForm}>Add Recipe</button>
            </div>
        );
    }
}

window.onbeforeunload = function(){

}

ReactDOM.render(<RecipeBox />, document.getElementById('root'));
