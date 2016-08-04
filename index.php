<!DOCTYPE html>
<html>
<head>
    <title>Horarios FIE</title>
</head>
<body>

    <div class="container">
        <form id="form">
            Materia:
            <select name="materia" id="materia">
                <option value='-1' disabled>Seleccione Materia</option>
                <option  selected value='OC0400-T'>Administración</option>
                <option value='OC0613-T'>Administración de Proyectos</option>
                <option value='IA7751-T'>Administración de Sistemas Operativos</option>
                <option value='OC0401-T'>Administración II</option>
                <option value='CB7000-T'>Álgebra Lineal</option>
                <option value='CB0200-T'>Álgebra Superior</option>
                <option value='IA0620-T'>Alta Tensión</option>
                <option value='CI7102-T'>Análisis de Algoritmos</option>
                <option value='IA7730-T'>Aprendizaje automático I</option>
                <option value='IA7731-T'>Aprendizaje automático II</option>
                <option value='IA7500-T'>Bases de Datos</option>
                <option value='IA7501-T'>Bases de Datos II</option>
                <option value='IA7502-T'>Bases de Datos III</option>
                <option value='IA3010-T'>Bioelectrónica I</option>
                <option value='IA3011-T'>Bioelectrónica II</option>
                <option value='CB0000-T'>Cálculo I</option>
                <option value='CB0001-T'>Cálculo II</option>
                <option value='CB0002-T'>Cálculo III</option>
                <option value='CB0003-T'>Cálculo IV</option>
                <option value='IA0630-T'>Calidad de la Energía</option>
                <option value='IA0300-T'>Centrales Eléctricas</option>
                <option value='IA0301-T'>Centrales Eléctricas II</option>
                <option value='CI0200-T'>Circuitos Eléctricos I</option>
                <option value='CI0201-T'>Circuitos Eléctricos II</option>
                <option value='IA7100-T'>Compiladores</option>
                <option value='CI0020-T'>Computación Evolutiva</option>
                <option value='IA3100-T'>Comunicaciones I</option>
                <option value='IA3101-T'>Comunicaciones II</option>
                <option value='OC0200-T'>Contabilidad</option>
                <option value='CI0400-T'>Control Analógico I</option>
                <option value='CI0401-T'>Control Analógico II</option>
                <option value='IA3410-T'>Control con Lógica Difusa</option>
                <option value='IA0003-T'>Control de Máquinas Eléctricas</option>
                <option value='IA0004-T'>Control de Máquinas Eléctricas II</option>
                <option value='IA3400-T'>Control Digital I</option>
                <option value='IA3401-T'>Control Digital II</option>
                <option value='IA3422-T'>Control en el Espacio de Estado</option>
                <option value='CS0400-T'>Derecho Laboral</option>
                <option value='IA0640-T'>Diseño de Máquinas Eléctricas</option>
                <option value='IA3500-T'>Diseño y comercialización de prototipos electrónicos</option>
                <option value='IA0650-T'>Dispositivos FACTS</option>
                <option value='OC0300-T'>Economía</option>
                <option value='OC0301-T'>Economía II</option>
                <option value='CI0700-T'>Electrometría</option>
                <option value='CI0100-T'>Electrónica Analógica  I</option>
                <option value='CI0101-T'>Electrónica Analógica II</option>
                <option value='CI0102-T'>Electrónica Analógica III</option>
                <option value='IA4000-T'>Electrónica de Potencia</option>
                <option value='IA4001-T'>Electrónica de Potencia II</option>
                <option value='CI0300-T'>Electrónica Digital I</option>
                <option value='CI0301-T'>Electrónica Digital II</option>
                <option value='OC0101-T'>Estrategias De Aprendizaje</option>
                <option value='CI7100-T'>Estructuras de Datos</option>
                <option value='CS0200-T'>Ética Profesional</option>
                <option value='CS0100-T'>Expresión Oral y Escrita</option>
                <option value='CS0101-T'>Expresión Oral y Escrita II</option>
                <option value='IA3110-T'>Fibras Ópticas</option>
                <option value='CS0201-T'>Filosofía de la ciencia</option>
                <option value='CB0100-T'>Física I</option>
                <option value='CB0101-T'>Física II</option>
                <option value='CB0103-T'>Física III</option>
                <option value='OC0610-T'>Formación de Emprendedores</option>
                <option value='IA0400-T'>Fuentes Alternas de Energía</option>
                <option value='IA7200-T'>Graficación</option>
                <option value='CI7101-T'>Ingeniería de Programación</option>
                <option value='CS0000-T'>Inglés I</option>
                <option value='CS0001-T'>Inglés II</option>
                <option value='CS0002-T'>Inglés III</option>
                <option value='CS0003-T'>Inglés IV</option>
                <option value='IA0100-T'>Instalaciones Eléctricas</option>
                <option value='IA3000-T'>Instrumentación I</option>
                <option value='IA3001-T'>Instrumentación II</option>
                <option value='IA3003-T'>Instrumentación Inalámbrica</option>
                <option value='IA3002-T'>Instrumentación Virtual</option>
                <option value='IA7700-T'>Inteligencia Artificial</option>
                <option value='IA7800-T'>Investigación de Operaciones</option>
                <option value='IA7500-L'>Laboratorio de Bases de Datos</option>
                <option value='CB0000-L'>Laboratorio de Cálculo I</option>
                <option value='IA3100-L'>Laboratorio de Comunicaciones I</option>
                <option value='IA3101-L'>Laboratorio de Comunicaciones II</option>
                <option value='CI0400-L'>Laboratorio de Control Analógico I</option>
                <option value='CI0401-L'>Laboratorio de Control Analógico II</option>
                <option value='IA0003-L'>Laboratorio de Control de Máquinas Eléctricas</option>
                <option value='IA0004-L'>Laboratorio de Control de Máquinas Eléctricas II</option>
                <option value='IA3400-L'>Laboratorio de Control Digital I</option>
                <option value='IA3401-L'>Laboratorio de Control Digital II</option>
                <option value='CI0700-L'>Laboratorio de Electrometría</option>
                <option value='CI0100-L'>Laboratorio de Electrónica Analógica I</option>
                <option value='CI0101-L'>Laboratorio de Electrónica Analógica II</option>
                <option value='CI0102-L'>Laboratorio de Electrónica Analógica III</option>
                <option value='IA4000-L'>Laboratorio de Electrónica de Potencia</option>
                <option value='IA4001-L'>Laboratorio de Electrónica de Potencia II</option>
                <option value='CI0300-L'>Laboratorio de Electrónica Digital I</option>
                <option value='CI0301-L'>Laboratorio de Electrónica Digital II</option>
                <option value='CB0100-L'>Laboratorio de Física I</option>
                <option value='CB0101-L'>Laboratorio de Física II</option>
                <option value='CB0103-L'>Laboratorio de Física III</option>
                <option value='IA7200-L'>Laboratorio de Graficación</option>
                <option value='OC0000-L'>Laboratorio de Herramientas Computacionales</option>
                <option value='IA3000-L'>Laboratorio de Instrumentación I</option>
                <option value='IA3001-L'>Laboratorio de Instrumentación II</option>
                <option value='IA3002-L'>Laboratorio de Instrumentación Virtual I</option>
                <option value='IA7700-L'>Laboratorio de Inteligencia Artificial</option>
                <option value='IA0000-L'>Laboratorio de Máquinas Eléctricas I</option>
                <option value='IA0001-L'>Laboratorio de Máquinas Eléctricas II</option>
                <option value='IA0002-L'>Laboratorio de Máquinas Eléctricas III</option>
                <option value='IA3200-T'>Laboratorio de Microcontroladores</option>
                <option value='IA3201-T'>Laboratorio de Microcontroladores II</option>
                <option value='IA7300-L'>Laboratorio de Paradigmas de Programación</option>
                <option value='IA3300-L'>Laboratorio de Procesamiento Digital de Señales</option>
                <option value='IA3301-L'>Laboratorio de Procesamiento Digital de Señales II</option>
                <option value='CI0000-L'>Laboratorio De Programación de Computadoras</option>
                <option value='CB0500-L'>Laboratorio de Química</option>
                <option value='IA7600-L'>Laboratorio de Redes de Computadoras</option>
                <option value='CI7200-L'>Laboratorio de Sistemas Operativos</option>
                <option value='CB0102-L'>Laboratorio de Teoría Electromagnética I</option>
                <option value='CI0500-L'>Laboratorio de Teoría Electromagnética II</option>
                <option value='CB0501-L'>Laboratorio de Termodinámica</option>
                <option value='IA7720-L'>Laboratorio de visión computacional I</option>
                <option value='CI7001-T'>Lenguajes Formales y Autómatas</option>
                <option value='IA7000-T'>Lógica</option>
                <option value='IA0000-T'>Máquinas Eléctricas I</option>
                <option value='IA0001-T'>Máquinas Eléctricas II</option>
                <option value='IA0002-T'>Máquinas Eléctricas III</option>
                <option value='IA0900-T'>Máquinas Hidráulicas</option>
                <option value='OC0612-T'>Marco Legislativo Empresarial</option>
                <option value='CB0004-T'>Matemáticas Básicas</option>
                <option value='CI7000-T'>Matemáticas Discretas</option>
                <option value='OC0611-T'>Mercadotecnia</option>
                <option value='CB0300-T'>Métodos Numéricos</option>
                <option value='CI7300-T'>Modelos Probabilistas</option>
                <option value='IA0610-T'>Operación de Sistemas Eléctricos</option>
                <option value='CB0010-T'>Optimización I</option>
                <option value='CB0011-T'>Optimización II</option>
                <option value='IA3020-T'>Optoelectrónica</option>
                <option value='IA7400-T'>Organización de Computadoras</option>
                <option value='IA7300-T'>Paradigmas de Programación</option>
                <option value='CB0600-T'>Probabilidad y Estadística</option>
                <option value='IA3300-T'>Procesamiento Digital de Señales</option>
                <option value='IA3301-T'>Procesamiento Digital de Señales II</option>
                <option value='CI0001-T'>Programación concurrente</option>
                <option value='CI0000-T'>Programación de Computadoras</option>
                <option value='CI0002-T'>Programación de Computadoras II</option>
                <option value='CI0010-T'>Programación en tiempo real</option>
                <option value='CI0011-T'>Programación Web y Objetos Distribuidos</option>
                <option value='PROHIBID'>PROHIBIDO por división del grupo en carreras</option>
                <option value='IA0200-T'>Protección y Control de Sistemas Eléctricos</option>
                <option value='IA0201-T'>Protección y Control de Sistemas Eléctricos II</option>
                <option value='CB0500-T'>Química</option>
                <option value='IA7600-T'>Redes de Computadoras</option>
                <option value='IA7601-T'>Redes de Computadoras II</option>
                <option value='IA7602-T'>Redes de Computadoras III</option>
                <option value='IA7603-T'>Redes de Computadoras IV</option>
                <option value='IA3430-T'>Robótica I</option>
                <option value='IA3431-T'>Robótica II</option>
                <option value='IA7740-T'>Robótica móvil I</option>
                <option value='IA7741-T'>Robótica móvil II</option>
                <option value='IA7750-T'>Seguridad Informática</option>
                <option value='OC0500-T'>Seminario de Tesis</option>
                <option value='CI1000-T'>Simulación I</option>
                <option value='CI1001-T'>Simulación II</option>
                <option value='IA7710-T'>Síntesis y reconocimiento de voz</option>
                <option value='OC0600-T'>Sistemas de Gestión de la Calidad</option>
                <option value='IA3103-T'>Sistemas de televisión por cable</option>
                <option value='IA0500-T'>Sistemas Eléctricos de Distribución</option>
                <option value='IA0501-T'>Sistemas Eléctricos de Distribución II</option>
                <option value='IA0600-T'>Sistemas Eléctricos de Potencia</option>
                <option value='IA0601-T'>Sistemas Eléctricos de Potencia II</option>
                <option value='IA0800-T'>Sistemas Eléctricos Industriales</option>
                <option value='CI7200-T'>Sistemas Operativos</option>
                <option value='CS0300-T'>Sociología</option>
                <option value='IA0700-T'>Subestaciones Eléctricas</option>
                <option value='OC0100-T'>Técnicas de Estudio</option>
                <option value='CI0600-T'>Tecnología de Materiales</option>
                <option value='IA3102-T'>Telefonía Celular</option>
                <option value='IA3420-T'>Teoría de control moderna I</option>
                <option value='IA3421-T'>Teoría de control moderna II</option>
                <option value='CI7002-T'>Teoría de la Computación</option>
                <option value='CB0102-T'>Teoría Electromagnética I</option>
                <option value='CI0500-T'>Teoría Electromagnética II</option>
                <option value='CB0501-T'>Termodinámica</option>
                <option value='IA0660-T'>Transitorios Electromagnéticos</option>
                <option value='IA7720-T'>Visión Computacional I</option>
                <option value='IA7721-T'>Visión Computacional II</option>
                </select>
            <input type="submit" value="Aceptar">
        </form>

        <div class="plans">
        </div>

        <div class="plan-div-blueprint" style="visibility: hidden">
            <div class="plan">
                <div class="groups">
                    <ul></ul>
                </div>
                <div class="schedule">
                    <table>
                        <tr><td>Hora</td><td>Lun</td><td>Mar</td><td>Mie</td><td>Jue</td><td>Vie</td></tr> 
                        <tr><td>7 - 8</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>8 - 9</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>9 - 10</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>10 - 11</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>11 - 12</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>12 - 13</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>13 - 14</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>14 - 15</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>15 - 16</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>16 - 17</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>17 - 18</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>18 - 19</td><td></td><td></td><td></td><td></td><td></td></tr> 
                        <tr><td>19 - 20</td><td></td><td></td><td></td><td></td><td></td></tr> 
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="js/jquery.js"></script>
    <script src="js/app.js"></script>
</body>
</html>