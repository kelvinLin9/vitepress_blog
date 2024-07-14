Twin Clocking
===

The “twin” chould be set clocking in 4 times a day: 00:00, 09:00, 12:00, and 18:00. 

### Join Telegram Group
* [clockin://open](https://t.me/clockin_open)

### Go to fBuilder
* fBuilder URL - [Run](https://run.ypcloud.com)
* Login with your YP Account, choose "fBuilder" then "GO"
* The page UI you see will look like this: 
[<img src="https://i.imgur.com/jgWdNu3.png">](https://run.ypcloud.com)

### Start a new fBuilder project 
* Click on the <img src="https://i.imgur.com/66dK5wO.png" width=20 height=20> button in the top right corner and select "Create Project" 
* In project details: type "twin" for Name & QName
[<img src="https://i.imgur.com/2Z7aoxr.png">](https://run.ypcloud.com)

### Drag in nodes from the Node Palette sidebar on the left to the workspace. 
* Drag in 5x [<img src="https://i.imgur.com/dcq5SnC.png" width=100 height=30>](https://run.ypcloud.com) node. They'll become [<img src="https://i.imgur.com/UOdTwVI.png" width=100 height=30>](https://run.ypcloud.com)
* Drag in 2x [<img src="https://i.imgur.com/Qzisc1K.png" width=100 height=30>](https://run.ypcloud.com) node. They'll become [<img src="https://i.imgur.com/hpUnuGs.png" width=100 height=30>](https://run.ypcloud.com)
* Drag in 1x [<img src="https://i.imgur.com/1664YQI.png" width=100 height=30>](https://run.ypcloud.com) node. They'll become [<img src="https://i.imgur.com/BUNoE2p.png" width=100 height=30>](https://run.ypcloud.com)
* Drag in 1x [<img src="https://i.imgur.com/6vCZIev.png" width=100 height=30>](https://run.ypcloud.com) node. They'll become [<img src="https://i.imgur.com/ocPKneJ.png" width=120 height=50>](https://run.ypcloud.com)

These are the most basic and frequently used nodes on fBuilder.

### Connect nodes
* Connect your nodes like this:
[<img src="https://i.imgur.com/Vrtt8bN.png">](https://run.ypcloud.com)
 
### Modify each Node

* Double click on every node to modify its properties.
* Remember to click "Done" to save your modifications. 

#### timestamp

* Name the timestamp.
* For the 1st timestamp,remember to check the box for "Inject once after `0.2` seconds".
[<img src="https://i.imgur.com/XSxu5vX.png">](https://run.ypcloud.com)


* For the 2nd timestamp, select "Repeat `at a specific time`". Fill in "at`09:00`", then check the boxes for all days Monday-Sunday.
[<img src="https://i.imgur.com/kAmxGdU.png">](https://run.ypcloud.com)

* Try to modify the rest of the timestamps yourself.

#### Payload

[<img src="https://i.imgur.com/1M8lEsY.png" width=700 height=300>](https://run.ypcloud.com)

* For the 1st payload node, fill in the following lines of code in the field next to the mail-box icon.

```
{
    "type": "message", 
    "content": "xxxxx initial clocking", 
    "bot": "pinponboy"
}
```

* For the 2nd payload node:

```
{
    "type": "message", 
    "content": "xxxxx clocking", 
    "bot": "pinponboy"
}
```

* Replace xxxxx with your English name.
* Fist word capital ex: "Digitor clocking"

#### Send

* For the send node, fill in

```
>hub/comm
```
```
ioc://-1001840835713
```

* Remember to change it to "az"

[<img src="https://i.imgur.com/YTNLKNN.jpg">](https://run.ypcloud.com)

#### Debug

* For the debug node:

[<img src="https://i.imgur.com/4EayyVC.png">](https://run.ypcloud.com)

## Before the next step your flow should somehow look like this:

[<img src="https://i.imgur.com/DS4ZGwy.png">](https://run.ypcloud.com)


### Deploy & inject your initial timestamp 

[<img src="https://i.imgur.com/Q6b3Ljd.png">](https://run.ypcloud.com)

* Press the red "Deploy" button on the top right corner to deploy your flow. 
> Remember to do this every time you change the content of any flow or else your changes won't be saved

* Press the small blue button in front of the 1st timestamp node "initials" to inject the node for testing.

* Open the debug window in the left-hand sidebar. If your Errmsg is "OK" after injecting the node and you see your message in the Telegram [clockin://open](https://t.me/clockin_open) group, your test has been successful.

[<img src="https://i.imgur.com/09vr0PF.png" width=300>](https://run.ypcloud.com)

### QRun your twin
* After the successful test

* Choose "h4-node" to QRun

* Keep watching the Telegram clocking group to see whether your twin works at the four times even after you've logged out of fbuilder/shutdown your pc. 

> Always Remeber to logout fBuidler after use!

# Congrats! You have finished the Twin Guide.

---
<img align="left" height="40" src="https://m3.ypcloud.com/cms/jdi_cards_clouder_cms_6eae937bb7.png"> [Clouder Book](https://md.ypcloud.com/s/olcCfqYfn)

###### tags: `guide`
> [fBuilder User Guide](https://md.ypcloud.com/s/dwkjUWcwP)