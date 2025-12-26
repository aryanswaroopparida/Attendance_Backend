const DBMethod = {
  findOne: async (model, id) => {
    try {
      const user = await model.findById(id);
      return user;
    } catch (error) {
      console.error("Error in findOne ", error);
    }
  },

  findAll: async (model) => {
    try {
      const allUser = await model.find();
      return allUser;
    } catch (error) {
      console.error("Error in findAll ", error);
    }
  },

  create: async (model, data) => {
    try {
      const createUser = await model.create(data);
      return createUser;
    } catch (error) {
      console.error("Error in createUser ", error);
    }
  },
};

export default DBMethod
