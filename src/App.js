import logo from './logo.svg';
import './App.css';
import React, {Suspense} from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import CharacterCounter from "./recoil-component/character-couter-component/character-counter";
import TodoList from "./recoil-component/todo-list-component/todo-list-component";
import AsyncUserInfo from "./recoil-component/asynch-data-query-component/async-data-query-component";
import DataFlowUserInfo from "./recoil-component/asynch-data-query-component/data-flow-graph-component";
import ConcurrentRequestUserInfo
    from "./recoil-component/asynch-data-query-component/concurrent-request-query-component";
import PrefetchRequestUserInfo from "./recoil-component/asynch-data-query-component/pre-fetching-query-component";

function App() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
    return (
        <RecoilRoot>
            <CharacterCounter/>
            <TodoList/>
            <Suspense fallback={<div>Loading...</div>}>
                <ul>
                    <li key="DataFlowUserInfo">
                        <DataFlowUserInfo userID={1}/>
                    </li>
                    {/*<li key="ConcurrentRequestUserInfo">*/}
                    {/*    <ConcurrentRequestUserInfo userID={1}/>*/}
                    {/*</li>*/}
                    {/*<li key="PrefetchRequestUserInfo">*/}
                    {/*    <PrefetchRequestUserInfo userID={1}/>*/}
                    {/*</li>*/}
                </ul>
            </Suspense>
        </RecoilRoot>
    )
}

export default App;
