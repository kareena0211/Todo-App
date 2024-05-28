import { useReducer, useState } from "react";

const initialState = {
  items: ["buy groceries", "complete project", "workout"],
  complete: [false, false, false], // initially no item is completed
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "add":
      if (action.input !== "") {
        return {
          ...state,
          items: [...state.items, action.input],
          complete: [...state.complete, false],
        };
      }
      return state;
    case "delete":
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.id),
        complete: state.complete.filter((_, index) => index !== action.id),
      };
    case "complete":
      const newComplete = [...state.complete];
      newComplete[action.id] = !newComplete[action.id];
      return {
        ...state,
        complete: newComplete,
      };
    default:
      return state;
  }
};

export default function ToDoAppReducer() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const submitInput = (e) => {
    setInput(e.target.value);
  };

  const handleAddInput = () => {
    dispatch({
      type: "add",
      input: input,
    });
    setInput(""); // Clear input after adding
  };

  const handleDelete = (id) => {
    dispatch({
      type: "delete",
      id: id,
    });
  };

  const handleComplete = (id) => {
    dispatch({
      type: "complete",
      id: id,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-200 shadow-lg rounded-lg wrapper">
      <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center">
        ToDo App
      </h1>
      <div className="flex mb-4">
        <input
          onChange={submitInput}
          value={input}
          type="text"
          placeholder="Enter todo here"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddInput}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>
      <ul className="space-y-3">
        {state.items.map((value, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-3 border rounded-md shadow-sm ${
              state.complete[index] ? "bg-green-100" : "bg-white"
            }`}
          >
            <span
              style={{
                textDecoration: state.complete[index] ? "line-through" : "",
              }}
            >
              {value}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleComplete(index)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300"
              >
                ✅
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
