# React 
React 原理和優化技術筆記<br/>
前提概要:
<ul>
<li>React究竟是什麼?</li>
<li>Re-render的時機</li>

</ul>
其他筆記:
<ol>
  <li><a href="https://github.com/yuchi0307/React-optimization/tree/main/React%20Hooks">hooks整理</a></li>
	<li><a href="https://github.com/yuchi0307/useful-React-Component">UI Component</a></li>
</ol>
<h2>React究竟是什麼?</h2>

<ul>
<li>由 components 組合、建立 UI 的 js library。</li>
<li>React 本人只懂 components, <strong>當props, state, context等資料變動時組件隨之變動(re-render)</strong>, 若有新的畫面要產生, React會告訴ReactDOM。
ReactDOM 就會負責檢視整個DOM tree, 並和真實的網頁DOM交涉, 最後將畫面更新。</li>
<li>虛擬DOM可以輕易辨別原本的資料和更新的資料是否相同(在記憶體中處理), 分辨後再告訴真實DOM, 如此一來網頁只需變動有差異的地方。</li>
  
<h3>Re-render的時機</h3><br/>
 re-evaluate/ re-render means that the entire component function runs again<br/>
父層有重新渲染,子層必定會重新渲染 (component終究是function, 父層再次render執行時, function也會再次執行)<br/>
<br/>為了減少不必要的 re-render<br/>
⭐優化方法1: React.memo

```
export deafult React.memo(MyComponet);
```
React 拿到的組件作為 argument, 他會仔細觀察這個組件父傳子拿到的prop, 並檢查前後值是否相同,不同則(子)組件重新渲染; 如果只有父層變但傳遞下來給子組件的 props.value不變, 子組件的re-render就會被省略(讚的)。<br/>
<br/>
那為什麼不將memo套用在每個組件?<br/>
<br/>
畢竟每次都要比對prop前後值, 應該考慮組件的複雜度和層級再使用。(有可能砍斷某條DOM tree, 因為父層不re-render, 子層就不會re-render)
<br/>

若比較的 props 資料型態為 boolean 和 字串,ex: current true === prev true, 'hi'==='hi', 很直觀沒有錯<br/>
然而型態為function, obj, array, 即便資料內容看起來同, 對js而言是不同的!<br/>
ex: [1, 2, 3] !== [1, 2, 3]<br/>
<a href="https://academind.com/tutorials/reference-vs-primitive-values">Read more: Reference vs Primitive Values</a><br/>
<br/>
那我們如何判斷前後值不同的function, obj, array?<br/>
⭐優化方法2: useCallback()<br/>
 callback讓react知道我的function物件只有在指定情況下需要re-create。<br/>
將要記住記憶體位置的 function 用 useCallback 包住並傳入 dependency array 當作第二個參數。當組件 return 時(component執行時), 他會回傳一個存在記憶體中的function)<br/>
  
 ```
  const toggleParagraphHandler = useCallback( ()=>{
	setShowParagraph(prev=> !prev);
}, []);
(也許可以強制無法re-render, 因為前後值都被我用callback鎖住,
除非第二個參數:[],也就是dependency有改變)

/*
將一個匿名函式()=>{
	setShowParagraph(prev=> !prev);
 } 
作為第一個參數,也就是將一個function用useCallback()存起來
*/
 ```
 當dependency改變, 且有新值, 想要recreate function,and store that new recreated function,<br/>
 useCallback()能確保我們的dependency都會是最新的值。<br/>
⭐優化方法3: useMemo()<br/>
return value<br/>
store "any data" u want to store<br/>
可以用 useMemo 來記住這個函式的運算結果，並在下一次 re-render 階段透過判斷 dependency array 是否有變化來判斷是否重新運算函式，如果 dependency array 不變就回傳上一次的運算結果。
	
<a href="https://xiaoming.coderbridge.io/2021/02/17/%E7%AD%86%E8%A8%98-reactmemo---usecallback---usememo/">
[筆記] React.memo / useMemo / useCallback</a>
</ul>


<h2>REACT的核心: component & state</h2><br/>
<ol>
how react manage state?
<li>component內 -> 使用useState > 設定initial state </li>
<li>event happen </li>
<li>setState to a new value is running (state並不是立刻轉變) </li>
<li>react 會計畫"排程"(按照順序)這些變化 (schedule a/multiple state/s) </li>
<li>new state proceed </li>
<li>react reevaluate the component </li>
</ol>
<br/>
Separate changes to the state within the event handler will result in a single rendering.its purpose is to prevent unnecessary rendering.

```
/*
看想要依照dependency改變state
還是依照「上一個狀態」改變state
*/
//用在基於上一個狀態改變下一個狀態的時候: toggle
const toggleHandler =(prevState)=>{!=prevState};
//這樣寫能確保 toggleHandler 不是拿到最新的state, 而是基於上一個狀態去做改變

useEffect(()=>{},[dependency])
//這樣寫就全依照dependency做改變
```
