為阻止callback hell，Async / Await 因而誕生。<br/>

<h3>Promise 是一個物件，代表著一個尚未完成，但最終會完成的一個動作：在一個「非同步處理」的流程中，它只是一個暫存的值（Placeholder）。</h3><br/>

到咖啡廳向櫃台點拿鐵和鬆餅：
<ol>
  <li>櫃台服務員a點餐</li>
  <li>服務員b製作咖啡、服務員c製作鬆餅</li>
  <li>服務員a結帳->集點->刷載具</li>
  //彼此作業互不干擾，稱之async非同步作業</li>
  <li>拿到餐點收據，等待憑證取餐，收據就是承諾 Promise，代表這個任務完成後，就可以接著執行接下去的動作</li>
  <li>等待的過程中，其實你無法百分之百肯定最後一定拿得到咖啡（Pending）：</li>
店員可能順利做完咖啡交到你手上（Resolved）；可能牛奶或咖啡豆沒了，所以店員告訴你今天做不出咖啡了（Rejected）</li>
</ol>

```
💡 Promise 就像上面的例子，可能處於三種階段中任意階段：
⭐ Pedning：等待事情完成中，但不確定最終會順利完成或失敗
⭐ Resolved（或稱 Fulfilled）：代表順利完成了，並轉交結果
⭐ Rejectesd：代表失敗了，並告知失敗原因
```

<a href="https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E5%BF%83%E5%BE%97-%E8%AA%8D%E8%AD%98%E5%90%8C%E6%AD%A5%E8%88%87%E9%9D%9E%E5%90%8C%E6%AD%A5-callback-promise-async-await-640ea491ea64">[筆記] 認識同步與非同步 — Callback + Promise + Async/Await</a>
