import React from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue, useSetRecoilState,
} from 'recoil';
import {useState} from "react";

const todoListState = atom({
    key: 'todoListState',
    default: [],
});

const idNumState = atom({
    key: 'idNumState',
    default: 0,
});

const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

const filteredTodoListState = selector({
    key: 'filteredTodoListState',
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
});

const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({get}) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
        };
    },
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
                text: inputValue,
                isComplete: false,
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
            <input type="text" value={inputValue} onChange={onChange} />
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
            <input type="text" value={item.text} onChange={editItemText} />
            <input
                type="checkbox"
                checked={item.isComplete}
                onChange={toggleItemCompletion}
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
            <select value={filter} onChange={updateFilter}>
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
            <TodoItemCreator/>

            {filteredTodoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </div>
    );
}

export default TodoList;