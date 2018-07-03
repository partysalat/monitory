Monitory
=============

This project is intended to be a small helper framework for creating dashboards to be used in teamareas.
You as a user just need to define two things: 
* jobs: node processes, that fetches your data and emits events to the frontend 
* dashboards: react components, that subscribes to emitted jobs and show the data.
 
Disclaimer
------------
This is an early version and far away from being usable. 


Todos:
---------

Backend:
* [x] Load files with glob 
* [x] Implement Job processing with caching
* [x] Implement update of data (websocket, one connection, different channels, one channel per dashboard?)
* [x] Add styling (maybe styled components? https://github.com/styled-components/styled-components)
* [] Add proper logging plugin

Frontend:
* [x] Implement update of data (redux and middleware (saga?))
* [x] Implement subscription to data (as parameter of component)
** [x] Do not duplicate subscription
** [x] error handling of websocket 
* [x] make Previous data available in frontend
* [ ] Implement Showing when threshold reached (as parameter of component)
* [ ] Style Dashboard (also possibility for nested dashboards?)
* [ ] Style Card (needs to be shiny!)
* [ ] Add iframe support (for dyb) 
* [ ] Implement start page with links to dashboard
* [ ] Code splitting
* [ ] Additional adding of assets (icons, ...)


This project is highly inspired by http://dashing.io/ which unfortunately has been no longer maintained. 