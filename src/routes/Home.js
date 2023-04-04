import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { addDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { query } from "firebase/database";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet !== "") {
      await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
            // 작성자와 로그인 id를 비교하여 참/거짓 값부여
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
