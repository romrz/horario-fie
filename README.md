# Horario FIE
Horario FIE es una aplicación web dirigida para facilitar a los estudiantes la planeación nuestros horarios.

## ¿Cómo funciona?
Cuando se selecciona alguna materia, se realiza una petición a la página de escolar.fie: escolar.fie.umich.mx/actual/estudiante/materia-sig.php (De esta manera siempre se obtiene la información actualizada de las materias).
Esta petición se realiza por el método POST con la clave de la materia como parámetro.

Una vez realizada la petición se obtiene el contenido de la respuesta, es decir, el contenido HTML que se vería en el navegador si la petición la hubiera hecho un usuario. Este HTML contiene toda la información necesaria de la materia para poder calcular todos los posibles horarios. Para obtener esta información se utiliza JQuery.

Cuando se obtiene la información de la materia, ahora solo se calculan todos los posibles horarios para las materias seleccionadas y se muestran al usuario. :D