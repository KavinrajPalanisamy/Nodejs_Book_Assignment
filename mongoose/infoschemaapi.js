var infoschema=require("./infoschema")
var route=require("express").Router()


route.get("/all", function(request, response)
{
    infoschema.find({}, {_id:0}, function(err, data)
    {
        if(err)
        {
            response.status(500).send("error occurred in get api")
        }
        else
        {
            response.json(data)
        }
    })
})

route.post("/all", function(request, response)
{
    infoschema.insertMany(request.body, function(err, data)
    {
        if(err)
        {
            response.status(500).send("error occurred in post api")
        }
        else
        {
            response.json("data added successfully")
        }
    })
})

route.delete("/all/:book_id", function(request, response)
{
    infoschema.deleteOne
    ({
        where:{book_id: request.params.book_id}
    })
    .then(function(data)
    {
        response.json(data)
    })
    .catch(function(data)
    {
        response.status(500).send("Error occurred in deleting api")
    })
})

route.put("/all/:id/:location/:country", function(request, response)
{
    infoschema.updateMany
    ({
        location:request.params.location,
        country:request.params.country
    })
    .then(function(data)
    {
        response.json(data)
    })
    .catch(function(err)
    {
        response.status(500).send("Error occurred in api MongoDB for Update")
    })
})

module.exports=route
