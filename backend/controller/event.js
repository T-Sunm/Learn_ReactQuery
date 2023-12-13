import { prisma } from "../config/prismaConfig.js";

export const getImageEvent = async (req, res) => {
    const imagesFileContent = await fs.readFile("./data/images.json");
    const images = JSON.parse(imagesFileContent);

    console.log(images)

    res.json({ images });
}

export const getEvents = async (req, res) => {
    const { max, search } = req.query;
    let events = await prisma.event.findMany({
        include: {
            User: true
        }
    })

    console.log(events)

    if (search) {
        events = events.filter((event) => {
            const searchableText = `${event.title} ${event.description} ${event.location}`;
            return searchableText.toLowerCase().includes(search.toLowerCase());
        });
    }

    if (max) {
        events = events.slice(events.length - max, events.length);
    }

    res.json({
        events: events.map((event) => ({
            id: event.id,
            title: event.title,
            image: event.image,
            date: event.date,
            location: event.location,
        })),
    });
}

export const getEvent = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const events = await prisma.event.findFirst({
        where: {
            id: id
        },
        include: {
            User: true
        }
    }
    );

    if (!events) {
        return res
            .status(404)
            .json({ message: `For the id ${id}, no event could be found.` });
    }

    setTimeout(() => {
        res.json({ events });
    }, 1000);
}

export const postEvent = async (req, res) => {
    const { event, idUser } = req.body;

    if (!event) {
        return res.status(400).json({ message: "Event is required" });
    }

    const { title, description, date, time, image, location } = event;

    if (
        !title?.trim() ||
        !description?.trim() ||
        !date?.trim() ||
        !time?.trim() ||
        !image?.trim() ||
        !location?.trim()
    ) {
        return res.status(400).json({ message: "Invalid data provided." });
    }

    try {
        const result = await prisma.event.create({
            data: {
                title,
                description,
                date,
                time,
                image,
                location,
                userId: idUser
            },
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const putEvent = async (req, res) => {
    const { id } = req.params;
    const { event } = req.body;

    if (!event) {
        return res.status(400).json({ message: "Event is required" });
    }

    const { title, description, date, time, image, location } = event;

    if (
        !title?.trim() ||
        !description?.trim() ||
        !date?.trim() ||
        !time?.trim() ||
        !image?.trim() ||
        !location?.trim()
    ) {
        return res.status(400).json({ message: "Invalid data provided." });
    }

    try {
        const updatedEvent = await prisma.event.update({
            where: { id: id },
            data: {
                title,
                description,
                date,
                time,
                image,
                location
            },
        });

        res.json({ event: updatedEvent });
    } catch (error) {
        if (error.code === 'P2025') { // Prisma specific error code for record not found
            return res.status(404).json({ message: "Event not found" });
        }
        console.error(error);
        res.status(500).json({ message: "Error updating event" });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await prisma.events.delete({
            where: { id: id },
        });

        // If the event is successfully deleted, respond with a message
        res.json({ message: "Event deleted" });
    } catch (error) {
        if (error.code === 'P2025') {
            // This error code indicates that the record to delete was not found
            return res.status(404).json({ message: "Event not found" });
        }
        console.error(error);
        res.status(500).json({ message: "Error deleting event" });
    }
};