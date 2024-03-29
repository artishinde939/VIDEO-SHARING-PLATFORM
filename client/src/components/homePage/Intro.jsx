import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import "./Intro.css";
import { getAllVideos } from "../../services/nodeApi";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Loader from "../Loader";

const Content = () => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("View all");
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const { handleSetAllVideos } = useContext(VideoContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const response = await getAllVideos();
        setData(response);
        handleSetAllVideos(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVideos();
  }, []);

  const handleViewButton = () => {
    if (banner) {
      setBanner("");
    } else {
      setBanner("class");
    }
    if (name === "View all") {
      setName("View less");
    } else {
      setName("View all");
    }
  };

  return (
    <>
      <div className={`banner${banner}`} id="height">
        {!toggle ? (
          <img
            src="https://s1.dmcdn.net/v/QQG701T4FrD60Fc9W/x1080"
            onClick={() => setToggle(true)}
            className="img1"
            alt=""
          />
        ) : (
          <video
            src={data.slice(0, 1).map((data, key) => {
              return data.video;
            })}
            onClick={() => setToggle(false)}
            controls
            autoPlay
          />
        )}

        <div className="details">
          <h1>
            {data.slice(0, 1).map((data, key) => {
              return data.title;
            })}
          </h1>
          <div className="span">
            <span>21 May 2023</span>
            <span>Last 1 hour</span>
            <span>186k Views</span>
          </div>
        </div>
      </div>

      {!isLoading ? (
        <div className="video-content">
          <div className="btns">
            <div className="recent">Recent</div>
            <div className="view-all" onClick={handleViewButton}>
              {name}
            </div>
          </div>
          <div className="videos">
            <ul className=" ml-8 mr-8 mb-8  gap-4 block sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4">
              {!banner
                ? data.slice(0, 4).map((data) => {
                    return <Card key={data._id} data={data} />;
                  })
                : data.map((data) => {
                    return <Card key={data._id} data={data} />;
                  })}
            </ul>
          </div>
        </div>
      ) : <Loader />}
    </>
  );
};
export default Content;
