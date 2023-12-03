import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
/**
 * RoleGuard is a class that implements the CanActivate interface from '@nestjs/common'.
 * It is used to determine whether a route can be activated based on the user's role.
 */
export class RoleGuard implements CanActivate {
  /**
   * Constructs a new instance of the RoleGuard class.
   * @param {Reflector} reflector - An instance of the Reflector class from '@nestjs/core'.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Checks if the user's role is included in the provided roles.
   * @param {string[]} roles - An array of roles.
   * @param {string} userRole - The role of the user.
   * @returns {boolean} - Returns true if the user's role is included in the provided roles, otherwise false.
   */
  matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }

  /**
   * Determines whether the current route can be activated.
   * @param {ExecutionContext} context - The execution context.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} - Returns true if the route can be activated, otherwise false.
   * If no roles are defined, it allows access.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}
