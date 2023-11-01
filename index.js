import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


const app = express();
const port = 3000;
var task = ["Buy food","Cook food"];

var workTask = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//default//

// create new database in mongoDB

mongoose.connect("mongodb+srv://lequocan3112:i1gNjyRbr3NzrJai@cluster-study.9ct63zt.mongodb.net/myToDoListAppDefault?retryWrites=true&w=majority");

// schema for default todo list

const itemSchema = {
  name: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  }
}

// modeling: applying schema to each document in the collection

const Item = mongoose.model('Item', itemSchema);

//schema for WORK to do list//

const workItemSchema = {
  name: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  }
}
const workItem = mongoose.model('workItem', workItemSchema);


// insert instruction to items


const item1 = new Item ({
name: "Welcome to your todolist!"
})

const item2 = new Item ({
  name: "Hit the Add button to add a new item" 
  })

const item3 = new Item ({
    name: "Click to delete an item"
    })

const defaultItems = [item1, item2, item3];

//insert documents to collection

await Item.insertMany(defaultItems);

//insert instructions to items for WORK

const workItem1 = new workItem ({
  name: "Welcome to your todolist!"
  })
  
  const workItem2 = new workItem ({
    name: "Hit the Add button to add a new item" 
    })
  
  const workItem3 = new workItem ({
      name: "Click to delete an item"
      })
  
  const defaultWorkItems = [workItem1, workItem2, workItem3];
  
  //insert documents to collection
  
  await workItem.insertMany(defaultWorkItems);


//post route for adding new task
app.post('/addtask', async (req, res) => {
    const itemName = req.body.newItem;  

    const newItem = new Item ({
      name: itemName
    })

    await newItem.save();
    res.redirect("/")
});

app.post('/delete', async (req, res) => {
const checkedItemId = req.body.checkbox;
console.log(checkedItemId);

await Item.findByIdAndRemove(checkedItemId)

res.redirect("/");
})



app.get("/", async (req, res) => {    

//render documents
  res.render("index.ejs", { task: await Item.find({})});
});

// alternative list 
app.post('/addWorkTask', async (req, res) => {
    var workItemName = req.body.newWorkItem;

    const newWorkItem = new workItem ({
      name: workItemName
    })

    await newWorkItem.save();
    
    res.redirect("/work");

});


  app.get("/work", async (req, res) => {
    res.render("work.ejs",{ workTask: await workItem.find({})}); });

  app.post('/deleteWork', async (req, res) => {
      const checkedItemId = req.body.checkbox;
      console.log(checkedItemId);
      
      await workItem.findByIdAndRemove(checkedItemId)
      
      res.redirect("/work");
      })
    


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });






