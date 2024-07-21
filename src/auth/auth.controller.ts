import { Body, Controller, Get, Post, Render, Req, Res, UseGuards,Request, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Get('register')
    @Render('register')
    getRegister(){
        return null
    }

    @Post('register')
    registerLocal(@Body() profile:any){
        return this.authService.registerLocal(profile)
    }
    
    @Get('login')
    @Render('login')
    getLogin(){
        return null
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req, @Res() res){
        return res.redirect('test')
    }   

    @Get('test')
    @UseGuards(AuthenticatedGuard)
    async test(@Req() req){
        console.log('req',req.user)
        return null
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req){}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleCallback(@Req() req,@Res() res){
        res.redirect('/')
    }
}
