<h1>Redux</h1>
一個管理 state 的系統(third party),簡單來說就是管理了所有資料的傳遞、最終顯示結果的工具!<br/>
<ol>
  <li> cross-component</li>
  <li> app-wide state </li>
</ol>
<br/>

注意: 管理多個state, 已經有useContext!那為什麼要使用Redux?<br/>
兩者皆可以使用,然而<strong>useContext適合管理不同component,  Redux則適合app-wide(更廣泛的)資料傳遞</strong><br/>
<ul><li>useContext的兩個缺點：</li><br/>
<ol>
  <li> 怕巢狀</li>
  <li> 只適合用在不頻繁改變的情況 </li>
</ol>
</ul>
