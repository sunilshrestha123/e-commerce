const factory = require('./handlerFactory');
exports.getAll = factory.getAll(SubCategory);
exports.createSubcategory = factory.createOne(SubCategory);
exports.updateSubcategory = factory.updateOne(SubCategory);
exports.deleteSubcategory = factory.deleteOne(SubCategory);
