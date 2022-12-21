---
layout: post
title:  "Ejemplos de cadenas de conexión de algunos servicios de Azure"
date:   2022-12-21 10:10:55 +0000
categories: azure
permalink: /:categories/:title:output_ext
description: 
image:
  path: /img/og-az900.webp
  height: 623
  width: 1190
---

Como estoy estudiando para presentar el examen AZ-204 y en los cuestionarios de entrenamiento encontre preguntas donde te mostraban un fragmento de codigo que usa una cadena de conexión para algun servicio de Azure.

|Servicio de Azure           |Ejemplo de cadena de conexión |
|----------------------------|------------------------------|
|Azure SQL Database          |Server=tcp:{server-name}.database.windows.net,1433;Initial Catalog={database-name};Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;|
|Azure Storage               |DefaultEndpointsProtocol=https;AccountName={storage-account-name};AccountKey={storage-account-key}
|Azure Service Bus           |Endpoint=sb://{service-bus-namespace-name}.servicebus.windows.net/;SharedAccessKeyName={shared-access-key-name};SharedAccessKey={shared-access-key}|
|Azure Event Hubs            |Endpoint=sb://{event-hub-namespace-name}.servicebus.windows.net/;EntityPath={event-hub-name};SharedAccessKeyName={shared-access-key-name};SharedAccessKey={shared-access-key}|
|Azure Cosmos DB             |AccountEndpoint={cosmos-db-account-endpoint};AccountKey={cosmos-db-account-key}|
|Azure Redis Cache|{redis-cache-name}.redis.cache.windows.net,abortConnect=false,ssl=true,password={redis-cache-primary-key}|
|Azure Search                |https://{search-service-name}.search.windows.net/;ApiKey={search-service-admin-key}|
|Azure Function App          |https://{function-app-name}.azurewebsites.net/|
|Azure Data Lake Storage Gen2|https://{data-lake-store-name}.dfs.core.windows.net/|
Azure Data Factory           |https://{data-factory-name}.dfs.core.windows.net/|