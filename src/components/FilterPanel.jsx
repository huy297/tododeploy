import "../App.css";
import CategoryList from "./categoryList";
import "./filterPanel.css";
import PropTypes from "prop-types";
import { useMemo } from "react";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "All",
    iconPath: "./inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./check.png",
  },
  {
    id: "delete",
    label: "Delete",
    iconPath: "./delete.png",
  },
];

const FilterPanel = ({ selectedFilterId, setSelectedFilterId, todoList, searchText, setSearchText }) => {
  const countByFilter = useMemo(() => {
    return todoList.reduce(
      (acc, todo) => {
        let newAcc = { ...acc };
        if (todo.isDeleted) {
          newAcc = { ...newAcc, delete: newAcc.delete + 1 };
        }
        if (todo.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (todo.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, delete: 0 }
    );
  }, [todoList]);
  console.log(countByFilter);
  return (
    <div className="filter-panel">
      <input name="search-text" placeholder="Search" className="search-text" value= {searchText}
      onChange={(e)=>
        setSearchText(e.target.value)
      }/>
      <div className="filter-container">
        {FILTER_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className={`filter-item ${
                item.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(item.id)}
            >
              <div className="filter-name">
                <img src={item.iconPath} />
                <p>{item.label}</p>
              </div>
              <p>{countByFilter[item.id]}</p>
            </div>
          );
        })}
      </div>
      <CategoryList />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;
