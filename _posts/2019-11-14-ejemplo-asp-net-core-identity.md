---
layout: post
title:  "Introdución a ASP.NET Core Identity"
date:   2019-11-14 16:22:01 +0000
permalink: /:categories/:title:output_ext
---


Todo comienza en la linea de comandos 

```bash
dotnet new mvc --auth Individual -o IntroIdentity
```

En la carpeta _Data_ se encuentra la clase ApplicationContext.c

```
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IntroIdentity.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
```

Los nombres de las tablas son

AspNetRoleClaims
AspNetRoles
AspNetUsersClaims
AspNetUserLogins
AspNetUserRoles
AspNetUsers
