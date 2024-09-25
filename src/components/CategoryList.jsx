import "./categoryList.css";
import { CATEGORY_ITEMS } from "../constant";
import { AppContext } from "../context/AppProvider";
import { useContext } from "react";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);
  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className= {`category-item ${selectedCategoryId === item.id ? "selected" : ""}`}
              onClick={() => setSelectedCategoryId(item.id)}
            >
              <p className="category-name">{item.label}</p>
              <p>2</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
