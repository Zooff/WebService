Users

GET api/users/ :
Permit to get all the users

GET api/users/:userId :
Permit to get an user indicated in userId

PUT api/users/:userId :
Permit to update an user indicated in userId

DELETE api/users/:userId :
Permit to delete an user indicated in userId


Groups

GET api/groups/ :
Permit to get all the groups

GET api/groups/:groupId :
Permit to get a group indicated in groupId

DELETE api/groups/:groupId :
Permit to delete a group indicated in groupId

POST api/groups/createGroup :
Permit to create a new group

PUT api/groups/:groupId :
Permit to update a group indicated in groupId

PUT api/groups/:groupId/join :
Permit to join a group indicated in groupId

PUT api/groups/:groupId/leave :
Permit to leave a group indicated in groupId

GET api/groups/:groupId/comments :
Permit to get all the comments belonging to the group indicated in groupId

GET api/groups/:groupId/comments/:commentId :
Permit to get a comment indicated in commentId belonging to the group indicated in groupId

POST api/groups/:groupId/comments :
Permit to add a comment

DELETE api/groups/:groupId/comments/:commentId :
Permit to delete a comment indicated in commentId belonging to the group indicated in groupId

PUT api/groups/:groupId/comments/:commentId :
Permit to update a comment indicated in commentId belonging to the group indicated in groupId
