const express = require('express');
const Record = require('../models/Record');
const router = express.Router();

  router.post('/', (req, res) => {
   
   const { startDate, endDate, minCount, maxCount } = req.body;
    //const startDate = "2016-01-26";
    //const endDate = "2018-02-02";
    //$lte: 3000 ,$gte: 2700
    /*if (!startDate || typeof startDate !== "Date" ||(!endDate || typeof endDate !== "Date")  ||(!minCount || typeof minCount !== "Number") ||(!maxCount || typeof maxCount !== "Number")   ) {
      return res.status(400).json({
        message: "Invalid Params"
      });
     
    }*/
    if (!startDate  ||!endDate || !minCount ||  !maxCount ) {
      return res.status(400).json({
        message: "Invalid Params"
      });
    }
  
    Record.aggregate([{$project: {
      _id: 0,
      key: 1,
      createdAt: 1,
      totalCount: {
        $sum: '$counts',
      },
    },
  },{ $match: { totalCount: { $lte: maxCount ,$gte: minCount } ,createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }} }])
      .exec((err, records) => {
          if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
          } else {
            if (records.length == 0) {
              return res.status(404).send({
                code: 404,
                msg: 'There is no record!',
                records: [],
              });
            } else {
           res.status(200).send({code: 0, msg: 'Success',records: records})
          }
          }
        });
 
  });
 router.get('/', (req, res) => {
  const startDate = "2016-01-26";
  const endDate = "2018-02-02";
  Record.aggregate([{$project: {
    _id: 0,
    key: 1,
    createdAt: 1,
    totalCount: {
      $sum: '$counts',
    },
  },
},{ $match: { totalCount: { $lte: 3000 ,$gte: 2700 } ,createdAt: {
    $gte: new Date(startDate),
    $lte: new Date(endDate)
  }} }])
    .exec((err, records) => {
        if (err) {
          console.log(err);
          console.log("records err");
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Failure' }));
          res.sendStatus(500);
        } else {
        res.status(200).send({code: 0, msg: 'Success',records: records})
        }
      });
  
  
});


module.exports = router;





