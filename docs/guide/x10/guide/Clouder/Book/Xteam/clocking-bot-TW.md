雙子打卡機器人
===

設置「雙子」機器人每天打卡 4 次：00:00、09:00、12:00 及 18:00。

### 加入 Telegram 群組
* [clockin://open](https://t.me/clockin_open)

### 進入 fBuilder
* fBuilder 連結 - [Run](https://run.ypcloud.com)
* 使用您的 YP 帳戶登錄，選擇「fBuilder」，然後選擇「GO」
* 您將看到的頁面 UI 如下所示： 
[<img src="https://i.imgur.com/jgWdNu3.jpg">](https://run.ypcloud.com)

### 開啟一個新的 fBuilder 計劃
* 點擊右上角的 <img src="https://i.imgur.com/66dK5wO.png" width=20 height=20> 按鈕，選擇 「Create Project」
* 在計劃詳細信息中：為 名稱 和 QName 輸入「twin」
[<img src="https://i.imgur.com/2Z7aoxr.png">](https://run.ypcloud.com)

### 將 節點 從左側的 節點面板 側邊欄拖入工作區。
* 拖入 5x [<img src="https://i.imgur.com/dcq5SnC.png" width=100 height=30>](https://run.ypcloud.com) 節點。 它們會成為 [<img src="https://i.imgur.com/UOdTwVI.png" width=100 height=30>](https://run.ypcloud.com)
* 拖入 2x [<img src="https://i.imgur.com/Qzisc1K.png" width=100 height=30>](https://run.ypcloud.com) 節點。 它們會成為 [<img src="https://i.imgur.com/hpUnuGs.png" width=100 height=30>](https://run.ypcloud.com)
* 拖入 1x [<img src="https://i.imgur.com/1664YQI.png" width=100 height=30>](https://run.ypcloud.com) 節點。 它們會成為 [<img src="https://i.imgur.com/BUNoE2p.png" width=100 height=30>](https://run.ypcloud.com)
* 拖入 1x [<img src="https://i.imgur.com/6vCZIev.png" width=100 height=30>](https://run.ypcloud.com) 節點。 它們會成為 [<img src="https://i.imgur.com/ocPKneJ.png" width=120 height=50>](https://run.ypcloud.com)

這些是 fBuilder 上最基本和最常用的節點。

### 連接節點
* 像這樣連接你的節點：
[<img src="https://i.imgur.com/Vrtt8bN.png">](https://run.ypcloud.com)
 
### 修改每個節點

* 雙擊每個節點以修改其屬性。
* 請記得點擊「完成」以保存您的修改。

#### 時間戳 timestamp

* 命名時間戳。
* 在第一個時間戳，請標註「`0.2` 秒後輸入一次」的複選框。

[<img src="https://i.imgur.com/XSxu5vX.png">](https://run.ypcloud.com)

* 在第二個時間戳，選擇「在`特定時間`重複」。填寫「`09:00`」，然後選擇週一至週日所有日期的複選框。

[<img src="https://i.imgur.com/kAmxGdU.png">](https://run.ypcloud.com)

* 嘗試自己修改其餘的時間戳。

#### 有效負載 Payload

[<img src="https://i.imgur.com/1M8lEsY.png" width=700 height=300>](https://run.ypcloud.com)

* 有關第一個負載節點，在郵箱圖標旁邊的字段中填寫以下程式碼。

```
{
    "type": "message", 
    "content": "xxxxx initial clocking", 
    "bot": "pinponboy"
}
```

* 有關第二個有效負載節點：

```
{
    "type": "message", 
    "content": "xxxxx clocking", 
    "bot": "pinponboy"
}
```

* 將 xxxxx 替換為您的英文名稱。
* 字首大寫 例「Digitor clocking」

#### 發送 Send

* 有關發送節點，填寫

```
>hub/comm
```
```
ioc://-1001840835713
```

* 記得改成 「az」

[<img src="https://i.imgur.com/YTNLKNN.jpg">](https://run.ypcloud.com)

#### 調試 Debug

* 有關調試節點：

[<img src="https://i.imgur.com/4EayyVC.png">](https://run.ypcloud.com)

## 在進行下一步前，您的流程應如下列：

[<img src="https://i.imgur.com/DS4ZGwy.png">](https://run.ypcloud.com)


### 部署並輸入你的初始時間戳

[<img src="https://i.imgur.com/Q6b3Ljd.png">](https://run.ypcloud.com)

* 按右上角的紅色「部署」按鈕部署您的流程。
> 每次更改任何流程的內容時請都記得執行，否則您的更改將不會被保存

* 按下第一個時間戳節點「initials」前的藍色小按鈕，輸入節點進行測試。

* 打開左側邊欄中的調試窗口。如果在輸入節點後您的 Errmsg 為「正常」並且您在 Telegram [clockin://open](https://t.me/clockin_open) 群組中看到您的消息，則您的測試已成功。

[<img src="https://i.imgur.com/09vr0PF.png" width=300>](https://run.ypcloud.com)

### QRun您的雙子機器人

* 測試成功後

* 選擇「h4-node」進行 QRun

* 繼續關注 Telegram 群組中您的雙子是否在四個時間點工作，即使您已退出fbuilder / 關閉您的電腦。

> 記得在使用fBuidler後退出頁面

# 恭喜！您已順利完成雙子機器人教學。

---
<img align="left" height="40" src="https://m3.ypcloud.com/cms/jdi_cards_clouder_cms_6eae937bb7.png"> [Clouder Book](https://md.ypcloud.com/s/olcCfqYfn)

###### tags: `guide`
> [fBuilder 使用者指南](https://md.ypcloud.com/s/MANBVU-IZ)
> [name=Allen, Shin, Eugene]