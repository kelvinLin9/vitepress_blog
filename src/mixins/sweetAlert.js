import Swal from 'sweetalert2/dist/sweetalert2.js'
import '@sweetalert2/theme-dark/dark.scss'
import 'sweetalert2/src/sweetalert2.scss'

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const Alert = Swal.mixin({
  toast: false,
  icon: 'error',
  iconColor: '#be0e3d',
  confirmButtonColor: '#be0e3d',
})


const SearchData = Swal.mixin({
  html:`
  <div class="mb-2 fs-14">請輸入Story或Brick名稱</div>
  <div class="d-flex align-center justify-end">
    <input class="border pa-1 text-end rounded-lg me-1" id="swal-input1" placeholder="jujue" style="width: 180px;">
    <select id="swal-input2" class="border pa-1 rounded-lg" style="width: 60px;">
      <option value="story">.story</option>
      <option value="brick">.brick</option>
    </select>
  </div>
  `,
  width: '320px',
  allowOutsideClick: false,
  confirmButtonColor: '#6CD089',
  showLoaderOnConfirm: true,
  confirmButtonText: "確定",
  showCancelButton: true,
  cancelButtonText: "取消",
  customClass: {
    confirmButton: 'my-confirm-button-class',
    cancelButton: 'my-cancel-button-class'
  },
  buttonsStyling: false,
})


export {
  Toast,
  Alert,
  SearchData,
  Swal,
}