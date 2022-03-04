var searchInput = document.getElementById("searchInput")
var searchButton = document.getElementById("searchButton")

searchButton.addEventListener('click', () => {
    getCharacter(searchInput.value.split(":")[0])

})

async function getCharacter(id) {
    try {
        let res = await fetch("https://api.disneyapi.dev/characters/" + id);
        var result = await res.json();

        document.getElementById("dataContainer").innerHTML = ''

        let d = '<div class="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"><div class="w-full md:w-2/5 h-auto"><img class="object-center object-cover w-full h-full" src="' + result.imageUrl + '" alt="photo" onerror="this.src=\'./img/NoImageFound.png\';"></div><div class="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2"><p class="text-xl text-gray-700 font-bold">' + result.name + '</p><p class="text-base text-blue-500 font-bold">Appearances</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-film"></i>Films : </span>' + result.films.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-video"></i>Short Films : </span>' + result.shortFilms.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-tv"></i>Tv Shows : </span>' + result.tvShows.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-gamepad"></i>Video Games : </span>' + result.videoGames.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-handshake-angle"></i>Allies : </span>' + result.allies.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-solid fa-skull-crossbones"></i>Enemies : </span>' + result.enemies.join(", ") + '</p><p class="text-base leading-relaxed text-gray-500 font-normal"><span class="font-bold text-blue-900"><i class="mr-2 fa-brands fa-fort-awesome"></i>Park Attractions : </span>' + result.parkAttractions.join(", ") + '</p></div></div>'
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
        let res = await fetch("https://raw.githubusercontent.com/prmane03/Disney-Characters/main/DisneyCharactersJson.json");
        var result = await res.json();
        //                 alldata=result.data
        //                 for(let i=2;i<=result.totalPages;i++){
        //                     let res = await fetch("https://api.disneyapi.dev/characters?page="+i);
        //                     var temp = await res.json();
        //                     alldata = alldata.concat(temp.data)
        //                 }

        // Setting loader


        data = result.filter(
            (result) => { return result.name.toString().toLowerCase().includes(searchInput.value.toString().toLowerCase()) }
        );
        document.getElementById("chars").innerHTML = ''

        data.forEach((dict, idx) => {
            if (idx < 7) {
                let opt = document.createElement('option');
                opt.value = dict["_id"] + " : " + dict['name'];
                opt.setAttribute("data-value", dict["_id"])
                document.getElementById("chars").appendChild(opt)
            }

        });

    } catch (error) {
        console.log(error);
    }
}