---
layout: post
title:  "Docker Compose para SQL Server en Linux"
categories: slqserver
permalink: /:categories/:title:output_ext
description: Archivo docker-compose.yml para SQL Server en Linux 
---

Hola qué tal en este articulo les voy a mostrar cómo ejecutar un contenedor de Docker para Sql Server usando Docker Compose básicamente esta forma de ejecutar SQL Server es de utilidad en en entornos de pruebas de desarrollo. La idea surgió después de ver un vídeo del Pelado Nerd en el qué crea un archivo Docker Compose para una instancia de Wordpress con MySQL y pues yo lo estaba viendo y me dije bueno yo puedo hacer algo similar con Sql Server y  me ayudará para mis pruebas personales.

Como tal lo primero que quiero sepas es que las imágenes de Sql Server para Linux se encuentran en el Docker Hub. Puedes obtener las imágenes con el comando  `docker pull <nombreimages>:etiqueta` donde las puntos importantes de este comando son:

* La última version del contenedor de SQL Server siempre está etiquetada con el año de la edición seguida de la leyenda `latest` por ejemplo : `mcr.microsoft.com/mssql/server:2017-latest` y `mcr.microsoft.com/mssql/server:2019-latest`.

* ese 40 de 2019 leyes en el caso de que tú quieres requieres otra imagen en específico por acá está la tabla de todas las etiquetas que puedes usar y 


Otra cosa importante del Docker Hub es que incluye ejemplos de cómo correr el contenedor para SQL Server. Básicamente  utilizan el comando 

```docker
docker run
```
En este comando se esta especificando las variables de entorno están las acepto en la sirve para aceptar la licencia de sql server como todos sabemos que SQL Server es un software privado que requiere una licencia 

y el esta variable de entorno también usar la opción a no sé si no para definir el par el password desea que es el clásico usuario de administrador desde cuales server el pay sirve para redireccionar los puertos entre el host si el contenedor aquí estamos utilizando el puerto por default la opción de nos de sirve para ejecutar tareas de larga duración es decir que se puede hacer ver cómo es una base de datos siempre tienen que estar ejecutando y esperando a que hagan acciones con ella entonces la idea de también va otra es la imagen la imagen con la etiqueta específica que quieren usarlo acá 

Más abajo ejecutan y describen los parámetros de configuración y los requerimientos mínimos de que necesita SQL Server en este caso necesita por lo menos 2 gb para las versiones más recientes y 3 gb para las versiones anteriores a esta etiqueta. 

Las variables del entorno que vamos a usar nosotros básicamente son estas tres:

 la de aceptar la licencia 
 definir el password de el usuario sa 
 definir la edición 
 
 Dentro de las ediciones de SQL Server posibles está la de Developer ,Satandar , Enterprise y la Enterprise Core.
 
bueno pues sin más pasamos al tocar con vos digo lo tradicional como les decía era ejecutar un comando similar a éste pero como tienes varias opciones que realmente hace como difícil o casi imposible aprendérselo de memoria pero a mí me cuesta demasiado trabajo 


entonces creo porque cuando vi esta opción el Docker Compose lo que hace es a través de un archivo llamado `docker-compose.yml`. Este archivo define todas las opciones para crear el contenedor.

```yml
version: "3.1"

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
    user: '0:0'
    container_name: sqlserver2019
    ports:
      - 1433:1433
    environment:
      ACCEPT_EULA: Y
      SA_PASSWORD: PasswordO1.
      MSSQL_PID: Express
    volumes:
      - ~/docker/sqlserver-data:/var/opt/mssql
```

* Especifica la imagen de SQL Server : _mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04_ 
* Específica al usuario:  en este caso estamos usando el usuario de _root_ 
* Define el nombre que le se asignara al contenedor : _sqlserver2019_
* Define los puertos a redireccionar :  es decir el puerto del host lo va a redireccionar al puerto del contenedor como pueden ver este es el puerto estándar que usa SQL Server.
  
> Es una mala práctica usar el usuario _root_ en un contenedor. Lo estoy usando asi porque es como la forma que logré  hacerlo funcionar porque  ya que he tenido varias problemas para iniciarlos si usuario _root_. 

> Observa que se esta usando la etiqueta específica de la imagen de Docker.Es recomendable siempre ser muy explícito en la versión que quieres para la imagen de Docker y asi evitar que actualizaciones puedan generar problemas en tú código o tengas que estar constantemente descargando la imagen más nueva porque ya cambio.


y la parte de environment es definir los valores de las variables de entorno como os decía aquí están definidos la versión express y usamos el password en teoría el último punto que es el que donde me ha costado más trabajo hacerlo funcionar es la parte de definir un volumen un volumen lo que hace es almacenar datos después de que el contenedor puede ser eliminado o creado o actualizado la idea es que en este caso este es un directorio que está en máquina actual y este es el directorio que está dentro de el contenedor dentro del contenedor de ese culo serón para él y para linux estas las rutas que usan para almacenar los archivos de datos entonces ahorita procedemos a crear este este es el directorio y posteriormente pasaremos a ejecutar el tocar con woods para crear el contenedor que ya no será como es aquello cerrar para ayudarme a crear el directorio ya tengo el comando aquí pero es básicamente lo que hacemos es  copia de esto no vamos a copiarlo porque me estoy dando cuenta que la menos no se ha renovado entonces voy a crear en la carpeta sql server da para usted ya está aquí escuela server data de la carpeta está vacía porque él acabó de crear voy a cambiar los permisos de esta misma carpeta i ejecutó el siguiente comando en él y aún así estamos ubicados en en el directorio de donde se ubica el doctor compost 

Entonces lo que vamos a hacer es ejecutar en la terminal y debemos el comando

```docker
 docker-compose up -d 
```

La opción -d especifique que el contenedor debe permanecer corriendo y por fin más vamos este iniciamos el contenedor donde ya tenemos el contenedor corriendo podemos verificarlo con 

docker ps 

Entonces ya nos dice que es el nombre del contenedor sqlserver fue como lo define ese core sobre 2019 que fue como lo decidimos hacer lo definimos en el archivo docker-compose.yml que lleva 12 segundos creado nosotros tiene este día y está usando esta imagen como lo otro que podemos ver es entonces la carpeta madre sqlserver data ya tenemos definidos los archivos que está utilizando el contenedor ahora si nosotros creamos una nueva base en dentro de este contenedor bueno en este usando este contenedor la base de datos la escribirá acá y aquí veremos los archivos mdf y el edf entonces para conectarnos al contenedor la extensión te permite la extensión de docker para visual estudio te permite ver los contenedor que estén que estás corriendo y te permite ver también por ejemplo los blogs puedes ver ahí los blogs de la creación del contenedor y cómo nos podrías usar para cuestiones de depuración y de encontrar errores pero ahorita lo que vamos a hacer es usar la extensión de sql server 

ya bueno ya lo tengo instalada se las muestro para que si ustedes no la tienen instalada por la pueden instalar en su Visual Studio Code y ahora sí que es básicamente proceso es muy sencillo dar clic y dar instalar el éste es esta es _mssql_ entonces para ello nosotros ya abrimos un archivo de excel donde tenemos un código de en sql lo que tendremos que hacer es nos marca que estamos que no estamos conectados vamos a crear una nueva un nuevo perfil de conexión como hicimos el redireccionamiento de puertos nos vamos a conectar desde localhost que es nuestra máquina si no especificamos el puerto de busán el puerto por default tampoco vamos a especificar el nombre de la base de datos le damos Enter y 

seleccionamos sql login presionamos el usuario as y aquí vamos al password que definimos en el doker-compose 

entonces damos enter y nos pregunta si queremos guardarla en la conexión de decimos que sí decimos sql server doctor cum vos entonces ya tenemos vamos a sql ya nos dirá que estamos contados al localhost estamos usando la la base de datos master con el usuario entonces lo primero que haremos que haremos 

es verificar la versión de sql server para esto ejecutamos este comando que es select @@versión que es una variable global que define la versión del sqlserver entonces

```

```

Como les decía, este fue inspirado en el vídeo del Pelado Nerd y como una forma de tributo creare una base de datos llamada `PeladoNerd` y insertaremos unas de las frases que utiliza en uno de sus vídeo en la tabla llamada `Peladeces`:

```sql
SELECT @@version;
CREATE DATABASE PeladoNerd;
GO
USE PeladoNerd;
GO
CREATE TABLE Peladeces
(
  Id INT NOT NULL PRIMARY KEY,
  Nombre NVARCHAR(100) NOT NULL
);
GO
INSERT INTO Peladeces 
VALUES (1, N'Copado Loco'),
       (2,N'Soy Pelado y soy Nerd'),
       (3,N'Saludos Nubecita');
GO
SELECT * FROM Peladeces;

USE master;
DROP DATABASE PeladoNerd;
```

Entonces para ejecutar esto estas sentencias SQL me dice que termino lo que me hará es yo te esperaría ver la nueva base de datos es aquí está pelado nerd y pelado nerd y ya después la última cosa que haremos es consultar útil ya consultarlo las clases de las frases 
que insertamos entonces ya no más con esto probamos como que el concepto de el sardo que el conductor compuso otro comando que podemos usar es `docker-compose down` como para detener el contenedor y lo y lo este hilo y lo detiene nosotros podemos volver a ejecutarlo pero a menos de y lo volvería a ascender esto como que nos da mucho más posibilidades de decir bueno y lo estoy pensando como para desarrollar para desarrollo quiero que ya no esté ocupando ese contenido lo detiene y ya no tengo ningún problema y mis bases de datos 