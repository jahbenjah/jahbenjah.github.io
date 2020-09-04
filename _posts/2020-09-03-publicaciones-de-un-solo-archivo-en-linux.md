---
layout: post
title:  "Publicación de un solo archivo en Linux"
date:   2020-09-03 09:22:47 +0000
categories: aspnetcore
permalink: /:categories/:title:output_ext
image:
  path: /img/og-runtime-compilation.jpg
  height: 503
  width: 961
description: Publica tu aplicación ASP.NET Core como un solo archivo en Linux.
---

Este corto articulo muestra el archivo de un proyecto ASP.NET Core sobre .NET 5.0 que esta configurado para publicarse como un solo archivo en Linux. El autor original de esta configuración es [Ben Adams](https://twitter.com/ben_a_adams) que lo publico en Twitter y me pareció interesante probarlo y replicarlo.

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">Is really single file on Linux in .NET 5.0 😍
<a href="https://t.co/kRgPDO2snD">https://t.co/kRgPDO2snD</a>
<a href="https://t.co/Cgmv3IMsL1">pic.twitter.com/Cgmv3IMsL1</a>
</p>&mdash; Ben Adams #BlackLivesMatter (@ben_a_adams)
<a href="https://twitter.com/ben_a_adams/status/1301388865253650433?ref_src=twsrc%5Etfw">September 3, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

La publicación de una aplicación de ASP.NET Core incluye múltiples archivos como puedes revisar en el ejemplo de salida del comando `dotnet publish -c Release -r linux-x64` sin ningún paquete de Nuget adicional.

```bash
$ ls -lh bin/Release/net5.0/linux-x64/publish/
total 99M
-rwxr--r-- 1  98K Aug 15 01:44 Microsoft.AspNetCore.Antiforgery.dll
-rwxr--r-- 1  50K Aug 15 01:44 Microsoft.AspNetCore.Authentication.Abstractions.dll
-rwxr--r-- 1  83K Aug 15 01:44 Microsoft.AspNetCore.Authentication.Cookies.dll
-rwxr--r-- 1  77K Aug 15 01:44 Microsoft.AspNetCore.Authentication.Core.dll
-rwxr--r-- 1  83K Aug 15 01:44 Microsoft.AspNetCore.Authentication.OAuth.dll
-rwxr--r-- 1 135K Aug 15 01:44 Microsoft.AspNetCore.Authentication.dll
-rwxr--r-- 1  53K Aug 15 01:44 Microsoft.AspNetCore.Authorization.Policy.dll
-rwxr--r-- 1  81K Aug 15 01:44 Microsoft.AspNetCore.Authorization.dll
-rwxr--r-- 1  42K Aug 15 01:44 Microsoft.AspNetCore.Components.Authorization.dll
-rwxr--r-- 1  54K Aug 15 01:44 Microsoft.AspNetCore.Components.Forms.dll
-rwxr--r-- 1 727K Aug 15 01:44 Microsoft.AspNetCore.Components.Server.dll
-rwxr--r-- 1 119K Aug 15 01:44 Microsoft.AspNetCore.Components.Web.dll
-rwxr--r-- 1 386K Aug 15 01:44 Microsoft.AspNetCore.Components.dll
-rwxr--r-- 1  63K Aug 15 01:44 Microsoft.AspNetCore.Connections.Abstractions.dll
-rwxr--r-- 1  42K Aug 15 01:44 Microsoft.AspNetCore.CookiePolicy.dll
-rwxr--r-- 1  73K Aug 15 01:44 Microsoft.AspNetCore.Cors.dll
-rwxr--r-- 1  63K Aug 15 01:44 Microsoft.AspNetCore.Cryptography.Internal.dll
-rwxr--r-- 1  34K Aug 15 01:44 Microsoft.AspNetCore.Cryptography.KeyDerivation.dll
-rwxr--r-- 1  38K Aug 15 01:44 Microsoft.AspNetCore.DataProtection.Abstractions.dll
-rwxr--r-- 1  33K Aug 15 01:44 Microsoft.AspNetCore.DataProtection.Extensions.dll
-rwxr--r-- 1 370K Aug 15 01:44 Microsoft.AspNetCore.DataProtection.dll
-rwxr--r-- 1  21K Aug 15 01:44 Microsoft.AspNetCore.Diagnostics.Abstractions.dll
-rwxr--r-- 1  39K Aug 15 01:44 Microsoft.AspNetCore.Diagnostics.HealthChecks.dll
-rwxr--r-- 1 368K Aug 15 01:44 Microsoft.AspNetCore.Diagnostics.dll
-rwxr--r-- 1  32K Aug 15 01:44 Microsoft.AspNetCore.HostFiltering.dll
-rwxr--r-- 1  32K Aug 15 01:44 Microsoft.AspNetCore.Hosting.Abstractions.dll
-rwxr--r-- 1  18K Aug 15 01:44 Microsoft.AspNetCore.Hosting.Server.Abstractions.dll
-rwxr--r-- 1 336K Aug 15 01:44 Microsoft.AspNetCore.Hosting.dll
-rwxr--r-- 1  28K Aug 15 01:44 Microsoft.AspNetCore.Html.Abstractions.dll
-rwxr--r-- 1 201K Aug 15 01:44 Microsoft.AspNetCore.Http.Abstractions.dll
-rwxr--r-- 1  39K Aug 15 01:44 Microsoft.AspNetCore.Http.Connections.Common.dll
-rwxr--r-- 1 265K Aug 15 01:44 Microsoft.AspNetCore.Http.Connections.dll
-rwxr--r-- 1 100K Aug 15 01:44 Microsoft.AspNetCore.Http.Extensions.dll
-rwxr--r-- 1  42K Aug 15 01:44 Microsoft.AspNetCore.Http.Features.dll
-rwxr--r-- 1 206K Aug 15 01:44 Microsoft.AspNetCore.Http.dll
-rwxr--r-- 1  59K Aug 15 01:44 Microsoft.AspNetCore.HttpOverrides.dll
-rwxr--r-- 1  37K Aug 15 01:44 Microsoft.AspNetCore.HttpsPolicy.dll
-rwxr--r-- 1 177K Aug 15 01:44 Microsoft.AspNetCore.Identity.dll
-rwxr--r-- 1  19K Aug 15 01:44 Microsoft.AspNetCore.Localization.Routing.dll
-rwxr--r-- 1  52K Aug 15 01:44 Microsoft.AspNetCore.Localization.dll
-rwxr--r-- 1  17K Aug 15 01:44 Microsoft.AspNetCore.Metadata.dll
-rwxr--r-- 1 193K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Abstractions.dll
-rwxr--r-- 1  69K Aug 15 01:44 Microsoft.AspNetCore.Mvc.ApiExplorer.dll
-rwxr--r-- 1 1.8M Aug 15 01:44 Microsoft.AspNetCore.Mvc.Core.dll
-rwxr--r-- 1  42K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Cors.dll
-rwxr--r-- 1  98K Aug 15 01:44 Microsoft.AspNetCore.Mvc.DataAnnotations.dll
-rwxr--r-- 1  15K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Formatters.Json.dll
-rwxr--r-- 1 104K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Formatters.Xml.dll
-rwxr--r-- 1  39K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Localization.dll
-rwxr--r-- 1 206K Aug 15 01:44 Microsoft.AspNetCore.Mvc.Razor.dll
-rwxr--r-- 1 411K Aug 15 01:44 Microsoft.AspNetCore.Mvc.RazorPages.dll
-rwxr--r-- 1 246K Aug 15 01:44 Microsoft.AspNetCore.Mvc.TagHelpers.dll
-rwxr--r-- 1 699K Aug 15 01:44 Microsoft.AspNetCore.Mvc.ViewFeatures.dll
-rwxr--r-- 1  26K Aug 15 01:44 Microsoft.AspNetCore.Mvc.dll
-rwxr--r-- 1  55K Aug 15 01:44 Microsoft.AspNetCore.Razor.Runtime.dll
-rwxr--r-- 1  56K Aug 15 01:44 Microsoft.AspNetCore.Razor.dll
-rwxr--r-- 1  16K Aug 15 01:44 Microsoft.AspNetCore.ResponseCaching.Abstractions.dll
-rwxr--r-- 1 112K Aug 15 01:44 Microsoft.AspNetCore.ResponseCaching.dll
-rwxr--r-- 1  67K Aug 15 01:44 Microsoft.AspNetCore.ResponseCompression.dll
-rwxr--r-- 1 193K Aug 15 01:44 Microsoft.AspNetCore.Rewrite.dll
-rwxr--r-- 1  51K Aug 15 01:44 Microsoft.AspNetCore.Routing.Abstractions.dll
-rwxr--r-- 1 610K Aug 15 01:44 Microsoft.AspNetCore.Routing.dll
-rwxr--r-- 1 526K Aug 15 01:44 Microsoft.AspNetCore.Server.HttpSys.dll
-rwxr--r-- 1 568K Aug 15 01:44 Microsoft.AspNetCore.Server.IIS.dll
-rwxr--r-- 1  43K Aug 15 01:44 Microsoft.AspNetCore.Server.IISIntegration.dll
-rwxr--r-- 1 1.7M Aug 15 01:44 Microsoft.AspNetCore.Server.Kestrel.Core.dll
-rwxr--r-- 1 131K Aug 15 01:44 Microsoft.AspNetCore.Server.Kestrel.Transport.Sockets.dll
-rwxr--r-- 1  21K Aug 15 01:44 Microsoft.AspNetCore.Server.Kestrel.dll
-rwxr--r-- 1  74K Aug 15 01:44 Microsoft.AspNetCore.Session.dll
-rwxr--r-- 1  65K Aug 15 01:44 Microsoft.AspNetCore.SignalR.Common.dll
-rwxr--r-- 1 381K Aug 15 01:44 Microsoft.AspNetCore.SignalR.Core.dll
-rwxr--r-- 1  57K Aug 15 01:44 Microsoft.AspNetCore.SignalR.Protocols.Json.dll
-rwxr--r-- 1  25K Aug 15 01:44 Microsoft.AspNetCore.SignalR.dll
-rwxr--r-- 1 134K Aug 15 01:44 Microsoft.AspNetCore.StaticFiles.dll
-rwxr--r-- 1  38K Aug 15 01:44 Microsoft.AspNetCore.WebSockets.dll
-rwxr--r-- 1 221K Aug 15 01:44 Microsoft.AspNetCore.WebUtilities.dll
-rwxr--r-- 1  34K Aug 15 01:44 Microsoft.AspNetCore.dll
-rwxr--r-- 1 775K Aug  7 19:05 Microsoft.CSharp.dll
-rwxr--r-- 1  42K Aug 15 01:44 Microsoft.Extensions.Caching.Abstractions.dll
-rwxr--r-- 1  53K Aug 15 01:44 Microsoft.Extensions.Caching.Memory.dll
-rwxr--r-- 1  29K Aug 15 01:44 Microsoft.Extensions.Configuration.Abstractions.dll
-rwxr--r-- 1  47K Aug 15 01:44 Microsoft.Extensions.Configuration.Binder.dll
-rwxr--r-- 1  33K Aug 15 01:44 Microsoft.Extensions.Configuration.CommandLine.dll
-rwxr--r-- 1  27K Aug 15 01:44 Microsoft.Extensions.Configuration.EnvironmentVariables.dll
-rwxr--r-- 1  38K Aug 15 01:44 Microsoft.Extensions.Configuration.FileExtensions.dll
-rwxr--r-- 1  32K Aug 15 01:44 Microsoft.Extensions.Configuration.Ini.dll
-rwxr--r-- 1  37K Aug 15 01:44 Microsoft.Extensions.Configuration.Json.dll
-rwxr--r-- 1  28K Aug 15 01:44 Microsoft.Extensions.Configuration.KeyPerFile.dll
-rwxr--r-- 1  33K Aug 15 01:44 Microsoft.Extensions.Configuration.UserSecrets.dll
-rwxr--r-- 1  41K Aug 15 01:44 Microsoft.Extensions.Configuration.Xml.dll
-rwxr--r-- 1  52K Aug 15 01:44 Microsoft.Extensions.Configuration.dll
-rwxr--r-- 1  81K Aug 15 01:44 Microsoft.Extensions.DependencyInjection.Abstractions.dll
-rwxr--r-- 1 172K Aug 15 01:44 Microsoft.Extensions.DependencyInjection.dll
-rwxr--r-- 1  30K Aug 15 01:44 Microsoft.Extensions.Diagnostics.HealthChecks.Abstractions.dll
-rwxr--r-- 1  90K Aug 15 01:44 Microsoft.Extensions.Diagnostics.HealthChecks.dll
-rwxr--r-- 1  20K Aug 15 01:44 Microsoft.Extensions.FileProviders.Abstractions.dll
-rwxr--r-- 1  22K Aug 15 01:44 Microsoft.Extensions.FileProviders.Composite.dll
-rwxr--r-- 1  58K Aug 15 01:44 Microsoft.Extensions.FileProviders.Embedded.dll
-rwxr--r-- 1  67K Aug 15 01:44 Microsoft.Extensions.FileProviders.Physical.dll
-rwxr--r-- 1  83K Aug 15 01:44 Microsoft.Extensions.FileSystemGlobbing.dll
-rwxr--r-- 1  41K Aug 15 01:44 Microsoft.Extensions.Hosting.Abstractions.dll
-rwxr--r-- 1  79K Aug 15 01:44 Microsoft.Extensions.Hosting.dll
-rwxr--r-- 1 127K Aug 15 01:44 Microsoft.Extensions.Http.dll
-rwxr--r-- 1 416K Aug 15 01:44 Microsoft.Extensions.Identity.Core.dll
-rwxr--r-- 1  74K Aug 15 01:44 Microsoft.Extensions.Identity.Stores.dll
-rwxr--r-- 1  22K Aug 15 01:44 Microsoft.Extensions.Localization.Abstractions.dll
-rwxr--r-- 1  50K Aug 15 01:44 Microsoft.Extensions.Localization.dll
-rwxr--r-- 1 106K Aug 15 01:44 Microsoft.Extensions.Logging.Abstractions.dll
-rwxr--r-- 1  27K Aug 15 01:44 Microsoft.Extensions.Logging.Configuration.dll
-rwxr--r-- 1  83K Aug 15 01:44 Microsoft.Extensions.Logging.Console.dll
-rwxr--r-- 1  20K Aug 15 01:44 Microsoft.Extensions.Logging.Debug.dll
-rwxr--r-- 1  32K Aug 15 01:44 Microsoft.Extensions.Logging.EventLog.dll
-rwxr--r-- 1  48K Aug 15 01:44 Microsoft.Extensions.Logging.EventSource.dll
-rwxr--r-- 1  26K Aug 15 01:44 Microsoft.Extensions.Logging.TraceSource.dll
-rwxr--r-- 1  81K Aug 15 01:44 Microsoft.Extensions.Logging.dll
-rwxr--r-- 1  31K Aug 15 01:44 Microsoft.Extensions.ObjectPool.dll
-rwxr--r-- 1  24K Aug 15 01:44 Microsoft.Extensions.Options.ConfigurationExtensions.dll
-rwxr--r-- 1  20K Aug 15 01:44 Microsoft.Extensions.Options.DataAnnotations.dll
-rwxr--r-- 1 105K Aug 15 01:44 Microsoft.Extensions.Options.dll
-rwxr--r-- 1  77K Aug 15 01:44 Microsoft.Extensions.Primitives.dll
-rwxr--r-- 1  24K Aug 15 01:44 Microsoft.Extensions.WebEncoders.dll
-rwxr--r-- 1  85K Aug 15 01:44 Microsoft.JSInterop.dll
-rwxr--r-- 1 196K Aug 15 01:44 Microsoft.Net.Http.Headers.dll
-rwxr--r-- 1 1.2M Aug  7 19:05 Microsoft.VisualBasic.Core.dll
-rwxr--r-- 1  17K Aug  7 19:05 Microsoft.VisualBasic.dll
-rwxr--r-- 1  22K Aug  7 19:05 Microsoft.Win32.Primitives.dll
-rwxr--r-- 1  60K Aug  7 19:05 Microsoft.Win32.Registry.dll
-rwxr--r-- 1  38K Aug 15 01:44 Microsoft.Win32.SystemEvents.dll
-rwxr-xr-x 1 198K Sep  4 00:29 Single
-rw-r--r-- 1  35K Sep  4 00:29 Single.Views.dll
-rw-r--r-- 1  22K Sep  4 00:29 Single.Views.pdb
-rw-r--r-- 1 182K Sep  4 00:29 Single.deps.json
-rw-r--r-- 1 8.5K Sep  4 00:29 Single.dll
-rw-r--r-- 1  20K Sep  4 00:29 Single.pdb
-rw-r--r-- 1  443 Sep  3 23:46 Single.runtimeconfig.json
-rwxr--r-- 1  15K Aug  7 19:05 System.AppContext.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Buffers.dll
-rwxr--r-- 1 190K Aug  7 19:05 System.Collections.Concurrent.dll
-rwxr--r-- 1 660K Aug  7 19:05 System.Collections.Immutable.dll
-rwxr--r-- 1  98K Aug  7 19:05 System.Collections.NonGeneric.dll
-rwxr--r-- 1  92K Aug  7 19:05 System.Collections.Specialized.dll
-rwxr--r-- 1 282K Aug  7 19:05 System.Collections.dll
-rwxr--r-- 1 161K Aug  7 19:05 System.ComponentModel.Annotations.dll
-rwxr--r-- 1  17K Aug  7 19:05 System.ComponentModel.DataAnnotations.dll
-rwxr--r-- 1  37K Aug  7 19:05 System.ComponentModel.EventBasedAsync.dll
-rwxr--r-- 1  54K Aug  7 19:05 System.ComponentModel.Primitives.dll
-rwxr--r-- 1 687K Aug  7 19:05 System.ComponentModel.TypeConverter.dll
-rwxr--r-- 1  18K Aug  7 19:05 System.ComponentModel.dll
-rwxr--r-- 1  19K Aug  7 19:05 System.Configuration.dll
-rwxr--r-- 1 183K Aug  7 19:05 System.Console.dll
-rwxr--r-- 1  24K Aug  7 19:05 System.Core.dll
-rwxr--r-- 1 2.8M Aug  7 19:05 System.Data.Common.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Data.DataSetExtensions.dll
-rwxr--r-- 1  26K Aug  7 19:05 System.Data.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Diagnostics.Contracts.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Diagnostics.Debug.dll
-rwxr--r-- 1 167K Aug  7 19:05 System.Diagnostics.DiagnosticSource.dll
-rwxr--r-- 1  82K Aug 15 01:44 System.Diagnostics.EventLog.dll
-rwxr--r-- 1  38K Aug  7 19:05 System.Diagnostics.FileVersionInfo.dll
-rwxr--r-- 1 242K Aug  7 19:05 System.Diagnostics.Process.dll
-rwxr--r-- 1  35K Aug  7 19:05 System.Diagnostics.StackTrace.dll
-rwxr--r-- 1  58K Aug  7 19:05 System.Diagnostics.TextWriterTraceListener.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Diagnostics.Tools.dll
-rwxr--r-- 1 124K Aug  7 19:05 System.Diagnostics.TraceSource.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Diagnostics.Tracing.dll
-rwxr--r-- 1 846K Aug 15 01:44 System.Drawing.Common.dll
-rwxr--r-- 1 123K Aug  7 19:05 System.Drawing.Primitives.dll
-rwxr--r-- 1  21K Aug  7 19:05 System.Drawing.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Dynamic.Runtime.dll
-rwxr--r-- 1 187K Aug  7 19:05 System.Formats.Asn1.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Globalization.Calendars.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Globalization.Extensions.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Globalization.dll
-rwxr--r-- 1  71K Aug  7 19:05 System.IO.Compression.Brotli.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.IO.Compression.FileSystem.dll
-rwxr--r-- 1  37K Aug  7 19:05 System.IO.Compression.ZipFile.dll
-rwxr--r-- 1 244K Aug  7 19:05 System.IO.Compression.dll
-rwxr--r-- 1  34K Aug  7 19:05 System.IO.FileSystem.AccessControl.dll
-rwxr--r-- 1  75K Aug  7 19:05 System.IO.FileSystem.DriveInfo.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.IO.FileSystem.Primitives.dll
-rwxr--r-- 1  92K Aug  7 19:05 System.IO.FileSystem.Watcher.dll
-rwxr--r-- 1 211K Aug  7 19:05 System.IO.FileSystem.dll
-rwxr--r-- 1  78K Aug  7 19:05 System.IO.IsolatedStorage.dll
-rwxr--r-- 1  69K Aug  7 19:05 System.IO.MemoryMappedFiles.dll
-rwxr--r-- 1 151K Aug 15 01:44 System.IO.Pipelines.dll
-rwxr--r-- 1  26K Aug  7 19:05 System.IO.Pipes.AccessControl.dll
-rwxr--r-- 1 119K Aug  7 19:05 System.IO.Pipes.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.IO.UnmanagedMemoryStream.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.IO.dll
-rwxr--r-- 1 5.1M Aug  7 19:05 System.Linq.Expressions.dll
-rwxr--r-- 1 1.3M Aug  7 19:05 System.Linq.Parallel.dll
-rwxr--r-- 1 181K Aug  7 19:05 System.Linq.Queryable.dll
-rwxr--r-- 1 415K Aug  7 19:05 System.Linq.dll
-rwxr--r-- 1 208K Aug  7 19:05 System.Memory.dll
-rwxr--r-- 1  54K Aug  7 19:05 System.Net.Http.Json.dll
-rwxr--r-- 1 1.7M Aug  7 19:05 System.Net.Http.dll
-rwxr--r-- 1 298K Aug  7 19:05 System.Net.HttpListener.dll
-rwxr--r-- 1 480K Aug  7 19:05 System.Net.Mail.dll
-rwxr--r-- 1  63K Aug  7 19:05 System.Net.NameResolution.dll
-rwxr--r-- 1 158K Aug  7 19:05 System.Net.NetworkInformation.dll
-rwxr--r-- 1  92K Aug  7 19:05 System.Net.Ping.dll
-rwxr--r-- 1 219K Aug  7 19:05 System.Net.Primitives.dll
-rwxr--r-- 1 338K Aug  7 19:05 System.Net.Requests.dll
-rwxr--r-- 1 706K Aug  7 19:05 System.Net.Security.dll
-rwxr--r-- 1  35K Aug  7 19:05 System.Net.ServicePoint.dll
-rwxr--r-- 1 561K Aug  7 19:05 System.Net.Sockets.dll
-rwxr--r-- 1 159K Aug  7 19:05 System.Net.WebClient.dll
-rwxr--r-- 1  64K Aug  7 19:05 System.Net.WebHeaderCollection.dll
-rwxr--r-- 1  28K Aug  7 19:05 System.Net.WebProxy.dll
-rwxr--r-- 1  62K Aug  7 19:05 System.Net.WebSockets.Client.dll
-rwxr--r-- 1 154K Aug  7 19:05 System.Net.WebSockets.dll
-rwxr--r-- 1  17K Aug  7 19:05 System.Net.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Numerics.Vectors.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Numerics.dll
-rwxr--r-- 1  90K Aug  7 19:05 System.ObjectModel.dll
-rwxr--r-- 1 8.9M Aug  7 17:52 System.Private.CoreLib.dll
-rwxr--r-- 1 2.0M Aug  7 19:05 System.Private.DataContractSerialization.dll
-rwxr--r-- 1 237K Aug  7 19:05 System.Private.Uri.dll
-rwxr--r-- 1 393K Aug  7 19:05 System.Private.Xml.Linq.dll
-rwxr--r-- 1 8.2M Aug  7 19:05 System.Private.Xml.dll
-rwxr--r-- 1  71K Aug  7 19:05 System.Reflection.DispatchProxy.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Reflection.Emit.ILGeneration.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Reflection.Emit.Lightweight.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Reflection.Emit.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Reflection.Extensions.dll
-rwxr--r-- 1 1.1M Aug  7 19:05 System.Reflection.Metadata.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Reflection.Primitives.dll
-rwxr--r-- 1  32K Aug  7 19:05 System.Reflection.TypeExtensions.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Reflection.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Resources.Reader.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Resources.ResourceManager.dll
-rwxr--r-- 1  44K Aug  7 19:05 System.Resources.Writer.dll
-rwxr--r-- 1  19K Aug  7 19:05 System.Runtime.CompilerServices.Unsafe.dll
-rwxr--r-- 1  19K Aug  7 19:05 System.Runtime.CompilerServices.VisualC.dll
-rwxr--r-- 1  18K Aug  7 19:05 System.Runtime.Extensions.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Runtime.Handles.dll
-rwxr--r-- 1  35K Aug  7 19:05 System.Runtime.InteropServices.RuntimeInformation.dll
-rwxr--r-- 1  48K Aug  7 19:05 System.Runtime.InteropServices.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Runtime.Intrinsics.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Runtime.Loader.dll
-rwxr--r-- 1 196K Aug  7 19:05 System.Runtime.Numerics.dll
-rwxr--r-- 1 308K Aug  7 19:05 System.Runtime.Serialization.Formatters.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Runtime.Serialization.Json.dll
-rwxr--r-- 1  28K Aug  7 19:05 System.Runtime.Serialization.Primitives.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Runtime.Serialization.Xml.dll
-rwxr--r-- 1  17K Aug  7 19:05 System.Runtime.Serialization.dll
-rwxr--r-- 1  43K Aug  7 19:05 System.Runtime.dll
-rwxr--r-- 1  69K Aug  7 19:05 System.Security.AccessControl.dll
-rwxr--r-- 1  91K Aug  7 19:05 System.Security.Claims.dll
-rwxr--r-- 1 647K Aug  7 19:05 System.Security.Cryptography.Algorithms.dll
-rwxr--r-- 1  67K Aug  7 19:05 System.Security.Cryptography.Cng.dll
-rwxr--r-- 1 114K Aug  7 19:05 System.Security.Cryptography.Csp.dll
-rwxr--r-- 1  95K Aug  7 19:05 System.Security.Cryptography.Encoding.dll
-rwxr--r-- 1 167K Aug  7 19:05 System.Security.Cryptography.OpenSsl.dll
-rwxr--r-- 1 668K Aug 15 01:44 System.Security.Cryptography.Pkcs.dll
-rwxr--r-- 1 112K Aug  7 19:05 System.Security.Cryptography.Primitives.dll
-rwxr--r-- 1 685K Aug  7 19:05 System.Security.Cryptography.X509Certificates.dll
-rwxr--r-- 1 421K Aug 15 01:44 System.Security.Cryptography.Xml.dll
-rwxr--r-- 1 154K Aug 15 01:44 System.Security.Permissions.dll
-rwxr--r-- 1  42K Aug  7 19:05 System.Security.Principal.Windows.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Security.Principal.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Security.SecureString.dll
-rwxr--r-- 1  18K Aug  7 19:05 System.Security.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.ServiceModel.Web.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.ServiceProcess.dll
-rwxr--r-- 1 845K Aug  7 19:05 System.Text.Encoding.CodePages.dll
-rwxr--r-- 1  15K Aug  7 19:05 System.Text.Encoding.Extensions.dll
-rwxr--r-- 1  16K Aug  7 19:05 System.Text.Encoding.dll
-rwxr--r-- 1  91K Aug  7 19:05 System.Text.Encodings.Web.dll
-rwxr--r-- 1 837K Aug  7 19:06 System.Text.Json.dll
-rwxr--r-- 1 502K Aug  7 19:06 System.Text.RegularExpressions.dll
-rwxr--r-- 1 114K Aug  7 19:06 System.Threading.Channels.dll
-rwxr--r-- 1  17K Aug  7 19:06 System.Threading.Overlapped.dll
-rwxr--r-- 1 468K Aug  7 19:06 System.Threading.Tasks.Dataflow.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Threading.Tasks.Extensions.dll
-rwxr--r-- 1 106K Aug  7 19:06 System.Threading.Tasks.Parallel.dll
-rwxr--r-- 1  17K Aug  7 19:06 System.Threading.Tasks.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Threading.Thread.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Threading.ThreadPool.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Threading.Timer.dll
-rwxr--r-- 1  77K Aug  7 19:06 System.Threading.dll
-rwxr--r-- 1 339K Aug  7 19:06 System.Transactions.Local.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Transactions.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.ValueTuple.dll
-rwxr--r-- 1  51K Aug  7 19:06 System.Web.HttpUtility.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Web.dll
-rwxr--r-- 1  39K Aug 15 01:44 System.Windows.Extensions.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Windows.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Xml.Linq.dll
-rwxr--r-- 1  22K Aug  7 19:06 System.Xml.ReaderWriter.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Xml.Serialization.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Xml.XDocument.dll
-rwxr--r-- 1  17K Aug  7 19:06 System.Xml.XPath.XDocument.dll
-rwxr--r-- 1  15K Aug  7 19:06 System.Xml.XPath.dll
-rwxr--r-- 1  16K Aug  7 19:06 System.Xml.XmlDocument.dll
-rwxr--r-- 1  18K Aug  7 19:06 System.Xml.XmlSerializer.dll
-rwxr--r-- 1  24K Aug  7 19:06 System.Xml.dll
-rwxr--r-- 1  54K Aug  7 19:05 System.dll
-rwxr--r-- 1  16K Aug  7 19:06 WindowsBase.dll
-rw-r--r-- 1  162 Sep  3 23:43 appsettings.Development.json
-rw-r--r-- 1  192 Sep  3 23:43 appsettings.json
-rwxr--r-- 1 141K Aug  7 17:47 createdump
-rwxr--r-- 1 3.6M Aug  7 18:05 libSystem.IO.Compression.Native.a
-rwxr--r-- 1 900K Aug  7 18:05 libSystem.IO.Compression.Native.so
-rwxr--r-- 1 419K Aug  7 18:05 libSystem.Native.a
-rwxr--r-- 1  93K Aug  7 18:05 libSystem.Native.so
-rwxr--r-- 1  36K Aug  7 18:05 libSystem.Net.Security.Native.a
-rwxr--r-- 1  19K Aug  7 18:05 libSystem.Net.Security.Native.so
-rwxr--r-- 1 945K Aug  7 18:05 libSystem.Security.Cryptography.Native.OpenSsl.a
-rwxr--r-- 1 160K Aug  7 18:05 libSystem.Security.Cryptography.Native.OpenSsl.so
-rwxr--r-- 1 3.3M Aug  7 17:44 libclrjit.so
-rwxr--r-- 1  12M Aug  7 17:51 libcoreclr.so
-rwxr--r-- 1 760K Aug  7 17:34 libcoreclrtraceptprovider.so
-rwxr--r-- 1 801K Aug  7 17:44 libdbgshim.so
-rwxr--r-- 1 507K Aug  7 19:05 libhostfxr.so
-rwxr--r-- 1 477K Aug  7 19:05 libhostpolicy.so
-rwxr--r-- 1 4.1M Aug  7 17:46 libmscordaccore.so
-rwxr--r-- 1 2.6M Aug  7 17:47 libmscordbi.so
-rwxr--r-- 1  56K Aug  7 18:05 mscorlib.dll
-rwxr--r-- 1 112K Aug  7 19:05 netstandard.dll
-rw-r--r-- 1  459 Sep  4 00:29 web.config
drwxr-xr-x 5 4.0K Sep  3 23:46 wwwroot
```

Para publicar una aplicación ASP.NET Core con un solo archivo se puede la linea de comandos o el archivo _.csproj_. Por ejemplo un el archivo del proyecto basado en en la publicación de Ben Adams:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <RuntimeIdentifier>linux-x64</RuntimeIdentifier>
    <PublishTrimmed>true</PublishTrimmed>
    <TrimMode>Link</TrimMode>
    <PublishSingleFile>true</PublishSingleFile>
    <DebugType>embedded</DebugType>
  </PropertyGroup>

</Project>
```

Si realizas la publicación con la linea de comando `dotnet publish -c Release` a la salida veras el siguiente contenido:

```bash
$ ls -lh bin/Release/net5.0/linux-x64/publish/
total 32M
-rwxr-xr-x 1 vscode vscode  32M Sep  4 00:05 MiAplicación
-rw-r--r-- 1 vscode vscode  162 Sep  3 23:43 appsettings.Development.json
-rw-r--r-- 1 vscode vscode  192 Sep  3 23:43 appsettings.json
-rw-r--r-- 1 vscode vscode  459 Sep  4 00:05 web.config
drwxr-xr-x 5 vscode vscode 4.0K Sep  3 23:46 wwwroot

```

Para lograr el mismo efecto con la línea de comandos puedes usar

```bash
dotnet publish -r linux-x64 -p:PublishTrimmed=True -p:TrimMode=Link -p:PublishSingleFile=true
```