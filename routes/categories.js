const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')

let forumRoute = express.Router()



forumRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_category')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




forumRoute.get('/show', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Show_categories_Deleted')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})






forumRoute.get('/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .execute('Select_category_by_serialcode_category')

        let data = query.recordset[0];//מערך אובייקטים

        res.send(data)

    } catch (error) {
        res.send(error)
    }
})



forumRoute.get('/:id/topics', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Category_code', sql.Int, params.id)
            .execute('Select_topics_by_category')

        let data = await query.recordset
        res.send(data)


    } catch (error) {
        res.send(error)
    }
})













forumRoute.get('/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Category_code', sql.Int, params.id)
            .execute('Select_topics_by_category')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})






forumRoute.post('/add', async (req, res) => {

    try {
        let body = req.body

        // טיפול בשגיאות
        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db)
        let query = await db.request()
            .input('Name_category', sql.NVarChar(150), body.Name_category)
            .output('Serial_code', sql.Int)
            .execute('Add_category')

        let data = await query.result
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




forumRoute.put('/update/:id', async (req, res) => {

    try {
        let params = req.params
        let body = req.body

        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db)
        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .input('Name_category', sql.NVarChar(150), body.Name_category)
            .execute('Update_category')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




forumRoute.delete('/delete/:id', async (req, res) => {

    try {
        let params = req.params

        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db)
        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .execute('Delete_category')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





forumRoute.put('/reactivate/:id', async (req, res) => {

    try {
        let params = req.params

        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db)
        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .execute('Reactivate_category')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }

})



module.exports = forumRoute