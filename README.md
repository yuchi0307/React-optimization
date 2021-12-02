<h2>How React Interact with database?</h2>
fetch data from server : use http request
<ul>
  <li> react app should never directly talk to a database (client side) </li>
<li> Backend app runs on another machine/server not in the browser(server side)<br/>
-> safe store and use database</li>
<li>React App 透過 Backend API 和後端溝通</li>
<li>fetch API 是瀏覽器內建的,用來獲取資料和傳送資料</li>
<li>fetch 後會得到一個promise物件 (可用開發人員工具得知)<br/>
the async keyword is added to functions to tell them to return a promise rather than directly returning the value.</li>
</ul>

```
補充:
REST APIs and GraphQL
GraphQL是2012年時，臉書為了改善手機App操作體驗而開發的API查詢語言，可以網頁應用直接透過API，
來描述所需要的資料，來向後端資料庫取得，而不用多次透過Rest API呼叫，才能來拼出所需資料，最直接的好處是，
可以減少同一個網頁向後端呼叫的次數，加快網頁應用的反應速度，提供更順暢少等待的用戶操作體驗。

過去採用REST架構的API呼叫方式，後端程式負責資料層的處理，而前端程式只負責拿到資料後的呈現處理。
當前端程式有資料需求時，只能概略向資料源API提出請求，而由後端程式決定，下達SQL指令到資料庫取出資料，再拋給前端。

但是，REST API每次只能呼叫單一資料源，同一網頁若有多種資料源的需求，例如用戶帳號資料、交易資料、推薦產品清單，
就得向三個資料源提出三次API呼叫請求，而且因為後端程式無法得知前端程式目前的處理狀態，只能將符合條件的資料全都拋給前端，
這都會徒增了拋給前端的資料量和連線複雜度。

GraphQL的作法則和REST截然不同，GraphQL可以讓前端程式以物件結構來描述所需要的資料，甚至可以使用巢狀結構來描述資料物件的欄位，
能更精準也更明確地描述所需要的資料，再向後端API提出資料查詢請求，而後端API則透過Web伺服器上的GraphQL模組或GraphQL伺服器，
向不同的資料源所在的資料庫取得資料。

```
source: <a href="https://www.ithome.com.tw/news/128334">顛覆傳統REST網頁設計架構，GraphQL讓前後端API說同樣的語言</a>
<h3>實作的部分:ERROR</h3>
fetch API並不理解error status，所以我們要實作一個error給他catch

```

const [error, setError] = useState(null);
async function fetchAPI()
{
  try
  {
    const response = await fetch('url');
    if(!response.ok)
    {
      throw new Error('oops!! xp');
    }
    const data = await response.json();
   //以下步驟略
  }catch(error)
  {
    setError(error.message)
  }
}

//jsx code
return{
{!sLoading && error&& <p>{error}</p>}
}
```
