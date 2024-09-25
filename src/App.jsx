import "./App.css";
import FilterPanel from "./components/FilterPanel";
import Sidebar from "./components/Sidebar";
import TodoItem from "./components/TodoItem";
import { useState, useMemo, useRef, useContext } from "react";
import { AppContext } from "./context/AppProvider"; 

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Task 1",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Task 2",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Task 3",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const {selectedCategoryId} = useContext(AppContext);

  const handleTodoNameChange = (todoId, newName) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, name: newName };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleCompleteCheckBox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(!(todoId === activeTodoItemId && showSidebar));
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef();
  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }
      
      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false
      }

      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "delete":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add New Task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isImportant: false,
                  isCompleted: false,
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        ></input>
        <div>
          {filterTodos.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                isDeleted={todo.isDeleted}
                handleCompleteCheckBox={handleCompleteCheckBox}
                handleTodoItemClick={handleTodoItemClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            handleTodoItemChange={handleTodoItemChange}
            key={activeTodoItem.id}
            todoItem={activeTodoItem}
            handleTodoNameChange={handleTodoNameChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
