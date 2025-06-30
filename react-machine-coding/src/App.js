import './App.css';
import FileExplorer from './Questions/FileExplorer';
import { v4 as uuid } from "uuid"; // run `npm install uuid`
import InfiniteScroll from './Questions/InfiniteScroll';
import VirtualizationCustom from './Questions/VirtualizationCustom';
import { useState, useContext } from 'react';
import NestedCheckbox from './Questions/NestedCheckbox';
import AutoComplete from './Questions/AutoComplete';
import Chessboard from './Questions/Chessboard';
import JiraBoard from './Questions/JiraBoard';
import Moda from './Questions/Moda';
import UseMemo from './Questions/UseMemo';
import UseCallback from './Questions/UseCallback';
import ContextExample from './Questions/Context/ContextExample';
import ThemeContext from './Questions/Context/themeContext';
import ContextProvider from './Questions/Context/ContextProvider';
import ErrorBoundary from './Questions/ErrorBoundary/ErrorBoundary';
import ErrorComponent from './Questions/ErrorBoundary/ErrorComponent';
import Tabs from './Questions/Tabs';
import AccordionComponent from './Questions/AccordionComponent';
import ReducerExample from './Questions/ReducerExample';
import store from './Questions/ReduxExample/store';
import {Provider} from 'react-redux'
import ReduxComp from './Questions/ReduxExample/ReduxComp';
import TodoApp from './Questions/ToDoApp';
import FileExplorerWrapper from './Questions/FileExplorerWrapper';


function App() {

  const initialTree = [{
    id: uuid(),
    name: "root",
    isFolder: true,
    children: [
      {
        id: uuid(),
        name: "src",
        isFolder: true,
        children: [
          { id: uuid(), name: "index.js", isFolder: false },
          { id: uuid(), name: "App.js", isFolder: false }
        ]
      },
      { id: uuid(), name: "package.json", isFolder: false }
    ]
  }];

  const nestedCheckbox = {
  id: "1",
  name: "root",
  isFolder: true,
  checked: false,
  children: [
    {
      id: "2",
      name: "Folder A",
      isFolder: true,
      checked: false,
      children: [
        {
          id: "3",
          name: "File A1",
          isFolder: false,
          checked: false
        },
        {
          id: "4",
          name: "File A2",
          isFolder: false,
          checked: false
        }
      ]
    },
    {
      id: "5",
      name: "Folder B",
      isFolder: true,
      checked: false,
      children: [
        {
          id: "6",
          name: "File B1",
          isFolder: false,
          checked: false
        }
      ]
    }
  ]
};

const tabs = [
  {
    title: 'Home',
    content: 'Welcome to the home tab!',
  },
  {
    title: 'Profile',
    content: 'This is your profile section.',
  },
  {
    title: 'Settings',
    content: 'Here you can change your settings.',
  },
];

const items = [
  {
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.',
  },
  {
    title: 'Why use React?',
    content: 'React allows for fast, interactive UIs with reusable components.',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components and managing state and props.',
  },
];




  const [tree, setTree] = useState(initialTree);

  return (
    <div className="">
      {/* <VirtualizationCustom items={[...Array(10000).keys()]} itemHeight={30} height={500}/> */}
      {/* <InfiniteScroll/> */}
     {/* <FileExplorer node={tree} updateTree={setTree} fullTree={tree} /> */}
     <FileExplorerWrapper fullTree={tree} updateTree={setTree}/>
     {/* <NestedCheckbox node={nestedCheckbox}/> */}
     {/* <AutoComplete/> */}
     {/* <Chessboard row={8} column={8}/> */}
     {/* <JiraBoard/> */}
     {/* <Moda/> */}
     {/* <UseMemo/> */}
     {/* <UseCallback/> */}
    {/* <ContextProvider>
       <ContextExample/>
    </ContextProvider> */}
    {/* <ErrorBoundary>
      <ErrorComponent/>
    </ErrorBoundary> */}
    {/* <Tabs tabs={tabs}/> */}
    {/* <AccordionComponent items={items}/> */}
    {/* <ReducerExample/> */}
    {/* <ReduxComp/> */}
    {/* <TodoApp/> */}
    </div>
  );
}

export default App;
