
function fetchCountry(country_string) {
    //let htmlString = "United States";
    console.log('fetching country')
    fetch('https://api.covid19api.com/live/country/' + country_string + '/status/confirmed/date/2022-01-01T13:13:30Z')
        .then(res => res.json())
        .then(result => {
            //console.log(result)
            //let text1 = document.createTextNode();
            if (result.length > 0){
                getRegions(result)
            } else {alert(`No available data for ${country_string}.`)}

        })
}
function fetchAllCountries() {
    fetch('https://api.covid19api.com/countries')
        .then(res => res.json())
        .then(result => {
            console.log(result[1])
            let list = document.getElementById('country-data-list');
            for (i in result) {
                let option = document.createElement('option');
                option.value = result[i].Slug;
                list.appendChild(option);

            }
            console.log(list)
        })
}

function addCard(card) {

    for (let i in card) {
        //console.log(card[i])
        let province = "";
        console.log(card)
        if (card[i].Province == ""){
            province = card[i].Country
        } else {
            province = card[i].Province
        }
            
        const deaths = (card[i].Deaths).toLocaleString()
        const confirmed = (card[i].Confirmed).toLocaleString()
        //console.log(province, deaths, confirmed)
        const template = document.getElementById("card-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = province;
        template.querySelector('.card-text').innerText = "Total Cases: " + confirmed + "\n Total Deaths: " + deaths;
        document.querySelector('#card-list').appendChild(template);
    }
}
function getRegions(result) {  //purpose of this function is to get the latest object of each region.
    const uniqueProvinceArray = [];
    for (let i = result.length - 1; i > result.length - 100; i--) {
        if (uniqueProvinceArray.indexOf(result[i].Province) === -1) {
            uniqueProvinceArray.push(result[i].Province)
        } else { break; }

    }
    console.log("length: " + uniqueProvinceArray.length)
    console.log(result)
    console.log(uniqueProvinceArray)
    let uniqueItems = uniqueProvinceArray.length
    const latestUniqueRegionArray = [];
    // for (let j = 1; j < uniqueProvinceArray.length; j++) {
    //     latestUniqueRegionArray.push(result[result.length - j])
    // }
    // [nz, cookisland]
    // result.length = 404,  404 -2 - 1 = 401,
    for (let j = result.length - 1; j > result.length - uniqueItems - 1; j--) {
        latestUniqueRegionArray.push(result[j])
    }
//     let uniqueMarker = results.lastItem
// let i = results.length
// while True:
//    if results[i] = uniqueMarker:
//        break

//    targetArray.push(results[i])
//    i--


    console.log(latestUniqueRegionArray)
    addCard(latestUniqueRegionArray)
}

function chooseCountry() {
    countryName = document.countriesForm.countryName.value;
    console.log(countryName)
    clearcontent('card-list')
    fetchCountry(countryName);
}

function clearcontent(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

//window.onload = fetchCountry('Australia');
window.onload = fetchAllCountries();


