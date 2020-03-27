import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import Empty from "./components/Empty";
import "./App.scss";
import { FaSearch, FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight as Arrow } from "react-icons/md";
import descriptionImg from "./assets/plates-four.png";

const App = () => {
    const API_ID = "4f1cc37c";
    const API_KEY = "1a57ab607d519f5d916aa022f1a51fae";

    const [listRecipes, setListRecipes] = useState([]);
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [ingredientQuery, setIngredientQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);

    const getRecipes = async () => {
        setLoading(true);
        const response = await fetch(
            `https://api.edamam.com/search?q=${ingredientQuery}&to=100&app_id=${API_ID}&app_key=${API_KEY}`
        );
        const data = await response.json();
        setListRecipes(data.hits);
        setLoading(false);
    };

    const getDataSearch = e => {
        e.preventDefault();
        setIngredientQuery(ingredientSearch);
        if (ingredientSearch === "") {
            alert("Please enter at least ONE ingredient");
        }
        setIngredientSearch("");
    };

    useEffect(() => {
        getRecipes();
    }, [ingredientQuery]);

    const getSuggestion = () => {
        setIngredientQuery("suggestions");
    };

    const backHome = () => {
        setIngredientQuery("");
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipe = listRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="App">
            <header>
                <div className="wrapper">
                    <div className="search-form">
                        <form onSubmit={getDataSearch}>
                            <div className="form-input">
                                <FaSearch
                                    style={{
                                        marginTop: "3px",
                                        width: "100%",
                                        color: "#fec989"
                                    }}
                                />
                                <input
                                    type="text"
                                    value={ingredientSearch}
                                    placeholder="Enter your ingredient(s)"
                                    onChange={e =>
                                        setIngredientSearch(e.target.value)
                                    }
                                />
                                <button type="submit">Search</button>
                            </div>
                            
                        </form>
                    </div>
                    <div className="suggestions">
                        <button onClick={getSuggestion}>Suggestions</button>
                    </div>
                </div>
            </header>

            {loading ? (
                <Loader />
            ) : (
                <div>
                    {ingredientQuery === "" ? (
                        <div id="description" className="wrapper">
                            <div className="description-img">
                                <img src={descriptionImg} alt="Food Plates" />
                            </div>
                            <div className="description-text">
                                <h1>What To Eat</h1>
                                <h3>Don't know what to eat today?</h3>
                                <ul>
                                    <li>
                                        <Arrow style={{ color: "#f05a28" }} />
                                        Enter your ingredient(s)
                                    </li>
                                    <li>
                                        <Arrow style={{ color: "#f05a28" }} />
                                        Find out your next delicious meal
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="wrapper">
                            {listRecipes.length === 0 ? ( 
                                <Empty ingredient={ingredientQuery}/> 
                            ) : (
                                <div id="recipes">
                                    <div className="search-info">
                                        <p>
                                            Searching for{" "}
                                            <span className="bold">
                                                {ingredientQuery}
                                            </span>{" "}
                                            recipes
                                        </p>
                                    </div>
                                    <div className="list-recipes">
                                        {currentRecipe.map(item => (
                                            <Recipe
                                                key={item.recipe.uri}
                                                img={item.recipe.image}
                                                title={item.recipe.label}
                                                calories={item.recipe.calories}
                                                diet={item.recipe.dietLabels}
                                                url={item.recipe.url}
                                            />
                                        ))}
                                    </div>
                                    <div className="pagination-container">
                                        <Pagination
                                            recipesPerPage={recipesPerPage}
                                            totalRecipes={listRecipes.length}
                                            paginate={paginate}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <footer>
                <div className="footer-content wrapper">
                    <div className="copyright">
                        <p>© 2019 - Alexandre Salsinha</p>
                    </div>
                    <div className="back-home">
                        <button onClick={backHome}><FaHome style={{color: "#f05a28"}}/></button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
