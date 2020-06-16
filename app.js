const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
var items=['Cook food', 'Eat food', 'Sleep'];
var workItems =[];

app.get('/', function(req,res){

    var today = new Date();
    var options ={
        weekday:'long',
        day:'numeric',
        month:'short'
    }
    var day= today.toLocaleDateString('en-Us', options);
    res.render('list', {listTitle:day, listItems:items});
    
});

app.get('/work', function(req, res){
    res.render('list', {listTitle:'Work List',listItems:workItems});
});

app.post('/', function(req, res){
    var item = req.body.item;
    if(req.body.list==='Work'){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }    
});

app.listen(3000,function(){
    console.log('Server started on port 3000...')
});
