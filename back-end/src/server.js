import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin  from 'firebase-admin';
import fs from 'fs';
import e from 'express';

const credentials = JSON.parse(fs.readFileSync('./credentials.json'));


admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());

let db;

async function connectToDB() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db('full-stack-react-db');
  console.log('✅ Connected to MongoDB');

  // Seed default articles if the collection is empty
  const articlesCollection = db.collection('articles');
  const count = await articlesCollection.countDocuments();
  if (count === 0) {
    await articlesCollection.insertMany([
      {
        name: 'learn-react',
        title: 'The Fastest Way to Learn React',
        content: [
          'React is a popular JavaScript library for building user interfaces.',
          'You can create components and manage state easily with hooks.',
        ],
        upvotes: 0,
        comments: [],
      },
      {
        name: 'learn-node',
        title: 'How to Learn Node.js',
        content: [
          'Node.js lets you run JavaScript on the server.',
          'It’s great for building APIs and backend services.',
        ],
        upvotes: 0,
        comments: [],
      },
      {
        name: 'mongodb',
        title: 'Mastering MongoDB for Modern Apps',
        content: [
          'MongoDB is a NoSQL database that stores data in flexible JSON-like documents.',
          'It’s great for projects where you need scalability and performance.',
          'You can use it easily with Node.js using the official MongoDB driver or Mongoose.',
        ],
        upvotes: 0,
        comments: [],
      },
    ]);
    console.log('🪴 Database seeded with default articles');
  }
}

app.get('/api/articles/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
});
app.use(async function (req, res, next) {
const {authtoken} = req.headers;
if (authtoken) {
  
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
    next();
  } else {
    return res.status(400);
  }
  
});

app.post('/api/articles/:name/upvote', async (req, res) => {

  const {uid}=req.user;
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });
    const upvoteIds= article.upvoteIds ||[];
    const canUpvote = uid&&!upvoteIds.includes(uid);
    if (canUpvote) {
    const updatedArticle = await db.collection('articles').findOneAndUpdate(
      { name },{
       $inc: { upvotes: 1 } ,
      $push: {upvotedBy:uid} },
      { returnDocument: 'after' 

      } );
    if (!updatedArticle.value) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updatedArticle.value);
    }else{
      res.status(403 ).json({message:'User has already upvoted this article or is not logged in'});
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
  try {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };
    const updatedArticle = await db.collection('articles').findOneAndUpdate(
      { name },
      { $push: { comments: newComment } },
      { returnDocument: 'after' }
    );
    if (!updatedArticle.value) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updatedArticle.value);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

async function start() {
  await connectToDB();
  app.listen(8000, function () {
    console.log('🚀 Server is listening on port 8000');
  });
}

start();
