# React + TypeScript + Vite

## Installation & Development
- Node 20.19.0
`npm install`
`copy .env.example .env`
`npm run dev`
`npm run test `
http://localhost:5173

## Overview
An interactive scene with a dog that gets angry when you pull it's cheeks. Click on the dog's head to watch the animation.

## Goals & Decisions

- For faster development startup time. I chose Vite over Next.js for a pure UI app

- I chose a model with a low geometry and texture which doesnt focus on maniulating GLSL shader material rendering and performance. I decide to fous on on manipulating the geometry and show off interactions. Source(https://sketchfab.com/3d-models/shiba-faef9fe5ace445e7b2989d1c1ece361c)

- To optimize the size of the model and to get it to the correct file format, I used gltf-transform library to handle that.

- To demonstrate isolated mesh interactions. I modified the gltf file in Blender to isolate the head of the object to fine tune area specific interations. In the experience, only when clicking on the head of the object ( dog ) does it then animate the deforation of the verticies. If you click outside of the head, on the body or not on the model, the interaction is not triggered. Once the meter count reaches to 10 the mesh color changes to red.

- To demonstrate the ease of use with R3F and global state of React components and Canvas, I displayed a "RESET" button in the scene that shares the same state logic as the "RESET" button in the UI. This can be done with React Context hook if not using Zustand. Long term on larger projects, Zustand works with React hooks to manage shared state in a more clean and maintainable way for 3D projects to handle renders.

- Added an .env file to to define environment variables. In this case, there are debugger tools like leva and stats to help during local development.

- I structured the folder with nesting based off of canvas and ui to separate the 2 types of components based on the goal of this app to have React UI and R3F interactivity. In addition in the hooks folder I broke out more specified nested folder by feature. Shared features hooks can be accessed in a named folder ex. if I create more interactions with the dog model, those hooks can be broken into separate files for readability. Also with heavy logic a types.ts file is created to reduce file size and maintainability.


## Things to Improve

1. Add a library like React Spring to help with the animations with physics or if more complex interactions are needed a phsycis engine such as Rapier can be used. 

2. Break out additional logic and abstract properties to make logic reusable such the useAnimateDog hook if more interactions are used 

3. Heavy scenes or geometries animations can be memoized if rerendred often.


