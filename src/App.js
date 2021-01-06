// @flow
import "./App.css";
import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import AsyncUserInfo from "./recoil-component/user-data-query-component/async-data-query-component";
import CharacterCounter from "./recoil-component/character-couter-component/character-counter";
import ConcurrentRequestUserInfo from "./recoil-component/user-data-query-component/concurrent-request-query-component";
import DataFlowUserInfo from "./recoil-component/user-data-query-component/data-flow-graph-component";
import logo from "./logo.svg";
import PrefetchRequestUserInfo from "./recoil-component/user-data-query-component/pre-fetching-query-component";
import QueryRefreshUserInfo from "./recoil-component/user-data-query-component/query-refresh-component";
import React, { Suspense } from "react";
import ShoppingCart from "./recoil-component/shopping-cart-demo/shopping-cart-demo-component";
import TodoList from "./recoil-component/todo-list-component/todo-list-component";

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
  // return (
  //   <RecoilRoot>
  //     <CharacterCounter />
  //     <TodoList />
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <ul>
  //         <li key={'AsyncUserInfo'}>
  //           <AsyncUserInfo userID={1} />
  //         </li>
  //         {/*<li key="DataFlowUserInfo">*/}
  //         {/*  <DataFlowUserInfo userID={1} />*/}
  //         {/*</li>*/}
  //         {/*<li key="ConcurrentRequestUserInfo">*/}
  //         {/*  <ConcurrentRequestUserInfo userID={1}/>*/}
  //         {/*</li>*/}
  //         {/*<li key="PrefetchRequestUserInfo">*/}
  //         {/*  <PrefetchRequestUserInfo userID={1}/>*/}
  //         {/*</li>*/}
  //         {/*<li key={'QueryRefreshUserInfo'}>*/}
  //         {/*  <QueryRefreshUserInfo />*/}
  //         {/*</li>*/}
  //       </ul>
  //     </Suspense>
  //   </RecoilRoot>);
  return <ShoppingCart />;
}

export default App;
