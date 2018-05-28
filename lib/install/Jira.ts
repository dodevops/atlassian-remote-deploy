import { AbstractInstaller } from './AbstractInstaller'
import { InstallCommandOptions } from '../commands/install'
import * as requestPromise from 'request-promise'
import * as fs from 'fs'
import * as request from 'request'
import Bluebird = require('bluebird')

function waitForInstallation (
  delay: number,
  url: string,
  options: InstallCommandOptions,
  client: any,
  count: number = 0
): Bluebird<void> {
  return Bluebird.delay(
    delay
  )
    .then(
      () => {
        return client.get(
          url
        )
          .then(
            response => {
              let responseBody = JSON.parse(response)
              if (!responseBody.enabled) {
                if (count > options.maxRetries) {
                  throw new Error('Max retries reached waiting for plugin installation')
                }
                return waitForInstallation(
                  Number(responseBody.status.pingAfter),
                  options.url + responseBody.links.self,
                  options,
                  client,
                  count++
                )
              }
            }
          )
      }
    )
}

export class Jira extends AbstractInstaller {
  public install (options: InstallCommandOptions): Bluebird<void> {
    let clientOptions: requestPromise.RequestPromiseOptions = {
      auth: {
        username: options.username,
        password: options.password
      }
    }

    let client = requestPromise.defaults(clientOptions)

    // fetch token

    return client.get(
      `${options.url}${options.contextPath}/rest/plugins/1.0/`,
      {
        headers: {
          'X-Atlassian-Token': 'no-check'
        },
        resolveWithFullResponse: true
      }
    )
      .then(
        (response: request.Response) => {
          let token = response.headers[ 'upm-token' ]
          // upload plugin

          return client.post(
            `${options.url}${options.contextPath}/rest/plugins/1.0/?token=${token}`,
            {
              headers: {
                'X-Atlassian-Token': 'no-check'
              },
              formData: {
                plugin: {
                  value: fs.createReadStream(options.file.fullName),
                  options: {
                    filename: options.file.baseName,
                    contentType: 'application/java-archive'
                  }
                }
              },
              json: true
            }
          )
        }
      )
      .then(
        responseBody => {
          let pingAfter = responseBody.pingAfter
          return waitForInstallation(Number(pingAfter), options.url + responseBody.links.self, options, client)
        }
      )
  }

}
