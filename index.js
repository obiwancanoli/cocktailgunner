import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const result = response.data;
        console.log(result);

        const cocktail = result.drinks ? result.drinks[0] : null;
        
        const drinkName = result["drinks"][0]["strDrink"];
        //console.log(drinkName);

        const drinkImg = result["drinks"][0]["strDrinkThumb"];
        console.log(drinkImg);

        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            } else if (ingredient) {
                ingredients.push(ingredient);
            };
        };
        console.log(ingredients);

        
        const drinkInstructions = result["drinks"][0]["strInstructions"];
        console.log(drinkInstructions);

        res.render("index.ejs", { data : {
            drinkNameData: drinkName,
            drinkImgData: drinkImg,
            drinkIngData: ingredients,
            drinkInstructionsData: drinkInstructions
        }});


    } catch (error) {
        console.log("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});
    

app.post("/", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const result = response.data;
        console.log(result);

        const cocktail = result.drinks ? result.drinks[0] : null;
        
        const drinkName = result["drinks"][0]["strDrink"];
        //console.log(drinkName);

        const drinkImg = result["drinks"][0]["strDrinkThumb"];
        console.log(drinkImg);

        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            } else if (ingredient) {
                ingredients.push(ingredient);
            };
        };
        console.log(ingredients);

        
        const drinkInstructions = result["drinks"][0]["strInstructions"];
        console.log(drinkInstructions);

        res.render("index.ejs", { data : {
            drinkNameData: drinkName,
            drinkImgData: drinkImg,
            drinkIngData: ingredients,
            drinkInstructionsData: drinkInstructions
        }});


    } catch (error) {
        console.log("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  