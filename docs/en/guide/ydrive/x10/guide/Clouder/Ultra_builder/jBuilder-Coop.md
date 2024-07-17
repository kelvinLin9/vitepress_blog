jBuilder Coop
===
**Index**
[TOC]

---
# Bugs

## page://slider
- [ ] Silder功能只能單獨使用，若配搭其他功能使用則會格式出錯。

## page://url
- [ ] 網頁html若不加上 "scroll":true，有時會無法正常捲動。

## Media
- [ ] YouTube影片有時需要刷新網頁後才能正常播放。
- [ ] 若不依照預設格式的"12column,2row"，產生出來的item方格會偏離自行設定的樣式。

## 
5. 展示JBoard時，要確保每一個dock都有內容。當系統偵測到任一個dock缺少內容時，會強行將下一個dock的內容加插到空缺內容的dock裡，造成內容出錯。
6. 即使dock名字沒有與其他既存的dock重複，有時候亦會顯示其他內容。
7. 使用JBuilder製作item過程中，經常出現儲存程式後卻沒有保留儲存內容。

# JBuilder優點
1. 無須安裝軟件，輸入網站即可使用
2. 簡易的操作性和排版介面，無須輸入複雜程式碼即可運用素材
3. 可引用他人創作的JBoard，甚至進行修改
4. 支援圖片、網頁和影片素材，組成多元的簡報模式。

---
---
# FAQ

---
## Current Version / Below

---
## 常見問題

-> [English Version](#FAQs)

---

### Q - 為什麼我使用 page://url 加上的網站在“Preview”模式只能顯示“拒絕連線”？

> 該網站的創建者可能設置了 iFrame 嵌入位置限制，建議您找別網站使用

---

### Q - 為什麼我的 Youtube 影片無法播放？
請檢查您的視頻網址格式是否正確
> 如 https://www.youtube.com/watch?v=VIDEOID。 
其他格式 https://youtu.be/VIDEOID 和 https://www.youtube.com/shorts/VIDEOID 
將無法正常顯示。

<br>

有些YouTube影片 (尤其是來經過官方驗證頻道的頻道) 有嵌入限制
> 可把YouTube 連結從 (e.g.) https://www.youtube.com/<span style="color: red">watch?v=</span>N1Rp2mCwv0c
> 修改至 (e.g.) https://www.youtube.com/<span style="color: red">embed/</span>N1Rp2mCwv0c
> 或 建議您找別的影片使用

---

### Q - 為什麼我的 board 加到 Dock Builder 上的 jBoard後，在“預覽”模式下格式變了？
若 Board 中使用 page://slider 或 page://chart 會出現這個問題。
> bug 仍在修復中

---

### Q - 為什麼我的 jBoard 顯示的內容看起來與我製作編輯的的完全不同。
- [ ] jBoard QName 可能已被其他人使用。 
> https://git.page/jj/board?qname=XXX 或 https://jboard.ypcloud.com/?q=XXX  將顯示的版本會是最新更新儲存的 QName=XXX 的 jBoard。建議避免使用您知道已經被用過的名稱或常見的"test","demo"等QName。

註：除了 QName, jBoard 也有 QCode 的ID可使用。 
> 可以使用 https://git.page/jj/board?qname=XXX 或 https://git.page/jj/board?qcode=ZZZ 的 URL 查看您的 jBoard。 
> Qcode 可以在 Board List 中查詢。

---

### Q - 為什麼網頁嵌入JBuilder後，JBoard介面的網頁卻無法捲動？
- 在網址後加入 ,"scroll":true即能解決，如下：
{"url":"http://www.shute.kh.edu.tw/~2013PBL57/a-1.html",`"scroll":true`}

### Q - 為什麼在JBuilder建立Item過程中，輸入並儲存語法內容後卻只顯示預設格式？
- 可能因為儲存的時長問題所致，建議在輸入Item Info過程中每輸入一格內容便儲存一次，確保內容儲存成功。

### Q - 為什麼建立dock後，顯示內容卻無法依序對上？
- 建議在所有dock都有依序加插內容的情況下才預覽JBoard，當系統發現其中一個dock缺少內容時，會自動抓取鄰近dock的內容，造成顯示錯誤。

## FAQs

---

### Q - Why does the website I've added using `page://url` show up in "Preview" mode as "refused to connect"?
> The creators of the website have likely set iFrame restrictions for where the website content can be embedded. There's not much you can do (unless you have access to changing the settings for this website), so we suggest just finding an alternative website to use. 

---

### Q - Why can't the Youtube video I've added be played?
>  1. Please check that your video url is in the correct format, e.g. https://www.youtube.com/watch?v=VIDEOID. Other formats such as  https://youtu.be/VIDEOID and https://www.youtube.com/shorts/VIDEOID will not be displayed normally. 
>
>  2. Some YouTube videos (especially those from verfied official channels) have embedding restrictions. You'll have to find another video to use.

---

### Q - Why does the layout of my board (added to a jBoard on Dock Builder) change? My content has disappeared in "Preview" mode. 
>  This problem is expected if your board contains page://slider or page://chart. These app panel types are currently still being fixed.

---

### Q - Why does my jBoard display content that I haven't added? It looks entirely different from what I've been working on. 
>  The jBoard QName has likely been used by someone else. https://git.page/jj/board?qname=XXX or https://jboard.ypcloud.com/?q=XXX will show the most recently updated/saved version of jBoards with the QName `XXX`. It's good practice to avoid using general names or ones you know have already been used. 

Extra info: 
QName isn't the only ID for your jBoard. 
> In addition to https://git.page/jj/board?qname=XXX, your board can also be viewed using its Qcode via the url https://git.page/jj/board?qcode=ZZZ. 
> The qcode of your jBoard can be found on the Board List. 

---

# Benefits of jBuilder



---
###### tags: `jBuilder`,`YPCloud`
---
> [YPCloud Inc.](https://www.ypcloud.com)
> [name=Chris, Eugene]
> [time=Tue, Nov 22, 2022 11:30 AM]