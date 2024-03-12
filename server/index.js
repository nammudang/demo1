import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import graphql from 'graphql';
import products from './data.js'
import cors from 'cors'
import bodyParser  from 'body-parser'
import path from 'path';
import fs from 'fs'
import db from './db.js'
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
  app.listen(PORT);
  console.log("Server running on localhost:", PORT);