const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: {type: String, required: true},  
      amount: {type: String, required: true},
      Image: {type: String, required: true},
      price: {type: String, required: true},
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  ShippingAddress: {
    fullName: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true},
  },
  paymentMethod: {type: String, required: true},
  itemsPrice: {type: String, required: true},
  ShippingAddress: {type: String, required: true},
  taxPrice: {type: String, required: true},
  totalPrice: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  isPaid: { type: Boolean, default: false},
  paidAt: {type: Date},
  isDelivered: {type: Boolean, default: false},
  deliveredAt: { type: Date},
},
    {
        timestamps: true,
    }
);
 


const Order = mongoose.model('Oder', orderSchema);
module.exports = Order