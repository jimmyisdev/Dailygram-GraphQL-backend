import Expenditure from "../models/Expenditure.js";
import Task from "../models/Task.js";
import PeopleMemo from "../models/PeopleMemo.js";
import _ from "lodash";

const resolvers = {
  Query: {
    // expenditure---------------------------------
    expenditures: async () => {
      let expenditureList = await Expenditure.find();
      return expenditureList;
    },
    expenditure: async (parent, args, context) => {
      let currentExpenditure = await Expenditure.findById(args.id);
      return currentExpenditure;
    },
    // ---------------------------------expenditure

    // task---------------------------------
    tasks: async () => {
      let taskList = await Task.find();
      return taskList;
    },
    task: async (parent, args, context) => {
      let currentTask = await Task.findById(args.id);
      return currentTask;
    },
    // ---------------------------------task

    // peopleMemo---------------------------------
    peopleMemos: async () => {
      let peopleMemosList = await PeopleMemo.find();
      return peopleMemosList;
    },
    peopleMemo: async (parent, args, context) => {
      let currentPeopleMemo = await PeopleMemo.findById(args.id);
      return currentPeopleMemo;
    },
    // ---------------------------------peopleMemo

  },
  Mutation: {
    // expenditure---------------------------------
    createExpenditure: (parent, args) => {
      return;
    },
    updateExpenditure: (parent, args) => {
      return;
    },
    deleteExpenditure: (parent, args) => {
      return;
    },
    // ---------------------------------expenditure


    // task---------------------------------
    // createTask: (parent, args) => {
    //   return;
    // },
    // updateTask: (parent, args) => {
    //   return;
    // },
    // deleteTask: (parent, args) => {
    //   return;
    // },
    // ---------------------------------task


    // peopleMemo---------------------------------
    // createPeopleMemo: (parent, args) => {
    //   return;
    // },
    // updatePeopleMemo: (parent, args) => {
    //   return;
    // },
    // deletePeopleMemo: (parent, args) => {
    //   return;
    // },
    // ---------------------------------peopleMemo

  },
};

export default resolvers;
