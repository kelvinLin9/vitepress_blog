# X10 微課程 - Node-Red & Modbus 安裝以及設定


# 目錄


1. [YP 帳號申請](https://www.notion.so/X10-Node-Red-Modbus-3aedd5c999ad47a79c256ab81bcb18fa?pvs=21)
2. [TG 協作群組](https://www.notion.so/X10-Node-Red-Modbus-3aedd5c999ad47a79c256ab81bcb18fa?pvs=21)
3. [課程簡介](https://www.notion.so/X10-Node-Red-Modbus-3aedd5c999ad47a79c256ab81bcb18fa?pvs=21)
4. [課程操作](https://www.notion.so/X10-Node-Red-Modbus-3aedd5c999ad47a79c256ab81bcb18fa?pvs=21)
5. [參考資料](https://www.notion.so/X10-Node-Red-Modbus-3aedd5c999ad47a79c256ab81bcb18fa?pvs=21)


---


## YP帳號申請


### 設置 YP 帳號, GitLab, Telegram


## | [YP帳號](https://account.ypcloud.com/#/login)


![YP logo.png](https://m3.ypcloud.com/cms/YP_logo_634ebf7233.png)


創建一個YP帳號：


1. 前往 [account.ypcloud.com](https://account.ypcloud.com/#/login)
2. 點選「註冊」並創建您的用戶名及密碼


> 您可以選擇使用第3方 Gmail / Facebook / Telegram 進行註冊
> 


 3.   若選用以上第三方登錄方式之一，請點選「修改密碼」以完全綁定您的帳號


![https://user-images.githubusercontent.com/116076967/197032230-e463c270-28a3-4510-8625-14bece013714.png](https://user-images.githubusercontent.com/116076967/197032230-e463c270-28a3-4510-8625-14bece013714.png)


1. 再次登入以確認您的新帳戶創建完成
2. 前往 [Jujue 瀏覽器](https://jujue.app/browser)
3. 點擊右上角  的「應用啟動器」按鈕
    
    ![https://i.imgur.com/3eNN7Er.png](https://i.imgur.com/3eNN7Er.png)
    
4. 您現在可以使用您的帳戶登入 fBuilder, jBuilder, etc.


> [Run](https://run.ypcloud.com/)
> 


---


## | [GitLab](https://gitlab.com/)


![https://m3.ypcloud.com/cms/gitlab_f143892b21.png](https://m3.ypcloud.com/cms/gitlab_f143892b21.png)


GitLab是一個DevOps軟件套裝，它結合了在單個應用程序中開發、保護和操作軟件的能力。


1. 註冊一個 [GitLab](https://gitlab.com/) 帳戶
2. 點選「Create a project」、「Create blank project」以創建一個新存儲庫，並將其命名為「Clouder」
- 設定您的專案為「private」
- 請在創建時勾選「Initialize repository with a README」


![https://user-images.githubusercontent.com/116076967/197028684-6b8b8c84-8417-40ee-a4c2-75c2004949d6.png](https://user-images.githubusercontent.com/116076967/197028684-6b8b8c84-8417-40ee-a4c2-75c2004949d6.png)


> 您需要設置密碼以使用您的帳戶通過Git推送和拉取HTTPS
> 


---


- 您可以邀請「[**YPCloudInc**](https://gitlab.com/YPCloudInc)」作為您專案的成員以進行跟進


![https://user-images.githubusercontent.com/116076967/197031472-6e214003-3eba-418b-982d-47a71a7337e6.png](https://user-images.githubusercontent.com/116076967/197031472-6e214003-3eba-418b-982d-47a71a7337e6.png)


![https://user-images.githubusercontent.com/116076967/197030931-7edb944c-f283-4ebd-b62f-f04582cb2122.png](https://user-images.githubusercontent.com/116076967/197030931-7edb944c-f283-4ebd-b62f-f04582cb2122.png)


- 在您新創建的專案中，您可以通過點選「+」添加新文件以創建日誌，並將其命名為「{Name}-Clouder-Journal.md」，「{Name}」是您的名字


---


- 提醒：
    - 訪問「[雲耕隊](https://md.ypcloud.com/s/x2QXQKDcm)」以獲取更多資訊
    - 您開發的代碼和其他資源將存儲在 GitLab 中
    - [Clone, Push, Pull](https://md.ypcloud.com/s/xBP3oc2qG)
    - Markdown (md) 語法指南 - [English](https://md.ypcloud.com/s/n5LsJP4fY) / [中文](https://md.ypcloud.com/s/ttxmIBQvQ) / [日本語](https://md.ypcloud.com/s/8GsXIVMQl)


---


## TG協作群組


## | [Telegram](https://telegram.org/)


![https://m3.ypcloud.com/cms/telegram_7fc9823478.png](https://m3.ypcloud.com/cms/telegram_7fc9823478.png)


這是用以通訊和公佈更新的社群媒體，請確保您有加入下述的Telegram群組：


- [Clouder](https://t.me/clouder_open)


> 雲耕隊社群
> 
- [open://clockin](https://t.me/clockin_open)


> 雙生計時機器人
> 
- [JujueBot-Open](https://t.me/jujuebot_open)


> 聊天機器人
> 
- [open://form](https://t.me/form_open)


> 表單機器人
> 


---


## Node-Red課程簡介


本課程將介紹如何使用Node-Red平台實現Modbus通訊，本課程將學到如何在Node-Red中安裝並配置Modbus套件，以及如何應用這些知識於實際專案。


---


## 課程操作


## Modbus dip switch 設定


如下圖 將1、5、6 設為 ON


![S__19398658.jpg](https://m3.ypcloud.com/cms/S_19398658_7d03f23a6d.jpg)


## Node-Red安裝


輸入以下兩行指令進行Nodejs、npm、Node-Red安裝


sudo apt install build-essential git curl
`bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)`


---


## Modbus節點設定


到使用者設置安裝Modbus節點


![1.png](https://m3.ypcloud.com/cms/1_758b58bd25.png)


拖入一個Modbus Read，一個Modbus Response以及一個Debug


![2.png](https://m3.ypcloud.com/cms/2_8eff843316.png)


## Modbus設定


### Modbus Read


- Unit-ID : 1
- FC : FC 1
- Address : 0030
- Quantity : 2
- Poll RATE 1000 ms
    
    ![3.png](https://m3.ypcloud.com/cms/3_a9419ea077.png)
    


### Server


- Type : Serial
- Serial port : /dev/ttyUSB0
- Serial type : RTU-BUFFERD
- Baud rate : 9600
    
    ![4.png](https://m3.ypcloud.com/cms/4_7ea5804e7c.png)
    


按下Deploy，Response 以及Debug將會跑出Data


![5.png](https://m3.ypcloud.com/cms/5_3e6473748c.png)


## 參考資料


![https://m3.ypcloud.com/cms/jdi_cards_clouder_cms_6eae937bb7.png](https://m3.ypcloud.com/cms/jdi_cards_clouder_cms_6eae937bb7.png)


### tags:
`Clouder`,`guide`
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMwNjE2NjVdfQ==
-->