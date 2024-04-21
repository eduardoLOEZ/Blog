---
title: "Construyendo un Backend Robusto con Nest.js, Docker y PostgreSQL"
description: "Descubre cómo crear un backend poderoso y escalable utilizando Nest.js junto con contenedores Docker y la potencia de PostgreSQL. Aprende a desarrollar una aplicación web moderna con tecnologías de vanguardia que te permitirán construir y desplegar servicios robustos de manera eficiente. Explora los conceptos clave de Nest.js, Docker y PostgreSQL mientras construyes una aplicación backend completa paso a paso. "
pubDate: "Apr 19 2024"
heroImage: "/nest.png"
---

<h2>Desarrollando una API con Nest js, Docker y PotsgreSQL:</h2>

Descubre cómo crear un backend poderoso y escalable utilizando Nest.js junto con contenedores Docker y la potencia de PostgreSQL. Aprende a desarrollar una aplicación web moderna con tecnologías de vanguardia que te permitirán construir y desplegar servicios robustos de manera eficiente. Explora los conceptos clave de Nest.js, Docker y PostgreSQL mientras construyes una aplicación backend completa paso a paso.

Node.js viene con un diseño minimalista que deja muchas decisiones de configuración en manos de los desarrolladores. Esto incluye aspectos como el enrutamiento, los middlewares, la organización del código y las carpetas. Aunque hay frameworks como Express.js que facilitan estas tareas, aún requieren cierta configuración por parte del desarrollador, lo que puede volverse complicado en aplicaciones más grandes.

Nest.js surge para abordar estos problemas proporcionando una arquitectura estructurada y orientada a objetos que se enfoca en el desarrollo de aplicaciones de manera escalable y con buenas prácticas. Nest.js simplifica aspectos como el enrutamiento de API, el manejo de errores, los middlewares y más, liberando a los desarrolladores para concentrarse en la lógica de negocio en lugar de en la configuración técnica.

<h3>Inicializar el proyecto</h3>

````markdown
```Javascript
node --version

npm i -g @nest/cli. //instalar nest js
nest --version

//crear el proyecto con nest
nest new
```
````

Vamos a ver que nuestra terminal se vera de esta manera mientras se crea nuestra aplicación de Nest js.
Colocaremos el nombre de nuestro proyecto, si queremos usar npm y esto hara lara instalación... ✅
![nest cli](https://res.cloudinary.com/dyhpbqaht/image/upload/v1713681033/nest-cli_tgu8j0.png)

Despues podremos correr el servicio con npm start y ver en el localhost

# Estructura de la arquitectura de Nest js

src/: Esta es la carpeta principal donde reside todo el código fuente de tu aplicación Nest.js. Aquí es donde se encuentra la lógica de negocio, controladores, servicios, modelos y más.

main.ts: Este es el punto de entrada de tu aplicación Nest.js. Aquí se inicializa la aplicación y se configuran los módulos, controladores y servicios principales.

````markdown
```Javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```
````

app.module.ts: Este archivo define el módulo principal de la aplicación. Un módulo en Nest.js es una colección de controladores, servicios y otros componentes relacionados. Aquí se importan y configuran todos los módulos adicionales que componen tu aplicación, aqui es donde despues vamos a colocar la configuración para la conexión a la DB.

````markdown
```Javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
````

controllers/: Esta carpeta contiene los controladores de tu aplicación. Los controladores son responsables de manejar las solicitudes HTTP y de definir las rutas de la API. Cada controlador suele tener un conjunto de métodos que se corresponden con diferentes puntos finales de la API.

Nest js nos facilita el router con el decorator del controller, en el cual apunta a /coffees.
Colocamos el metodo Get que sera en ese endpoint, y la función con lo que queremos que retorne.

````markdown
```Javascript
import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'this action returns all coffees';
  }
}


```
````

services/: Aquí se encuentran los servicios de tu aplicación. Los servicios son clases que encapsulan la lógica de negocio y se utilizan para realizar operaciones como acceder a la base de datos, realizar cálculos, interactuar con APIs externas, etc. Los servicios son inyectables y pueden ser utilizados por los controladores u otros servicios.

## Data Transfor Object (DTO)

Es un objeto que es usado para encapsular data y enviarla de una aplicación a otra.
DTO´s nos ayudan a definir interfaces o el input o output en nuestro sistema.
Con DTO podemos definir la forma o interfaz que estamos esperando recibir en nuestro body de la petición

Aqui tenemos en POST, el body, pero no sabemos que es lo que va traer ese body desde el cliente, y es aqui donde entra DTO

````markdown
```Javascript
@Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body) {
    return this.coffeessService.createCoffee(body);
  }


```
````

El comando para generar el DTO es:

````markdown
```Javascript
nest g class coffees/dto/create-coffee.dto --no-spec
```
````

Para hacer mejor uso del DTO, vamos a instalar class-validator

## VALIDATE INPUT DATA WITH DATA TRANSFER OBJECT

Como vimos, pasamos un DTO, que es la forma es que se pasara el body o la data a nuestro endpoint y controller, pero debemos validar esa data, que hagamos que ese campo sea un string, un numero u otro tipo de dato.

Instalamos esta dependencia y otra mas.

````markdown
```Javascript
npm i class-validator class-transformer
```
````

Validamos que cada campo sea un string, no otro tipo de dato, y usamos each:true en flavors, para decir que cada uno de los datos del array, sean strings.

````markdown
```Javascript
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString({ each: true })
  flavors: string[];
}

```
````

Para que la validación funcione, debemos poner una ValidationPipe, la cual seria esta:

````markdown
```Javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 👈 hace que se hagan las validaciones y funcione
  await app.listen(3000);
}
bootstrap();


```
````

Para hacerlo con update, no necesitaremos repetir codigo, lo que haremos para eso es usar PartialType, lo cual es como “heredar” lo que tiene el DTO de crear un cafe.

````markdown
```Javascript
npm i @nestjs/mapped-types
```
````

y al tener esto instalado, usaremos PartialType y quedaria de esta manera:
Nos esta retornando el tipo de class que le pasamos, en este caso, createCoffeeDTO

PartialType pone sus campos en optional, y esto nos ayuda en el update, ya que a veces solo se actualizara un dato y no todos, al testear esto en postman, vemos que funciona correctamente y se hace @IsOptional los campos.

````markdown
```Javascript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

```
````

## Integrando PostgreSQL en Nest js

Estaremos usando postgreSQL, docker para correr la DB con la image de postgres y pgadmin4 para visualizar los datos.

Agregamos la configuracion de nuestra DB a el app.module.ts de Nest js

````markdown
```Javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in production)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
````

Para tener estos datos, vamos a hacer el docker compose para correr la image de postgres,vamos a configurarlo de la siguiente manera:

````markdown
```yml
version: "3"
services:
  db:
    image: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: pass123
```
````

Corremos nuestro contenedor de dokcer con: docker-compose up -d

## CREATING A TYPEORM ENTITY

Vamos a hacer una entidad de como queremos que se vean nuestras tablas en la DB

````markdown
```javascript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column("json", { nullable: true })
  flavors: string[];
}
```
````

Y usaremos esta entidad en el coffee.module.ts para que aplique esta tabla en la DB

````markdown
```javascript
import { Module } from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
```
````

Al correr nuestra DB con docker y al igual el backend, entramos a pgadmin4, hacemos la conexión con los datos requeridos, y visualizaremos esto:
Vemos la tabla de coffee con sus columnas que estan en el entity.ts
![nest cli](https://res.cloudinary.com/dyhpbqaht/image/upload/v1713684188/pgadmin_mbdzw2.png)
