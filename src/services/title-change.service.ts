import {bind, /* inject, */ BindingScope, Provider} from '@loopback/core';

/*
 * Fix the service type. Possible options can be:
 * - import {TitleChange} from 'your-module';
 * - export type TitleChange = string;
 * - export interface TitleChange {}
 */
export type TitleChange = unknown;

@bind({scope: BindingScope.TRANSIENT})
export class TitleChangeProvider implements Provider<TitleChange> {
  constructor(/* Add @inject to inject parameters */) {}

  value() {
    // Add your implementation here
    throw new Error('To be implemented');
  }
}
