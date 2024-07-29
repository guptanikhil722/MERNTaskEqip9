import { STRING, INTEGER, BIGINT } from 'sequelize';

export default (sequelize) => {
    const User = sequelize.define("users", {
        id:{
            type:STRING,
            primaryKey: true,
            unique: true
        },
        firstname: {
            type: STRING,
            unique: false,
            required: true
        },
        lastname: {
            type: STRING,
            unique: false,
            required: false
        },
        number: {
            type: BIGINT,
            unique: true,
            required: true
            
        },
        password: {
            type: STRING,
            unique: false,
            required: true
        },
        createdDate: {
            type: STRING,
            unique: false,
            required: false
        },
        createdBy: {
            type: STRING,
            unique: false,
            required: false
        },
        updatedDate: {
            type: STRING,
            unique: false,
            required: false
        },
        updatedBy: {
            type: STRING,
            unique: false,
            required: false
        }
    });
    return User;
};