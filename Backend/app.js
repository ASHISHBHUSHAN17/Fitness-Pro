import express from "express";
import { config } from "dotenv";
import { sendEmail } from "./utils/sendEmail.js";
import cors from "cors";
const app = express();
const router = express.Router();


// app.use(
//     cors({
//         origin: [process.env.FRONTEND_URL],
//         methods: ["POST"],
//         credentials: true,
//     })
// );
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your React app's URL
    methods: ["GET", "POST"],
    credentials: true,
  };

app.use(cors(corsOptions));


app.use(express.json());

//use for verification --> that ki data ka datatype kya hai int hai ya string
app.use(express.urlencoded({ extended: true} ));

app.post("/send/mail" , async(req, res, next) => {
    console.log("here")
    const {name , email , message} = req.body;
    if(!name || !email || !message){
        return next(
            res.status(404).json({
               success:false,
               message:"Please provide all details",
            })
        );
    }

    try{
        console.log("hi")
        await sendEmail({
            email: "bhushanashish17@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            email,
        });
        console.log("hi2")
        res.status(200).json({
            success:true,
            message: "Message Sent Successfully",
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message: "Internal Server Error",
        }); 
    }
});

app.get('/', (req, res) => {
    res.send('Hello from the root endpoint!');
  });
  

// router.get("/" , (req, res, next) => {
//     res.json({
//         success:true,
//         message: "HABIBI COME TO DUBAI"
//     });
// });


app.use(router);


app.listen(4000, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
});