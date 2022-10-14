# Reactivities

## Project Abstract

Reactivities is a social networking app that allows users to create events/activities, attend, follow other users, upload photos, and chat on separate activities. This app is built with ASP.NET Core in the backend and ReactJs in the frontend.

## Backend - ASP.NET Core 6

Backend is implemented using Clean Architecture and CQRS & Mediator design pattern.

### Domain & Application - Use Cases

Domain project declares entities and their properties and Application project implements the business rules usin CQRS design pattern.

### Infrastructure and Persistence

Establishes connections with database and communicates with it using Entity Framework keeping the business rules separate. Infrastructure also implements User interface for authentication.


### API

The API project sets up the backend and establishes communication with client and domain with controllers using Mediator and handles HTTP exceptions also establishes SignalR hub for real time chat.

## Frontend

The frontend is implemented using ReactJs for interactive mobile like UI and semantic ui, Bootstrap for css. It uses Mobx for centralized state management.

## How to run
#### Online: https://reactivities-aspnet.herokuapp.com/

### Locally
    1. initialize git
    2. clone repo: git@github.com:msrahman07/Reactivities.git
    3. cd API - run "dotnet watch run"
    5. navigate to localhost:{PORT_NUMBER} 
