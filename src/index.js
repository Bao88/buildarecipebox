import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";
import Recipe from "./scripts/recipe.js"
import RecipeForm from "./scripts/recipeform";
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
            recipeForm: [],
            edit: -1
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
        console.log(tmpArray);
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

    editRecipe = (event, id) => {
        // console.log(event.target.elements[0].value);
        // event.preventDefault();
        console.log(id);
        console.log(event.target.elements[0].value);
        console.log(event.target.elements[1].value.split(","));
        // return;
        var object = {name: event.target.elements[0].value, ingr: event.target.elements[1].value.split(",")};
        var tmpArray = this.state.showRecipes;

        tmpArray[id.charAt(1)] = object;
        this.setState({showRecipes: tmpArray});

        // update localstorage
        localStorage.setItem("recipe", JSON.stringify(tmpArray));
        // // console.log(tmpArray);
        // // console.log(object);
        // // console.log(this.state.showRecipes);
        // this.forceUpdate();
    }

    showEditForm = (event) => {
         // alert(event.target.id);
         this.setState({edit: event.target.id.charAt(1)});
         var tmpArray = this.state.recipeForm;
         tmpArray[event.target.id.charAt(1)] = true;
         this.setState({recipeForm: tmpArray});
 
         // Add data
         console.log(event.target.id);
    }

    // Close the editing form
    closeEditRecipe = (event) => {
        // alert("Hello");
        this.setState({edit: -1});
        var tmpArray = this.state.recipeForm;
        tmpArray[this.state.edit] = false;
        this.setState({recipeForm: tmpArray});
    }

    render(){
        return (
            <div>
                { this.state.showform ? <RecipeForm className="form1"  val="Add Recipe" name="Add a Recipe" onSubmit={this.addRecipe} closeM = {this.closeForm} addN={this.addName} addI={this.addIngredients}/> : null}
                <div id="recipebox">   
                    {
                        this.state.showRecipes.map((rec, index) => (
                                <Recipe rID={"r" + index} rm={this.removeRecipe} key={index} data={rec} rmPar={this.editRecipe}/>
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
