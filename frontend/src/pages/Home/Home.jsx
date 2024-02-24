import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import CarouselTrend from "../../components/Carousel_Trend/Carousel_Trend";
import CarouselShort from "../../components/Carousel_Short/Carousel_Short";
import CategoryCarousel from "../../components/Carousel_Category/Carousel_Category";
import authContext from "../../context/AuthContext";

function Home() {
  const [categories, setCategories] = useState([]);
  const auth = useContext(authContext);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const categoriesData = await response.json();
          setCategories(categoriesData);
        } else {
          console.error("Erreur lors de la récupération des catégories.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="container_Home">
      <Header />
      <div
        className={`container_Body_Home ${
          auth?.user ? "connectedHome" : "notConnectedHome"
        }`}
      >
        <h1 className="title_Top">TOP VIEWS THIS WEEK</h1>
        <div className="container_Carousel">
          <CarouselTrend />
        </div>
        <h1 className="title_Short">SHORTS</h1>
        <div className="container_Short">
          <CarouselShort />
        </div>
        {categories.map((category) => (
          <div key={category.id} className="categoryContainer">
            <h1 className={`title_Category_${category.name.toUpperCase()}`}>
              CATEGORY {category.name.toUpperCase()}
            </h1>
            <div>
              <CategoryCarousel categoryId={category.category_id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
