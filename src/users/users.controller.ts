import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as UserModel, UserTracking } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Controller('users')
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Post('login')
  async login(
    @Body()
    userData: {
      password: string;
      email: string;
    },
  ): Promise<UserModel> {
    const saltOrRounds = 10;

    const user = await this.prismaService.user.findFirst({
      where: {
        AND: [
          { email: { equals: userData.email } },
          //{ password: { equals: userData.password } },
        ],
      },
    });
    if (!user) {
      throw new HttpException('Invalid email or password', 406);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid email or password', 406);
    }
    return user;
  }

  @Post('signup')
  async signupUser(
    @Body()
    userData: {
      password: string;
      email: string;
    },
  ): Promise<UserModel> {
    const saltOrRounds = 10;
    console.log(userData.email);
    console.log(userData.password);
    const hash = await bcrypt.hash(userData.password, saltOrRounds);

    // await bcrypt.genSalt(this.saltRounds, (err: any, salt: any) => {
    //   bcrypt.hash(userData.password, this.saltRounds, (err, hash) => {
    //     console.log(`Hash: ${hash}`);
    //     password = hash;
    //   });
    // });

    // const isMatch = await bcrypt.compare(userData.password, hash);
    // const isMatch2 = await bcrypt.compare(userData.password, '$2b$10$JkwfIcRqBfFpX6o.vMcBcuKKImM6Pa60ruVcU6bpkfitQIHtBLNOq');
    // const isMatch3 = await bcrypt.compare('userData.password', '$2b$10$JkwfIcRqBfFpX6o.vMcBcuKKImM6Pa60ruVcU6bpkfitQIHtBLNOq');
    //
    // console.log(hash);

    // console.log(isMatch);
    // console.log(isMatch2);
    // console.log(isMatch3);
    if (
      await this.prismaService.user.findUnique({
        where: {
          email: userData.email,
        },
      })
    ) {
      throw new HttpException('Existing email', 406);
    }

    return this.prismaService.user.create({
      data: {
        email: userData.email,
        externalUID: '',
        password: hash,
        status: 'active',
        userTypeId: 1, // Organization Member
      },
    });
  }

  @Post('tracking')
  async tracking(
    @Body()
    trackingData: {
      externalUID: string;
      pageName: string;
    },
  ): Promise<UserTracking> {
    return this.prismaService.userTracking.create({
      data: {
        externalId: trackingData.externalUID,
        pageName: trackingData.pageName,
      },
    });
  }
}
