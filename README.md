Monitory
=============

This project will be used (hopefully) as our new team monitor. It tries to use existing libraries as simple as possible. 

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
