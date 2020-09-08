import React, { useEffect, useState } from 'react';
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Output = styled.div`
  margin-top: 20px;
`;

function App() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');

  const searchText = (e) => {
    e.persist();
    setName(e.target.value);
  }
  const executeSearch = async (e) => {
    e.preventDefault();
    setResult({name});
    // const info = await axios.get(URL, name);
    // setResult(info);
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
          <div>{result ? "Name: " + result.name : ''}</div>
        </Output>
      </Page>
    </ContainerStyled>
  );
}

export default App;
