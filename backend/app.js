import fs from "node:fs/promises";
import dotenv from "dotenv";
import express from "express";
import { eventRouter } from "./routes/eventsRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { prisma } from "./config/prismaConfig.js";

const app = express();
dotenv.config();
app.use(express.json());


// set như này để có thể truy cập qua http://your_server_address/image.jpg
app.use(express.static("public"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use(eventRouter);
app.use(userRouter);



// app.get("/events", async (req, res) => {
//   const { max, search } = req.query;
//   let events = await Events.find()

//   if (search) {
//     events = events.filter((event) => {
//       const searchableText = `${event.title} ${event.description} ${event.location}`;
//       return searchableText.toLowerCase().includes(search.toLowerCase());
//     });
//   }

//   if (max) {
//     events = events.slice(events.length - max, events.length);
//   }

//   res.json({
//     events: events.map((event) => ({
//       id: event.id,
//       title: event.title,
//       image: event.image,
//       date: event.date,
//       location: event.location,
//     })),
//   });
// });

app.get("/events/images", async (req, res) => {
  const imagesFileContent = await fs.readFile("./data/images.json");
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});

app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const events = await prisma.event.findFirst({
    where: {
      id: id
    },
    include: {
      User: true
    }
  });

  if (!events) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no event could be found.` });
  }

  setTimeout(() => {
    res.json({ events });
  }, 1000);


});

// app.post("/events", async (req, res) => {
//   const { event } = req.body;

//   if (!event) {
//     return res.status(400).json({ message: "Event is required" });
//   }

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.date?.trim() ||
//     !event.time?.trim() ||
//     !event.image?.trim() ||
//     !event.location?.trim()
//   ) {
//     return res.status(400).json({ message: "Invalid data provided." });
//   }

//   const events = new Events(event)

//   events.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })

// });

// app.put("/events/:id", async (req, res) => {
//   const { id } = req.params;
//   const { event } = req.body;

//   if (!event) {
//     return res.status(400).json({ message: "Event is required" });
//   }

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.date?.trim() ||
//     !event.time?.trim() ||
//     !event.image?.trim() ||
//     !event.location?.trim()
//   ) {
//     return res.status(400).json({ message: "Invalid data provided." });
//   }

//   try {
//     // Tìm và cập nhật sự kiện trong cơ sở dữ liệu bằng Mongoose
//     const updatedEvent = await Events.findByIdAndUpdate(id, event, {
//       new: true, // Trả về sự kiện đã được cập nhật
//     });

//     if (!updatedEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json({ event: updatedEvent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating event" });
//   }
// });

// app.delete("/events/:id", async (req, res) => {
//   const { id } = req.params;

//   const deletedEvent = await Events.deleteOne({ _id: id });
//   setTimeout(() => {
//     res.json({ message: "Event deleted" });
//   }, 1000);
// });

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:${3000}`);
});

