const model=require('./model')
const route=require("express").Router();
const addinfo="/addinfo"
const auth_info="/auth_info"
const book_info="/book_info"

route.post(addinfo, function(request, response)
{
    var au_data=
    {
        author_id:request.body.author_id,
        author_name:request.body.author_name,
        city: request.body.city,
        books:[
            {book_id:request.body.book_id,
            book_name:request.body.book_name,
            category:request.body.category,
            price:request.body.price,
            no_of_pages:request.body.no_of_pages}
        ]
    }
    console.log(au_data);
    model.authors.create(au_data, {include: [model.books]})
    .then(()=>response.send("Data added successfully"))
    .catch(()=>response.sendStatus(500));
})
route.get(auth_info, function(request, response)
{
    model.authors.findAll()
    .then(function(data)
    {
    response.render("authorinfo", {forms:data});
    })
    .catch(function(err)
    {
        response.render([]);
    })
})
route.get(book_info, function(request, response)
{
    model.books.findAll()
    .then(function(data)
    {
    response.render("bookinfo", {forms:data});
    })
    .catch(function(err)
    {
        response.render([]);
    })
})

module.exports=route
