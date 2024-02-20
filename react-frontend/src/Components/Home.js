import React, { useEffect, useState } from "react";

const Home = () => {
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    fetch('https://codeforces.com/api/user.info?handles=Tspectre')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setInfos(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {infos && 
      console.log(infos.result.country)
      }
    </div>
  );
}

export default Home;
