# React Forms
<h3>表單重點:欄位觸發判斷的時機</h3>
<ol>
 <li>表單提交時</li>
 <li>移開欄位時</li>
 <li>每次欄位的變化</li>
</ol>
1. useState: 用在立即的變化(如狀況3)、提交表單後reset <br/>
2. useRef: 用在提交表單時(如狀況1) </br>
</br>
🍗HTML5 button element有個預設的submit功能,這樣會自動send HTTP request 給 serverm。如果還沒有要提交表單,我們要取消取消事件event的預設行為而使用: Event.preventDefault()
