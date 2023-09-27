---
date: 2023-08-15
author: Harvey.Huang
---

# Cypress 學習指南2

Cypress是一款現代前端自動化測試工具，支援E2E、集成、單元、元件測試，適用React、Vue、Angular等。
具備Time Travel、自動等待、CI等功能，免費、開源，MIT License。
確保前端品質穩定性的首選工具。

<!-- end -->

## 學習路線

| 項目 | 備註 |
| :--: | :-- |
| 前置學習 | 前端技術基礎 HTML, CSS, JavaScript |
| 學習 Cypress | 瞭解 Cypress 的組成，完整閱讀官方文檔 |
| 實戰應用 | 依據目前公司產品（如HRM）編寫測試腳本 |

### 學習資源

- [Cypress - JavaScript E2E Testing 2022](https://www.youtube.com/watch?v=69SFwgWHUig&list=PLUDwpEzHYYLvA7QFkC1C0y0pDPqYS56iU)
- [Cypress 官方文檔](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell)
  - [Cypress API](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell)
  - [最佳實踐](https://docs.cypress.io/guides/references/best-practices)
  - [插件使用說明書](https://docs.cypress.io/guides/tooling/plugins-guide.html)
  - [自定義選項設定](https://docs.cypress.io/guides/references/configuration.html)

## 1. 環境建立

- 安裝 `Node.js`
- 安裝 `VSCode`
- 安裝 `Cypress`
  - 依照[Cypress 官方文檔](https://docs.cypress.io/guides/getting-started/installing-cypress)步驟操作

### 1.1 安裝初始化

```bash
# 安裝 cypress
npm install cypress --save-dev

# 開啟 cypress
npx cypress open
```

### 1.2 文件結構

```md
├── cypress/
├── e2e/                # 測試文件
├── fixtures/           # mock 數據
│   └── examples/
│   ├── example.cy.js   # 一般格式為 .cy.js，若由 TypeScript 編寫為 .cy.ts
│   └── example.json
├── plugins/            # 用於配置安装的插件 task 系统
│   └── index.js
├── screenshots/        # 預設螢幕截圖文件夾
├── support/            # 用於调整自定義選項
│   ├── commands.js
│   └── e2e.js
└── cypress.config.js
```

## 2 Cypress 對象

- [Cypress 與 cy 的區別](https://docs.cypress.io/api/cypress-api/catalog-of-events#Cypress)
- Cypress：全局對象，影響所有測試
  - 内置工具
    - [Cypress._](https://docs.cypress.io/api/utilities/_)：[Lodash](https://lodash.com/)
    - [Cypress.$](https://docs.cypress.io/api/utilities/promise)：[jQuery](https://jquery.com/)
    - [自定義全局 API](https://docs.cypress.io/api/cypress-api/custom-commands#__docusaurus_skipToContent_fallback)
- cy：在每個測試中相互獨立

### 2.1 Assertions 斷言

> Cypress 內置

### 2.2 cy 命令

> 用於編寫測試

#### 2.2.a 測試

- should：斷言
- then：類似 Promise 的 then
- each：遍歷執行（對於數組）
- spread：then 的 each 版

#### 2.2.b 查詢

- get、contains
  - children、closest、find
  - eq、filter、not
  - first、last
  - next、nextAll、nextUntil
  - parent、parents、parentsUntil
  - prev、prevAll、prevUntil
  - siblings
- window、document、title
- its：取得對象中的字段，如 cy.get('ul li').its('length')
- root：當前上下文的根元素節點
- within：設定上下文元素（類似 JS 中的 with）

#### 2.2.c 操作

- 用戶操作
  - click、dblclick、rightclick
  - blur、focus、focused
  - hover：不支持
  - trigger：觸發事件
- 表單/輸入框
  - check、uncheck、select
  - clear：清除文本框
  - type：輸入文本框
  - submit
  - scrollIntoView、scrollTo
  - invoke：調用對象中的函數，如 cy.get('div').invoke('show')

#### 2.2.d 瀏覽器

- viewport：設置應用窗口大小
- clearCookie、clearCookies、getCookie、getCookies、setCookie
- clearLocalStorage

#### 2.2.e 網絡請求

- visit、reload：訪問
- hash、location、url：獲取
- go：歷史跳轉，相當於 window.history.go
- request：HTTP 請求
- route：跳轉路由

#### 2.2.f 功能性

- 任務
  - log、debug、pause
  - exec：執行 shell 命令
  - readFile、writeFile
  - screenshot：截屏到 /screenshots
  - fixture：讀取 /fixtures 中文件內容
  - task：執行 /plugins 中聲明的事件
- 語法糖
  - as：設置為別名
  - and：進行多個測試
  - end：截斷當前測試（後續鏈式調用將重新計算）
  - wrap：包裝一個對象（以便支持 cy 命令）
- 調用監聽
  - spy：監聽對象中的函數
  - stub：替換對象中的函數（用於監聽）
- Timer
  - clock：覆寫原生時鐘（將會影響 setTimeout 等原生函數）
  - tick：跳過時間，加快測試速度（需要先 cy.clock()）
  - wait：顯式等待（不推薦使用）

### 2.3 Cypress API

> 包含定制選項方法，或公共靜態方法

#### 2.3.a 定制

- Commands：添加自定義命令
- Cookies：測試時的 Cookie 行為控制
- Screenshot：截屏參數配置
- SelectorPlayground：調整選擇器規則
- Server：調整 cy.server() 默認參數
- config：修改 Cypress 的 [配置選項](https://docs.cypress.io/guides/references/configuration)
- env：管理自定義全局變量
- log：配置 log 參數

#### 2.3.b 輔助

- dom：一組 dom 相關方法如 Cypress.dom.isHidden($el)
- isCy：是否是 cy 對象

#### 2.3.c 環境信息

- arch：獲取 CPU 架構，來源於 Node的 os.arch()
- browser：獲取瀏覽器信息
- platform：獲取操作系統名字
- spec：當前測試文件信息
- version：版本號

## 3 Cypress 實作

### 3.1 編寫第一支E2E測試腳本

> 請參照 [Writing Your First E2E Test](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

你將會瞭解

- 如何開啟一個新的測試專案
- 測試成功與失敗
- web navigation、DOM 操作與編寫斷言

### 3.2 登入 HRM 系統測試腳本

> 此小節透過 UI 使用者畫面完成登入 HRM 系統

#### 3.2.a UI使用者畫面登入

> - 優點：
>   - 真實性：通過UI模擬真實用戶的登入過程，這可以確保用戶界面和用戶流程都是正確的。
>   - 完整性：驗證整個登入流程，從打開登入頁面到成功登入。
> - 缺點：
>   - 速度：與編程方式相比，透過UI的登入速度較慢，因為它涉及到更多的DOM操作和可能的網絡延遲。
>   - 冗餘性：在每個測試之前模擬完整的登入過程可能是不必要的，特別是當你有大量測試需要運行時。

1. 抓取輸入框元素 > 輸入帳號密碼 > 點擊登入按鈕

    ```javascript
    describe('Login With UI', () => {
        it('success login', () => {
            // 準備HRM測試站
            cy.visit('{HRM測試網站}/login')

            // 抓取公司代碼輸入框元素
            cy.get('#dept_input')
              .clear() // 清除輸入格
              .type('your_company') // 輸入公司代碼
              .should('have.value', 'your_company') // 驗證是否輸入正確
            // 抓取公司代碼輸入框元素
            cy.get('#username_input')
              .clear() // 清除輸入格
              .type('your_username') // 輸入員工編號
              .should('have.value', 'your_username') // 驗證是否輸入正確

            // 抓取公司代碼輸入框元素
            cy.get('#password-input')
              .clear() // 清除輸入格
              .type('your_password') // 輸入密碼
              .should('have.value', 'your_password') // 驗證是否輸入正確

            // 點擊登入鈕
            cy.get('#login-button')
              .click()
        })
    })
    ```

2. 執行後就可以順利地對元素操作並且順利登入，不過我們還需要驗證登入是否成功。而登入成功會進入到 `/home` ，因此可以透過驗證網址來判斷是否順利登入。不過必須等待登入的請求成功後，才能進行網址的判斷，所以接下來要利用 `cy.intercept()` 來攔截網路請求，並且等待該請求返回後再做登入驗證。

    ```javascript
    describe('Login With UI', () => {
        it('success login', () => {
            cy.intercept({
              // 攔截請求方式為 POST 的請求
              method: 'POST',
              // 請求位置
              url: '{HRM測試網站}/login/index/param'
            }).as('login') // 將intercept設置別名alias

            // 準備HRM測試站
            cy.visit('{HRM測試網站}/login')

            // 抓取公司代碼輸入框元素
            cy.get('#dept_input')
              .clear() // 清除輸入格
              .type('your_company') // 輸入公司代碼
              .should('have.value', 'your_company') // 驗證是否輸入正確
            // 抓取公司代碼輸入框元素
            cy.get('#username_input')
              .clear() // 清除輸入格
              .type('your_username') // 輸入員工編號
              .should('have.value', 'your_username') // 驗證是否輸入正確

            // 抓取公司代碼輸入框元素
            cy.get('#password-input')
              .clear() // 清除輸入格
              .type('your_password') // 輸入密碼
              .should('have.value', 'your_password') // 驗證是否輸入正確

            // 點擊登入鈕
            cy.get('#login-button')
              .click()

            // 設置等待 login 請求
            cy.wait('@login').then(({request, response}) => {
              cy.location().should((location) => {
                expect(location.pathname).to.eq('/home') // 檢查網址路徑是否為 /home
              })
            })
        })
    })
    ```

#### 3.2.b 編程方式登入

> - 優點：
>   - 速度：不需要載入登入頁面或模擬用戶的輸入，通常透過直接發送HTTP請求來進行登入，這使得登入過程更快。
>   - 一致性：確保每次登入都是一致的，減少了由於UI變化引起的潛在問題。
>   - 方便性：一旦設置，它可以輕鬆地用於大量測試，不需要重複UI步驟。
> - 缺點：
>   - 不檢查UI：這種方法不會測試登入界面的UI部分，如果登入頁面出現問題，你可能不會在這些測試中捕獲它。
>   - 配置複雜性：需要瞭解如何正確地發送登入請求，包括正確的headers、body等。如果登入過程有所更改，可能需要更新測試腳本。

1. 由於HRM系統中使用CSRF-Token來防止跨站攻擊，所以可以先向/login使用`cy.request()`發一次請求，從返回的response中取得csrf-token。
    > ✽[何謂CSRF?](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)

    ```javascript
    cy.request('/login')
        .its('body')
        .then((body) => {
          // 透過使用 Cypress.$ 來解析返回的字串 body，可以讓更方便抓取csrf-token
          const $html = Cypress.$(body)
          const csrf = $html.find('input[name=_csrf]').val()
        })
    ```

2. 成功取得網頁中的csrf-token後，就可以將其放入登入請求的header中，模擬使用者登入。

    ```javascript
    cy.request('/login')
        .its('body')
        .then((body) => {
          // 透過使用 Cypress.$ 來解析返回的字串 body，可以讓更方便抓取csrf-token
          const $html = Cypress.$(body)
          const csrf = $html.find('input[name=_csrf]').val()

          // 發出登入請求
          cy.request({
            url: '/login/index/param',
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest',
              // 將csrf-token放入請求標頭
              'X-CSRF-TOKEN': csrf
            },
            // 設定網址參數（公司代碼、使用者名稱、密碼）
            body: new URLSearchParams({
              'inputCompany': 'your_company',
              'inputID': 'your_username',
              'inputPassword': 'your_password'
            }).toString(),
          }).then((response) => {
              // 等待請求返回後，造訪首頁並驗證是否登入成功
              cy.visit('/home')
              cy.location().should((location) => {
                expect(location.pathname).to.eq('/home')
              })
          })
        })
    ```

### 3.3 請假作業測試腳本範例

- 至 [GitHub](https://github.com/huang63261/Cypress_nueip_demo) 將範例程式下載至本地

    ```bash
    git clone https://github.com/huang63261/Cypress_nueip_demo.git
    ```

- 範例程式路徑： `/cypress/e2e/nueip-testing/personalLeaveApplication.cy.js`

## Reference

- [Cypress Documents](https://docs.cypress.io/guides/overview/why-cypress)
- [Cypress 學習指南](https://rualc.com/frontend/cypress/#shi-me-shi-cypress)
- [單元測試之 mock/stub/spy/fake ? 傻傻搞不清楚](https://medium.com/@henry-chou/%E5%96%AE%E5%85%83%E6%B8%AC%E8%A9%A6%E4%B9%8B-mock-stub-spy-fake-%E5%82%BB%E5%82%BB%E6%90%9E%E4%B8%8D%E6%B8%85%E6%A5%9A-ba3dc4e86d86)
- [[Day21] 軟體世界裡的 TDD/BDD/ATDD！懶人包幫你一次釐清(一)](https://ithelp.ithome.com.tw/articles/10304460)
- [[Day22] 軟體世界裡的 TDD/BDD/ATDD！懶人包幫你一次釐清(二)](https://ithelp.ithome.com.tw/articles/10305119)
- [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)