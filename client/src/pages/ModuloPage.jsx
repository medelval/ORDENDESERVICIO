import { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';   //acceso al parametro de la URL en id
import { obtenerDatosModulo, enviarFormulario } from '../services/api';   //funciones y constantes de tu capa de servicios
import Formulario from '../components/Formulario';  //muestra formulario y recibe funcion de envio
// 1. IMPORTAR enviarFormulario y la URL base (si está en services/api)

function ModuloPage() {
 // 1. Capturar el parámetro dinámico de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Estado para guardar los datos
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

   // 3. Cargar datos si existe un id en la URL
  useEffect(() => {
    async function cargarDatos() {
      try {
        if (id) {
          const res = await obtenerDatosModulo(id); // GET /:id
          setDatos(res);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    }
    cargarDatos();
  }, [id]);
 
// . FUNCIÓN DE ENVÍO QUE MANEJA LA RESPUESTA Y REDIRECCIONA
    async function handleFormSubmit(datos) {
        try {
            const respuesta = await enviarFormulario(datos);

            // 🚀 LÓGICA CRÍTICA DE REDIRECCIÓN
            if (respuesta.success) {

               console.log('Guardado con folio:', respuesta.folio);
                navigate(`/${respuesta.datos.id}`);

            } else {
                // Esto maneja si la DB falla pero axios aún devuelve 200/201
                alert('Error al guardar: ' + respuesta.message);

            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);

        }
    }

    // 5. Renderizado
   if(loading) return <p>Cargando...</p>;
    return (
        <div>
             <Formulario onSubmitForm={handleFormSubmit} datos={datos} />
        </div>    
    );
}
    
export default ModuloPage;
