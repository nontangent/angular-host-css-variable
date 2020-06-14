import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
	addPackageToPackageJson
} from '../utils';

export function angularHostCssVariable(options: any): Rule {
	return (host: Tree, context: SchematicContext) => {
		addPackageToPackageJson(
			host,
			'host-css-variable',
			'latest',
			'devDependencies'
		);

		addPackageToPackageJson(
			host,
			'angular-host-css-variable',
			'latest',
			'devDependencies'
		);

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
