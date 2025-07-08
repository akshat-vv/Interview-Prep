import "./App.css";
import FileExplorer from "./Questions/FileExplorer";
import { v4 as uuid } from "uuid"; // run `npm install uuid`
import InfiniteScroll from "./Questions/InfiniteScroll";
import VirtualizationCustom from "./Questions/VirtualizationCustom";
import { useState, useContext } from "react";
import NestedCheckbox from "./Questions/NestedCheckbox";
import AutoComplete from "./Questions/AutoComplete";
import Chessboard from "./Questions/Chessboard";
import JiraBoard from "./Questions/JiraBoard";
import UseMemo from "./Questions/UseMemo";
import UseCallback from "./Questions/UseCallback";
import ContextExample from "./Questions/Context/ContextExample";
import ThemeContext from "./Questions/Context/themeContext";
import ContextProvider from "./Questions/Context/ContextProvider";
import ErrorBoundary from "./Questions/ErrorBoundary/ErrorBoundary";
import ErrorComponent from "./Questions/ErrorBoundary/ErrorComponent";
import Tabs from "./Questions/Tabs";
import AccordionComponent from "./Questions/AccordionComponent";
import ReducerExample from "./Questions/ReducerExample";
import store from "./Questions/ReduxExample/store";
import { Provider } from "react-redux";
import ReduxComp from "./Questions/ReduxExample/ReduxComp";
import TodoApp from "./Questions/ToDoApp";
import FileExplorerWrapper from "./Questions/FileExplorerWrapper";
import Hoc from "./Questions/HOC/Hoc";
import JiraBoardArray from "./Questions/JiraBoardArray";
import ThemeSwitcher from "./Questions/CustomHooks/useCycle/ThemeSwitcher";
import FetchExample from "./Questions/CustomHooks/useFetch/FetchExample";
import Counter from "./Questions/CustomHooks/useDocumentTitle/Counter";
import MyModal from "./Questions/ReusableModal/MyModal";
import ModalExample from "./Questions/ReusableModal/ModalExample";
import Otp from "./Questions/Otp";
import Stepper from "./Questions/Stepper/Stepper";
import IntersectionObserverExample from "./Questions/IntersectionObserver";
import TrafficSignal from "./Questions/TrafficSignal";
import ProgressBar from "./Questions/ProgressBar";
import ConcurrentProgressBars from "./Questions/ConcurrentProgressBar";
import ProgressBarRunner from "./Questions/ProgressBar/ProgressBarRunner";
import CustomDropdown from "./Questions/CustomDropdown/CustomDropdown";
import CustomDropdownExample from "./Questions/CustomDropdown/CustomDropdownExample";
import URLShortener from "./Questions/ShortenURL";
import TicTacToe from "./Questions/TickTacToe/TicTacToe";
import NestedComment from "./Questions/NestedComments/NestedComment";
import Pagination from "./Questions/Pagination/PaginationExample";
import PaginationExample from "./Questions/Pagination/PaginationExample";
import AbortController from "./Questions/AbortController";
import AbortControllerExample from "./Questions/AbortController";
import Carousel from "./Questions/ImageCarouse";
import ToastSimple from "./Questions/ToastMessage/ToastSimple";
import ToastSimpleWithQueue from "./Questions/ToastMessage/ToastSimpleWithQueue";
import Stopwatch from "./Questions/Stopwatch/Stopwatch";
import Stopwatch2 from "./Questions/Stopwatch/Stopwatch2";

function App() {
  const initialTree = [
    {
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
            { id: uuid(), name: "App.js", isFolder: false },
          ],
        },
        { id: uuid(), name: "package.json", isFolder: false },
      ],
    },
  ];

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
            checked: false,
          },
          {
            id: "4",
            name: "File A2",
            isFolder: false,
            checked: false,
          },
        ],
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
            checked: false,
          },
        ],
      },
    ],
  };

  const tabs = [
    {
      title: "Home",
      content: "Welcome to the home tab!",
    },
    {
      title: "Profile",
      content: "This is your profile section.",
    },
    {
      title: "Settings",
      content: "Here you can change your settings.",
    },
  ];

  const items = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces.",
    },
    {
      title: "Why use React?",
      content:
        "React allows for fast, interactive UIs with reusable components.",
    },
    {
      title: "How do you use React?",
      content:
        "You use React by creating components and managing state and props.",
    },
  ];

  const initialData = [
    {
      id: "good",
      title: "Good",
      children: [
        { id: "c1", label: "hello" },
        { id: "c2", label: "akshat" },
        { id: "c3", label: "vijayvergiya" },
      ],
    },
    {
      id: "bad",
      title: "Bad",
      children: [
        { id: "c4", label: "bye" },
        { id: "c5", label: "naman" },
        { id: "c6", label: "sharma" },
      ],
    },
    {
      id: "worst",
      title: "Worst",
      children: [
        { id: "c7", label: "juley" },
        { id: "c8", label: "pp" },
        { id: "c9", label: "rawat" },
      ],
    },
  ];

  const [boardData, setBoardData] = useState(initialData);

  const [tree, setTree] = useState(initialTree);

  const [toggleModal, setModal] = useState(false);

  const stepper = [
    {
      label: "Step 1",
      content: "Step 1 Content",
    },
    {
      label: "Step 2",
      content: "Step 2 Content",
    },
    {
      label: "Step 3",
      content: "Step 3 Content",
    },
    {
      label: "Step 4",
      content: "Step 4 Content",
    },
  ];

  return (
    <div className="">
      {/* <VirtualizationCustom items={[...Array(10000).keys()]} itemHeight={30} height={500}/> */}
      {/* <InfiniteScroll /> */}
      {/* <FileExplorer node={tree} updateTree={setTree} fullTree={tree} /> */}
      {/* <FileExplorerWrapper fullTree={tree} updateTree={setTree}/> */}
      {/* <NestedCheckbox/> */}
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
      {/* <ExampleHoc/> */}
      {/* <JiraBoardArray data={boardData} setBoardData={setBoardData} /> */}
      {/* <ThemeSwitcher/> */}
      {/* <FetchExample/> */}
      {/* <Counter/> */}
      {/* <ModalExample/> */}
      {/* <Otp number={4} /> */}
      {/* <Stepper steps={stepper}/> */}
      {/* <IntersectionObserverExample/> */}
      {/* <Stopwatch/> */}
      {/* <TrafficSignal/> */}
      {/* <ProgressBarRunner/> */}
      {/* <ToastMessageExample/> */}
      {/* <ToastQueueExample/> */}
      {/* <CustomDropdownExample/> */}
      {/* <URLShortener/> */}
      {/* <TicTacToe/> */}
      {/* <NestedComment/> */}
      {/* <PaginationExample/> */}
      {/* <AbortControllerExample/> */}
      {/* <Carousel/> */}
      {/* <ToastSimple/> */}
      {/* <Hoc/> */}
      {/* <ToastSimpleWithQueue/> */}
      {/* <Stopwatch/> */}
      <Stopwatch2/>
    </div>
  );
}

export default App;
