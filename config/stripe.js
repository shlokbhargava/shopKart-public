// const stripe = require('stripe')('sk_test_51GvoiXJmYE2iXkVGx63vkh5NcG9gqhfMBrZQJErYGY7ofDwacQ1AT3zsqmWnyfOHeYRafXsLxZwelKL6BDOMxs2n00K5dMPh6V', {apiVersion: ''});

// const session = stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   line_items: [{
//     price: 'price_1Gvs1qJmYE2iXkVGuAleISZX',
//     quantity: 1,
//   }],
//   mode: 'payment',
//   success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//   cancel_url: 'https://example.com/cancel',
// });