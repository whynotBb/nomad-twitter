import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const dbTweets = await getDocs(collection(dbService, "tweets"));
    dbTweets.forEach((document) => {
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
      console.log(tweets);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(tweet);
    if (tweet !== "") {
      await addDoc(collection(dbService, "tweets"), {
        tweet,
        createdAt: Date.now(),
      });
    }

    setTweet("");
  };
  const onChange = (event) => {
    //구조분해할당 - event 로 부터 target 객체 안에 있는 value 가져 와줘
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="What's your mind?"
          value={tweet}
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {/* {tweets.map((tweet) => (
          <div key={}></div>
        ))} */}
      </div>
    </div>
  );
};
export default Home;
