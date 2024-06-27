// websocket: module for websokcet client operation
// Date: 2023/04/13
// Version: 1.0.0

import { io } from "socket.io-client"

const ws = {
    socket: null,
    connection: false,
    evthandler: null,
    debug: false
}

export const startUp = (wsurl) => {
    return new Promise((res) => {
        try {
            // console.log('websocket: startUp url=%s', wsurl)
            const socket = io(wsurl)
            ws.socket = socket
            socket.on("connect", () => {
                if (ws.debug) console.log('connect id=%s', socket.id);
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('state', 'connected')
                }
                res({"id":socket.id,"state":"connected"})
            });
            socket.on("disconnect", (reason) => {
                if (ws.debug) console.log('disconnect %s', reason);
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('state', 'disconnected')
                }
                res({"id":socket.id,"state":"disconnected"})
            });
            socket.on("connect_error", (reason) => {
                if (ws.debug) console.log('websocket: connect error %s', reason);
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('state', 'connect_error')
                }    
                res({"id":socket.id,"state":"connect_error"})
            });
            socket.on("state", (msg) => {
                console.log('websocket: state %s', msg)
                if (typeof ws.evthandler === 'function'){
                    ws.evthandler('state', msg)
                }
            })    
            socket.on("message", (msg, cb) => {
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('message', msg, cb)
                }
            });
            socket.on("submsg", (msg) => {
                // console.log('websocket: submsg %o', msg)
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('submsg', msg)
                }
            }); 
            socket.on("pubmsg", (msg) => {
                console.log('websocket: pubmsg %o', msg)
                if (typeof ws.evthandler === "function") {
                    ws.evthandler('pubmsg', msg)
                }
            }); 

        }
        catch(err){
            console.log('websocket: startUp error: %s', err.message)
            res({"id":socket.id,"state":err.message})
        }    
    })
}

export const onEvent = (handler) => {
    if (typeof handler == 'function') {
        ws.evthandler = handler
        return true
    }
    else return false
}   

export const wsSend = (msg) => {
    try {
        if (ws.socket) {
            return new Promise((res) => {
                if (ws.debug) console.log('websocket: send msg=%O', msg);
                ws.socket.emit('request', msg, (ack) => {
                    if (ws.debug) console.log('websocket: send ack=%O', ack);
                    res({"err": "", "reply":ack})
                })
            })
        }
        else res({"err":"web socket null", "reply": null})
    }
    catch(err){
        console.log('websocket: send error: %s', err.message)
        return {"err": err.message, "reply":""}
    }
}



