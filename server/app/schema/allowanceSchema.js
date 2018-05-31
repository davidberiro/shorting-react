import mongoose from 'mongoose'

const allowanceSchema = mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  tokenA: {
    type: Number,
    required: true
  },
  tokenB: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Allowance', allowanceSchema)