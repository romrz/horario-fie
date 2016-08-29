# ¿Cómo contribuir?

## Crea un *issue*
Si encuentras algún error en la aplicación, o si tienes alguna duda acerca del proyecto, entonces crea un *issue*.
Sé lo más claro posible al describir el error e incluye toda la información necesaria para recrear el error, así como caputas de pantalla, mensajes de errores, etc.

## Haz un *Fork* del repositorio y clónalo localmente
Si deseas contribuir al código, empieza por revisar la lista de *issues* actuales o crea uno nuevo.
Cuando hayas elegido algún *issue* en el que quieras trabajar, haz un *Fork* del repositorio, haciendo click en el botón **Fork**.
Ahora clona el fork del repositorio localmente para que puedas empezar a trabajar.
Utiliza el comando: `git clone https://gtihub.com/tu-usuario/horario-fie.git`

## Crea una nueva *Branch* para tus modificaciones
Para empezar a trabajar en tus modificaciones, haz un *branch* con un nombre descriptivo o con el id del *issue* el el que estés trabajando.

## Instala las dependencias del proyecto
Ya está casi todo listo para empezar! Pero antes hay que instalar las dependencias del proyecto(GulpJS, Bootstrap, JQuery, etc).
Ejecuta el comando: `npm install`. (Nota: se necesita tener instalado *npm* el cuál a su vez necesita *NodeJS*)
Espera a que se instalen las dependencias necesarias y ahora sí está todo listo para empezar a programar!

## Implementa la funcionalidad necesaria
Esta es la parte en donde está toda la diversión :D
Ahora ya puedes empezar a programar. Sin embargo, es recomendable tener un flujo de trabajo adecuado. Revisa el flujo de trabajo recomendado al final de este documento.

## Crea un *Pull Request*
Cuando hayas terminado, haz un *pull request* desde tu repositorio y espera a que sea aceptado o a recibir feedback.


## Flujo de trabajo recomendado
Como podrás notar, **Horario FIE** utiliza **Gulp** para facilitar un poco las cosas.
Básicamente lo que hace **Gulp** es preparar los archivos para produccion (compactarlos y concatenarlos, etc).

El flujo básico de trabajo es realizar cambios a los archivos fuente, ejecutar gulp para generar los archivos y probar los cambios en el navegador.

A continuación se listan los pasos a seguir:

Los primeros tres pasos solo se ejecutan una vez, antes de empezar a trabajar.

1. Ejecuta `gulp`. Genera por primera vez la carpeta *public/*.
2. Ejecuta `gulp watch`. *Observa* los archivos fuente para generar los correspondientes en *public/* cada vez que se modifica alguno (Puedes saltarte este paso y hacerlo manualmente cada vez que se modifique un archivo, ejecutando simplemente `gulp` en la terminal).
3. Ejecuta un servidor web local. Puedes ver la aplicación sin ningún servidor web local. Pero es muy recomendable utilizar uno. Puedes utilizar cualquier servidor web. Una manera fácil y rápida es con PHP: `php -S localhost:8000 -t public/`

5. Realiza modificaciones como normalmente lo harías.
6. Prueba los cambios en el navegador (o como tu quieras).
