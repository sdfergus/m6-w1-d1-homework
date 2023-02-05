const mongoose = require( 'mongoose' );
// mongoose.set( 'useFindAndModify', false );
const Inventory = mongoose.model( 'Inventory' );

/* Creates a new Inventory object and saves to MongoDB database  */
exports.createInventory = ( req, res ) => {
  const inventory = new Inventory( {
    prodname: req.body.prodname,
    qty: req.body.qty,
    price: req.body.price,
    status: req.body.status
  } );

  //save Inventory in the MongoDB
  inventory.save().then( data => {
    res.status( 200 ).json( data );
  } ).catch( err => {
    res.status( 500 ).json( {
      message: 'Fail!',
      error: err.message
    } );
  } );
};

/* Retrieves an Inventory object from MongoDB database w/ given id */
exports.getInventory = ( req, res ) => {
  Inventory.findById( req.params.id ).select( '-__v' )
    .then( inventory => {
      res.status( 200 ).json( inventory );
    } ).catch( err => {
      if ( err.kind === 'ObjectId' ) {
        return res.status( 404 ).send( {
          message: 'Inventory not found with id' + req.params.id,
          error: err
        } );
      }
      return res.status( 500 ).send( {
        message: 'Error retrieving Inventory with id ' + req.params.id,
        error: err
      } );
    } );
};

/* Retrieves all Inventory objects from MongoDB database */
exports.inventories = ( req, res ) => {
  Inventory.find().select( '-__v' ).then( inventoryInfos => {
    res.status( 200 ).json( inventoryInfos );
  } ).catch( error => {
    //log on console
    console.log( error );

    res.status( 500 ).json( {
      message: 'Error!',
      error: error
    } );
  } );
};

/* Updates an Inventory object to MongoDB database  */
exports.updateInventory = ( req, res ) => {
  //Find inventory and update it (params: id, update, options)
  Inventory.findByIdAndUpdate(
    req.body._id,
    {
      prodname: req.body.prodname,
      qty: req.body.qty,
      price: req.body.price,
      status: req.body.status
    },
    { new: false }
  ).select( '-__v' )
    .then( inventory => {
      if ( !inventory ) {
        return res.status( 404 ).send( {
          message: "Error -> Can't update an inventory with id = " + req.params.id,
          error: "Not Found!"
        } );
      }
      res.status( 200 ).json( inventory );
    } ).catch( err => {
      return res.status( 500 ).send( {
        message: "Error -> Can't update inventory with id = " + req.params.id,
        error: err.message
      } );
    } );
};

/* Deletes an Inventory object from MongoDB database w/ given id */
exports.deleteInventory = ( req, res ) => {
  Inventory.findByIdAndRemove( req.params.id ).select( '-__v-_id' )
    .then( inventory => {
      if ( !inventory ) {
        res.status( 404 ).json( {
          message: 'No inventory found with id = ' + req.params.id,
          error: '404'
        } );
      }
      res.status( 200 ).json( {} );
    } ).catch( err => {
      return res.status( 500 ).send( {
        message: "Error -> Can't delete inventory with id = " + req.params.id,
        error: err.message
      } );
    } );
};