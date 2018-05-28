import { InstallCommandOptions } from '../commands/install'
import Bluebird = require('bluebird')

export abstract class AbstractInstaller {
  public abstract install (options: InstallCommandOptions): Bluebird<void>
}
