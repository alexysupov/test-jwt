import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'
import pg from 'pg'

import UsersModel from "./UsersModel.js"

dotenv.config()

export const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD, {
        host: 'postgres',
        dialect: 'postgres',
        dialectModule: pg
})

export const Users = UsersModel(sequelize, DataTypes)
