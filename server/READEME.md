* signup route
  * [x] get data
  * [x] validate data
  * [x] password encryption
  * [x] add data to database
  * [x] handle database error
  * [x] on success, create auth token
  * [x] send token

* login route
  * [x] get data
  * [x] validate data
  * [x] decrypt password
  * [x] on success, create auth token
  * [x] send auth token
  * [x] handle error with appropriate validation

* bookmarks route
  * [x] check auth username
  * [x] find all bookmarks of auth username
  * [x] response according to sucess and error

* bookmarks add route
  * [x] validate input
  * [x] add data to database with username field
  * [x] add username from req.username
  * [x] response according to sucess and error

* bookmarks delete route
  * [x] Req type -> delete
  * [x] bookmark _id in req url
  * [x] check if bookmark exists
  * [x] check is auth username is same as bookmark username
  * [x] delete the bookmark
  * [x] response according to sucess and error

* delete account route in auth
  * [ ] Req type -> delete
  * [ ] get username from auth token
  * [ ] delete user
  * [ ] delete all related bookmarks