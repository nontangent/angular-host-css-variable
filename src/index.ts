export default function (config, _) {
	console.log('webpack.js:', config);

	config.module.rules = config.module.rules.map((rule: any) => {
		if (rule.test == /\.scss$/) {
			rule.use = [...rule.use, 'host-css-variable'];
		}

		return rule;
	})

	return config;
}
