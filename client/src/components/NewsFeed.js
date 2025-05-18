import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [category, setCategory] = useState('technology');
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/news/${category}`);
      setArticles(res.data.articles);
    } catch (err) {
      console.error('Haberler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div>
      <h2>Haberler ({category})</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="technology">Teknoloji</option>
        <option value="sports">Spor</option>
        <option value="business">Ekonomi</option>
        <option value="health">Sağlık</option>
        <option value="entertainment">Eğlence</option>
      </select>

      <ul className= "news-grid">
        {articles.map((article, i) => (
          <li key={i}>
            <img src={article.urlToImage} alt="Haber görseli" className="news-image" />
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
