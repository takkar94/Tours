const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);


exports.checkID = (req, res, next, val) => {
  console.log(`the tour id is ${val}`);
  if (req.params.id * 1> tours.length) {
    return res.status(404).json({
        status: 'fail',
        message: ' Inavlid Id'
    });
  }
  next();
}


exports.checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Fail',
      message: 'missing name or price'
    });
  }
  next();
}


exports.getAllTours =  (req, res) => {
    console.log(req.requestTime);
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
          tours,
        },
      });
  };
  
  
exports.getTour = (req, res) => {
      console.log(req.params);
  
      const id = req.params.id *1 ;
      
      const tour = tours.find(el => el.id === id);
      
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
  }
  
  
exports.createTour = (req, res) => {
   
      const newID = tours[tours.length - 1].id + 1;
      const newTour = { id: newID, ...req.body };
    
      tours.push(newTour);
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          res.status(201).json({
            status: 'success',
            data: {
              tour: newTour,
            },
          });
        },
      );
    };
  
exports.updateTour = (req,res) => {
            
      res.status(200).json({
          status: 'Success',
          data: {
              tour: "<Updated Tour Here>"
          }
      })
  };
  
exports.deleteTour = (req,res) => {
      
      res.status(204).json({
          status: 'Success',
          data: null
      })
  };

