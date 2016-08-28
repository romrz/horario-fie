# Horario FIE
**Horario FIE** es una aplicación web para facilitar a los estudiantes la planeación los horarios.

## ¿Cómo funciona?
Cuando se selecciona alguna materia, se realiza una petición a la [API de Horario FIE](https://github.com/romrz/horario-fie-api).
Ésta a su vez realiza una petición **POST** a la página https://escolar.fie.umich.mx/actual/estudiante/materia-sig.php pasándole como parámetro la clave de la materia que se desea consultar.

La petición devuelve el contenido de la página HTML (que se vería en el navegador si la petición la hubiera hecho un usuario) en el que se encuantra toda la información de la materia.

Como la información de la materia se encuentra esparcida por toda la página HTML, se debe extraer solo la información relevante de la materia. Para esto se utiliza **JQuery**, que hace muy fácil obtener dicha información.

La información de la materia se almacena en Objetos de Javascript que facilitan su manipulación para poder calcular todos los posibles horarios de las materias seleccionadas.

## ¿Quieres contribuir?
Genial! Echa un vistazo a como contribuir en [aquí](https://github.com/romrz/horario-fie/blob/master/CONTRIBUTING.md)