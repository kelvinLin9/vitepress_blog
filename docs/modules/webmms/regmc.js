import conf from '../../config/config' 

// export const getRegToken = () => {
//     let SToken = getCookie('SToken')
//     let EiToken = getCookie('EiToken')
//     if (typeof SToken == 'undefined') SToken = ''
//     if (typeof EiToken == 'undefined') EiToken = ''
//     let regInfo = {"SToken":SToken,"EiToken":EiToken,"WIP":"","LIP":""}
//     return regInfo
// }

// export const saveRegToken = (regedinfo) => {
//     try {
//         let {SToken, EiToken} = regedinfo
//         setCookie('SToken', SToken)
//         setCookie('EiToken', EiToken) 
//         return true    
//     }
//     catch(err){
//         console.log('saveRegToken error: %s', err.message)
//         return false
//     }
// }
// export const getRegProp = () => {
//     console.log('getRegProp')
//     let EiName = getCookie('EiName')
//     let EiTag = getCookie('EiTag')
//     if (typeof EiName == 'undefined') EiName = ''
//     if (typeof EiTag == 'undefined') EiTag = ''
//     if (EiName == '') EiName = newEiName()

//     let eiInfo = {"EiName":EiName,"EiType":AppEiType,"EiTag":EiTag,"EiLoc":""}
//     return eiInfo
// }

// export const saveRegProp = (regedinfo) => {
//     try {
//         let {EiName, EiTag} = regedinfo
//         setCookie('EiName', EiName) 
//         setCookie('EiTag', EiTag) 
//         return true    
//     }
//     catch(err){
//         console.log('saveRegInfo error: %s', err.message)
//         return false
//     }
// }
// function setCookie(name, value){
//     let Days = 180
//     let exp = new Date()
//     exp.setTime(exp.getTime() + Days*24*60*60*1000)
//     let expires = exp.toGMTString()
//     //document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()
//     document.cookie = `${name}=${value};expires=${expires}`
// }

// function getCookie(name){
//     let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
//     if(arr=document.cookie.match(reg))
//         //return unescape(arr[2])
//         return (arr[2]) 
//     else
//         return ''
// }


export const getRegToken = () => {
    let SToken = localStorage.getItem('SToken');
    let EiToken = localStorage.getItem('EiToken');
    if (SToken === null) SToken = '';
    if (EiToken === null) EiToken = '';
    let regInfo = {"SToken": SToken, "EiToken": EiToken, "WIP": "", "LIP": ""};
    return regInfo;
}

export const saveRegToken = (regedinfo) => {
    try {
        let {SToken, EiToken} = regedinfo;
        localStorage.setItem('SToken', SToken);
        localStorage.setItem('EiToken', EiToken);
        return true;
    }
    catch (err) {
        console.log('saveRegToken error: %s', err.message);
        return false;
    }
}

export const getRegProp = () => {
    console.log('getRegProp');
    let EiName = localStorage.getItem('EiName');
    let EiTag = localStorage.getItem('EiTag');
    if (EiName === null) EiName = newEiName();
    if (EiTag === null) EiTag = '';

    let eiInfo = {"EiName": EiName, "EiType": conf.EI_TYPE, "EiTag": EiTag, "EiLoc": ""};
    return eiInfo;
}

export const saveRegProp = (regedinfo) => {
    try {
        let {EiName, EiTag} = regedinfo;
        localStorage.setItem('EiName', EiName);
        localStorage.setItem('EiTag', EiTag);
        return true;
    }
    catch(err) {
        console.log('saveRegInfo error: %s', err.message);
        return false;
    }
}

function newEiName(){
    let EiName = conf.EI_NAME_PREFIX + Math.random().toString(36).substring(2, 8)
    return EiName
}


