import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Todo {
  id: string;
  name: string;
  status: string;
}

interface Props {
  todos: Todo[];
  onDragEndHandler: (result: DropResult) => void;
  type: string;
}

function Board({ todos, onDragEndHandler, type }: Props): JSX.Element {
  return (
    <div className="mx-6 px-3 text-center">
      <h1 className="text-xl font-bold mb-3">{type}</h1>

      <Droppable droppableId={type}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list-none"
          >
            {todos.map(function ({ id, name, status }, i) {
              return (
                <Draggable key={id} draggableId={id} index={i}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border-solid border-2 border-sky-500 rounded-md mb-3 py-3 px-1.5 min-w-48"
                    >
                      <p>
                        {name}
                      </p>
                      <p>
                        {status}
                      </p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
