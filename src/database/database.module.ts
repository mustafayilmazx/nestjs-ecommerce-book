import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
