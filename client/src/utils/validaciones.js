// src/utils/validacion.js
export const validarFormulario = (formulario) => {
  let newErrors = {};

  if (!formulario.uh) newErrors.uh = "Debe seleccionar una unidad hospitalaria";
  if (!formulario.cate) newErrors.cate = "Debe seleccionar una categoría";
  if (!formulario.nombre) newErrors.nombre = "Debe ingresar su nombre";
  if (!formulario.rud) newErrors.rud = "Debe ingresar RUD o código";
  if (!formulario.curp) newErrors.curp = "Debe ingresar CURP";
  if (!formulario.cedula) newErrors.cedula = "Debe ingresar cédula";
  if (!formulario.cel) newErrors.cel = "Debe ingresar número de celular";
  if (!formulario.vig) newErrors.vig = "Debe ingresar término de residencia";
  if (formulario.serv.length === 0) newErrors.serv = "Debe seleccionar al menos un servicio que rotará";
  if (!formulario.medico) newErrors.medico = "Debe ingresar médico adscrito";
  if (formulario.sol.length === 0) newErrors.sol = "Debe seleccionar al menos un servicio solicitado";
  if (!formulario.acepta) newErrors.acepta = "Debe aceptar los términos para guardar e imprimir";

  return newErrors;
};

