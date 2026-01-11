const DBMethod = {
  findOne: async (model, id) => {
    try {
      const user = await model.findById(id);
      return user;
    } catch (error) {
      console.error("Error in findOne ", error);
    }
  },

  findAll: async (model, createdStart, createdEnd) => {
    try {
      const query = {};

      if (createdStart || createdEnd) {
        query.createdAt = {};
        if (createdStart) query.createdAt.$gte = createdStart;
        if (createdEnd) query.createdAt.$lte = createdEnd;
      }

      const allUser = await model.find(query);
      return allUser;
    } catch (error) {
      console.error("Error in findAll", error);
      throw error;
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

export default DBMethod;
