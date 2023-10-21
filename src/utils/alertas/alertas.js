import Swal from "sweetalert2"
import '../../css/Alerts.css'

// GUARDADO CON EXITO
export const venta_guardada = Swal.mixin({
    icon: 'success',
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#97f185',
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto'
    },
    focusConfirm: false
})

export const gasto_guardado = Swal.mixin({
    icon: 'success',
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#97f185',
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto'
    },
    focusConfirm: false
})

export const cliente_guardado = Swal.mixin({
    icon: 'success',
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#97f185',
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto'
    },
    focusConfirm: false
})

// ERROR EN EL SERVIDOR

export const error_servidor = Swal.mixin({
    icon: 'error',
    title: 'ERROR',
    html: '<p class="fuente-texto">Oops... Ocurrió un error. Pongase en contacto con el administrador.</p>',
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#eb4949',
    timer: true,
    timerProgressBar: 2000,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton'
    },
    focusConfirm: false
})

// PREGUNTAS

export const conffirm_borrar = Swal.mixin({
    icon: "warning",
    title: 'ATENCION',
    html: '<p class="fuente-texto">¿Seguro que desea eliminar este registro?</p>',
    showCancelButton: true,
    showCloseButton: false,
    confirmButtonColor: '#97f185',
    confirmButtonText: 'Eliminar',
    cancelButtonColor: '#bdbdbd',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton'
    },
})

export const confirmar_cerrar_sesion = Swal.mixin({
    icon: "warning",
    title: 'ATENCION',
    html: '<p class="fuente-texto">¿Seguro que desea cerrar sesión?</p>',
    showCancelButton: true,
    showCloseButton: false,
    confirmButtonColor: '#97f185',
    confirmButtonText: 'Cerrar Sesión',
    cancelButtonColor: '#bdbdbd',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton'
    },
}) 

// INICIO DE SESION
export const toast = Swal.mixin({
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto',
    },
    focusConfirm: false
  })

  export const datos_invalidos = Swal.mixin({
    toast: true,
    position: 'top-center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto'
    },
    focusConfirm: false
  })

//   FALTAN DATOS

export const faltan_datos = Swal.mixin({
    icon: "warning",
    title: 'ATENCION',
    html: '<p class="fuente-texto">Faltan datos obligatorios.</p>',
    showCloseButton: false,
    confirmButtonColor: '#97f185',
    confirmButtonText: 'Volver',
    focusConfirm: false,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton'
    },
})

// BORRADO CON EXITO

export const borrado_exitoso = Swal.mixin({
    toast: true,
    position: 'top-center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
        title: 'fuente-titulo',
        confirmButton: 'fuente-boton',
        cancelButton: 'fuente-boton',
        htmlContainer: 'fuente-texto'
    },
    focusConfirm: false
}) 