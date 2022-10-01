import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Board from "./components/Board";

interface Item {
  id: string;
  name: string;
  status: string;
}

const items: { [key: string]: Array<Item> } = {
  backlog: [
    {
      id: "3",
      name: "lunch",
      status: "backlog",
    },
    {
      id: "4",
      name: "dinner",
      status: "backlog",
    },
  ],
  progress: [
    {
      id: "1",
      name: "watch true sight",
      status: "progress",
    },
  ],
  done: [
    {
      id: "2",
      name: "laundry",
      status: "done",
    },
  ],
};

function App() {
  const [todos, updateTodos] = useState(items);
  const [list, updateList] = useState(["backlog", "progress", "done"]);

  function onDragEndHandler(result: DropResult): void {
    if (!result.destination) return;

    const copiedTodos = { ...todos };

    const sourceList = copiedTodos[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );
    copiedTodos[result.source.droppableId];

    const destinationList = copiedTodos[result.destination.droppableId];
    copiedTodos[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement as Item,
    );

    // const newArray = Array.from(todos);
    // const [reorderedItem] = newArray.splice(result.source.index, 1);
    // newArray.splice(result.destination.index, 0, reorderedItem);

    updateTodos(copiedTodos);
  }

  function removeFromList(todos: Array<Item>, index: number) {
    const result = Array.from(todos);
    const [removed] = result.splice(index, 1);

    return [removed, result];
  }

  function addToList(todos: Array<Item>, index: number, element: Item) {
    const result = Array.from(todos);
    result.splice(index, 0, element);

    return result;
  }

  return (
    <div className="flex justify-center min-h-screen mt-24 font-sans">
      <DragDropContext onDragEnd={onDragEndHandler}>
        {list.map((el) => (
          <Board
            onDragEndHandler={onDragEndHandler}
            todos={todos[el]}
            type={el}
            key={el}
          />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
