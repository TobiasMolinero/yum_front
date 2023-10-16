// RUTAS
// CLIENTES
export const get_lista_clientes = 'http://localhost:3000/clientes'

// PRODUCTOS
export const get_lista_productos = 'http://localhost:3000/productos'

// EMPLEADOS
export const get_lista_empleados = 'http://localhost:3000/empleados'

// ZONAS DE VENTA
export const get_lista_zonas = 'http://localhost:3000/zonas'

// METODO DE PAGO
export const get_lista_formaPago = 'http://localhost:3000/formaPago'

// DETALLE VENTAS
export const get_det_temp = 'http://localhost:3000/detalleVentaTemp'
export const add_det_temp = 'http://localhost:3000/detalleVentaTemp/add'
export const del_det_temp_id = 'http://localhost:3000/detalleVentaTemp/delete/'
export const del_table_det_temp = 'http://localhost:3000/detalleVentaTemp/deleteTable'
export const upd_table_det_temp = 'http://localhost:3000/detalleVentaTemp/updateTable/'
export const get_det_venta = 'http://localhost:3000/detalleVenta/'

//VENTAS
export const get_ventas = 'http://localhost:3000/ventas/ventaZona/'
export const get_last_NroVenta = 'http://localhost:3000/ventas/lastVenta'
export const add_venta = 'http://localhost:3000/ventas/add'
export const del_venta = 'http://localhost:3000/ventas/delete/'
export const get_one_venta = 'http://localhost:3000/ventas/oneVenta/'
export const mod_venta = 'http://localhost:3000/ventas/update/'
export const get_venta_detallada = 'http://localhost:3000/ventas/conDetalle/'

// USUARIOS
export const login_usuario = 'http://localhost:3000/usuarios/login'

//INICIO
export const get_ganancias = 'http://localhost:3000/inicio/ganancias'
export const get_perdidas = 'http://localhost:3000/inicio/perdidas'

//GASTOS
export const get_gastos_v = 'http://localhost:3000/gastos'
export const borrar_gasto = 'http://localhost:3000/gastos/borrar/'
export const filtrar_por_mes = 'http://localhost:3000/gastos/filtrar/'
export const agregar_gasto = 'http://localhost:3000/gastos/agregar'
export const one_gasto = 'http://localhost:3000/gastos/one/'
export const editar_gasto = 'http://localhost:3000/gastos/editar/'

//CATEGORIAS GASTOS
export const get_categorias_gastos = 'http://localhost:3000/catgastos'
export const agregar_categoria_gasto = 'http://localhost:3000/catgastos/agregar'
export const borrar_categoria = 'http://localhost:3000/catgastos/borrar/'
export const one_categoria = 'http://localhost:3000/catgastos/one/'
export const editar_categoria = 'http://localhost:3000/catgastos/editar/'