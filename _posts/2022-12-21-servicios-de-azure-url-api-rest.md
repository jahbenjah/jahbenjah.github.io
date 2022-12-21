---
layout: post
title:  "Algunos servicios de Azure y sus URL del API REST"
date:   2022-12-21 10:10:55 +0000
categories: azure
permalink: /:categories/:title:output_ext
description: 
image:
  path: /img/og-az900.webp
  height: 623
  width: 1190
---

Para el examen az-204 se requiere conocer la URL del API Rest de distiontos servicios de Azure. Aqui te muestro una lista que me servira como acordeon para este examen.

|Servicio de Azure        |	URL de la API REST|	Espacio de nombres .NET SDK|
|-------------------------|--------------------|--------------------------------|
|Azure Functions            |https://{azure-function-app-name}.azurewebsites.net/api/{function-name}  |Microsoft.Azure.WebJobs, Microsoft.Azure.WebJobs.Host|
|Azure Cosmos DB            |https://{cosmos-db-account-name}.documents.azure.com|	Microsoft.Azure.Cosmos|
|Azure Service Fabric       |https://management.azure.com|	Microsoft.ServiceFabric|
|Azure Virtual Machines     |https://management.azure.com|	Microsoft.Azure.|Management.Compute|
|Azure Storage              |https://{storage-account-name}.blob.core.windows.net|	Microsoft.WindowsAzure.Storage|
|Azure Event Hubs           |https://{event-hub-namespace-name}.servicebus.windows.net|	|Microsoft.Azure.EventHubs|
|Azure App Service          |https://management.azure.com|	Microsoft.Azure.Management.AppService|
|Azure Service Bus	        |https://{service-bus-namespace-name}.servicebus.windows.net  |	Microsoft.Azure.ServiceBus
|Azure Key Vault            |https://{vault-name}.vault.azure.net |Microsoft.Azure.KeyVault|

Es importante tener en cuenta que esta tabla es solo un ejemplo y hay muchos otros servicios de Azure disponibles con sus propias URLs de la API REST y clases del .NET SDK correspondientes. Además, algunos de estos servicios pueden tener más de una clase principal y pueden haber cambios en las clases y URLs de la API REST a medida que se actualizan.
