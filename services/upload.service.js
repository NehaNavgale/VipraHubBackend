var multer = require('multer');

var store = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, './uploads');
  },
  filename:function(eq,file,cb){
    cb(null, Date.now()+'-'+file.originalname);
  }
})

module.exports = multer({storage: store}).single('file');