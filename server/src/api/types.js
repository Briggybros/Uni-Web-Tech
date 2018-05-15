// @flow
import type { $Request } from 'express';
import User from '../models/User';

export type Request = $Request & { user: User }
