import express from 'express'

import cors from 'cors'


const app = express()

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
})