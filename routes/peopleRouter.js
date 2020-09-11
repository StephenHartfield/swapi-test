
const express = require('express');
const router = express.Router();
const axios = require('axios');

const people = [];

router.get('/:name', async (req, res) => {
    console.log(req.params.name);
    let name = req.params.name.split('%20').join(' ');
    let foundPerson = '';
    if (people.length > 0) {
        foundPerson = people.find(person => person.name === name);
    } else {
        async function addPage(currPage) {
            try {
                console.log(currPage);
                const page = await axios.get(currPage);
                page.data.results.forEach(person => people.push(person));
                if (page.data.next) {
                    return await addPage(page.data.next);
                }
            } catch (e) {
                console.log('err');
            }
        }
        await addPage('https://swapi.dev/api/people/?page=1');
        foundPerson = people.find(person => person.name === name);
    }
    if (foundPerson) {
        const films = [];
        const species = [];
        const starships = [];

        async function lookUp(amt, arr, pushArr) {
            if (amt < arr.length) {
                const foundObj = await axios.get(arr[amt]);
                amt++;
                pushArr.push(foundObj.data);
                return lookUp(amt, arr, pushArr);
            } 
        }
        await lookUp(0, foundPerson.films, films);
        await lookUp(0, foundPerson.species, species);
        await lookUp(0, foundPerson.starships, starships);

        res.status(200).json({
            name: foundPerson.name,
            height: foundPerson.height,
            weight: foundPerson.mass,
            hairColor: foundPerson.hair_color,
            dateOfBirth: foundPerson.birth_year,
            films,
            species,
            starships
        });
    } else {
        res.status(200).json({msg: 'Not Found'});
    }
})

module.exports = router;