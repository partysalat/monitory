Monitory
=============

This project will be used (hopefully) as our new team monitor. It tries to use existing libraries as simple as possible. 

Todos:
---------

Backend:
* [x] Load files with glob 
* Implement Job processing with caching
* Add proper logging plugin
* Implement update of data (websocket, one connection, different channels, one channel per dashboard?)
* Add styling (maybe styled components? https://github.com/styled-components/styled-components)

Frontend:
* Implement update of data (redux and middleware (saga?))
* Implement subscription to data (as parameter of component)
* Implement Showing when threshold reached (as parameter of component)
* Style Dashboard (also possibility for nested dashboards? To )
* Style Card (needs to be shiny!)
* Add iframe support (for dyb) 
