import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
	addPackageToPackageJson,
	addStyleIncludePathToAngularJson,
	setDefaultCollectionToAngularJson
} from '../utils';
import { Schema } from './schema';

export function index(options: Schema): Rule {
	return (host: Tree, context: SchematicContext) => {
		/* addPackageToPackageJson( */
		/* 	host, */
		/* 	'host-css-variable', */
		/* 	'latest', */
		/* 	'devDependencies' */
		/* ); */

		addPackageToPackageJson(
			host,
			'angular-host-css-variable',
			'latest',
			'devDependencies'
		);

		/* addPackageToPackageJson( */
		/* 	host, */
		/* 	'angular-custom-webpack-chaining', */
		/* 	'latest', */
		/* 	'devDependencies' */
		/* ); */

		context.addTask(new NodePackageInstallTask());

		addStyleIncludePathToAngularJson(
			host,
			options.project,
			'node_modules/host-css-variable'
		);

		const packageName = 'angular-host-css-variable';
		const collection = `${packageName}`;
		setDefaultCollectionToAngularJson(host, collection);

		context.addTask(new RunSchematicTask(
			'angular-custom-webpack-chaining',
			'ng-add',
			{ project: options.project }
		));

		context.addTask(new RunSchematicTask(
			'angular-custom-webpack-chaining',
			'add-chain',
			{
				project: options.project,
				path: 'node_modules/angular-host-css-variable',
				architect: 'build'
			}
		));

    return host;
  };
}
