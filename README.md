# atlassian-remote-deploy - Remote deployment of JAR plugin files to Atlassian products

## Introduction

This small script helps with the remote installation of plugins for Atlassian products. You simply need a JAR file
of the plugin and run this script to install it on a remote server.

The script uploads the file and checks for a valid installation.

This is currently alpha software and only supports JIRA.

It is based on [Randall Hunt's idea on this](http://ranman.com/jira-plugin-api/). Thanks!

## Usage

To install run

    npm install -g atlassian-remote-deploy

To run the script, use:

    atlassian-remote-deploy install --product jira --url https://jira.example.com --context /jira --username admin --password admin --file myplugin-1.0.0-SNAPSHOT.jar