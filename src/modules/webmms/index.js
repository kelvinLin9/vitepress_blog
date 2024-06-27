
import { startUp, onEvent, wsSend } from './websocket.js'
import { getRegToken, saveRegToken, getRegProp, saveRegProp } from './regmc.js'
import { wserr } from './wserr.js'

const wmms = {
    wsstate: '',
    mcstate: 'idle',
    ready: false
}
const debug = false

export const open = (wsurl, evthandler) => {
    return new Promise(async (res) => {
        try {
            if(debug) console.log('webmms: open wsurl=%s', wsurl)
            const sret = await startUp(wsurl)
            if(debug) console.log('webmms: open result=%o', sret)
            if (sret.state == 'connected'){
                wmms.wsstate = sret.state
                if (typeof evthandler == 'function') onEvent(evthandler)
                res({"ErrCode": wserr.ok.code, "ErrMsg": wserr.ok.msg, "state": sret.state}) 
            }
            else {
                res({"ErrCode": wserr.error.code, "ErrMsg": "state error", "state": sret.state})
            }    
        }
        catch(err){
            if(debug) console.log('webmms: open %s', err.message)
            res({"ErrCode": wserr.error.code, "ErrMsg": err.message})
        }
    })
}

export const reg = (reginfo) => {
    console.log('reg', reginfo)
    if (wmms.wsstate == 'connected'){
        return new Promise(async (res) => {
            try {
                // let info = reginfo ? reginfo : getRegToken()
                let request = {"func":"regdc", "data":reginfo}
                if(debug) console.log('webmms: reg resquest=', request)
                let sret = await wsSend(request)
                if(debug) console.log('webmms: reg result=', sret)
                if (!sret.err){
                    let {reply} = sret
                    if (reply.ErrCode == 0 && reply.result) {
                        let regInfo = reply.result
                        regInfo.EiType = ".web"
                        // if(debug) console.log('webmms reg reginfo=%o', regInfo)
                        saveRegToken(regInfo)
                        wmms.mcstate = 'reg ok'
                        wmms.ready = true
                        res({"ErrCode": wserr.ok.code,"ErrMsg": wserr.ok.msg,"result":regInfo})
                    }
                    else {
                        res(reply)
                    }
                }
                else {
                    res ({"ErrCode": wserr.error.code, "ErrMsg": sret.err})
                }
            }
            catch(err){
                if(debug) console.log('webmms: reg %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "ws not connected"}
}

export const set = (ei) => {
    console.log('set', ei)
    if (wmms.wsstate == 'connected'){
        return new Promise(async (res) => {
            try {
                let einfo = ei ? ei : getRegProp()
                let request = {"func":"setinfo", "data":{"EdgeInfo":einfo}}
                if(debug) console.log('webmms: set request=%o', request)
                const sret = await wsSend(request)
                if(debug) console.log('webmms: set result=', sret)
                if (!sret.err){
                    let {reply} = sret
                    if (reply.ErrCode == 0 && reply.result) {
                        saveRegProp(reply.result)
                        wmms.mcstate = 'set ok'
                        res({"ErrCode": wserr.ok.code,"ErrMsg": wserr.ok.msg, "result":reply.result})
                    }
                    else res (reply)
                }
                res ({"ErrCode": wserr.error.code, "ErrMsg": sret.err})
            }
            catch(err){
                if(debug) console.log('webmms: set %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else {
        return {"ErrCode": wserr.error.code, "ErrMsg": `ws ${wmms.wsstate}`}
    }
}

export const get = () => {
    if (wmms.wsstate == 'connected'){
        return new Promise(async (res) => {
            try {
                let einfo = getRegProp()
                res({"ErrCode": wserr.ok.code,"ErrMsg": wserr.ok.msg,"result":einfo})
            }
            catch(err){
                if(debug) console.log('webmms: set %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else {
        return {"ErrCode": wserr.error.code, "ErrMsg": `ws ${wmms.wsstate}`}
    }
}

export const send = (ddn, topic, data, t1, t2) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let msg = {"ddn":ddn,"topic":topic,"data":data,"timeout":t1,"waitreply":t2}
                let request = {"func":"send", "body":msg}
                if(debug) console.log('webmms: send request=%o', request)
                const sret = await wsSend(request)
                res (sret)
            }
            catch(err){
                if(debug) console.log('webmms: send %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const call = (ddn, topic, func, data, t1, t2) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let msg = {"ddn":ddn,"topic":topic,"func":func,"data":data,"timeout":t1,"waitreply":t2}
                let request = {"func":"call", "body":msg}
                if(debug) console.log('webmms: call request=%o', request)
                const cret = await wsSend(request)
                res (cret)
            }
            catch(err){
                if(debug) console.log('webmms: call %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const sub = (topic) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let msg = {"topic":topic}
                let request = {"func":"sub", "body":msg}
                if(debug) console.log('webmms: sub request=%o', request)
                const sret = await wsSend(request)
                res (sret)
            }
            catch(err){
                if(debug) console.log('webmms: sub %s', err.message)
                return {"ErrCode": wserr.error.code, "ErrMsg": err.message}
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const subList = () => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let request = {"func":"subList"}
                if(debug) console.log('webmms: subList request=%o', request)
                const sret = await wsSend(request)
                res (sret)
            }
            catch(err){
                if(debug) console.log('webmms: subList %s', err.message)
                return {"ErrCode": wserr.error.code, "ErrMsg": err.message}
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const pub = (topic, payload) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let msg = {"topic":topic,"payload":payload}
                let request = {"func":"pub", "body":msg}
                if(debug) console.log('webmms: pub request=%o', request)
                const pret = await wsSend(request)
                res (pret)
            }
            catch(err){
                if(debug) console.log('webmms: pub %s', err.message)
                return {"ErrCode": wserr.error.code, "ErrMsg": err.message}
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const setxs = (catalog, idname, data) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let xdata = {"catalog":catalog,"idname":idname,"data":data}
                let request = {"func":"setConfig", "body":xdata}
                if(debug) console.log('webmms: send request=%o', request)
                const sret = await wsSend(request)
                res (sret)
            }
            catch(err){
                if(debug) console.log('webmms: setxs %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}

export const getxs = (catalog, idname) => {
    if (wmms.ready){
        return new Promise( async (res) => {
            try {
                let xdata = {"catalog":catalog,"idname":idname}
                let request = {"func":"getConfig", "body":xdata}
                if(debug) console.log('webmms: send request=%o', request)
                const sret = await wsSend(request)
                res (sret)
            }
            catch(err){
                if(debug) console.log('webmms: getxs %s', err.message)
                res ({"ErrCode": wserr.error.code, "ErrMsg": err.message})
            }
        })    
    }
    else return {"ErrCode": wserr.error.code, "ErrMsg": "motechat not ready"}
}


