---
title: 'AWS Serverless'
description: 'AWS lambda functions'
pubDate: 'Feb 2 2024'
heroImage: '/aws lambda.png'
---

<h2>Amazon Web Services (AWS):</h2>

Amazon Web Services (AWS) es una plataforma de servicios en la nube que ofrece una amplia variedad de servicios de infraestructura, almacenamiento, cómputo, inteligencia artificial, y más. Fundada por Amazon en 2006, AWS se ha convertido en uno de los proveedores líderes de servicios en la nube a nivel mundial, permitiendo a empresas y desarrolladores escalar y gestionar sus aplicaciones de manera eficiente sin preocuparse por la infraestructura subyacente.


<h2>Serverless Computing:</h2>

Serverless computing es un paradigma de desarrollo de aplicaciones que permite a los desarrolladores centrarse en el código y la lógica de sus aplicaciones, sin tener que preocuparse por la gestión de servidores. Contrario a su nombre, "serverless" no significa que no haya servidores, sino que los desarrolladores pueden prescindir de la preocupación directa sobre la infraestructura subyacente. En lugar de gestionar servidores, los desarrolladores se enfocan en funciones o fragmentos de código que se ejecutan en respuesta a eventos específicos.

![aws lambda](https://res.cloudinary.com/dyhpbqaht/image/upload/v1706912344/Anotaci%C3%B3n_2024-02-02_153202_ovhiie.png)

Esta es una forma visual de ver como funcionaria. 

De esta manera es como se vería nuestra función, es eso, una función de node js en la cual podemos importar módulos y mas cosas.
Vemos que el punto de entrada de esa función es un evento que lleva como parámetro
y lo que activa a esa función es un evento.

![aws lambda](https://res.cloudinary.com/dyhpbqaht/image/upload/v1706912420/Anotaci%C3%B3n_2024-02-02_153534_qq6hlb.png)


# API GATEWAY

Amazon API Gateway actúa como una puerta de enlace (gateway) para gestionar y dirigir las solicitudes de API entrantes. En una arquitectura de microservicios, API Gateway suele ser la interfaz de entrada principal para los clientes que desean interactuar con los diferentes servicios.

En este caso la usaremos como el evento que activara la función lambda
![aws lambda](https://res.cloudinary.com/dyhpbqaht/image/upload/v1706912778/643fd2fde829634fa4f769a0_6178d93647ddf9f443e800f4_API_Gateway_example_p7xfbh.png)