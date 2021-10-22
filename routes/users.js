const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split('.')[1])
    }
})

const upload = multer({ storage: storage })


let forumRoute = express.Router()



forumRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('select_user')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})






forumRoute.get('/show', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Show_users_Deleted')

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
            .input('User_code', sql.Int, params.id)
            .execute('Select_user_by_usercode')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})


forumRoute.post('/upload', upload.any(), async (req, res) => {

    try {

        let fullUrl = req.protocol + '://' + req.get('host');

        // res.send({ img: `${fullUrl}/uploads/users/${res.req.files[0].filename}` });
        console.log(req)
        res.send(req)
    } catch (error) {
        res.send(error)
    }
})




forumRoute.post('/add', async (req, res) => {

    try {
        let body = res.body;


        // טיפול בשגיאות
        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db)
        let query = await db.request()
            .input('Birthday', sql.Date, body.Birthday)
            .input('City', sql.NVarChar(20), body.City)
            .input('FirstName', sql.NVarChar(20), body.FirstName)
            .input('LastName', sql.NVarChar(20), body.LastName)
            .input('Id', sql.Int, body.Id)
            .input('UserTypeCode', sql.Int, body.UserTypeCode)
            .input('Photo', sql.Text, `${fullUrl}/uploads/users/${res.req.files[0].filename}`)
            .input('Email', sql.NVarChar(30), body.Email)
            .input('ConfirmPassword', sql.NVarChar(20), body.ConfirmPassword)
            .input('UserPassword', sql.NVarChar(20), body.Password)
            .output('UserCode', sql.Int)
            .execute('Add_user')

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
            .input('User_code', sql.Int, params.id)
            .input('Birthday', sql.Date, body.Birthday)
            .input('City', sql.NVarChar(20), body.City)
            .input('First_name', sql.NVarChar(20), body.First_name)
            .input('Last_name', sql.NVarChar(20), body.Last_name)
            .input('Id', sql.Int, body.Id)
            .input('UserType_code', sql.Int, body.UserType_code)
            .input('Photo', sql.Text, body.Photo)
            .input('Email', sql.NVarChar(30), body.Email)
            .input('Confirm_password', sql.NVarChar(20), body.Confirm_password)
            .input('User_password', sql.NVarChar(20), body.User_password)

            .execute('Update_user')

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
            .input('user_code', sql.Int, params.id)
            .execute('delete_user')

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
            .input('user_code', sql.Int, params.id)
            .execute('reactivate_user')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




forumRoute.post('/login', async (req, res) => {

    try {

        let body = req.body;
        console.log(body);
        // טיפול בשגיאות
        sql.on('error', (error) => res.send(error))

        let db = await sql.connect(config.db);

        let query = await db.request()
            .input("Email", sql.NVarChar, body.Email)
            .input("Password", sql.NVarChar, body.Password)
            .execute("Login_user");

        let data = query.recordset[0];//מערך אובייקטים
        console.log(data);
        res.send(data);


    } catch (error) {
        res.send(error)
    }
})



module.exports = forumRoute