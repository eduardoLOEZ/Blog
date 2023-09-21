---
title: 'Clean Architecture'
description: 'Asincronia en JS'
pubDate: 'Sep 20 2023'
heroImage: '/clean.png'
---
Descubre Clean Architecture: qué es, cómo funciona y cómo aplicarla en tu desarrollo de software. Exploraremos los conceptos esenciales de esta metodología y su impacto en la construcción de aplicaciones.


<h2>¿Qué es una arquitectura o patron?</h2>

Una arquitectura de software es un marco o estructura organizada que define cómo se diseñará, construirá y organizará un sistema de software. Funciona como un plano o un esqueleto que establece las reglas y directrices para crear una aplicación.

En otras palabras menos tecnicas, es como el diseño interno de la aplicación que establece reglas, estándares y patrones de organización para garantizar que el software sea escalable, mantenible y cumpla con los requisitos del proyecto,
define cómo se estructuran los componentes, cómo interactúan entre sí y cómo se gestionan los datos. También proporciona una guía para el desarrollo colaborativo y la comprensión del código por parte de otros miembros del equipo.

<h2>MVC</h2>
Cuando comenzamos en el desarrollo de software y exploramos el mundo del backend, MVC (Modelo-Vista-Controlador) es uno de los primeros patrones de arquitectura que encontramos. Si bien es adecuado para aplicaciones sencillas o CRUDs, se centra principalmente en la manipulación de datos y puede volverse complejo a medida que nuestras aplicaciones crecen en tamaño y complejidad. En este punto, es donde Clean Architecture entra en juego.


<h3>¿Como funciona?</h3>

MVC se basa en la separación de la lógica de presentación, la lógica de la aplicación y los datos. Es una elección sólida para aplicaciones más simples, pero cuando agregamos características avanzadas o integramos servicios externos, como OAuth de Google o Facebook, nuestro código puede volverse confuso y difícil de mantener. Cambiar una característica puede afectar múltiples partes del código, lo que lo hace poco escalable.

<br>
Clean Architecture ofrece una solución. En lugar de reemplazar MVC, complementa este patrón con una estructura de capas que enfatiza la independencia y la organización.

Coloca el núcleo de la aplicación, donde residen las reglas de negocio, en el centro y mantiene las capas externas, como la interfaz de usuario y las bases de datos, en los bordes. Esto facilita la independencia de las capas y la prueba de la lógica de negocio sin preocuparse por los detalles de implementación.


Esta seria una representación visual de lo que estabamos hablando, como se ve el MVC en un backend sencillo de express.js
![Clean Architecture](/express.avif)


<h1>Clean Architecture</h1>

Clean Architecture es un enfoque de diseño de software que se centra en la creación de sistemas robustos, escalables y mantenibles. A diferencia de otros patrones de arquitectura que pueden volverse complejos a medida que los proyectos crecen, Clean Architecture propone una estructura modular que separa las preocupaciones y fomenta la independencia entre las distintas partes de una aplicación.
 Veamos en detalle las capas clave de Clean Architecture:

<h2>Capa de Dominio</h2>

Vayamos adentrandonos a este maravilloso mundo de Clean Architecture 🤓🚀

En el corazón de Clean Architecture se encuentra la capa de Dominio.  Esta capa representa las reglas de negocio y define las entidades centrales de la aplicación, en palabras mas simples, es la forma en que nosotros definimos que hara nuestra aplicación pero sin preocuparse de "como" lo hará, ya que esa no es su reponsabilidad y es donde entra una regla de dependencia.

En esta capa definimos que tipos de datos tendra el Usuario, que tipo de version tendra nuestra aplicación y framework, la configuración del sistema y más.

Aqui podemos tener como se configurara o conectará a la DB o el entorno de Node js.


<h2>Sigue en desarrollo... 🚧👷‍♀️</h2>