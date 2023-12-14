// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    // Extract the JWT token from the Authorization header
    const token = headers.authorization?.split(' ')[1];

    if (!token) {
      return false; // No token provided, access denied
    }

    try {
      // Verify and decode the JWT token
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Attach the user data to the request object

      return true; // Authentication successful
    } catch (error) {
      return false; // Token is invalid, access denied
    }
  }
}
