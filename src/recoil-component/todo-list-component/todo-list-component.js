// @flow
import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import React, {useState} from 'react';

const todoListState = atom({
  default: [],
  key: 'todoListState',
});

const idNumState = atom({
  default: 0,
  key: 'idNumState',
});

const todoListFilterState = atom({
  default: 'Show All',
  key: 'todoListFilterState',
});

const filteredTodoListState = selector({
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Completed':
        return list.filter((item) => item.isComplete);
      case 'Uncompleted':
        return list.filter((item) => !item.isComplete);
      case 'All':
        return list;
      case 'None':
        return [];
      default:
        return list;
    }
  },
  key: 'filteredTodoListState',
});

const todoListStatsState = selector({
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      percentCompleted,
      totalCompletedNum,
      totalNum,
      totalUncompletedNum,
    };
  },
  key: 'todoListStatsState',
});

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const [idNum, setIdNumState] = useRecoilState(idNumState);
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: idNum,
        isComplete: false,
        text: inputValue,
      },
    ]);
    setIdNumState((oldIdNum) => oldIdNum + 1);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input onChange={onChange} type="text" value={inputValue} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [idNumSt, setIdNumSt] = useRecoilState(idNumState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input onChange={editItemText} type="text" value={item.text} />
      <input
        checked={item.isComplete}
        onChange={toggleItemCompletion}
        type="checkbox"
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select onChange={updateFilter} value={filter}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

const TodoList = () => {
  const filteredTodoList = useRecoilValue(filteredTodoListState);

  return (
    <div>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {filteredTodoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </div>
  );
};

export default TodoList;
