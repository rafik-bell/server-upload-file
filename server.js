const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 5000;
///upload file
app.post('/upload/:id', async (req, res) => {
    
          console.log(req.files) 
          req.files.file.mv('./uploads/'+req.params.id+'/' + req.files.file.name)

          res.send({
            status: true,
            message: 'File is uploaded',
            
            link : __dirname+'\\uploads\\'+req.params.id+'\\' + req.files.file.name,
            data: {
                name: req.files.file.name,
                mimetype: req.files.file.mimetype,
                size: req.files.file.size 
                
            }
        });
        
            
});
app.get('/down',(req,res)=>{
  res.download(req.body.link)



})
           

           
    


app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);