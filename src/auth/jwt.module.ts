import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS, JwtModuleOptions } from './jwt.interface';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(jwtModuleOptions: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      imports: [],
      //   controllers: [],
      //   global: true,
      providers: [
        {
          provide: JwtService,
          useClass: JwtService, // provide class
        },
        {
          provide: CONFIG_OPTIONS,
          useValue: jwtModuleOptions, // provide value
        },
      ],
      exports: [JwtService],
    };
  }
}
