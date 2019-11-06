'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs-extra');
const path = require('path');
const indexr = require('indexr');
const indexrTemplate = require('./templates/indexrTemplate');

const GenTypes = {
  MUTATION: 'mutation',
  QUERY: 'query'
};

const CORE_PLUGINS_PATH = 'imports/plugins/core';
const CREATE_NEW_PLUGIN_OPTION = '(Create a new plugin folder...)';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.corePluginsFolder = this.destinationPath(CORE_PLUGINS_PATH);
  }

  async prompting() {
    this.answers = {};

    let answers = await this.prompt([
      {
        message: 'What would you like to create?',
        name: 'type',
        type: 'list',
        choices: Object.values(GenTypes)
      }
    ]);
    Object.assign(this.answers, answers);

    const pluginFolderNames = await fs.readdir(this.corePluginsFolder);

    answers = await this.prompt([
      {
        message: `Add plugin ${this.answers.type} to which plugin folder?`,
        name: 'plugin',
        type: 'list',
        choices: [CREATE_NEW_PLUGIN_OPTION].concat(pluginFolderNames)
      }
    ]);
    Object.assign(this.answers, answers);

    if (this.answers.plugin === CREATE_NEW_PLUGIN_OPTION) {
      answers = await this.prompt([
        {
          message: 'New plugin name',
          name: 'newPluginName',
          type: 'input'
        }
      ]);
      this.answers.plugin = answers.newPluginName.toLowerCase();
    }

    this.pluginPath = this.destinationPath(`imports/plugins/core/${this.answers.plugin}`);
    this.pluginNoMeteorPath = path.join(this.pluginPath, 'server/no-meteor');
    this.pluginResolversPath = path.join(
      this.corePluginsFolder,
      'graphql/server/no-meteor/resolvers',
      this.answers.plugin
    );

    answers = await this.prompt([
      {
        message: `${this.answers.type[0].toUpperCase()}${this.answers.type.slice(
          1
        )} name?`,
        name: 'newTypeName',
        type: 'input'
      }
    ]);

    // eslint-disable-next-line no-warning-comments
    // TODO maybe check to make sure it's in the GraphQL schema?

    Object.assign(this.answers, answers);
  }

  async writing() {
    const mutationTemplateVariables = {
      mutationName: this.answers.newTypeName,
      upperCaseMutationName: `${this.answers.newTypeName[0].toUpperCase()}${this.answers.newTypeName.slice(
        1
      )}`,
      lowerCasePluginName: this.answers.plugin,
      upperCasePluginName: `${this.answers.plugin[0].toUpperCase()}${this.answers.plugin.slice(
        1
      )}`
    };

    const queryTemplateVariables = {
      queryName: this.answers.newTypeName,
      upperCaseQueryName: `${this.answers.newTypeName[0].toUpperCase()}${this.answers.newTypeName.slice(
        1
      )}`,
      lowerCasePluginName: this.answers.plugin,
      upperCasePluginName: `${this.answers.plugin[0].toUpperCase()}${this.answers.plugin.slice(
        1
      )}`
    };

    // Ensure file and test file for the mutation or query
    const pluginTypePath = path.join(
      this.pluginNoMeteorPath,
      this.answers.type === GenTypes.QUERY ? 'queries' : 'mutations'
    );

    const newTypeFile = path.join(pluginTypePath, `${this.answers.newTypeName}.js`);
    const newTypeTestFile = path.join(
      pluginTypePath,
      `${this.answers.newTypeName}.test.js`
    );

    if (this.answers.type === GenTypes.QUERY) {
      this.fs.copyTpl(
        this.templatePath('pluginQuery.js'),
        newTypeFile,
        queryTemplateVariables
      );

      this.fs.copyTpl(
        this.templatePath('pluginQuery.test.js'),
        newTypeTestFile,
        queryTemplateVariables
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('pluginMutation.js'),
        newTypeFile,
        mutationTemplateVariables
      );

      this.fs.copyTpl(
        this.templatePath('pluginMutation.test.js'),
        newTypeTestFile,
        mutationTemplateVariables
      );
    }

    // Ensure file and test file for the mutation or query GraphQL resolver
    const resolverTypePath = path.join(
      this.pluginResolversPath,
      this.answers.type === GenTypes.QUERY ? 'Query' : 'Mutation'
    );

    const resolverFile = path.join(resolverTypePath, `${this.answers.newTypeName}.js`);
    const resolverTestFile = path.join(
      resolverTypePath,
      `${this.answers.newTypeName}.test.js`
    );

    if (this.answers.type === GenTypes.QUERY) {
      this.fs.copyTpl(
        this.templatePath('queryResolver.js'),
        resolverFile,
        queryTemplateVariables
      );

      this.fs.copyTpl(
        this.templatePath('queryResolver.test.js'),
        resolverTestFile,
        queryTemplateVariables
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('mutationResolver.js'),
        resolverFile,
        mutationTemplateVariables
      );

      this.fs.copyTpl(
        this.templatePath('mutationResolver.test.js'),
        resolverTestFile,
        mutationTemplateVariables
      );
    }
  }

  async install() {
    // This must happen in either `install` or `end`, after memFS changes have been committed
    await indexr(this.pluginNoMeteorPath, {
      exts: ['js'],
      modules: this.answers.type === GenTypes.QUERY ? 'queries' : 'mutations',
      outputFilename: 'index.js',
      submodules: '*.js',
      submodulesIgnore: '{*.test,index}.js',
      template: indexrTemplate
    });

    // This must happen in either `install` or `end`, after memFS changes have been committed
    await indexr(this.pluginResolversPath, {
      exts: ['js'],
      modules: this.answers.type === GenTypes.QUERY ? 'Query' : 'Mutation',
      outputFilename: 'index.js',
      submodules: '*.js',
      submodulesIgnore: '{*.test,index}.js',
      template: indexrTemplate
    });
  }

  end() {
    if (this.answers.type === GenTypes.QUERY) {
      const pluginQueriesImport = `import ${this.answers.plugin} from "/imports/plugins/core/${this.answers.plugin}/server/no-meteor/queries";`;
      this.log(`
I've generated some files for you, but you'll have to do a few things yourself:

* If this is the first query for the plugin, add the line '${pluginQueriesImport}' in /imports/plugins/core/graphql/server/no-meteor/queries.js, and add ${this.answers.plugin} to the default export object.
* If this is the first ${this.answers.plugin} query resolver, add 'import Query from "./Query"' in /imports/plugins/core/graphql/server/no-meteor/resolvers/${this.answers.plugin}/index.js, and add Query to the default export object.
* If the entire /imports/plugins/core/graphql/server/no-meteor/resolvers/${this.answers.plugin} folder is new, import it and add it to the 'merge' call in /imports/plugins/core/graphql/server/no-meteor/resolvers/index.js
`);
    } else {
      const pluginMutationsImport = `import ${this.answers.plugin} from "/imports/plugins/core/${this.answers.plugin}/server/no-meteor/mutations";`;
      this.log(`
I've generated some files for you, but you'll have to do a few things yourself:

* If this is the first query for the plugin, add the line '${pluginMutationsImport}' in /imports/plugins/core/graphql/server/no-meteor/mutations.js, and add ${this.answers.plugin} to the default export object.
* If this is the first ${this.answers.plugin} mutation resolver, add 'import Mutation from "./Mutation"' in /imports/plugins/core/graphql/server/no-meteor/resolvers/${this.answers.plugin}/index.js, and add Mutation to the default export object.
* If the entire /imports/plugins/core/graphql/server/no-meteor/resolvers/${this.answers.plugin} folder is new, import it and add it to the 'merge' call in /imports/plugins/core/graphql/server/no-meteor/resolvers/index.js
`);
    }
  }
};
