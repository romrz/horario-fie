# ¿Cómo contribuir?

## Reportar un bug
Si encuentras un error en la aplicación y deseas reportarlo, por favor crea un *issue* en el cual describas lo más claramente posible el error y los pasos a seguir para recrearlo. Es muy recomendable que incluyas capturas de pantalla o mensajes de error si es posible.

## Contribuir al código

###### Crea un *issue*
Si encuentras algún error en la aplicación, o si tienes alguna duda acerca del proyecto, entonces crea un *issue*.
Sé lo más claro posible al describir el error e incluye toda la información necesaria para recrear el error, así como caputas de pantalla, mensajes de errores, etc.

###### Haz un *Fork* del repositorio y clónalo localmente
Si deseas contribuir al código, empieza por revisar la lista de *issues* actuales o crea uno nuevo.
Cuando hayas elegido algún *issue* en el que quieras trabajar, haz un *Fork* del repositorio, haciendo click en el botón **Fork**.
Ahora clona el fork del repositorio localmente para que puedas empezar a trabajar.
Utiliza el comando: `git clone https://gtihub.com/your-username/horario-fie.git`

###### Crea una nueva *Branch* para tus modificaciones
Para empezar a trabajar en tus modificaciones, haz un *branch* con un nombre descriptivo o con el id del *issue* el el que estés trabajando.

###### Instala las dependencias del proyecto
Ya está casi todo listo para empezar! Pero antes hay que instalar las dependencias del proyecto(GulpJS, Bootstrap, JQuery, etc).
Ejecuta el comando: `npm install`. (Nota: se necesita tener instalado *npm*)
Ahora sí está todo listo para empezar a programar!

###### Workflow recomendado
1. Ejecuta `gulp`. Esto genera la carpeta *public/* que contiene los archivos minimizados y listos para subir al servidor en produccion. (Ésta es generada automaticamente por *Gulp* y no se debe modificar nunca!)
2. Ejecuta `gulp watch`. Esto mantiene a gulp *observando* los archivos dentro de la carpeta *src/*. De esta manera, cada vez que se modifique un archivo, se generaran los archivos correspondientes dentro de la carpeta *public/*. Alternativamente puedes ejecutar `gulp` cada vez que modifiques un archivo.
3. Ejecuta un servidor web local. Cualquier servidor. Por facilidad yo uso: `php -S localhost:8000 -t public/`. Ejecútalo en el directorio raíz de la aplicación y listo! Ahora puedes ir a tu navegador e ir a `localhost:8000` y verás la aplicacion ejecutándose.
4. Los pasos anteriores solo se realizan una vez al empezar cada sesion de trabajo.
5. Realiza modificaciones como normalmente lo harías.
6. Prueba los cambios en el navegador (o como tu quieras).

###### Crea un *Pull Request*
Cuando hayas terminado, haz un *pull request* desde tu repositorio y espera a que sea aceptado o a recibir feedback.