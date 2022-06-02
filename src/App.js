import React, { useEffect, useState } from "react";
import Article from "./components/Article";

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState("webdev");

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + "/top/.json?count=20").then(
      (res) => {
        if (res.status !== 200) {
          console.log("status is not goood");
          return;
        }
        res.json().then((data) => {
          if (data != null) {
            setArticles(data.data.children);
          }
        });
      }
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          className="input"
          value={subreddit}
          onChange={(event) => setSubreddit(event.target.value)}
        />
      </header>
      <div className="articles">
        {articles != null
          ? articles.map((article, index) => (
              <Article key={index} article={article.data} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default App;
