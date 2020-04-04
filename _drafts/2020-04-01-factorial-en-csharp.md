---
layout: post
title:  "Factorial de un número en C#"
date:   2020-04-01 12:00:01 +0000
categories: csharp
permalink: /:categories/:title:output_ext
description: Aprende a crear una función para calcular el factorial de un número entero positivo en el lenguaje de programación C#. Este puede ser fácilmente escrito en otros lenguajes como Java , Javascript o PHP.
---

El factorial de un número entero positivo **_n_** está definido como: 

```math
n! = n*(n-1)*...*2*1
```

También es importante mencionar el caso especial del número cero. Ya que muchos lo incluyen en el conjunto de los enteros positivos y en este caso la definición del factorial para cero es :

```math
0! = 1
```

Este número es se explica en los primeros cursos de matemáticas y es un ejercicio frecuente en pruebas para programadores. El número factorial representa el número de veces que un grupo de **_n_** pueden ser permutados.

El motivo principal de incluir este ejercicio en una prueba para programadores es, desde mi punto de vista, ver como el candidato que tanto maneja el lenguaje de programación y revisar si maneja el tema de recursividad.

Este número crece muy rápidamente como puedes ver en la siguiente tabla

|**_n_**| Expresión  | Valor  |
|-------|---|---|
|0!     | 1  |1| 
|1!     | 1  |1|
|2!     | 2 *1   |2| 
|3!     | 3* 2 * 1   |6|
|4!     | 4 * 3 * 2 * 1   |24|
|5!     | 5 * 4 * 3 * 2 * 1 |120|
|6!     | 6 * 5 * 4 * 3 * 2 * 1 |720|
|7!     | 7 * 6 * 5 * 4 * 3 * 2 * 1 |5,040|
|8!     | 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 |40,320|
|9!     | 9* 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 |362,880|
|10!    |10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 |3,628,800|