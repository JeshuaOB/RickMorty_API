let character = {
    fetchCharacter: function(characterName){    // Create a function that receives the character as a parameter
        fetch(
            "https://rickandmortyapi.com/api/character/?name="+
            characterName
        ).then((response)=>response.json())    // Get the response from the promise and parse it from String to JSON
        .then((data)=>this.displayCharacter(data));    // Get the data from the new promise returned by the previous line
    },
    displayCharacter: function(data){    // Collect the necessary values ​​from the API and show them in the determined fields
        const {name} = data.results[0];
        const {status} = data.results[0];
        const {species} = data.results[0];
        const {image} = data.results[0];
        const {name:origin} = data.results[0].origin;
        const {name:location} = data.results[0].location;    
        document.querySelector(".name").innerText = name;
        document.querySelector(".status").innerText = String(status).toUpperCase();
        document.querySelector(".image").src = image;
        document.querySelector(".species").innerText = species;
        document.querySelector(".origin").innerText = origin;
        document.querySelector(".location").innerText = location;
        document.querySelector(".block").classList.remove("loading");    // Remove the "loading" class once the corresponding data has been loaded
        document.querySelector(".status").classList.remove("green","red","orange");    // Change the style of a text block depending on the value of one of the variables collected
        if(status=="Alive"){
            document.querySelector(".status").classList.add("green");
        }
        else if(status=="Dead"){
            document.querySelector(".status").classList.add("red");
        }
        else{
            document.querySelector(".status").classList.add("orange");
        }
        document.querySelector(".search-bar").value = "";
    },
    search: function(){
        this.fetchCharacter(document.querySelector(".search-bar").value);    // Get the value entered by the user and uses it as the parameter
    },
    animation: function(){    // Add an animation to the character's card
        let x = document.getElementById('scale');
        x.classList.add('scale');
        setTimeout(function(){
            x.classList.remove('scale');
        },1000);
    }
};

document.querySelector(".search button").addEventListener("click", function(){    // Execute the function when a mouse click is made
    character.search();
    character.animation();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){    // Execute the function when the "Enter" key is pressed
    if(event.key == "Enter"){
        character.search();
        character.animation();
    }
});

character.fetchCharacter("Rick Sanchez");    // Execute the main function with "Rick Sanchez" as the default parameter
