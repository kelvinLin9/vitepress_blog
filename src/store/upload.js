import { defineStore } from "pinia"
import { ref } from "vue";
import { useWebChatStore } from "./webchat";
import { useAuthStore } from "./auth";
import { Toast } from "../mixins/sweetAlert";
import conf from "../config/config";
import utils from "../plugins/utils";
import axios from "axios";
import { Minio } from 'minio-js'
// import fs from 'fs/promises';
// import { createReadStream } from 'fs';


export const useUploadStore =  defineStore("uploadStore", () => {  
  const webChatStore = useWebChatStore()
  const authStore = useAuthStore()

  const fileInfo = ref(null)
  const fileName = ref('')
  const imgTemp = ref('')

  const uploadFile = async(e) => {
    console.log(authStore.Uid)
    console.log(e.target.files)
    console.log(e.target.files[0])
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
        // msg += `<div class="d-flex align-center">
        // <i class="mdi mdi-file-document-outline me-1 mt-2" style="font-size: 24px;"></i>
        // <div class="">
        //   <p class="fs-12">${file.name}</p>
        //   <p class="fs-12">${formatFileSize(file.size)}</p>
        // </div>
        // </div>`
      }
      // webChatStore.sendPubData.msg = msg
      // webChatStore.sendMoteMsg(webChatStore.sendPubData.group)


      pubFileToS3(e.target.files[0])
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


  // const minioClient = new Minio.Client({
  //   endPoint: 's3.ypcloud.com',
  //   port: 443,
  //   useSSL: true,
  //   accessKey: 'mikiypcloud',
  //   secretKey: 'm!kiYPcl0ud@#'
  // });

  const bucketName = 'aigc';
  // const objectName = 'myobject';

  const pubFileToS3 = async (file) => {
    return new Promise( async (resolve, reject) => {
      const objectName = file.name;
  
      const minioClient = new Minio.Client({
        endPoint: 's3.ypcloud.com',
        port: 443,
        useSSL: true,
        accessKey: 'mikiypcloud',
        secretKey: 'm!kiYPcl0ud@#'
      });
      const metaData = {
        // key01: 'value01'
      }
      console.log('file.size', file)
      const reader = new FileReader();
      reader.readAsDataURL(file)
      // reader.onerror = function() {
      //   console.error("Failed to read file:", reader.error);
      // };
      const buffer = await getFileBuffer(file);
      console.log('buffer', typeof buffer)
      minioClient.putObject(bucketName, objectName, 'file', metaData, (err, etag) => {
        console.log('etag', etag);
        if (err) {
          console.log('err', err);
          reject('err', err);
        } else {
          resolve('上傳成功', etag);
        }
      });
    });
  }
  async function getFileBuffer(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        return buffer;
    } catch (error) {
        console.error('Error converting file to buffer:', error);
    }
}

  // const pubFileToS3 = async (File) => {
  //   const formData = new FormData()
  //   formData.append('bucket', File)
  //   const file = formData.get('bucket')
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   console.log(File.size)
  //   reader.onload = async(e) => {
  //     // if (/^image\/[jpeg|png|gif]/.test(File.type)) {
  //     if (true) {
  //       console.log(e.target.result)
  //       // console.log(Buffer.from(e.target.result.split(',')[1], 'base64'))
        
  //       const minioClient = new Minio.Client({
  //         endPoint: 's3.ypcloud.com',
  //         port: 443,
  //         useSSL: true,
  //         accessKey: 'mikiypcloud',
  //         secretKey: 'm!kiYPcl0ud@#'
  //       });
  //       minioClient.putObject("aigc", File.name, e.target.result, function (err, data) {
  //         console.log('data', data)
  //         if (err) console.log(err)
  //         else {
  //           console.log('上傳完成')
  //         }
  //       })
  //     }
  //   }
  // }


  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}


    const getS3Object = async (payload) => {
      const minioClient = new Minio.Client({
        endPoint: 's3.ypcloud.com',
        port: 443,
        useSSL: true,
        accessKey: 'mikiypcloud',
        secretKey: 'm!kiYPcl0ud@#'
      });

      minioClient.presignedUrl('GET', 'kelvin.guide', 'ultra/crm-topic-1.md', 24 * 60 * 60, function (err, presignedUrl) {
      // minioClient.presignedUrl('GET', 'aigc', '烏龜島 550x200.png', 24 * 60 * 60, function (err, presignedUrl) {
        if (err) return console.log(err)
        console.log('Presigned URL: ', presignedUrl)
        fileUrl = presignedUrl;
      })
      
      minioClient.fGetObject('kelvin.guide', 'crm-topic-1.md', '/ultra/crm-topic-1.md', function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('success')
      })
      minioClient.listBuckets(function(err, buckets) {
        if (err) {
          console.log('Error listing buckets:', err)
          return;
        }
        console.log('Buckets:', buckets);
      });
      const data = []
      const stream = minioClient.listObjects('kelvin.guide', '', true)
      stream.on('data', function (obj) {
        data.push(obj)
      })
      stream.on('end', function (obj) {
        console.log(data)
      })
      stream.on('error', function (err) {
        console.log(err)
      })
    }






  return {
    fileInfo,
    fileName,
    imgTemp,

    uploadFile,
    beforeUpload,
    pubFileToS3,
    formatFileSize,
    getS3Object,
  }
})


