import { command, Command, metadata, option } from 'clime'
import { DefaultOptions } from '../DefaultOptions'
import { SupportedProducts } from '../SupportedProducts'
import { File } from 'clime/bld/castable'
import { Jira } from '../install/Jira'

export class InstallCommandOptions extends DefaultOptions {
  @option({
    flag: 'f',
    name: 'file',
    type: File,
    description: 'JAR file to upload',
    required: true
  }) public file
}

@command({
  description: 'Installs a plugin from a jar file into an Atlassian server'
})
export default class extends Command {
  @metadata
  public execute (options: InstallCommandOptions): Promise<any> | any {
    if (options.product === SupportedProducts.JIRA) {
      return new Jira().install(options)
    }
  }
}
