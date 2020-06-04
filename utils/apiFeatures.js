class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // const tours = await Tour.find(req.query);
    // 1)filtering
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // const tours = await Tour.find(queryObj);
    // /2) ******advance filtering**********
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    // {difficulty:'easy',duraion:{$gte:5}}
    // {difficulty:'easy',duraion:{gte:'5'}}
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTour = await Tour.countDocuments();

    //   if (skip > numTour) throw new Error('the page doesnot exist ');
    // }
    return this;
  }
}
module.exports = APIFeatures;
