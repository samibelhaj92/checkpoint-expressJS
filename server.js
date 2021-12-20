const express = require('express')
const app = express()

const myCustomMiddleware = (req, res, next) => {
    let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getDay() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] ${method}:${url} ${status}`;
if ((current_datetime.getDay()==6 || current_datetime.getDay()==0) || (current_datetime.getHours()<9 || current_datetime.getHours()>17))
{res.send('Sorry Customer, We are closed. Please comeback Monday from 9am to 5pm')}
console.log(log)
next()
}

var products = 
[
    {id:0, label:'pen', Qty:25},
    {id:1, label:'dog', Qty:25},
    {id:2, label:'house', Qty:25},
    {id:3, label:'car', Qty:25},
    {id:4, label:'job', Qty:25},
    {id:5, label:'family', Qty:25}
]

app.use(myCustomMiddleware)

app.use(express.static('public'))

app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/services', (req, res) => {
    res.sendFile(__dirname+'/public/ourServices.html')
})

app.get('/products', (req, res)=>{
    res.send( {msg: "List of products", products} )
} )

app.get('/products/:id', (req, res)=>{
    const {id}=req.params
    const product = products.find(el => el.id==id)
    res.send({msg: "found product", product})
    // console.log(req.params)
})


app.post('/addProducts', (req, res)=>{
    products = [...products, req.body ]
    res.send({msg:"product added", products})
})

app.delete('/deleteProducts/:id', (req, res)=>{
    const {id}=req.params
    products = products.filter(el=>el.id!=id)
    res.send({msg:"product deleted", products})
})

app.put('/editProducts/:id', (req, res)=>{
    const {id}=req.params
    products = products.map(el=> el.id == id?
        {...el, ...req.body} : el)
    res.send({msg:"product edited", products})
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname+'/public/contactUs.html')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname+'/public/style.css')
})

const port = 1234

app.listen(port, () => 
console.log(`server is running on port ${port}`))
