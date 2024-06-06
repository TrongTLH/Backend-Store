const UserRouter = require('./UserRoutes')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    }

module.exports = routes