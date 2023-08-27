'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
//npm packages
const express_1 = __importDefault(require('express'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
require('dotenv').config({
  path: '.env',
})
// Custom Modules, Packages, Configs, etc.
const app = (0, express_1.default)()
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
app.use((0, cookie_parser_1.default)())
//healthcheck
app.get('/healthcheck', (_, res) => {
  console.log(res)
  res.status(200).json({ error: false, message: 'healthcheck' })
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
exports.default = app
