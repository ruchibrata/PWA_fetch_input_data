import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  //state to store data from API
  const [data, setData] = useState([]);

  //The useEffect hook can't be async, so declare the async function inside the effect and then call it.
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      const jsonData = await data.json();
      setData(jsonData.hits);
    };
    fetchData();
    // The only variable that useEffect depends on is setData. Hence, we should pass the array [setData] here. Because setData is a setter returned by useState, it won’t be recreated every render, and so the effect will only run once.
  }, [setData]);
  console.log(data);
  return (
    <div className="App">
      <header>
        <h2>The HackerNews API is public, free, and well documented.</h2>
        <h2>
          <a
            href="https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=&sort=byPopularity&type=story"
            style={{ color: "yellow" }}
          >
            Search Hacker News
          </a>
        </h2>
        <h2>
          Below showing articles from hackernews.com on search items "react"
          with corresponding link.
        </h2>
        <h4>
          A special thank to{" "}
          <a
            href="https://www.mariokandut.com/tags/react/"
            style={{ color: "yellow" }}
          >
            Mario Kandut
          </a>
        </h4>
        <h4>
          Also thanks to{" "}
          <a
            href="https://blog.logrocket.com/setting-up-a-pwa-with-service-workers-and-create-react-app/"
            style={{ color: "yellow" }}
          >
            Pam Lu for the blog at Rocket
          </a>
        </h4>
      </header>

      <div className="items">
        {data.map((item, index) => (
          <p key={index}>
            <a href={item.url}>{item.title}</a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
