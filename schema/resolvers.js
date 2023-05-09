import _ from "lodash";
import Expenditure from "../models/Expenditure.js";
import Task from "../models/Task.js";
import PeopleMemo from "../models/PeopleMemo.js";
import User from "../models/User.js";

const resolvers = {
  Query: {
    // user---------------------------------
    users: async () => {
      let usersList = await User.find();
      return usersList;
    },
    user: async (parent, { id }, context) => {
      let currentUser = await User.findById(id);
      let taskList = await Task.find({ createdBy: id });
      let peopleMemoList = await PeopleMemo.find({ createdBy: id });
      let expenditureList = await Expenditure.find({ createdBy: id });
      let data = {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        tasks: taskList,
        peopleMemos: peopleMemoList,
        expenditures: expenditureList,
      };
      return data;
    },
    // ---------------------------------user

    // expenditure---------------------------------
    expenditures: async () => {
      let expenditureList = await Expenditure.find();
      return expenditureList;
    },
    expenditure: async (parent, { id }, context) => {
      let currentItem = await Expenditure.findById(id);
      let creatorID = currentItem.createdBy;
      let currentUser = await User.findById(creatorID);
      let data = {
        name: currentItem.name,
        description: currentItem.description,
        createdAt: currentItem.createdAt,
        user: {
          name: currentUser.name,
        },
      };
      return data;
    },
    // ---------------------------------expenditure

    // task---------------------------------
    tasks: async () => {
      let taskList = await Task.find();
      return taskList;
    },
    task: async (parent, args, context) => {
      let currentItem = await Task.findById(args.id);
      let creatorID = currentItem.createdBy;
      let currentUser = await User.findById(creatorID);
      let data = {
        name: currentItem.name,
        description: currentItem.description,
        createdAt: currentItem.createdAt,
        user: {
          name: currentUser.name,
        },
      };
      return data;
    },
    // ---------------------------------task

    // peopleMemo---------------------------------
    peopleMemos: async () => {
      let peopleMemosList = await PeopleMemo.find();
      return peopleMemosList;
    },
    peopleMemo: async (parent, args, context) => {
      let currentItem = await PeopleMemo.findById(args.id);
      let creatorID = currentItem.createdBy;
      let currentUser = await User.findById(creatorID);
      let data = {
        name: currentItem.name,
        description: currentItem.description,
        createdAt: currentItem.createdAt,
        user: {
          name: currentUser.name,
        },
      };
      return data;
    },
    // ---------------------------------peopleMemo
  },
  Mutation: {
    //user
    deleteUser: async (parent, { id }) => {
      try {
        await User.findByIdAndRemove(id);
        await Expenditure.deleteMany({ createdBy: id });
        await PeopleMemo.deleteMany({ createdBy: id });
        await Task.deleteMany({ createdBy: id });
        return id;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    createUser: async (parent, { input }) => {
      try {
        const { name, email, password } = input;
        const user = await User.signup(name, email, password);
        return user;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    updateUser: async (parent, { input }) => {
      try {
        const { name, email, password } = input;
        const user = await User.signup(name, email, password);
        return user;
      } catch (error) {
        console.log(error);
        return;
      }
    },

    // expenditure---------------------------------
    deleteExpenditure: async (parent, { id }) => {
      try {
        await Expenditure.findByIdAndRemove(id);
        return id;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    // ---------------------------------expenditure

    // task---------------------------------
    deleteTask: async (parent, { id }) => {
      try {
        await Task.findByIdAndRemove(id);
        return id;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    // ---------------------------------task

    // peopleMemo---------------------------------
    deletePeopleMemo: async (parent, { id }) => {
      try {
        await PeopleMemo.findByIdAndRemove(id);
        return id;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    // ---------------------------------peopleMemo
  },
};

export default resolvers;
