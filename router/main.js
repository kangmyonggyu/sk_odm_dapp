module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });

    app.get('/about.html',function(req,res){
        res.render('about.html');
    });

    app.get('/blank.html',function(req,res){
        res.render('blank.html');
    });

    app.get('/buttons.html',function(req,res){
        res.render('buttons.html');
    });

    app.get('/cards.html',function(req,res){
        res.render('cards.html');
    });

    app.get('/charts.html',function(req,res){
        res.render('charts.html');
    });

    app.get('/login.html',function(req,res){
        res.render('login.html');
    });

    app.get('/register.html',function(req,res){
        res.render('register.html');
    });

    app.get('/tables.html',function(req,res){
        res.render('tables.html');
    });
}