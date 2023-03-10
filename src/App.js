import React from 'react';
import { Collection } from './Collection';
import './index.scss';

//Категорії
const cats = [
  { "name": "Усі" },
  { "name": "Авто" },
  { "name": "Природа" },
  { "name": "Мистецтво" },
  { "name": "Спорт" }
];


function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState(""); //Стейт для пошуку
  const [collections, setCollections] = React.useState([]); //Дані з JSON
  React.useEffect(() => {
   const category = categoryId ? `category=${categoryId}` : '';
    
//`https://639d0fe942e3ad6927408652.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
//Отримуємо JSON з Mock API
    fetch(`https://63be8495e348cb076210bb5f.mockapi.io/photo?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then(json => {
      setCollections(json);
    });
    
  }, [categoryId, page]);


  return (
    
    <div className="App">
       <a className="choosePage" href='https://vladpryima.github.io/home/'>&#129080; До вибору проєктів</a>
      <h1>Коллекція артів з <span className="spanDribble">Dribble</span></h1>
      <div className="top">
        <ul className="tags">
          {/*Створюємо категорії*/}
          {
            cats.map((obj, i) => (
            <li onClick={() => setCategoryId(i)} className={categoryId === i ? "active": ""} key={obj.name}>{obj.name}</li>))
          }
        </ul>
        {/*Пошук*/}
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Пошук за назвою" />
      </div>

      <div className="content">
        {/*Фільтруємо елементи на сторінці - повертаємо компонент Collection, фільтруючи данні по searchValue*/}
        {collections.filter(obj => {
          return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        })
        .map( (obj, index) => (
        <Collection key={index} name={obj.name} images={obj.photos}/>
      ))}
      </div>
      <ul className="pagination">
        {
          
          [...Array(5)].map((_,i) => (
             <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
             ))
        }
      </ul>
    </div>
  );
}

export default App;
