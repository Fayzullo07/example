import { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getMealById} from '../api';
import { Loader } from '../components/Loader';

function Recipe() {
    const [recipe, setRecipe] = useState([]);
    const [btn, setBtn] = useState(false);
    const {id} = useParams();
    const {goBack} = useHistory();

    useEffect(() => {
        getMealById(id).then((data) => setRecipe(data.meals[0]))
    }, [])
    return(
        <>
            <button onClick={goBack} className='btn'>Go Back</button>
            {!recipe.idMeal ? <Loader/>:(
                <div className='recipe'>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                    <h1>{recipe.strMeal}</h1>
                    <h6><b>Category:</b> {recipe.strCategory}</h6>
                    {recipe.strArea ? <h6><b>Area:</b> {recipe.strArea}</h6>: null}
                    <p>{recipe.strInstructions}</p>
                    <button onClick={() => setBtn(!btn)} className='btn'>Show Recipe</button>
                    {btn? (
                        <table>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(recipe).map((key) => {
                                if(key.includes('Ingredient') && recipe[key]){
                                    return(
                                        <tr>
                                            <td>{recipe[key]}</td>
                                            <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                    ):null}
                    {recipe.strYoutube ? (
                        <div className='row'>
                            <h5>Video Recipe</h5>
                            <iframe src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} title={id} allowFullScreen frameBorder='0'></iframe>
                        </div>) :null}

                </div>
            )}
        </>
    )
}

export default Recipe;