import React from 'react'
import NavBar from "./Components/NavBar/NavBar";
import './App.css'
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import urls from './constants/urls';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
    <br/>
      {
        urls.map((genre,index) => 
          <RowPost key={index} title={genre.title} url={genre.url} isLarge={index == 0 ? true:false} />
        )

      }
    </div>
  );
}

export default App;
