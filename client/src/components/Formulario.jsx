/*import { useEffect, useState } from 'react';
import axios from 'axios';
import './Formulario.css';

function Formulario({onSubmitForm = () => {}  }) {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    uh: '',
    cate: '',
    nombre: '',
    rud: '',
    curp: '',
    cedula: '',
    dgp: '',
    vig: '',
    cel: '',
    serv: [],
    opta: '',
    medico: '',
    sol: [],
    notas: '',
    acepta: false
  });

  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);
  
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = e => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormulario(prev => ({
      ...prev,
      [e.target.name]: options
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    onSubmitForm(formulario);
  }; 

  return (
  <div className="formulario-container">
    <h2>Solicitud de Servicio</h2>
    <form onSubmit={handleSubmit}>
      <h3>CAPTURA DE DATOS</h3>

      <div className="formulario-grid">
        <div>
          <label>Unidad hospitalaria *</label>
          <select name="uh" value={formulario.uh} onChange={handleChange}>
            <option value="0">Selecciona una UH</option>
            <option value="1">JIM</option>
            <option value="2">FAA</option>
            <option value="4">ORIENTE</option>
          </select>
        </div>

        <div>
          <label>Categoría *</label>
          <select name="cate" value={formulario.cate} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {categorias.map(c => (
              <option key={c.codigo_categoria} value={c.codigo_categoria}>
                {c.nom_categ}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Nombre *</label>
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
        </div>

        <div>
          <label>RUD de empleado o código de estudiante *</label>
          <input type="number" name="rud" value={formulario.rud} onChange={handleChange} maxLength="10" />
        </div>

        <div>
          <label>CURP *</label>
          <input type="text" name="curp" value={formulario.curp} onChange={handleChange} />
        </div>

        <div>
          <label>Cédula *</label>
          <input type="text" name="cedula" value={formulario.cedula} onChange={handleChange} />
        </div>

        <div>
          <label>DGP</label>
          <input type="number" name="dgp" value={formulario.dgp} onChange={handleChange} maxLength="10" />
        </div>

        <div>
          <label>Cel *</label>
          <input type="text" name="cel" value={formulario.cel} onChange={handleChange} />
        </div>

        <div>
  <label>Término de Residencia *</label>
  <input type="date" name="vig" value={formulario.vig} onChange={handleChange} />
</div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Servicio que rotará *</label>
          <select name="serv" multiple value={formulario.serv} onChange={handleMultiSelect}>
            <option value="CIRUGIA">CIRUGIA</option>
            <option value="OBSTETRICIA">OBSTETRICIA</option>
            <option value="MEDICINA INTERNA">MEDICINA INTERNA</option>
            <option value="PEDIATRIA">PEDIATRIA</option>
            <option value="URG. ADULTOS">URG. ADULTOS</option>
            <option value="URG.PEDIATRIA">URG.PEDIATRIA</option>
            <option value="URG. TOCO">URG. TOCO</option>
          </select>
        </div>

        <div>
          <label>Otras</label>
          <input type="text" name="opta" value={formulario.opta} onChange={handleChange} />
        </div>

        <div>
          <label>Médico Adscrito *</label>
          <input type="text" name="medico" value={formulario.medico} onChange={handleChange} />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label>Servicio solicitado *</label>
          <select name="sol" multiple value={formulario.sol} onChange={handleMultiSelect}>
            <option value="Instalar Expediente electrónico en Windows">Instalar Expediente electrónico en Windows</option>
            <option value="Instalar Patwin">Instalar Patwin</option>
            <option value="Alta Usuario en Expediente electrónico">Alta Usuario en Expediente electrónico</option>
            <option value="Alta en SII">Alta en SII</option>
            <option value="Instalar Expediente electrónico Mac, Android, Tableta, etc(Bajar aplicación previamente)">Instalar Expediente electrónico Mac, Android, Tableta, etc(Bajar aplicación previamente)</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label>Notas</label>
          <input type="text" name="notas" value={formulario.notas} onChange={handleChange} />
        </div>

      </div>
      <div style={{ textAlign: "justify", width: "100%", margin: "1em 0" }}>
      Por este medio acepto y me comprometo a guardar sigilo 
      y confidencialidad de la información correspondiente al Expediente Electrónico 
      utilizado por el O.P.D Hospital Civil de Guadalajara, de conformidad con 
      la NORMA Oficial Mexicana NOM-024-SSA3-2010, así como lo establecido en 
      el art. 21 de la Ley de Transparencia y Acceso a la Información Pública 
      del Estado de Jalisco y sus Municipios, en relación con la Ley de Protección 
      de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco 
      y sus Municipios, referente a "los datos personales de una persona física identificada o identificable", 
      que se recaban en la institución para fines de atención médica.
      </div>

     <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor='aceptaTerminos'>
            <input type="checkbox" name="acepta" id='aceptaTerminos' checked={formulario.acepta} onChange={handleChange} />
            Acepto los términos expuestos
          </label>
        </div>

      <div className="formulario-boton">
        <button type="submit" disabled={!formulario.acepta}>Guardar</button>
      </div>
    </form>
  </div>
);

}

export default Formulario;
*/

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Formulario.css';
import { validarFormulario } from '../utils/validaciones';

function Formulario({ onSubmitForm = () => {} }) {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    uh: '',
    cate: '',
    nombre: '',
    rud: '',
    curp: '',
    cedula: '',
    dgp: '',
    vig: '',
    cel: '',
    serv: [],
    opta: '',
    medico: '',
    sol: [],
    notas: '',
    acepta: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = e => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormulario(prev => ({
      ...prev,
      [e.target.name]: options
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validarFormulario(formulario);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmitForm(formulario);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Solicitud de Servicio</h2>
      <form onSubmit={handleSubmit}>
        <h3>CAPTURA DE DATOS</h3>

        <div className="formulario-grid">
          <div>
            <label>Unidad hospitalaria *</label>
            <select name="uh" value={formulario.uh} onChange={handleChange}>
              <option value="">Selecciona una UH</option>
              <option value="1">JIM</option>
              <option value="2">FAA</option>
              <option value="4">ORIENTE</option>
            </select>
            {errors.uh && <p className="error">{errors.uh}</p>}
          </div>

          <div>
            <label>Categoría *</label>
            <select name="cate" value={formulario.cate} onChange={handleChange}>
              <option value="">Selecciona una categoría</option>
              {categorias.map(c => (
                <option key={c.codigo_categoria} value={c.codigo_categoria}>
                  {c.nom_categ}
                </option>
              ))}
            </select>
            {errors.cate && <p className="error">{errors.cate}</p>}
          </div>

          <div>
            <label>Nombre *</label>
            <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
            {errors.nombre && <p className="error">{errors.nombre}</p>}
          </div>

          <div>
            <label>RUD de empleado o código de estudiante *</label>
            <input type="number" name="rud" value={formulario.rud} onChange={handleChange} />
            {errors.rud && <p className="error">{errors.rud}</p>}
          </div>

          <div>
            <label>CURP *</label>
            <input type="text" name="curp" value={formulario.curp} onChange={handleChange} />
            {errors.curp && <p className="error">{errors.curp}</p>}
          </div>

          <div>
            <label>Cédula *</label>
            <input type="text" name="cedula" value={formulario.cedula} onChange={handleChange} />
            {errors.cedula && <p className="error">{errors.cedula}</p>}
          </div>

          <div>
            <label>DGP</label>
            <input type="number" name="dgp" value={formulario.dgp} onChange={handleChange} />
          </div>

          <div>
            <label>Cel *</label>
            <input type="text" name="cel" value={formulario.cel} onChange={handleChange} />
            {errors.cel && <p className="error">{errors.cel}</p>}
          </div>

          <div>
            <label>Término de Residencia *</label>
            <input type="date" name="vig" value={formulario.vig} onChange={handleChange} />
            {errors.vig && <p className="error">{errors.vig}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Servicio que rotará *</label>
            <select name="serv" multiple value={formulario.serv} onChange={handleMultiSelect}>
              <option value="CIRUGIA">CIRUGIA</option>
              <option value="OBSTETRICIA">OBSTETRICIA</option>
              <option value="MEDICINA INTERNA">MEDICINA INTERNA</option>
              <option value="PEDIATRIA">PEDIATRIA</option>
              <option value="URG. ADULTOS">URG. ADULTOS</option>
              <option value="URG.PEDIATRIA">URG.PEDIATRIA</option>
              <option value="URG. TOCO">URG. TOCO</option>
            </select>
            {errors.serv && <p className="error">{errors.serv}</p>}
          </div>

          <div>
            <label>Otras</label>
            <input type="text" name="opta" value={formulario.opta} onChange={handleChange} />
          </div>

          <div>
            <label>Médico Adscrito *</label>
            <input type="text" name="medico" value={formulario.medico} onChange={handleChange} />
            {errors.medico && <p className="error">{errors.medico}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Servicio solicitado *</label>
            <select name="sol" multiple value={formulario.sol} onChange={handleMultiSelect}>
              <option value="Instalar Expediente electrónico en Windows">Instalar Expediente electrónico en Windows</option>
              <option value="Instalar Patwin">Instalar Patwin</option>
              <option value="Alta Usuario en Expediente electrónico">Alta Usuario en Expediente electrónico</option>
              <option value="Alta en SII">Alta en SII</option>
              <option value="Instalar Expediente electrónico Mac, Android, Tableta, etc(Bajar aplicación previamente)">
                Instalar Expediente electrónico Mac, Android, Tableta, etc(Bajar aplicación previamente)
              </option>
            </select>
            {errors.sol && <p className="error">{errors.sol}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Notas</label>
            <input type="text" name="notas" value={formulario.notas} onChange={handleChange} />
          </div>
        </div>

        <div style={{ textAlign: "justify", width: "100%", margin: "1em 0" }}>
          Por este medio acepto y me comprometo a guardar sigilo 
          y confidencialidad de la información correspondiente al Expediente Electrónico 
          utilizado por el O.P.D Hospital Civil de Guadalajara, de conformidad con 
          la NORMA Oficial Mexicana NOM-024-SSA3-2010, así como lo establecido en 
          el art. 21 de la Ley de Transparencia y Acceso a la Información Pública 
          del Estado de Jalisco y sus Municipios, en relación con la Ley de Protección 
          de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco 
          y sus Municipios, referente a "los datos personales de una persona física identificada o identificable", 
          que se recaban en la institución para fines de atención médica.
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor='aceptaTerminos'>
            <input
              type="checkbox"
              name="acepta"
              id='aceptaTerminos'
              checked={formulario.acepta}
              onChange={handleChange}
            />
            Acepto los términos expuestos
          </label>
          {errors.acepta && <p className="error">{errors.acepta}</p>}
        </div>

        <div className="formulario-boton">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
