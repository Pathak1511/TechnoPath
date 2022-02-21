const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../DataModel/productModel');
const Mobile = require('./../DataModel/mobileModel');
const Other = require('./../DataModel/otherModel');

// REQUIRED MODULES
//////////////////////////////////////////

dotenv.config({ path: 'config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log('DB connection successfull for import & deleting data')
  );

const laptop = JSON.parse(
  fs.readFileSync(`${__dirname}/laptop-data.json`, 'utf-8')
);

const mobile = JSON.parse(
  fs.readFileSync(`${__dirname}/mobile-data.json`, 'utf-8')
);

const other = JSON.parse(
  fs.readFileSync(`${__dirname}/other-data.json`, 'utf-8')
);

// importing data by reading json file
const importData = async () => {
  try {
    await Product.create(laptop);
    console.log('Data uploaded successfully of laptops');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importMobdata = async () => {
  try {
    await Mobile.create(mobile);
    console.log('Data uploaded successfully of mobiles');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importOtherdata = async () => {
  try {
    await Other.create(other);
    console.log('Data uploaded successfully of Others');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// deleting all the data from DB

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteMobdata = async () => {
  try {
    await Mobile.deleteMany();
    console.log('Data deleted of Mobile successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteOtherdata = async () => {
  try {
    await Other.deleteMany();
    console.log('Data delete from Others successfully');
  } catch (err) {
    console.log(err);
  }
};
///////////////////////////////////////////

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import-mobile') {
  importMobdata();
} else if (process.argv[2] === '--delete-mobile') {
  deleteMobdata();
} else if (process.argv[2] === '--import-other') {
  importOtherdata();
} else if (process.argv[2] === '--delete-other') {
  deleteOtherdata();
}
