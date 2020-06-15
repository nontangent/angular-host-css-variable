import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, externalSchematic, Tree, chain, noop } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
	addPackageToPackageJson,
	addStyleIncludePathToAngularJson
} from '../utils';
/* import { Schema } from './schema'; */
import buildComponent from '@schematics/angular/component';
import { join } from 'path';

import { applyLintFix } from '@schematics/angular/utility/lint-fix';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector, validateName } from '@schematics/angular/utility/validation';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';

function buildSelector(options: any, projectPrefix: string) {
  let selector = strings.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  } else if (options.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}

export function addHostCssVariable(options: any): Rule {
	return async (host: Tree) => {
		const workspace = await getWorkspace(host);
		const project = workspace.projects.get(options.project as string);

		if (options.path === undefined && project) {
      options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path as string, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector = options.selector || buildSelector(options, project && project.prefix || '');

    validateName(options.name);
    validateHtmlSelector(options.selector);

		const stylePath = join(options.path, options.name, options.name + '.component.scss');

		return chain([
			(tree) => {
				return saveFile(host, stylePath, (src: string): string => {
					return `@import 'host-variable';\n` + 
					`$host: host('${options.name}');\n` +
					`${src}`
				});
			}
		]);
	}
}

export function saveFile(
	host: Tree, 
	path: string, 
	callback: any
): Tree {
	
	if (host.exists(path)) {
		const src = host.read(path)!.toString('utf-8');
		const dest = callback(src);
		host.overwrite(path, dest);
	} else {
		host.create(path, callback(''));
	}

	return host;
}

export default function(options: any): Rule {
	return (host: Tree, context: SchematicContext) => {
		const lintFix: boolean = options.lintFix;
		options.lintfix = false;
		return chain([
			externalSchematic('@schematics/angular', 'component', options),
			/* buildComponent({...options}), */
			addHostCssVariable({...options}),
			lintFix ? applyLintFix(options.path) : noop(),
		]);
  };
}

