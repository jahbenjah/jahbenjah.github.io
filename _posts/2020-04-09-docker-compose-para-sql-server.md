---
layout: post
title: "Docker Compose para SQL Server en Linux"
categories: slqserver
permalink: /:categories/:title:output_ext
description: Archivo docker-compose.yml para SQL Server en Linux 
---

Hola qué tal en este articulo les voy a mostrar cómo ejecutar un contenedor de Docker para SQL Server usando Docker Compose básicamente esta forma de ejecutar SQL Server es de utilidad en en entornos de pruebas de desarrollo. La idea surgió después de ver un vídeo del Pelado Nerd en el qué crea un archivo Docker Compose para una instancia de Wordpress con MySQL mientras estaba viendo y me dije bueno yo puedo hacer algo similar con SQL Server y ASP.NET Core me ayudará para mis pruebas personales.

Como tal lo primero que quiero sepas es que las imágenes de SQL Server para Linux se encuentran en el Docker Hub. Puedes obtener las imágenes con el comando `docker pull mcr.microsoft.com/mssql/server:2019-latest` donde se especifica la última version del contenedor de SQL Server al momento de escribir este articulo. Debes notar que la ultima version siempre está etiquetada con el año de la edición seguida de la leyenda `latest` por ejemplo : `mcr.microsoft.com/mssql/server:2017-latest` o `mcr.microsoft.com/mssql/server:2019-latest`.
En el caso de que tú quieres requieres otra imagen en específico por acá está la tabla de todas las etiquetas que puedes usar y 

## SQL Server en un contenedor Docker

Una coas importante que incluye el Docker Hub son ejemplos de cómo ejecutar el contenedor para SQL Server. Básicamente utilizan el comando 

```bash
docker run --name -e -e -e 
```
En este comando se esta especificando las variables de entorno ACCEPT_EULA ,SA_PASSWORD y MSSQL_PID están sirven para aceptar la licencia de SQL Server, definir el password del usuario _sa_ y definir la edición que usara el contenedor.

como todos sabemos que SQL Server es un software privado que requiere una licencia 
y el esta variable de entorno también usar la opción a no sé si no para definir el par el password desea que es el clásico usuario de administrador desde cuales server el pay sirve para redireccionar los puertos entre el host si el contenedor aquí estamos utilizando el puerto por default la opción de nos de sirve para ejecutar tareas de larga duración es decir que se puede hacer ver cómo es una base de datos siempre tienen que estar ejecutando y esperando a que hagan acciones con ella entonces la idea de también va otra es la imagen la imagen con la etiqueta específica que quieren usarlo acá 

Más abajo ejecutan y describen los parámetros de configuración y los requerimientos mínimos de que necesita SQL Server en este caso necesita por lo menos 2 gb para las versiones más recientes y 3 gb para las versiones anteriores a esta etiqueta. 

Las variables del entorno que vamos a usar nosotros básicamente son estas tres:

 la de aceptar la licencia 
 definir el password de el usuario sa 
 definir la edición 
 
Las ediciones disponibles de SQL Server disponibles son la de Developer, Express, Estandar, Enterprise y la Enterprise Core.
 
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

El el punto de la definición del volumen es donde me ha costado más trabajo hacerlo funcionar porque es necesario definir los permisos para la carpeta. 

```bash
mkdir ~/docker/sqlserver-data
sudo chgrp -R 0 ~/docker/sqlserver-data
sudo chmod -R g=u ~/docker/sqlserver-data
```

Es la parte de definir el volumen lo que hace es almacenar datos después de que el contenedor puede ser eliminado o creado o actualizado la idea es que en este caso este es un directorio que está en máquina actual y este es el directorio que está dentro de el contenedor dentro del contenedor de ese culo serón para él y para Linux estas las rutas que usan para almacenar los archivos de datos 

entonces ahorita procedemos a crear este este es el directorio y posteriormente pasaremos a ejecutar el tocar con woods para crear el contenedor que ya no será como es aquello cerrar para ayudarme a crear el directorio ya tengo el comando aquí pero es básicamente lo que hacemos es copia de esto no vamos a copiarlo porque me estoy dando cuenta que la menos no se ha renovado 

entonces voy a crear en la carpeta SQL Server da para usted ya está aquí escuela server data de la carpeta está vacía porque él acabó de crear voy a cambiar los permisos de esta misma carpeta i ejecutó el siguiente comando en él y aún así estamos ubicados en en el directorio de donde se ubica el doctor compost 

Entonces lo que vamos a hacer es ejecutar en la terminal y debemos el comando

```docker
 docker-compose up -d 
```

La opción -d especifique que el contenedor debe permanecer corriendo y por fin más vamos este iniciamos el contenedor donde ya tenemos el contenedor corriendo podemos verificarlo con 

```
docker ps

CONTAINER ID        IMAGE                                                  COMMAND                  CREATED             STATUS              PORTS                    NAMES
c4b5ea35cf60        mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04   "/opt/mssql/bin/perm…"   22 hours ago        Up 4 hours          0.0.0.0:1433->1433/tcp   sqlserver2019

```

Entonces ya nos dice que es el nombre del contenedor sqlserver fue como lo define ese core sobre 2019 que fue como lo decidimos hacer lo definimos en el archivo docker-compose.yml que lleva 12 segundos creado nosotros tiene este día y está usando esta imagen como lo otro que podemos ver es entonces la carpeta madre sqlserver data ya tenemos definidos los archivos que está utilizando el contenedor ahora si nosotros creamos una nueva base en dentro de este contenedor bueno en este usando este contenedor la base de datos la escribirá acá y aquí veremos los archivos mdf y el ldf 

## Conectarse SQL Server en un contenedor

Para diagnosticar problemas en el contenedor de SQL Server puedes usar la extensión d Docker para Visual Studio Code. Esta te permite ver los contenedores corriendo actualmente y también puedes ver los logs de la creación del contenedor que pueden ser muy útiles para cuestiones de depuración y de encontrar errores.

<img data-src="/img/ExtensionDockerVSCode.png" class="lazyload" alt="Captura de pantalla de la extensión de Docker para Visual Studio Code">

Para conectarte a SQL Server desde Visual Studio Code se puedes usar la extensión **mssql** . El proceso de instalación es muy sencillo. En su Visual Studio Code busca en las extensiones : mssql y da clic en instalar. 

Para conectarnos a SQL Server desde Visual Studio Code puedes crear un archivo *.sql* para activar la extensión **msssql** en la parte inferior podemos dar clic donde indica del estado **disconnected** para crear un nuevo perfil de conexión ingresando los datos definidos en el archivo _docker-compose.yml_

<img data-src="/img/mssql.png" class="lazyload" alt="Captura de pantalla de la extensión de SQL Server para Visual Studio Code">

|Parámetro|Valor|
|----------|-----|
| hostname |`.`  o localhost    |
| databasename | master    |  
| Authentication Type      | Sql Login   | 
| usuario  | sa    | 
| Guardar Password | Si |
| Perfil de conexión | sqlserverdocker|

usuario sa y aquí vamos al 
password que definimos en el doker-compose 


entonces damos enter y nos pregunta si queremos guardarla en la conexión de decimos que sí decimos SQL Server doctor cum vos entonces ya tenemos vamos a sql ya nos dirá que estamos contados al localhost estamos usando la la base de datos master con el usuario entonces lo primero que haremos que haremos es verificar la versión de SQL Server para esto ejecutamos este comando que es `SELECT @@version` que es una variable global que define la versión del sqlserver como les decía, este fue inspirado en el vídeo del Pelado Nerd y como una forma de tributo creare una base de datos llamada `PeladoNerd` y insertaremos unas de las frases que utiliza en uno de sus vídeo en la tabla llamada `Peladeces`:

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
que insertamos 

## Conclusión

Esta forma de usar SQL Server sirve para probar el concepto de Servicio en Docker Compose. El comando que podemos usar para detener el contenedor es `docker-compose down`. La ventaja de usar los volumen de Docker es que nuestras bases de datos quedan en la carpeta local y podemos detiene y ejecutar el contenedor. Todo este escenario esta pensando principalmente para entornos de desarollo y es un primer paso para pensar en entornos de producción.
