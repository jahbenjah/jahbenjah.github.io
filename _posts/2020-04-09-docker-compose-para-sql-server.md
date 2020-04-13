---
layout: post
title: "Docker Compose para SQL Server en Linux"
categories: slqserver
permalink: /:categories/:title:output_ext
description: Archivo docker-compose.yml para SQL Server en Linux 
---

Hola qué tal en este articulo les voy a mostrar cómo ejecutar un contenedor de Docker para SQL Server usando Docker Compose básicamente esta forma de ejecutar SQL Server es de utilidad en en entornos de pruebas de desarrollo. La idea surgió después de ver un vídeo del Pelado Nerd en el qué crea un archivo Docker Compose para una instancia de Wordpress con MySQL mientras estaba viendo y me dije bueno yo puedo hacer algo similar con SQL Server y ASP.NET Core me ayudará para mis pruebas personales.

Como tal lo primero que quiero sepas es que las imágenes de SQL Server para Linux se encuentran en el Docker Hub. Puedes obtener las imágenes con el comando `docker pull mcr.microsoft.com/mssql/server:2019-latest` donde se especifica la última version del contenedor de SQL Server al momento de escribir este articulo. Debes notar que la ultima version siempre está etiquetada con el año de la edición seguida de la leyenda `latest` por ejemplo : `mcr.microsoft.com/mssql/server:2017-latest` o `mcr.microsoft.com/mssql/server:2019-latest`.
En el caso de que tú quieres requieres otra imagen en específico por acá está la tabla de todas las etiquetas que puedes usar:

## SQL Server en un contenedor Docker

Una cosa importante que incluye el Docker Hub son ejemplos de cómo ejecutar el contenedor para SQL Server. Básicamente utilizan el comando 

```bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-CU8-ubuntu
```
En este comando se esta especificando las variables de entorno ACCEPT_EULA ,SA_PASSWORD y MSSQL_PID están sirven para aceptar la licencia de SQL Server, definir el password del usuario _sa_ y definir la edición que usara el contenedor.

Debes tener en cuenta los requerimientos mínimos que necesita SQL Server. Se necesitan por lo menos 2GB para las versiones más recientes y 3GB para las versiones anteriores.

Las ediciones disponibles de SQL Server disponibles son la de Developer, Express, Standard, Enterprise y la Enterprise Core.
 
## SQL Server en un Docker Compose

Bueno pues sin más detalles pasamos usar Docker Compose, básicamente este usa las mismas opciones que ejecutar _docker_ de la forma tradicional con la linea de comandos `docker run` pero como tienes tantas opciones lo que hace realmente difícil o casi imposible aprendérselo de memoria.

Cuando vi la opción del Docker Compose me atrajo por el hecho de que puedes agregarlo a un repositorio con control de código fuente y puedes reutilizarlo en varios entornos ya que todo lo necesario esta en el archivo llamado `docker-compose.yml`. Este archivo define todas las opciones para crear el contenedor.

> Observa que se esta usando la etiqueta específica de la imagen de Docker.Es recomendable siempre ser muy explícito en la versión que quieres para la imagen de Docker y asi evitar que actualizaciones puedan generar problemas en tú código o tengas que estar constantemente descargando la imagen más nueva porque ya cambio.

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
* Específica al usuario: en este caso estamos usando el usuario de _root_ 
* Define el nombre que le se asignara al contenedor : _sqlserver2019_
* Define los puertos a redireccionar : es decir el puerto del host lo va a redireccionar al puerto del contenedor como pueden ver este es el puerto estándar que usa SQL Server.
* Especifica los valores de las variables de entorno.
* Define una volumen de Docker.

> Es una mala práctica usar el usuario _root_ en un contenedor. Lo estoy usando asi porque es como la forma que logré hacerlo funcionar porque ya que he tenido varias problemas para iniciarlos si usuario _root_. 

El el punto de la definición del volumen es donde me ha costado más trabajo hacerlo funcionar porque es necesario definir los permisos para la carpeta. Al definir el volumen lo le decimos a Docker es que persitan los datos después de que el contenedor puede ser eliminado o creado o actualizado la idea es que en este caso `~/docker/sqlserver-data` es un directorio que está en máquina actual y `/var/opt/mssql` es el directorio que está dentro de el contenedor que es la ruta que usa SQL Server para guardar los archivos *.mdf* y *ldf*.

Para crear la carpeta que utilizaremos para el volumen ejecutamos los siguientes comandos:

```bash
mkdir ~/docker/sqlserver-data
sudo chgrp -R 0 ~/docker/sqlserver-data
sudo chmod -R g=u ~/docker/sqlserver-data
```

Una vez creado el volumen ya podemos ejecutar el contenedor usando Docker Compose. Ubicate en el directorio donde se encuentra el archivo `docker-compose.yml` y ejecuta 

```docker
 docker-compose up -d 
```

La opción -d sirve para especificar que el contenedor debe permanecer corriendo. Finalmente podemos ver el contenedor esta corriendo con 

```
docker ps

CONTAINER ID        IMAGE                                                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
c4b5ea35cf60        mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04   "/opt/mssql/bin/perm…"   22 hours ago        Up 4 hours          0.0.0.0:1433->1433/tcp   sqlserver2019

```

La salida de este comando nos dice el id del contenedor, los puertos, el nombre del contenedor **sqlserver2019**, el tiempo que lleva corriendo.

## Conectarse SQL Server en un contenedor

Para diagnosticar problemas en el contenedor de SQL Server puedes usar la extensión d Docker para Visual Studio Code. Esta te permite ver los contenedores corriendo actualmente y también puedes ver los logs de la creación del contenedor que pueden ser muy útiles para encontrar errores.

<img data-src="/img/ExtensionDockerVSCode.png" class="lazyload" alt="Captura de pantalla de la extensión de Docker para Visual Studio Code">

Para conectarte a SQL Server desde Visual Studio Code se puedes usar la extensión **mssql** . El proceso de instalación es muy sencillo. En su Visual Studio Code busca en las extensiones : mssql y da clic en instalar. 

Para conectarnos a SQL Server desde Visual Studio Code puedes crear un archivo *.sql* para activar la extensión **msssql** en la parte inferior podemos dar clic donde indica del estado **disconnected** para crear un nuevo perfil de conexión ingresando los datos definidos en el archivo _docker-compose.yml_

<img data-src="/img/mssql.png" class="lazyload" alt="Captura de pantalla de la extensión de SQL Server para Visual Studio Code">

| Parámetro           | Valor            |
| ------------------- | ---------------- |
| hostname            | `.`  o localhost |
| databasename        | master           |
| Authentication Type | Sql Login        |
| usuario             | sa               |
| Guardar Password    | Si               |
| Perfil de conexión  | sqlserverdocker  |

Nos preguntara si queremos guardarla el perfil de conexión. La extensión de Visual Studio Code mostrara en la parte inferior que ya esta conectado con los parámetros especificados. Lo primero que haremos  es verificar la versión de SQL Server para esto ejecutamos el  `SELECT @@version` que es una variable global que define la versión. Como les decía, este fue inspirado en el vídeo del Pelado Nerd y como una forma de tributo creare una base de datos llamada `PeladoNerd` y insertaremos unas de las frases que utiliza en uno de sus vídeo en la tabla llamada `Peladeces`:

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

Después de ejecutar  estas sentencias SQL podemos revisar la nueva base de datos se encuentre en la carpeta definida por el volumen:

## Conclusión

Esta forma de usar SQL Server sirve para probar el concepto de Servicio en Docker Compose. El comando que podemos usar para detener el contenedor es `docker-compose down`. La ventaja de usar los volumen de Docker es que nuestras bases de datos quedan en la carpeta local y podemos detiene y ejecutar el contenedor. Todo este escenario esta pensando principalmente para entornos de desarollo y es un primer paso para pensar en entornos de producción.

Este artículo es una transcripción con algunos ajustes del video. Si prefieres ver el video aquí lo tienes. Hay material nuevo que no esta incluido en el blog.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j-aBeIY0Js8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
