# React 
React 原理和優化技術筆記<br/>
前提概要:
<ul>
<li>React究竟是什麼?</li>
<li>Re-render的時機</li>
<li>JS CORE</li>
</ul>
其他筆記:
<ol>
  <li><a href="https://github.com/yuchi0307/React-optimization/tree/main/React%20Hooks">hooks整理</li>
</ol>
<h2>React究竟是什麼?</h2>
⭐由 components 組合、建立 UI 的 js library。<br/>
<br/>
⭐React 本人只懂 components, <strong>當props, state, context等資料變動時組件隨之變動(re-render)</strong>, 若有新的畫面要產生, React會告訴ReactDOM。
ReactDOM 就會負責檢視整個DOM tree, 並和真實的網頁DOM交涉, 最後將畫面更新。<br/>
<br/>
⭐虛擬DOM可以輕易辨別原本的資料和更新的資料是否相同(在記憶體中處理), 分辨後再告訴真實DOM, 如此一來網頁只需變動有差異的地方。
<h2>Re-render的時機</h2>
父層有重新渲染,子層必定會重新渲染 (component終究是function, 父層再次render執行時, function也會再次執行)<br/>
<br/>為了減少不必要的 re-render<br/>
⭐優化: React.memo

```
export deafult React.memo(MyComponet);
```
React 拿到的組件作為 argument, 他會仔細觀察這個組件拿到的prop, 並檢查比對 props原本的值和後來的新值, 如果值有變, 這個(子)組件重新渲染; 如果是父層有改變但傳遞下來給子組件的 props.value不變, 子組件的re-render就會被省略(讚的)。<br/>
<br/>
⭐那為什麼不將memo套用在每個組件?<br/>
<br/>
畢竟每次都要比對prop前後值, 應該考慮組件的複雜度和層級再使用。(有可能砍斷某條DOM tree, 因為父層不re-render, 子層就不會re-render)

<h2>JS CORE</h2>
若比較的 props 資料型態為 boolean 和 字串,ex: current true === prev true, 'hi'==='hi', 很直觀沒有錯<br/>
然而型態為function, obj, array, 即便資料內容看起來同, 對js而言是不同的!<br/>
ex: [1, 2, 3] !== [1, 2, 3]<br/>
<a href="https://academind.com/tutorials/reference-vs-primitive-values">Read more: Reference vs Primitive Values</a><br/>
<br/>
🦀那我們如何判斷前後值不同的function, obj, array?<br/>
<br/>
