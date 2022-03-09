//menu
function toggleMenu(el){
  var menu = document.getElementById(el.dataset.collapse)
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden')
  } else {
    menu.classList.add('hidden')
  }
}



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
        let d = `<div class="max-w-sm rounded overflow-hidden shadow-lg bg-violet-100">
        <img class="w-full" src="${data['gifUrl']}" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 capitalize">${data['name']}</div>
          <p class="text-gray-700 text-base">
          Target : ${data['target']}
          </p>
          <p class="text-gray-700 text-base">
          Body Part : ${data['bodyPart']}
          </p>
          <p class="text-gray-700 text-base">
          Equipment : ${data['equipment']}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#GetRandom</span>
        </div>
      </div>`
        
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



// Tabs
function switchTab(evt, tcid) {
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach((tc) => {
      tc.classList.add("hidden");
    });
    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach((tl) => {
      tl.classList.remove("activeTabLink");
    });
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tcid).classList.remove("hidden");
    evt.classList.add("activeTabLink");
  }
