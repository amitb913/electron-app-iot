import React, { useState, useEffect } from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';

import '../styles/news.css';

const News = (props) => {

  const [articles, setArticles] = useState([])

  useEffect(()=> {
    fetch(`http://newsapi.org/v2/top-headlines?country=us&apiKey=6f0f99ae75f04a5c977615f0f02012f7`)
    .then((response) => response.json())
    .then((data) => {
      console.log(JSON.stringify(data));
      setArticles(data.articles);
    });

  })

return(
    <div>
      <FirebaseDatabaseNode path="navi/" limitToFirst={3}>
        {(d) => {
          return (
            <div>
              {d.value == null
                ? null
                : d.value.naviPage == 'Home'
                ? props.history.goBack()
                : null}
            </div>
          );
        }}
      </FirebaseDatabaseNode>

        {
          articles.length == 0 ? <p>aint nun here b</p> : articles.map((item) => (
            <div style={{backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 15,}}>
              <p>Source: {item.source.name}</p>
              <p>Author: {item.author}</p>
              <p>Title: {item.title}</p>
              <p>Description: {item.description}</p>
              <img src={item.urlToImage} height="10%" width="10%"/>
            </div>
          ))
        }


    </div>
    )
};

export default News;
