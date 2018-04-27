"use strict"
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL
exports.PORT = process.env.PORT || 5000
exports.JWT_SECRET = process.env.JWT_SECRET
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d"
exports.GILT_KEY = process.env.GILT_KEY
exports.WALMART_KEY = process.env.WALMART_KEY
exports.STRIPE_KEY = process.env.STRIPE_KEY
exports.STRIPE_SECRET = process.env.STRIPE_SECRET