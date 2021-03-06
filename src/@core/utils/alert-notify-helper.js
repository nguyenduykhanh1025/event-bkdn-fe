import Swal from 'sweetalert2'

const ToastShowNotify = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const showAlertSuccess = message => {
  ToastShowNotify.fire({
    icon: 'success',
    title: message
  })
}

const showAlertError = message => {
  ToastShowNotify.fire({
    icon: 'error',
    title: message
  })
}

const showAlertQuestion = message => {
  return Swal.fire({
    icon: 'question',
    title: message,
    showCancelButton: true,
    confirmButtonText: 'Ok',
    confirmButtonColor: '#43a047',
    cancelButtonColor: '#d33'
  })
}

const showConfirm = (message, onSave, onCancel) => {
  Swal.fire({
    title: message,
    showDenyButton: true,
    confirmButtonText: 'OK',
    denyButtonText: `Trở Về`
  }).then(result => {
    if (result.isConfirmed) {
      onSave()
    } else if (result.isDenied) {
      onCancel()
    }
  })
}

export { showAlertSuccess, showAlertError, showAlertQuestion, showConfirm }
