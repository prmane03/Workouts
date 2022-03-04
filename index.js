var searchInput = document.getElementById("searchInput")
var searchButton = document.getElementById("searchButton")

searchButton.addEventListener('click', () => {
    getCharacter(document.getElementById("wid").value)

})

async function getCharacter(id) {
    try {
        let res = await fetch("https://raw.githubusercontent.com/prmane03/Workouts/main/data/workout.json");
        var result = await res.json();
        function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}

        var data = filterById(result, id) 
        document.getElementById("dataContainer").innerHTML = ''
        console.log(data)
        let d = `<div class="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row md:p-12"><img src=${data['gifUrl']} class="">${data['target']}</div>`
        document.getElementById("dataContainer").insertAdjacentHTML("afterbegin", d)

    } catch (error) {
        console.log(error);
    }
}

searchInput.addEventListener('keyup', () => {
    getChars()
})

async function getChars() {
    try {
        let res = await fetch("https://raw.githubusercontent.com/prmane03/Workouts/main/data/workout.json");

        var result = await res.json();
    
        data = result.filter(
            (result) => { return result.name.toString().toLowerCase().includes(searchInput.value.toString().toLowerCase()) }
        );
        document.getElementById("chars").innerHTML = ''
        var wid = document.getElementById("wid");

        data.forEach((dict, idx) => {
            if (idx < 7) {
                let opt = document.createElement('option');
                opt.value = dict['name'];
                wid.value = dict["id"]
                opt.setAttribute("data-value", dict["id"])
                document.getElementById("chars").appendChild(opt)
            }

        });

    } catch (error) {
        console.log(error);
    }
}