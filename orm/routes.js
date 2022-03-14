const model=require('./model')
const route=require("express").Router();

route.get("/authorapi",function(request,response)
{
    model.authors.findAll({include:[model.books]})
    .then(function(data)
    {
    response.json(data);
    })
    .catch(function(err)
    {
        response.json([]);
    })
})

route.get("/bookapi",function(request,response)
{
    model.books.findAll()
    .then(function(data)
    {
    response.json(data);
    })
    .catch(function(err)
    {
        response.json([]);
    })
})

route.post("/authorapi",function(request,response)
{
    var ab_data=
    {
        author_id:request.body.author_id,
        author_name:request.body.author_name,
        city:request.body.city,
        books:request.body.books
    }
    console.log(ab_data);
    model.authors.create(ab_data, {include: [model.books]})
    .then(()=>response.send("successfully uploaded"))
    .catch(()=>response.sendStatus(500));
})

route.delete("/authorapi/:author_id", function(request, response)
{
    model.authors.destroy
    ({
        where:
        {
            author_id: request.params.author_id
        }
    }).then(function(data)
    {
        response.json(data)
    })
    .catch(function(err)
    {
        response.status(500).send("error occured in deleting author ID")
    })
})

route.delete("/bookapi/:book_id", function(request, response)
{
    model.books.destroy(
    {
        where:
        {
            book_id:request.params.book_id
        }
    })
    .then(function(data)
    {
        response.json(data)
    })
    .catch(function(err)
    {
        console.log(err);
        response.json([])
    })
})

route.put("/bookapi/:book_id/:price/:book_name", function(request, response)
{
    model.books.update
    (
        {
            price: request.params.price,
            book_name: request.params.book_name
        },
        {
        where:
            {
                book_id: request.params.book_id
            }
        }
    ).then(function(data)
    {
        response.json(data)
    })
    .catch(function(err)
    {
        console.log(err);
        response.json([])
    })
})

module.exports = route
