const typeDefs = `
    type Query {
        expenditures: [Expenditure]
        expenditure(id: ID!): Expenditure!
        tasks: [Task]
        task(id: ID!): Task!
        peopleMemos: [PeopleMemo]
        peopleMemo(id: ID!): PeopleMemo!
        users: [User]
        user(id: ID!): User!
    }
    type User{
        id: ID!
        name: String!
        email: String!
        password: String!
        role:Role
        expenditures: [Expenditure]
        peopleMemos: [PeopleMemo]
        tasks: [Task]
    }
    enum Role {
        user
        admin
    }
    type Expenditure{
        id: ID!
        name: String
        price: Float
        description: String
        createdBy:ID!
        createdAt:String
        user: User
    }
    type PeopleMemo{
        id: ID!
        name: String
        organization: String
        place: String
        description: String
        createdBy:ID!
        createdAt:String
        user: User
    }
    type Task{
        id: ID!
        name: String
        isCompleted: Boolean
        level: Level 
        description: String
        createdBy:ID!
        createdAt:String
        user: User
    }
    enum Level {
        unnecessary
        normal
        emergent
    }
    input CreateExpenditureInput{
        name: String
        price: Float
        description: String
    }
    input UpdateExpenditureInput{
        id: ID!
        name: String
        price: Float
        description: String
    }
    input CreateTaskInput{
        name: String
        description: String
    }
    input UpdateTaskInput{
        id: ID!
        name: String
        description: String
    }
    input CreatePeopleMemoInput{
        name: String
        price: Float
        description: String
    }
    input UpdatePeopleMemoInput{
        id: ID!
        name: String
        price: Float
        description: String
    }

    input CreateUserInput{
        name: String
        email: String
        password: String
    }


    type Mutation{
        createExpenditure(input: CreateExpenditureInput!) : Expenditure!
        deleteExpenditure(id: ID!) :ID!
        updateExpenditure( id: ID!, input: UpdateExpenditureInput!) : Expenditure!

        createTask(input: CreateTaskInput!) : Task!
        deleteTask(id: ID!) : ID!
        updateTask( id: ID!, input: UpdateTaskInput!) : Task!

        createPeopleMemo(input: CreatePeopleMemoInput!) : PeopleMemo!
        deletePeopleMemo(id: ID!) : ID!
        updatePeopleMemo( id: ID!, input: UpdatePeopleMemoInput!) : PeopleMemo!

        createUser(input: CreateUserInput!) : User!
        deleteUser(id: ID!) : ID!
    }
`;
export default typeDefs;
