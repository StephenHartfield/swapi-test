
const express = require('express');
const router = express.Router();
const axios = require('axios');

const people = [];

router.get('/:name', async (req, res) => {
  let name = req.params.name.split('%20').join(' ');
  let foundPerson = {}; 
  if (people.length > 0) {
    foundPerson = people.find(person => person.name === name);
  } else {
    async function addPage(currPage) {
      try {
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
  if (foundPerson.name) {
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
      
      const filmNames = films.length>0 ? films.map(film => film.title) : films;
      const specieNames = species.length>0 ? species.map(specie => specie.name) : species;
      const starshipNames = starships.length>0 ? starships.map(starship => starship.name) : starships;

    // My thought here is not to return everything, but only the pertinent information.
    res.status(200).json({
      name: foundPerson.name,
      height: foundPerson.height,
      weight: foundPerson.mass,
      hairColor: foundPerson.hair_color,
      dateOfBirth: foundPerson.birth_year,
      filmNames,
      specieNames,
      starshipNames
    });
  } else {
    res.status(200).json({ msg: 'Not Found' });
  }
})

module.exports = router;