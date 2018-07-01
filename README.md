Monitory
=============

This project will be used (hopefully) as our new team monitor. It tries to use existing libraries as simple as possible. 

Todos:
---------

Backend:
* [x] Load files with glob 
* [x] Implement Job processing with caching
* Add proper logging plugin
* [x] Implement update of data (websocket, one connection, different channels, one channel per dashboard?)
* Add styling (maybe styled components? https://github.com/styled-components/styled-components)

Frontend:
* [x] Implement update of data (redux and middleware (saga?))
* [x] Implement subscription to data (as parameter of component)
** [x] Do not duplicate subscription
** [x] error handling of websocket 
* Implement Showing when threshold reached (as parameter of component)
* Style Dashboard (also possibility for nested dashboards? To )
* Style Card (needs to be shiny!)
* Add iframe support (for dyb) 
* Implement start page with links to dashboard
* Code splitting
* Additional adding of assets (icons, ...)
* make Previous data available in frontend