const typeDefs = `
    type Query {
        expenditures: [Expenditure]
        expenditure(id: ID!): Expenditure!
        tasks: [Task]
        task(id: ID!): Task!
        peopleMemos: [PeopleMemo]
        peopleMemo(id: ID!): PeopleMemo!
    }
    type Expenditure{
        id: ID!
        name: String
        price: Float
        description: String
        createdBy:String
    }

    type PeopleMemo{
        id: ID!
        name: String
        organization: String
        place: String
        description: String
        createdBy:String
    }
    type Task{
        id: ID!
        name: String
        isCompleted: Boolean
        level: Level 
        description: String
        createdBy:String
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
    type Mutation{
        createExpenditure(input: CreateExpenditureInput!) : Expenditure!
        deleteExpenditure(id: ID!) : Expenditure!
        updateExpenditure( id: ID!, input: UpdateExpenditureInput!) : Expenditure!
    }

`;

export default typeDefs;

