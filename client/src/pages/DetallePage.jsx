import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerDatosModulo } from '../services/api';
import jsPDF from 'jspdf';

function DetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [datos, setDatos] = useState(null);

  const toStr = (v) => (v === null || v === undefined ? '' : String(v));

  const generarPDF = (datos) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

    const left = 10;
    const right = 200;
    const anchoTexto = right - left;
    const xPositions = [left, left + 50, left + 100, left + 150];

    const dibujarCopia = (startY) => {
      doc.setFontSize(14);
      doc.text('Hospital Civil de Guadalajara', 105, startY, { align: 'center' });

      doc.setFontSize(10);
      const subtitulo =
        'Formato de Solicitud de Servicios para hacer uso del Expediente Clínico Electrónico del O.P.D.';
      const subLines = doc.splitTextToSize(subtitulo, anchoTexto);
      doc.text(subLines, 105, startY + 6, { align: 'center' });

      doc.setFontSize(10);
      doc.text(`Folio: ${toStr(datos.folio)}`, left, startY + 13);
      doc.text(`Fecha de la solicitud: ${new Date().toLocaleDateString()}`, 140, startY + 13);

      doc.setLineWidth(0.1);
      doc.line(left, startY + 15, right, startY + 15);

      let y = startY + 20;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Datos Médicos del Solicitante', left, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      let col = 0;
      const datosMedicos = [
        ['Nombre del solicitante', toStr(datos.nombre)],
        ['Médico adscrito', toStr(datos.med)],
        ['Cédula', toStr(datos.cedula)],
        ['CURP', toStr(datos.curp)],
        ['Categoria', toStr(datos.cate)],
        ['Vigencia', datos.vig ? new Date(datos.vig).toLocaleDateString() : ''],
        ['Celular', toStr(datos.cel)]
      ];

      datosMedicos.forEach((campo, index) => {
        const [label, valor] = campo;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`${label}: ${valor}`, xPositions[col], y);
        col++;
        if (col === 4 || index === 0 || index === 3) {
          col = 0;
          y += 5;
        }
      });

      y += 8;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Servicios Solicitados', left, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      const servicios = [
        ['Servicios', toStr(datos.servicios)],
        ['Solicitudes', toStr(datos.sol)],
        ['Optativas', toStr(datos.opta)],
        ['Notas', toStr(datos.notas)]
      ];

      col = 0;
      servicios.forEach((campo) => {
        const [label, valor] = campo;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');

        const valorLines = doc.splitTextToSize(valor, anchoTexto - 5);

        if (valorLines.length === 1) {
          doc.text(`${label}:`, xPositions[col], y);
          doc.setFont(undefined, 'normal');
          doc.text(valorLines, xPositions[col] + 20, y);
          y += 5;
        } else {
          doc.setFontSize(8);
          doc.text(`${label}:`, xPositions[col], y);
          doc.setFont(undefined, 'normal');
          doc.text(valorLines, xPositions[col] + 12, y, { lineHeightFactor: 1.2 });
          y += valorLines.length * 3.2;
        }
      });

      y += 5;
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      const leyenda =
        'Por este medio acepto y me comprometo a guardar sigilo y confidencialidad...';
      const leyendaLines = doc.splitTextToSize(leyenda, anchoTexto - 5);
      doc.text(leyendaLines, left, y);
      y += leyendaLines.length * 3.2;

      y += 18;
      doc.line(left, y, left + 85, y);
      doc.line(left + 105, y, right, y);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Firma del Médico', left + 25, y + 6);
      doc.text('Mesa de Ayuda', left + 125, y + 6);
      doc.setFont(undefined, 'normal');
    };

    dibujarCopia(15);
    dibujarCopia(150);

    doc.setDrawColor(150);
    doc.setLineWidth(0.5);
    doc.line(left, 140, right, 140);

    return doc;
  };

  useEffect(() => {
    async function cargarDatos() {
      try {
        const res = await obtenerDatosModulo(id);
        setDatos(res);

        // Generar PDF e imprimir SOLO UNA VEZ
        const doc = generarPDF(res);
        const pdfBlob = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfBlob);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = pdfURL;
        document.body.appendChild(iframe);

        iframe.onload = () => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        };
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    }
    cargarDatos();
  }, [id]);

  if (!datos) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Generando PDF del Módulo #{id}</h2>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        Volver al formulario
      </button>
    </div>
  );
}

export default DetallePage;

/*import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDatosModulo } from '../services/api';
import { useNavigate } from 'react-router-dom';

import jsPDF from 'jspdf';

function DetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [datos, setDatos] = useState(null);
  const [mostrarBoton, setMostrarBoton] = useState(false);


  const toStr = (v) => (v === null || v === undefined ? '' : String(v));

  const generarPDF = (datos, abrir = true) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

    // Márgenes reducidos
    const left = 10;
    const right = 200;
    const anchoTexto = right - left;
    const xPositions = [left, left + 50, left + 100, left + 150];

    const dibujarCopia = (startY) => {
      // Encabezado
      doc.setFontSize(14);
      doc.text('Hospital Civil de Guadalajara', 105, startY, { align: 'center' });

      doc.setFontSize(10);
      const subtitulo =
        'Formato de Solicitud de Servicios para hacer uso del Expediente Clínico Electrónico del O.P.D.';
      const subLines = doc.splitTextToSize(subtitulo, anchoTexto);
      doc.text(subLines, 105, startY + 6, { align: 'center' });

      // Folio y fecha
      doc.setFontSize(10);
      doc.text(`Folio: ${toStr(datos.folio)}`, left, startY + 13);
      doc.text(`Fecha de la solicitud: ${new Date().toLocaleDateString()}`, 140, startY + 13);

      // Línea divisoria
      doc.setLineWidth(0.1);
      doc.line(left, startY + 15, right, startY + 15);

      // Sección: Datos médicos
      let y = startY + 20;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Datos Médicos del Solicitante', left, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      let col = 0;
      const datosMedicos = [
        ['Nombre del solicitante', toStr(datos.nombre)],
        ['Médico adscrito', toStr(datos.med)],
        ['Cédula', toStr(datos.cedula)],
        ['CURP', toStr(datos.curp)],
        ['Categoria', toStr(datos.cate)],
        ['Vigencia', datos.vig ? new Date(datos.vig).toLocaleDateString() : ''],
        ['Celular', toStr(datos.cel)]
      ];

      datosMedicos.forEach((campo, index) => {
        const [label, valor] = campo;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`${label}: ${valor}`, xPositions[col], y); // <-- label y valor en la misma línea
        col++;
        if (col === 4 || index === 0 || index === 3) {
          col = 0;
          y += 5;
        }
      });

      // Línea divisoria
    //  y += 12;
     // doc.line(left, y, right, y);

      // Sección: Servicios solicitados
      y += 8;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Servicios Solicitados', left, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      const servicios = [
        ['Servicios', toStr(datos.servicios)],
        ['Solicitudes', toStr(datos.sol)],
        ['Optativas', toStr(datos.opta)],
        ['Notas', toStr(datos.notas)]
      ];

      col = 0;
      servicios.forEach((campo, index) => {
        const [label, valor] = campo;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');

        const valorLines = doc.splitTextToSize(valor, anchoTexto-5);

        // Si el texto cabe en una sola línea
        if (valorLines.length === 1) {

        doc.text(`${label}:`, xPositions[col], y); // etiqueta
        doc.setFont(undefined, 'normal');
        doc.text(valorLines, xPositions[col] + 20, y);
          y += 5; // avanzar un renglón normal
        } else {
          // Si el texto es largo y se dividió en varias líneas
          doc.setFontSize(8);  
          doc.text(`${label}:`, xPositions[col], y); // etiqueta
          doc.setFont(undefined, 'normal');
          doc.text(valorLines, xPositions[col] + 12, y, { lineHeightFactor: 1.2 });

          // Avanzar según el número de líneas que ocupó
          y += valorLines.length * 3.2;
        }
    
      
      });

      // Leyenda legal antes de firmas
      y += 5;
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');

      const leyenda =
      'Por este medio acepto y me comprometo a guardar sigilo y confidencialidad de la información correspondiente al Expediente Electrónico utilizado por el O.P.D Hospital Civil de Guadalajara, de conformidad con la NORMA Oficial Mexicana NOM-024-SSA3-2010, así como lo establecido en el art. 21 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Jalisco y sus Municipios, en relación con la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios, referente a "los datos personales de una persona física identificada o identificable", que se recaban en la institución para fines de atención médica.';
      const leyendaLines = doc.splitTextToSize(leyenda, anchoTexto - 5);
      doc.text(leyendaLines, left, y);
      y += leyendaLines.length * 3.2;

      // Firmas
      y += 18;
      doc.line(left, y, left + 85, y);
      doc.line(left + 105, y, right, y);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Firma del Médico', left + 25, y + 6);
      doc.text('Mesa de Ayuda', left + 125, y + 6);
      doc.setFont(undefined, 'normal');
    };

    // Primera copia
    dibujarCopia(15);

    // Segunda copia
    dibujarCopia(150);

    // Línea divisoria central
    doc.setDrawColor(150);
    doc.setLineWidth(0.5);
    doc.line(left, 140, right, 140);

 
  if(abrir) { 
  if (!datos) return;
  const doc = generarPDF(datos, false);
  const pdfBlob = doc.output('blob');
  const pdfURL = URL.createObjectURL(pdfBlob);

  // Crear un iframe oculto
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = pdfURL;
  document.body.appendChild(iframe);

 iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Escuchar el evento de impresión en la ventana principal
    window.onafterprint = () => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(pdfURL);
      navigate('/'); // ✅ regresar al formulario raíz
    };
  



   };
      
    }

    return doc;
  };
  



 useEffect(() => {
    async function cargarDatos() {
      try {
        const res = await obtenerDatosModulo(id);
        setDatos(res);
        generarPDF(res, true);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    }
    cargarDatos();
  }, [id], generarPDF);

  const imprimirPDF = () => {
  if (!datos) return;
  const doc = generarPDF(datos, false);
  const pdfBlob = doc.output('blob');
  const pdfURL = URL.createObjectURL(pdfBlob);

  // Crear un iframe oculto
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = pdfURL;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print(); // abre directamente el cuadro de impresión
  };
};

  if (!datos) return <p>Cargando...</p>;

 
}

export default DetallePage;
*/