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
    //deleteUser
    deleteUser: async (parent, { id }) => {
      await User.findByIdAndRemove(id);
      await Expenditure.deleteMany({ createdBy: id });
      await PeopleMemo.deleteMany({ createdBy: id });
      await Task.deleteMany({ createdBy: id });
      return id;
    },

    // expenditure---------------------------------
    createExpenditure: async (parent, args) => {
      return;
    },
    updateExpenditure: async (parent, args) => {
      return;
    },
    deleteExpenditure: async (parent, { id }) => {
      await Expenditure.findByIdAndRemove(id);
      return id;
    },
    // ---------------------------------expenditure

    // task---------------------------------
    createTask: async (parent, args) => {
      return;
    },
    updateTask: async (parent, args) => {
      return;
    },
    deleteTask: async (parent, { id }) => {
      await Task.findByIdAndRemove(id);
      return id;
    },
    // ---------------------------------task

    // peopleMemo---------------------------------
    createPeopleMemo: async (parent, args) => {
      return;
    },
    updatePeopleMemo: async (parent, args) => {
      return;
    },
    deletePeopleMemo: async (parent, { id }) => {
      await PeopleMemo.findByIdAndRemove(id);
      return id;
    },
    // ---------------------------------peopleMemo
  },
};

export default resolvers;
