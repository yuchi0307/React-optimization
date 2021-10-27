# React Hooks
React 內建的function。

<h2>side-effect</h2>
在 React 中，只有呈現 UI 是最重要的，其他表面看不到的都算副作用！ hooks 用來處理非 UI 部分的功能。
<br/>
主要作用：
<ul>
<li>Evaluate & render JSX</li>
<li>Manage state & props</li>
<li>React to user's events & inputs</li>
<li>Re-evaluate component upon state & props change</li>
</ul>
副作用：
<ul>
<li>Data Fetching 獲取api資料</il>
<li>Setting up a subscription 事件監聽或訂閱</il>
<li>Changing the DOM 改變DOM</il>
<li>Logging 登入後不會因為重新整理瀏覽器變成登出狀態</il>
</ul>

<h1> Hooks </h1>
<ol>
<li>useState</li>
<li>useEffect</li>
<li>useReducer</li>
<li>useContext</li>
<li>useRef()</li>
</ol>
<h2>useState</h2>
常見: toggle 功能<br/>

```
const [狀態初始值, set狀態] = useState(布林/數字皆可);

//Toggle 實作

import { useState } from 'react';
function App (){

const [showParagraph, setShowParagraph] = useState(false);
const toggleParagraphHandler = () =>{ 
    setShowParagraph((prevShowParagraph) => !prevShowParagraph); 
   };
  return(
    <div>
      <Button onClick={toggleParagraphHandler}>TOGGLE ME</Button>
    </div>
    )
}
```


<h2>useEffect</h2>

```
import { useEffect } from 'react;

useEffect(()=>{},[dependency])
```



</ul>
舉例<br>
1. 配合瀏覽器內建的 localStorage 讓使用者登入後保持登入狀態，不因重新整理而消失<br>
2. 每當使用者輸入帳號、密碼，每敲鍵盤的時候就去判斷是否包含＠、以及密碼長度<br>
<a href='https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html'>轻松学会 React 钩子：以 useEffect() 为例</a>
<h3>useReducer</h3>
<p> Reducer is just a function responsible for managing changes to state. It decides how update state based on what kinds of actions are dispatched to it.</p><br>

```
const [data, dispatch] = useReducer( myReducerFunction, initialState) 
```

會另有 function myReducerFunction(state, action){依據不同action來return new state}
<ul>
  <li>reducer</li>  就是個 function, 接受 state & action, 並回傳一個新的 state<br>
  <li>action</li>   可說是一個obj, 被 dispatch 丟回 reducer function 並改變 state 的物件(子彈)<br>
   <li>dispatch</li> 一個被我們用 useReducer 回傳的 function, 他傳遞 action 物件給 reducer function (手槍)
  <li>useReducer</li> 一個 React 的 hook,用來處理 useState 做不到的較為複雜的狀態管理<br>
</ul>
<br/>
<a href='https://frontend.turing.edu/lessons/module-3/advanced-react-hooks.html'>參考資料 Advanced React - useContext and useReducer hooks</a>
  
<h2>useContext</h2>
省略prop，將資料一次傳遞給多個子層。但不適合用在密切改變狀態的情況！<br/>
一個 React app 中可以有多個 React context。每個 React context 的本體都是一個物件（在這邊把它稱為 context object）。<br/>
其中 context obj 中又會有兩個很重要的屬性：<br/>
<ul>
  <li>Provider（提供者）</li>
  <li>Consumer（消費者）</li>
</ul>  
<br/>

```
import React from 'react';
const CartContext = React.createContext({ 
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) =>{}
})

export default CartContext;

```


```
//在需要使用該資料值的另一個component中:
import { useContext } from 'react';
import CartContext from '../../store/cart-context';


const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

```

<a href="https://ithelp.ithome.com.tw/articles/10252519">I Want To Know React - Context 語法</a>
<br>
<h2>useRef</h2>
想對input欄位抓取value、使用focus()這些方法,都要直接對實體DOM做操作,但react本身就是virtual DOM,於是react提出Refs概念,使用這個方法我們就可以抓取到react裡面的DOM元素</br>

``` 
import { useRef } from 'react';
 const userNameRef = useRef(null);
  useEffect(() => {
    userNameRef.current.focus();
  }, []); 
  使得畫面一開始渲染就focus在userName輸入欄位
  並且將要return的輸入欄位component作為一個屬性如下: 
  < Input 
  type="text"
  name="username" 
  ref = {userNameRef}
  onKeyDown = {e =>handleKeyPress(e, "username")}
  />
```

<ul>
  <li>管理 focus、選擇文字、或影音播放。</li>
  <li>觸發即時的動畫。</li>
  <li>與第三方 DOM 函式庫整合。</li>
</ul>  
  <a href="https://dev.to/sajithpradeep/understanding-the-use-of-useeffect-hook-forwardref-in-react-57jf"></a>  
<br>
<h3>forwardRef </h3>
<br>

```
//父層
import { useRef } from 'react';
const App =()=>{
  const coolInputRef = React.useRef(null);
  
  useEffect(()=>{
    coolInputRef.current.focus();
  },[])
  
 <coolInput ref={coolInputRef}/>
}
```
```
//子層<br>

const coolInput =React.forwardRef((props, ref)) =>{
  return(
    <input type="text" ref={ref} />
  )
}
```
```
//子層
import { forwardRef } from 'react';

const CoolInput = (props, ref) =>{
  return <input {...props} ref={ref}/>
};

const forwardedRef = React.forwardRef(CoolInput)

export default forwardedRef;
```
<br>
有些時候父層的元件希望能夠取得子層的 DOM 元素（例如，button 或 input），以便能夠在父層控制子層 DOM 元素的 focus, selection 或 animation 的效果。這時就可以使用 Ref forwarding 來讓父層取得子層 DOM 元素，以便控制和操作它。<br>
tips: 在父層元件建立 ref,在子層使用 forwardRef<br>
blue_heart ref blue_heart

-> useRef() 建立並回傳帶有 current 屬性的物件。

並不觸發 re-render，所以資料更新時，畫面並不會隨之更新。(useState不同)

即便component re-render，仍可取得同一物件內的值。

-> 單純讀取資料可用，且用 ref 讀資料的 input component 稱之為 uncontrolled component。

因為他們不被 React 控制，雖然我們確實用了 useRef，但使用者輸入的資料是直接顯示，這些操作都屬用 DOM 不屬於 React 。相對的，如果是使用 state，使用者輸入的資料都會再由 React state 傳回input 欄位，我們就會稱之 controlled component。
<a href="https://pjchender.blogspot.com/2021/03/react-dom-forwardref.html">[React] 讓父層可以取得子層的DOM 元素：ForwardRef 的使用</a>
<br/>
<h2>usePortal</h2>
