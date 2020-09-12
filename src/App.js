import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  width: ${props => props.header ? '100%' : '50%'};
  padding: 5px 20px;
  border: ${props => props.header ? 'solid black 1px' : 'solid gray 1px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: ${props => props.header ? '700' : '400'};
  font-size: ${props => props.header ? '18px' : '14px'};
`;

const LineItem = styled.p`
  margin: 4px;
`;

const LoadingStyled = styled.div`
  text-align: center;
  animation-name: appearance;
  animation-duration: .8s;
  animation-delay: .5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @keyframes appearance {
    from {opacity: 1;}
    to {opacity: 0;}
  }
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
    const capitalized = name.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
    const info = await axios.get(`http://localhost:4000/people/${capitalized}`);
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
            <LoadingStyled>Loading ...</LoadingStyled>
          }
          {result.name ?
            <Table>
              <Row><Cell header>{result.name}</Cell></Row>
              <Row><Cell>Hair Color</Cell><Cell>{result.hairColor}</Cell></Row>
              <Row><Cell>Height</Cell><Cell>{result.height}</Cell></Row>
              <Row><Cell>Weight</Cell><Cell>{result.weight}</Cell></Row>
              <Row><Cell>Date of Birth</Cell><Cell>{result.dateOfBirth}</Cell></Row>
              <Row>
                <Cell>{result.filmNames.length <= 1 ? "Film" : "Films"}</Cell>
                <Cell>{result.filmNames.length === 0 ? 
                  "None" :
                  result.filmNames.map((film, idx) => (
                  <LineItem key={'film' + idx}>{film}</LineItem>))}
                </Cell>
              </Row>
              <Row>
                <Cell>{result.specieNames.length <= 1 ? "Specie" : "Species"}</Cell>
                <Cell>{result.specieNames.length === 0 ? 
                  "Human" :
                  result.specieNames.map((specie, idx) => (
                  <LineItem key={'specie' + idx}>{specie}</LineItem>))}
                </Cell>
              </Row>
              <Row>
                <Cell>{result.starshipNames.length <= 1 ? "Starship" : "Starships"}</Cell>
                <Cell>{result.starshipNames.length === 0 ? 
                  "None" : 
                  result.starshipNames.map((starship, idx) => (
                    <LineItem key={'starship' + idx}>{starship}</LineItem>))}
                </Cell>
              </Row>
            </Table>
          :
            <div>
              {result.msg &&
                <>
                  <MsgStyled>{result.msg}</MsgStyled>
                  <MsgStyled>Try to use full names, spaces, or dashes.</MsgStyled>
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
