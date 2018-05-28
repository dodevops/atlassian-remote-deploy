import { ExpectedError, option, Options, ValidationContext } from 'clime'
import { SupportedProducts } from './SupportedProducts'

export class DefaultOptions extends Options {
  @option({
    flag: 'P',
    name: 'product',
    type: String,
    description: 'Product to install plugin into. Currently supported: ' +
    (
      Object as any
    ).values(SupportedProducts).join(','),
    validator: (value: any, context: ValidationContext) => {
      if (!(
        Object as any
      ).values(SupportedProducts).includes(value)) {
        throw new ExpectedError('Product is not one of: ' +
          (
            Object as any
          ).values(SupportedProducts).join(','))
      }
    }
  }) public product: SupportedProducts

  @option({
    flag: 'U',
    name: 'url',
    type: String,
    description: 'URL to the host running the application (e.g. https://jira.mycompany.com)',
    required: true
  }) public url: string

  @option({
    flag: 'u',
    name: 'username',
    type: String,
    description: 'Username to log into with',
    required: true
  }) public username: string

  @option({
    flag: 'p',
    name: 'password',
    type: String,
    description: 'Password to use for logging in',
    required: true
  }) public password: string

  @option({
    flag: 'c',
    name: 'context',
    type: String,
    description: 'Context path to use (e.g. /jira)',
    required: true
  }) public contextPath: string

  @option({
    name: 'max-retries',
    type: Number,
    description: 'Number of retries checking for plugin installation before giving up.',
    default: 30
  }) public maxRetries: Number

}
