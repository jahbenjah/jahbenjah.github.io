---
layout: post
title:  "Enviar un correo con C# y Gmail: Windows Forms"
comments: true
categories: .net smtp SmptClient dotnet 
---



Asumimos que tienes habilitado el control de acceso de apliaciones no seguras como se describe en[2018-07-22-enviar-un-correo-con-csharp-gmail.markdown]. y que tienes instalado VIsual Studio 2017.

1. Crear un proyecto de Aplicacion de Escritorio para windows
2. Agregar un archivo de configuración AppSettings.xml
```xml
<?xml version="1.0" encoding="utf-8" ?>  
<configuration>  
    <startup>   
        <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.5" />  
    </startup>  
  <appSettings>  
    <add key="Setting1" value="May 5, 2014"/>  
    <add key="Setting2" value="May 6, 2014"/>  
  </appSettings>  
</configuration>  
```
3. Proyecto de .NET Standar

4. Agregar referencia

5. Un textbox
6. Unt botton
7. Manejador de eventos

