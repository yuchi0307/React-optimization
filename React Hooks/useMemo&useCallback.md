

1.React.memo(組件父傳子的prop)
useCallback : store a function to not to recreate it



2.useMemo():  return value
可以用 useMemo 來記住這個函式的運算結果，並在下一次 re-render 階段透過判斷 dependency array 是否有變化來判斷是否重新運算函式，如果 dependency array 不變就回傳上一次的運算結果。
store "any data" u want to store
1st argument: maybe a function
2ed argument: ensure that stored value is updated(dependency概念)

3.useCallback():  
將要記住記憶體位置的 function 用 useCallback 包住並傳入 dependency array 當作第二個參數。

(和React.memo()差在這裡)
useCallback 的主要目的是避免在 component 內部宣告的 function，因為隨著每次 render 不斷重新被宣告跟建立，每次拿到的都是不同的 instance。這樣的 function 如果被當成 prop 往下傳給其他 component，就可能導致下面的 component 無意義地被重新 render。當父元件傳遞的 props 是 Object 時父元件的狀態被改變觸發重新渲染，Object 的記憶體位址也會被重新分配。compare 比較 props 中 Object 的記憶體位址，這個比較方式會讓子元件被重新渲染。
，如果 dependencies array 中的值在沒有被修改的情況下，它會幫我們記住 Object，防止 Object 被重新分配記憶體位址。
大部分情況下，我們都不需要用到 useCallback。
const AAA = useCallback(()=>{},[])
useCallback store "funciton obj" and only rebuild them when some dependency changed
