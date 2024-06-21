import { defineStore } from "pinia"
import { ref } from "vue";
import { useWebChatStore } from "./webchat";
import { useAuthStore } from "./auth";
import { Toast } from "../mixins/sweetAlert";
import conf from "../config/config";
import utils from "../plugins/utils";
import axios from "axios";

export const useUploadStore =  defineStore("uploadStore", () => {  
  const webChatStore = useWebChatStore()
  const authStore = useAuthStore()

  const fileInfo = ref(null)
  const fileName = ref('')
  const imgTemp = ref('')

  const uploadFile = async(e) => {
    console.log(authStore.Uid)
    console.log(e.target.files)
    console.log(e.target.files.length)
    if (!authStore.Uid) {
      Toast.fire({
        icon: 'warning',
        title: 'Please login first!'
      })
      return
    }
    if (e.target.files.length === 0) {
        alert('No files selected!');
        return;
    }



    try {
      let msg = ''
      for (const file of e.target.files) {
        // const beforeUploadCheck = await beforeUpload(file)
        // if (!beforeUploadCheck.isValid) {
        //   throw beforeUploadCheck.errorMessages
        // }
        fileInfo.value = file
        fileName.value = file.name
        msg += `<div class="d-flex align-center">
        <i class="mdi mdi-file-document-outline me-1 mt-2" style="font-size: 24px;"></i>
        <div class="">
          <p class="fs-12">${file.name}</p>
          <p class="fs-12">${formatFileSize(file.size)}</p>
        </div>
        </div>`
      }
      webChatStore.sendPubData.msg = msg
      webChatStore.sendMoteMsg(webChatStore.sendPubData.group)


      // pubFileToS3(file)
      return
    } catch (error) {
      console.log('Catch Error: ', error)
    } finally {
      e.target.value = ''
    }
  }

  const beforeUpload = (fileObject) => {
    return new Promise((resolve) => {
      // const validFileTypes = ['image/jpeg', 'image/png']
      // const isValidFileType = validFileTypes.includes(fileObject.type)
      const errorMessages = []

      // if (!isValidFileType) {
      //   errorMessages.push('需上傳 JPG 或 PNG 檔!')
      // }

      const isValidFileSize = fileObject.size / 1024 / 1024 /1024 < 160
      if (!isValidFileSize) {
        errorMessages.push('The file size must be less than 160 GB!')
      }
      resolve({
        // isValid: isValidFileType && isValidFileSize,
        isValid: isValidFileSize,
        errorMessages: errorMessages.join('\n')
      })
    })
  }


  // const pubFileToS3 = async (File) => {
  //   console.log(File)
  //   const formData = new FormData()
  //   formData.append('bucket', File)
  //   console.log(formData.get('bucket'))

  //   try {
  //     const payload = {     
  //       "bucket": "upload",     
  //       "object": File.name,
  //       "header": {"Content-Type": `${File.type}`},    
  //       "file": formData.get('bucket')
  //     }
  //     console.log(payload)
  //     const reply = await webChatStore.mcSend(
  //       conf.S3.MMA,
  //       conf.S3.TOPIC.S3_PUT_OBJECT,
  //       payload,
  //     );
  //     console.log('reply', reply)
  //     const result = utils.resultHandle(reply);
  //     console.log(result)
  //     console.log(result.Data)
  //     axios.get(result.Data).then((res) => {
  //       imgTemp.value = res.data
  //       console.log(imgTemp.value)
  //     })

  //   } catch (error) {
  //     console.log('Catch Error: ', error)
  //   }
  // }


  const pubFileToS3 = async (File) => {
    const formData = new FormData()
    formData.append('bucket', File)
    const file = formData.get('bucket')
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async(e) => {
      if (/^image\/[jpeg|png|gif]/.test(File.type)) {
        console.log(e.target.result)
        console.log(Buffer.from(e.target.result.split(',')[1], 'base64'))
        
        const payload = {     
          "bucket": "upload",     
          "object": File.name,
          "header": {"Content-Type": `${File.type}`},    
          // "file": e.target.result.split(',')[1]
          "file": Buffer.from(e.target.result.split(',')[1], 'base64')
        }
        console.log(payload)
        try {
          const reply = await webChatStore.mcSend(
            conf.S3.MMA,
            conf.S3.TOPIC.S3_PUT_OBJECT,
            payload,
          );
          console.log('reply', reply)
          const result = utils.resultHandle(reply);
          // console.log(result)
          console.log(result.Data)
          axios.get(result.Data).then((res) => {
            imgTemp.value = res.data
            console.log(imgTemp.value)
          })
        } catch (error) {
          console.log('Catch Error: ', error)
        }
      }
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024; // 基础转换单位
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

  return {
    fileInfo,
    fileName,
    imgTemp,

    uploadFile,
    beforeUpload,
    pubFileToS3
  }
})


