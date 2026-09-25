import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { RegisterDto } from '../auth/dto/register.dto.js';
import { Role } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config.js';

const safeSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async create(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('El email ya está registrado');

    const saltRounds = this.jwtConfiguration.bcryptSaltRounds ?? 10;
    const password = await bcrypt.hash(dto.password, saltRounds);

    return this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password },
      select: safeSelect,
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany({ select: safeSelect });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: safeSelect,
    });
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  async updateRole(id: number, role: Role) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: safeSelect,
    });
  }
}
