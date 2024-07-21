<template>
  <div>
    <div class="text-2xl font-bold">Profile</div>
  </div>
  <table class="w-full table table-fixed overflow-x-auto">
    <thead class="table-header-group text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="table-row">
        <th scope="col" class="w-1/3 table-cell">Field</th>
        <th scope="col" class="w-2/3 table-cell">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Login ID</td>
        <td> {{ user?.Uid }} </td>
      </tr>
      <tr>
        <td>Office Photo No</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Fax No</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Address</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Zip Code</td>
        <td></td>
      </tr>
      <tr>
        <td>Mobile Phone No</td>
        <td></td>
      </tr>
      <tr>
        <td>EMPNO</td>
        <td></td>
      </tr>
      <tr>
        <td>English Name</td>
        <td>{{ user?.FullName }}</td>
      </tr>
      <tr>
        <td>Chinese Name</td>
        <td></td>
      </tr>
      <tr>
        <td>MFP Card No</td>
        <td></td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ user?.UserName }}</td>
      </tr>
      <tr>
        <td>Last Update Time</td>
        <td></td>
      </tr>
    </tbody>
  </table>


<div class="vp-ra">
  <table class="w-full table table-fixed border- overflow-x-auto">
    <thead class="table-header-group text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="table-row">
        <th scope="col" class="w-1/3 table-cell">Field</th>
        <th scope="col" class="w-2/3 table-cell">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Login ID</td>
        <td> {{ user?.Uid }} </td>
      </tr>
      <tr>
        <td>Office Photo No</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Fax No</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Address</td>
        <td></td>
      </tr>
      <tr>
        <td>Office Zip Code</td>
        <td></td>
      </tr>
      <tr>
        <td>Mobile Phone No</td>
        <td></td>
      </tr>
      <tr>
        <td>EMPNO</td>
        <td></td>
      </tr>
      <tr>
        <td>English Name</td>
        <td>{{ user?.FullName }}</td>
      </tr>
      <tr>
        <td>Chinese Name</td>
        <td></td>
      </tr>
      <tr>
        <td>MFP Card No</td>
        <td></td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ user?.UserName }}</td>
      </tr>
      <tr>
        <td>Last Update Time</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>


</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../store/setting";
import { useWebChatStore } from "../../store/webchat";
import { useAuthStore } from "../../store/auth";
import { useMineStore } from "../../store/mine";
import { Toast } from "../../mixins/sweetAlert";

const webChatStore = useWebChatStore()
const { regInfo, appState } = storeToRefs(webChatStore)

const settingStore = useSettingStore()
const { localjDocsSettings } = storeToRefs(settingStore)
const resetLocaljDocsSettings = settingStore.resetLocaljDocsSettings

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const mineStore = useMineStore()
const { assets, mineToken } = storeToRefs(mineStore)
const updateAssets = mineStore.updateAssets
</script>