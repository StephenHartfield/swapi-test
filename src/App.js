import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarWarsTable from './components/StarWarsTable';

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 500px;
`;

const Page = styled.div`
  margin: 50px 100px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Output = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const MsgStyled = styled.div`
    text-align: center;
`;

const Table = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
`;

const Cell = styled.div`
    width: 50%;
    padding: 20px;
    border: solid gray 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function App() {
    const [name, setName] = useState('');
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const searchText = (e) => {
        e.persist();
        setName(e.target.value);
    }
    const executeSearch = async (e) => {
        e.preventDefault();
        setResult({});
        setIsLoading(true);
        const info = await axios.get(`http://localhost:4000/people/${name}`);
        // const toArray = Object.keys(info.data).map(key => ({ key, value: info.data[key] }));
        // console.log(toArray);
        // toArray.length = 5;
        setResult(info.data);
        setIsLoading(false);
    }

  return (
    <ContainerStyled>
      <Page>
        <h1>Search the Star Wars Archive!</h1>
        <form onSubmit={executeSearch}>
          <input type='text' placeholder='Luke Skywalker' onChange={searchText}></input>
          <button type='submit'>Search</button>
        </form>
        <Output>
            {isLoading &&
                <div>Loading ...</div>
            }
                  {result.name ?
                    //   <StarWarsTable result={result} />
                      <Table>
                          <Row><Cell>Name</Cell><Cell>{result.name}</Cell></Row>
                          <Row><Cell>Hair Color</Cell><Cell>{result.hairColor}</Cell></Row>
                          <Row><Cell>Height</Cell><Cell>{result.height}</Cell></Row>
                          <Row><Cell>Weight</Cell><Cell>{result.weight}</Cell></Row>
                          <Row><Cell>Date of Birth</Cell><Cell>{result.dateOfBirth}</Cell></Row>
                          <Row>
                              <Cell>{result.films.length === 1 ? "Film" : "Films"}</Cell>
                              <Cell>{result.films.map((film, idx) => (
                                <p key={'film' + idx}>{film.title}</p>))}
                              </Cell>
                          </Row>
                          <Row>
                              <Cell>{result.species.length === 1 ? "Specie" : "Species"}</Cell>
                              <Cell>{result.species.map((specie, idx) => (
                                  <div key={'specie' + idx}>{specie.name}</div>))}
                              </Cell>
                          </Row>
                          <Row>
                              <Cell>{result.starships.length === 1 ? "Starship" : "Starships"}</Cell>
                              <Cell>{result.starships.map((starship, idx) => (
                                <p key={'starship' + idx}>{starship.name}</p>))}
                              </Cell>
                          </Row>
                          
                      </Table>
                      :
                      <div>
                      {
                          result.msg &&
                                  <>
                                  <MsgStyled>{result.msg}</MsgStyled>
                                  <p>Remember to use capital letters, spaces, and full names.</p>
                                  </>
                                }
                                </div>
            }
        </Output>
      </Page>
    </ContainerStyled>
  );
}

export default App;
