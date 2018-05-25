// app/routes.js
const fs = require('fs');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // route to handle get goes here (app.get)
    app.get('/api/:version/lorem', function(req,res){
        // I get version in the params here just for convention, I'm not bothering version checking for this
        const version = req.params.version;
        const filename = './server/files/lorem.txt'; // Could also just require this, but lets use fs for fun
        fs.readFile(filename, 'utf8', function(err,data){
            if(err) throw err;
            res.send(data);
        })
    });
    
    // route to handle creating goes here (app.post)
    app.post('/api/:version/license/update', function(req,res){
        var repoName = req.body.repoName;
        var licenseText = req.body.licenseText;
        console.log(repoName);

        // Let's be blunt here and assume this json isn't HUGE
        // writing to file for a quick POC
        const filename = './server/files/licenses.json';
        let licenses = { };
        
        // read in the existing json and parse to an object

        // fs.exists(filename, (exists) => {
        //     if(exists){
        //         fs.readFile(filename,'utf8',function(err,data){
        //             if(err) throw err;
        //             licenses = JSON.parse(data);
        //             console.log(JSON.stringify(licenses));
        //         });
        //     }
        // });
        if(fs.existsSync(filename)){
            rawData = fs.readFileSync(filename,'utf8');
            licenses = JSON.parse(rawData);
            
        }

        // replace (or add) the licenseText under the repoName
        licenses[repoName] = licenseText;

        // save the json back to a file 
        let writeJson = JSON.stringify(licenses);
        console.log(writeJson);
        fs.writeFile(filename,writeJson,function(err){
            if(err) throw err;
            // saved!
            res.send();
        });

        // res.send();
    })
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};