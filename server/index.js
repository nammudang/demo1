import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import graphql from 'graphql';
import products from './data.js'
import cors from 'cors'
import bodyParser  from 'body-parser'
import path from 'path';
import fs from 'fs'
import db from './db.js'
import crypto from 'crypto'
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt; 
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var PORT = process.env.port || 3000
const sk = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDcgN8/+05w23Ra
PXKUzsm2PbAtHPsTBeAdlqNB9w+8iQQofY6qYcB4N5/ooYY8M/H/ZI4wcqbpmFc+
IIK/ZCBKHSQKoVV3BJx3ww3FxLAIgUoFOkr+2krZdwH3wd1NjOzN/1HsdYw2qMqp
z4USnrJ21tcpV1EnCYfWja0NjNriDoCTddlgmniikZo5TAvaWAtrjhxHXXxPpJR5
XNMNBc8He2ljwtc9IIkJswdkt7Mqq5F4sJawNyE4hXHLTO87logat9/ZicO/JsMy
AA7K8C7FedflIIQg8TpKBKLdrSzWMb9Pql5lOtpaFMpXmi5FtfGIQOl74NFrXAcy
/1huPTEdAgMBAAECggEAFMT6wk8Mg2rYWcuh6ExWCZlj58vsBk2uX3sZ45O+4rZR
MvMopfnRJEGxCTt1pmQKLlEtZ3jVKfmUdiCf0CFBPVnjVDEAGNbRWiKAQJmXLyXm
b/meqMSs+jDQeaLEEpLslzauY8RqsZdSh44pbaiPDMyNtbIozbGDHv13SGh1EYe5
YFZY4xArWWRlR06V4ITMqsmf/6VvJauG3T/DC96a7oMLP7Bcn+2BqJ4YqCLxb6c9
nes0wr3UpvdnyM0HRf+4vWrp7eOwdMIpyaWXVkhZk9zd+UL7YTOzxBiSiPy4lRkA
M8/VtL7B0fHZXahtjDIOx0fBkcwtrRXhtTa11GV6gQKBgQD2vvrAZgawsqhDY8rs
f5+fafAL0L8DYIpL4QUbiH28mzH4+LuvySLOzPRiOzKTba0zSQyxF7n1sxpiJ9MM
csc2rU7ZrnJK5z6Np+E9qFpc66NgmcaTP7PJdWsT6+8mosm2JJzKc9huSf/7PPz5
h5KcSB0vreJslVAK/gUSvEVq4QKBgQDkxe+fHsdvycTRJOKnimJHcjLpjWj7xTsG
AIh5c3XAA/JxbKlVeUtA+J4+uCe1LLrM8sSsE+HDGxWZj/N5vMiRs5fpz3Tu5H0R
LWrK1jVydYBL09V/aGPtVaSwGQvM0ASTe0GaOPGuQ0UmtgOhdCD4YhUChY3yUu8h
RyqASgdpvQKBgQC8NjUC6VAVHFHpBYfWGgtiB+bIvHPXWZ5j/sJsnBJ8+UyHAwP3
NE9Ou1t2Sn1ro29H/WKm+tgoKHPph0Me7bYzaMMKnFwl8nnuh63x4Cb9VeiLWQD1
dNPoyZ3h1kfXirieLRNEAlWG2v9dXsoAdH9Kol9Q7SwXc1VY7SZlgiLZQQKBgQDE
gTSLRB/g6LnzP7CkYpx6bCBJNpsXr9k8FZckY0WgUoOcY86ryY0XWLZsfzg0SiCG
TH0cpdNFCG2sQtbLGZpadJ4nSnhRftfiulVBt2+fSkiSWXnIf31d7jOQw2K8YW2c
1MGL3B/UJJowXyWNODfdwjnzuY4suIoI1p0uJuhpLQKBgQDjvgZ4Sx6NA6jSkTfd
qUvxt2IuNp3KqJtah0t4Gqq5RFpkWIAa57qm4qnFQE6RvleQy154KFGzP9HmzhEL
HQ5W39CboJP3zyNhpGPKBdxI6jev+B4t13X5EJowCQkwn4tmawDahbHtbYSaqjW1
VOyqrHQjxl3XAT92J9qodN21fw==
-----END PRIVATE KEY-----`

const pk = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3IDfP/tOcNt0Wj1ylM7J
tj2wLRz7EwXgHZajQfcPvIkEKH2OqmHAeDef6KGGPDPx/2SOMHKm6ZhXPiCCv2Qg
Sh0kCqFVdwScd8MNxcSwCIFKBTpK/tpK2XcB98HdTYzszf9R7HWMNqjKqc+FEp6y
dtbXKVdRJwmH1o2tDYza4g6Ak3XZYJp4opGaOUwL2lgLa44cR118T6SUeVzTDQXP
B3tpY8LXPSCJCbMHZLezKquReLCWsDchOIVxy0zvO5aIGrff2YnDvybDMgAOyvAu
xXnX5SCEIPE6SgSi3a0s1jG/T6peZTraWhTKV5ouRbXxiEDpe+DRa1wHMv9Ybj0x
HQIDAQAB
-----END PUBLIC KEY-----
`
var voteType = new GraphQLObjectType({
    name: "vote",
    description: "vote of The product",
    fields: () => ({
     star: {
       type: GraphQLInt,
       description: "one_star of the vote",
     },
     men: {
       type: GraphQLInt,
       description: "men of vote",
     },
     women: {
       type: GraphQLInt,
       description: "women of vote",
     }
   })
  });
var productType = new GraphQLObjectType({
    name: "products",
    description: "Detail of The product",
    fields: () => ({
     name: {
       type: GraphQLString,
       description: "Name of the product",
     },
     price: {
       type: GraphQLInt,
       description: "price of product",
     },
     category: {
       type: new GraphQLList(GraphQLString),
       description: "category of product",
     },
     vote: {
       type: new GraphQLList(voteType),
       description: "vote of product",
     }
   })
  });
  var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: () => ({
      hey: {
        type: GraphQLString,
        resolve: function(_, args){
          return products[0].name
        }
      },
      getProducts: {
        type: new GraphQLList(productType),
        resolve: function(_, args){
          return products
        }
      }
    })
  });
  var MyGraphQLSchema = new GraphQLSchema({
    query: queryType
  });
  app.use('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
  })); 
  app.post('/upload', (req, res) => {
    const today = new Date()
    const file = req.body.filename.split(".")
    const filename = file.slice(0, file.length - 1).join('.')    + today.getTime() + '.' + file[file.length - 1]
    const binaryData = Buffer.from(req.body.file, 'base64');
    fs.writeFile(filename, binaryData, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return;
      }
      console.log('File saved successfully')
    })

    try {    
      db.run('INSERT INTO information (name, filepic) VALUES (?, ?)', [req.body.name,filename], function(err) {
        if (err) {
            console.error('Error inserting data', err);
        } else {
            console.log('Data inserted successfully');
        }
      });
      } catch (err) {
        console.log(err)
      }

    res.status(200).json({sucess:true})

  });

  app.get('/getalldata' , (req,res) => {
    const sql = `SELECT name,id, '/files/' || filepic as filepic  FROM information`

    // ดึงข้อมูลจากฐานข้อมูล
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });

  })

  app.get ('/files/:filename' , (req,res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), filename);

    res.sendFile(filePath, (err) => {
      if (err) {
          console.error('Error sending file:', err);
          res.status(err.status).end();
      } else {
          console.log('File sent successfully');
      }
  });

  })

  app.post('/getdatadetail' , (req,res) => {
    const sql = `SELECT name,id, '/files/' || filepic as filepic  FROM information where id = ${req.body.id}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
  })
  app.post('/update' , (req,res) => {
    const sql = `UPDATE information  SET name = '${req.body.name}'  where id = ${req.body.id}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
  })

  app.get('/profie' , (req,res) => {
    const data = {
      phone : crypto.privateEncrypt(sk, Buffer.from('0922790646', 'utf-8')).toString('base64')
    }
    console.log(data.phone.length)
    res.send(data)
  })


  app.listen(PORT);
  console.log("Server running on localhost:", PORT);