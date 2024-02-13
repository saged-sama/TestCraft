import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
      fetch('https://codeforces.com/api/user.status?handle=ignite312&result=OK')
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
    }, [])
    return (
        <div>
          <h1>Hey</h1>
        </div>
    );
}

export default Home;