import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Tab, Row, Col, Nav, NavItem, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import './App.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        }
    }

    handleDeleteClick = (e) => {
        this.props.onDelete(this.props.index);
    }

    render() {
        let ingredients = this.props.recipe.ingredients;
        const ingredientsList = ingredients.map((ingredient, index) => {
            return (
                <li key={index}>{ingredient}</li>
            );
        })

        return (
            <Tab.Pane eventKey={this.props.index}>
                <ol>
                    {ingredientsList}
                </ol>
                <Button onClick={()=>this.setState({ modalShow: true })}>Edit</Button> <Button bsStyle="danger" onClick={this.handleDeleteClick}>Delete</Button>
                <RecipeCreator show={this.state.modalShow}
                    onHide={()=>this.setState({modalShow: false})}
                    onSave={this.props.onEdit}
                    recipe={this.props.recipe}
                    index={this.props.index}/>
                </Tab.Pane>
            );
        }
    }

    class RecipeCreator extends React.Component {
        constructor(props) {
            super(props);

            //Editing recipe
            if(this.props.recipe) {
                let ingredientsStr = this.props.recipe.ingredients.toString();
                this.state = {
                    name: this.props.recipe.name,
                    ingredients: ingredientsStr,
                }
            }
            else { //Creating new recipe
                this.state = {
                    name: '',
                    ingredients: '',
                };
            }
        }

        getNameValidationState() {
            const length = this.state.name.length;
            if (length > 4)
            return 'success';
            if (length > 0)
            return 'error';
        }

        getIngredientsValidationState() {
            const length = this.state.ingredients.length;
            if (length > 4)
            return 'success';
            if (length > 0)
            return 'error';
        }

        handleNameChange = (e) => {
            this.setState({ name: e.target.value });
        }

        handleIngredientsChange = (e) => {
            this.setState({ ingredients: e.target.value });
        }

        handleSubmit = (e) => {
            e.preventDefault();
            const newRecipe = {
                name: this.state.name,
                ingredients: this.state.ingredients.replace(/\s/g, '').split(","), //Remove spaces and transform string into array
            };

            this.props.onSave(newRecipe, this.props.index); //this.props.index is only used on editing recipe
            this.props.onHide();
        }

        render() {
            return (
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header>
                        <Modal.Title>Add new recipe</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            <FormGroup controlId="recipeName" validationState={this.getNameValidationState()} >
                                <ControlLabel>Recipe Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.name}
                                    placeholder="Insert name..."
                                    onChange={this.handleNameChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="ingredientsList" validationState={this.getIngredientsValidationState()} >
                                <ControlLabel>Ingredients</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.ingredients}
                                    placeholder="tomato, pasta, strawberries..."
                                    onChange={this.handleIngredientsChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.props.onHide}>Close</Button>
                            <Button type="submit" bsStyle="primary">Save</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )
        }
    }

    class App extends Component {
        constructor(props) {
            super(props);

            //Browser has saved recipes
            if(localStorage.recipes) {
                var retrievedRecipes = JSON.parse(localStorage.getItem('recipes'));
                this.state = {
                    recipes: retrievedRecipes,
                    modalShow: false,
                }
            }
            else { //Initialize and save sample recipes
                this.state = {
                    recipes: [
                        {name: 'Lasanha', ingredients: ['carne', 'massa', 'tomate']},
                        {name: 'Bacalhau à Brás', ingredients: ['bacalhau', 'molho bechamel', 'batata']},
                        {name: 'Gelado de Banana', ingredients: ['chocolate', 'banana', 'gelado']}
                    ],
                    modalShow: false,
                };
                localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
            }
        }

        handleEditRecipe = (newRecipe, recipeIndex)=>{
            this.setState((prevState) => {
                let tempRecipes = prevState.recipes;
                tempRecipes.splice(recipeIndex, 1, newRecipe);
                return {recipes: tempRecipes};
            });
        }

        handleSaveRecipe = (newRecipe)=>{
            this.setState((prevState) => {
                let updatedRecipes = prevState.recipes.concat(newRecipe);
                return {recipes: updatedRecipes};
            });
        };

        handleDeleteRecipe = (recipeIndex)=>{
            this.setState((prevState) => {
                let tempRecipes = prevState.recipes;
                tempRecipes.splice(recipeIndex, 1);
                return {recipes: tempRecipes};
            });
        }

        render() {
            let currentRecipes = this.state.recipes;
            let recipesIngredients = currentRecipes.map((recipe, index) => {
                return (<Recipe key={index} index={index} recipe={recipe}
                    onDelete={this.handleDeleteRecipe} onEdit={this.handleEditRecipe}/>);
                });

                const recipesList = currentRecipes.map((recipe, index) => {
                    return (<NavItem key={index} eventKey={index}>
                        {recipe.name}
                    </NavItem>);
                });

                return (
                    <div className="App">
                        <div className="App-header">
                            <h2>Recipe Box</h2>
                        </div>

                        <div className="container">
                            <Tab.Container id="recipe-box" defaultActiveKey={0}>
                                <Row className="clearfix">
                                    <Col sm={4}>
                                        <h2>Recipes</h2>
                                        <Nav bsStyle="pills" stacked>
                                            {recipesList}
                                        </Nav>
                                        <br></br>
                                        <Button bsStyle="primary" onClick={()=>this.setState({ modalShow: true })}>
                                            Add Recipe
                                        </Button>
                                    </Col>
                                    <Col className="text-left" sm={8}>
                                        <h2>Ingredients</h2>
                                        <Tab.Content animation>
                                            {recipesIngredients}
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>

                            <RecipeCreator show={this.state.modalShow} onHide={()=>this.setState({modalShow: false})} onSave={this.handleSaveRecipe} />
                        </div>
                    </div>
                );
            }

            componentDidUpdate(prevProps, prevState) {
                //Update localStorage with current recipes
                localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
            }
        }

        export default App;
