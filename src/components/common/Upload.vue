<template>
  <div class="d-flex justify-center">
    <div class="input-file d-flex flex-column justify-center align-center relative">
      <div class="bg-gradient text-white d-flex flex-column justify-center align-center">
        <!-- <img
          class="upload-icon"
          width="50"
          height="50"
          src="@/assets/images/upload/submit.png"
        /> -->
        <label for="upload" class="cursor-pointer upload-file-label">
          Select File
        </label>
        <input
          multiple 
          type="file" 
          id="upload"
          class="cursor-pointer upload-file"
          name="file-upload"
          @change="uploadFile($event)"
        />
      </div>
    </div>
    <p class="fs-12 upload-description text-secondary">{{ fileName || 'or drop files here to upload' }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUploadStore } from '../../store/upload';

const uploadStore = useUploadStore()
const { fileName } = storeToRefs(uploadStore)
const uploadFile = uploadStore.uploadFile
const getS3Object = uploadStore.getS3Object

</script>

<style scoped lang="scss">
.input-file {
  width: 350px;
  height: 280px;
  background: #FFFFFF;
  border: 2px dashed #B7B7B7;
  border-radius: 26px;
  @media (max-width: 576px) {
    width: 350px;
    height: 280px;
  }
}
.upload-file-label {
  background: #6CD089;
  position: absolute;
  padding: 10px 20px;
  border-radius: 10px;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.upload-file {
  width: 350px;
  height: 280px;
  opacity: 0;
}
.upload-icon {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 45%;
  left: 51%;
  transform: translate(-50%, -50%);
}
.upload-description {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>