import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { config } from './config/env';
import { initSocket } from './config/socket';

import authRoutes from './routes/authRoutes';

import inquiryRoutes from './routes/inquiryRoutes';

import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';

// import messageRoutes from './routes/messageRoutes';
import reviewRoutes from './routes/reviewRoutes';
import supplierRoute from './routes/supplierRoute';
import categoryRoute from './routes/categoryRoute'
import prodcutsRoute from './routes/productRoutes'

import { errorHandler } from './middlewares/errorHandler';


const app = express();
const corsOptions ={
   origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
  optionSuccessStatus: 200
}



app.use(cors(corsOptions ))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const server = http.createServer(app);




// Middlewares guud
app.use(helmet());

app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/products', prodcutsRoute );
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/suppliers', supplierRoute);
app.use('/api/category', categoryRoute);

// Health check
app.get('/health', (req, res) => res.send('OK'));

// Error handler
app.use(errorHandler);


const PORT = config.PORT;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port  ${PORT}`);
});

export default app;