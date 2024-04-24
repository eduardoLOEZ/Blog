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

## CREANDO UNA ENTIDAD CON TYPEORM

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

## USANDO EL PATRÓN REPOSITORY PARA ACCEDER A LA DB

TypeORM soporta el patron repository, eso quiere decir que cada entidad que creamos, tiene su propio repositorio.
El patrón Repository se utiliza especialmente en aplicaciones de utilizan bases de datos.
su objetivo es separar la lógica de negocio de la logica de acceso a los datos.

En resumen, el patrón Repository proporciona una capa de abstracción entre la lógica de la aplicación y la capa de persistencia de datos (por ejemplo, una base de datos).

![nest cli](https://res.cloudinary.com/dyhpbqaht/image/upload/v1713989278/repository_mmwgeh.png)

El patrón repository actúa como una capa intermedia entre la lógica de negocio de tu aplicación y el acceso a los datos. Su objetivo principal es abstraer la lógica de acceso a los datos y proporcionar una interfaz común para interactuar con la base de datos, independientemente del tipo de base de datos subyacente.

Para eso, vamos a crear una carpeta /repository. la cual llevara este archivo dentro: coffee.repository.ts

En este codigo, extendemos el Repository de TypeORM e implementamos los metodos definidos en CoffeeRepository.

````markdown
```javascript

// /repository/coffee.repository.ts
import { Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffe.dto/update-coffe.dto';
import { InjectRepository } from '@nestjs/typeorm';

//extiende la clase repositorio porporcionada por TypeORM
//esto significa que esta clase hereda todo los metodos y propiedades de Repository<Coffee>
export class CoffeeRepository extends Repository<Coffee> {
  //en el constructor se usa inhectRepository para inyectar el repositorio de TypeORM de la entidad coffee
  //esto permite acceder a los metodos proporcionados por el Repository dentro de la clase
  constructor(
    @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
  ) {
    //el super se utiliza para llamar al constructor de la clase padre y
    //asegurar que el CoffeeRepository tenga todas las configuraciones necesarias y funcione correctamente como una extensión de la clase Repository<Coffee>.
    //Esto es necesario para heredar comportamientos y propiedades de la clase padre y evitar errores de inicialización.
    super(
      coffeeRepository.target,
      coffeeRepository.manager,
      coffeeRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Coffee[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Coffee | null> {
    return this.findOneBy({ id: id });
  }

  public async store(coffeDTO: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee = this.create(coffeDTO);
    return this.save(newCoffee);
  }

  public async updateOne(
    id: number,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee | null> {
    const coffee = await this.findById(id);
    if (!coffee) return undefined;
    Object.assign(coffee, updateCoffeeDto);

    return this.save(coffee);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}

```
````

## Usando el Repository

Ahora que implementamos el repositorio, vamos a usarlo en nuestros servicios:

````markdown
```javascript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeRepository } from './repository/coffee.repository';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly coffeRepository: CoffeeRepository) {}

  async findAll() {
    try {
      const coffees = await this.coffeRepository.findAll();
      return coffees;
    } catch (error) {}
  }

  async findOne(id: number) {
    const coffe = await this.coffeRepository.findById(id);

    if (!coffe) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }
    return coffe;
  }

  async createCoffee(createCoffeeDto: any) {
    const coffee = await this.coffeRepository.save(createCoffeeDto); // Utilizar save en lugar de store
    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    try {
      await this.findOne(id);
      return await this.coffeRepository.updateOne(id, updateCoffeeDto);
    } catch (error) {
      // Manejar el error
    }
  }

  async remove(id: number) {
    return await this.coffeRepository.destroy(id);
  }
}
```
````

## coffee controller

````markdown
```javascript
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeessService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeessService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: number) {
    return this.coffeessService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeessService.createCoffee(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeessService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeessService.remove(id);
  }
}
```
````

## Registrando el Repository:

Para poner disponible el patron repository en la inyección de dependenciasm vamos a registrarlo en el coffee.module.ts, importamos el repository que hicimos y vamos a colocarlo en providers:

````markdown
```javascript
import { Module } from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRepository } from "./repository/coffee.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeRepository],
})
export class CoffeesModule {}
```
````
