
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'anything',
    db: 'shopkart_development',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: "***********", 
          pass: "************", 
        },
      }
}


module.exports = development;

// const production = {
//     name: 'production',
//     asset_path: process.env.SHOPKART_ASSET_PATH,
//     session_cookie_key: process.env.SHOPKART_SESSION_COOKIE_KEY,
//     db: process.env.SHOPKART_DB,
//     smtp: {
//         service: 'gmail',
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, 
//         auth: {
//           user: process.env., 
//           pass: process.env., 
//         },
//       }
// }


// module.exports = eval(process.env.SHOPKART_ENVIRONMENT) == undefined ? development : eval(process.env.SHOPKART_ENVIRONMENT);